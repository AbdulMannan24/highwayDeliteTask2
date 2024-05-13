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
})