"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = require("../db");
const userAuth_1 = require("../middlewares/userAuth");
const types_1 = require("../types");
const router = express_1.default.Router();
// read notes as per search param, if empty returns all notes for the user
router.get('/:search?', userAuth_1.userAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let search = req.params.search;
        console.log(search);
        let user = req.userId;
        let notes = [];
        if (search == "null" || search == undefined) {
            let result = yield db_1.db.query(`SELECT * FROM notes WHERE userId = $1`, [user]);
            console.log(result.rows);
            if (result.rows.length > 0) {
                notes = result.rows;
            }
        }
        else {
            search = '%' + search + '%';
            let sqlQeuery = `SELECT * FROM notes 
                             WHERE userId = $1 AND 
                             title LIKE lower($2) ESCAPE ''`;
            let result = yield db_1.db.query(sqlQeuery, [user, search]);
            console.log(result.rows);
            if (result.rows.length > 0) {
                notes = result.rows;
            }
        }
        res.json({
            message: 'success',
            notes: notes
        });
    }
    catch (err) {
        console.log(err);
        res.json({ details: "Api call Failed" });
    }
}));
// get by ID
router.get('/search/:id', userAuth_1.userAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let user = req.userId;
        if (req.params.id == null || req.params.id === undefined) {
            return res.json({ details: "Invalid Note Id" });
        }
        let id = req.params.id;
        let result = yield db_1.db.query(`SELECT * FROM notes WHERE id = ${id}`);
        if (result.rowCount > 0) {
            res.json({
                message: 'success',
                notes: result.rows
            });
        }
        else {
            res.json({ details: "Failed to Search Note" });
        }
    }
    catch (err) {
        console.log(err);
        res.json({ details: "Api Call Failed" });
    }
}));
router.post('/add', userAuth_1.userAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { success } = types_1.noteBody.safeParse(req.body);
        if (!success) {
            res.json({ details: "Title and content should have min length of 1" });
            return;
        }
        let user = req.userId;
        let title = req.body.title;
        let content = req.body.content;
        let result = yield db_1.db.query(`INSERT INTO notes (title, content, userId)
                                     VALUES($1, $2, $3)`, [title, content, user]);
        if (result.rowCount > 0) {
            res.json({ message: 'success' });
        }
        else {
            res.json({ details: "Failed to ADD Note" });
        }
    }
    catch (err) {
        console.log(err);
        res.json({ details: "Api call Failed" });
    }
}));
router.put('/edit', userAuth_1.userAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.body);
        let id = req.body.id;
        let content = req.body.content;
        let title = req.body.title;
        let result = yield db_1.db.query(`UPDATE notes SET title = $1, content = $2 WHERE id = $3`, [title, content, id]);
        if (result.rowCount > 0) {
            res.json({ message: 'success' });
        }
        else {
            res.json({ details: "Failed to ADD Note" });
        }
    }
    catch (err) {
        console.log(err);
        res.json({ details: "Failed to Edit Note" });
    }
}));
router.delete('/delete/:id', userAuth_1.userAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let id = req.params.id;
        if (id == null || id == undefined) {
            return res.json({ details: "Invalid Note Id" });
        }
        let result = yield db_1.db.query(`DELETE FROM notes WHERE id = ${id}`);
        if (result.rowCount > 0) {
            res.json({ message: 'success' });
        }
        else {
            res.json({ details: "Failed to Delete Note" });
        }
    }
    catch (err) {
        console.log(err);
        res.json({ details: "Failed to Delete Note" });
    }
}));
exports.default = router;
