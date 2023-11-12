import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './config/db.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/userRoutes.js';
import dataRoutes from './routes/dataRoutes.js';

const port = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

connectDB();

app.get('/', (req, res) => {
    res.send('Server is listening...');
});

app.use('/user', userRoutes);
app.use('/data', dataRoutes);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});