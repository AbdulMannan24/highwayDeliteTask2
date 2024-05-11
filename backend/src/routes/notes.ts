import express from 'express';
import { db } from '../db';
import { userAuth } from '../middlewares/userAuth';
const router = express.Router();

// read notes as per search param, if empty returns all notes for the user
router.get('/:search?', userAuth, async (req: any , res: any) => {
    try {
        let search: string = req.params.search;
        console.log(search);
        let user = req.userId;
        let notes = [];
        if (search == "null" || search == undefined) {
            let result = await db.query(`SELECT * FROM notes WHERE userId = $1`, [user]);
            console.log(result.rows);
            if(result.rows.length > 0) {
                notes = result.rows;
            } 
        } else {
            let result = await db.query(`SELECT * FROM notes 
                                         WHERE userId = $1 AND 
                                         title LIKE lower($2)`, [user, search]);
            console.log(result.rows);
            if(result.rows.length > 0) {
                notes = result.rows;
            }
        }
        res.json({
            message: 'success',
            notes: notes
        });
    } catch (err) {
        console.log(err);
        res.json({details: "Api call Failed"});
    }
})

router.post('/add', userAuth, async (req: any, res: any) => {
    try {
        let user = req.userId;
        let result = await db.query(`INSERT INTO notes (title, content, userId)
                                     VALUES($1, $2, $3)`, [req.body.title, req.body.content, user]);
        if (result.rowCount as number > 0) {
            res.json({message: 'success'});
        } else {
            res.json( {details: "Failed to ADD Note"});
        }
    } catch (err) {
        console.log(err);
        res.json({details: "Api call Failed"});
    }
})


export default router;