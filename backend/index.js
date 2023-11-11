import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import userRoutes from './routes/userRoutes.js';

const port = process.env.PORT || 5000;
const app = express();

app.get('/', (req, res) => {
    res.send('Server is listening...');
});

app.use('/user', userRoutes);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});