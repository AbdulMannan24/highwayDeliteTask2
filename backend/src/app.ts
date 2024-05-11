import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();
import { connectDB, db } from './db'

const app: express.Application = express();

// middlewares
app.use(cors());
app.use(express.json());

// routes
import userRoutes from './routes/user';
app.use('/user', userRoutes);
import notesRoutes from './routes/notes';
app.use('/notes', notesRoutes);


app.get('/', (req, res) => {
    res.json({message: "this is working"});
})


app.listen(3000,async () => {
    console.log('listening on port 3000');
    try {
        await connectDB();     
    } catch (err) {
        console.log(err);
    }   
    // await db.query('create table users (email varchar(50) UNIQUE NOT NULL, password varchar(100) NOT NULL, status smallint default 0)');
    // await db.query('DROP TABLE users');
    // await db.query(`CREATE TABLE notes (
    //     id SERIAL PRIMARY KEY, 
    //     title VARCHAR(255) NOT NULL,
    //     content TEXT, 
    //     userId VARCHAR(50) NOT NULL, 
    //     FOREIGN KEY (userId) REFERENCES users(email))`)
    // await db.query("INSERT INTO users (email, password) VALUES('test@gmail.com', '9876543212')");
})