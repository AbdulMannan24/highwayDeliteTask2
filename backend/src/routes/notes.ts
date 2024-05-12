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
            search = '%' + search + '%';
            let sqlQeuery = `SELECT * FROM notes 
                             WHERE userId = '${user}' AND 
                             title LIKE lower('${search}') ESCAPE ''`
            let result = await db.query(sqlQeuery);
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

// get by ID
router.get('/edit/:id', userAuth, async (req: any, res: any) => {
    try {
        let user = req.userId;
        if (req.params.id == null || req.params.id === undefined) {
            return res.json({details: "Invalid Note Id"});
        }
        let id: number = req.params.id as number;
        let result = await db.query(`SELECT * FROM notes WHERE id = ${id}`);
        if (result.rowCount as number > 0) {
            res.json({
                message: 'success',
                notes: result.rows
            });
        } else {
            res.json( {details: "Failed to Search Note"});
        }
    } catch (err) {
        console.log(err);
        res.json({details: "Api Call Failed"});
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


router.put('/edit', userAuth, async (req: any, res: any) => {
    try {
        let id:number = req.body.id;
        let content: string = req.body.note;
        let title: string = req.body.title;
        let result = await db.query(`UPDATE notes SET title = ${title}, content = ${content} WHERE id = ${id}`);
        if (result.rowCount as number > 0) {
            res.json({message: 'success'});
        } else {
            res.json( {details: "Failed to ADD Note"});
        } 
    } catch (err) {
        console.log(err);
        res.json({details: "Failed to Edit Note"});
    }
})


router.put('/edit', userAuth, async (req: any, res: any) => {
    try {
        let id:number = req.body.id;
        let result = await db.query(`DELETE FROM notes WHERE id = ${id}`);
        if (result.rowCount as number > 0) {
            res.json({message: 'success'});
        } else {
            res.json( {details: "Failed to ADD Note"});
        } 
    } catch (err) {
        console.log(err);
        res.json({details: "Failed to Edit Note"});
    }
})


export default router;