import express from 'express';
import * as jwt from 'jsonwebtoken';
import { db } from '../db';
import { credentials } from '../types';
import bcrypt from 'bcrypt';
import { fetchUser, getUser } from '../utils/userInfo';
import { sendEmail } from '../utils/emailer';
const router = express.Router();


// singUp
router.post('/signup', async(req, res) => {
    try {
        //console.log(req.body);
        const {success} = credentials.safeParse(req.body);
        if (!success) {
            res.json({details:"Incomplete/Invalid Details"});
            return;
        }
      
        // checking for existing user
        let userExists:number = await fetchUser(req.body.email);
        if (userExists > 0) {
            res.json({details:"User already exists"});
            return;
        }

        let email:string = req.body.email;
        let password:string = req.body.password;
        let salt = await bcrypt.genSalt(10);
        let hashedPass = await bcrypt.hash(password, salt);

        let sqlQuery: string = `INSERT INTO users (email, password) VALUES($1, $2)`;
        let createdUser = await db.query(sqlQuery,[email, hashedPass]);

        if (createdUser.rowCount as number > 0) {
            let secretKey:string = process.env.SECRET_KEY as string;
            let token = jwt.sign({
                email: email
            }, secretKey);
            let link: string = `http://localhost:5173/verify/${email}` 
            await sendEmail(email, link);
            res.json({
                message: "success",
                token: token
            });
        } else {
            res.json({details:"failed to create user"});
        }
    } catch (err) {
        console.log(err);
        res.json({details: "Api Call Failed"});
    }
})

// Email Verification
router.post('/verify/:email', async (req, res) => {
    try {
        if (req.params.email == null) {
            res.json({details: "Invalid Email"});
            return;
        }

        let email:string = req.params.email;
        let sqlQuery: string = `UPDATE users SET status = 1 Where email = $1`;
        let verifiedUser = await db.query(sqlQuery, [email]);
        if (verifiedUser.rowCount as number > 0) {
            res.json({message: "success"});
        } else {
            res.json({details: "failed to verify user"});
        }
        
    } catch (err) {
        console.log(err);
        res.json({details: "Api Call Failed"}); 
    }
})

// resend verification link
router.get('/resend/:email', async (req, res) => {
    try {
        if (req.params.email == null) {
            res.json({details: "Invalid Email"});
            return;
        } 
        let email: string = req.params.email;
        let link: string = `http://localhost:5173/verify/${email}` 
        await sendEmail(email, link);
        res.json({message: "success"})
    } catch (err) {
        console.log(err);
        res.json({details: "Api Call Failed"});
    }
})
// signIn 
router.post('/signIn', async (req, res) => {
    try {
        let {success} = credentials.safeParse(req.body);
        if (!success) {
            res.json({details: "Invalid Credentials"});
            return;
        }

        let user = await getUser(req.body.email);
        if (user.length == 0) {
            res.json({details: "User does not exist"});
            return;
        }

        const checkPassword = await bcrypt.compare(req.body.password, user[0].password);
        if (checkPassword) {
            if (user[0].status == 0) {
                return res.json({details: "Please Verify your Email"});
            }
            let secretKey = process.env.SECRET_KEY as string;
            let token = jwt.sign({
                email: req.body.email
            }, secretKey);
            
            return res.json({
                message: "success",
                token: token
            })
        } else {
            return res.json({
                details: "Password is incorrect"
            })
        }        

    } catch (err) {
         console.log(err);
        res.json({details: "Api Call Failed"}); 
    }
})


export default router;