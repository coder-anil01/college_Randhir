import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import connectDb from './db.js';
import path from 'path';
import { fileURLToPath } from 'url';
import userRoute from './routes/userRoute.js'

dotenv.config();
connectDb();

// esmodulsefix
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 8080;

const app = express();
app.use(express.json({limit: '20mb'}));
app.use(express.urlencoded({ extended: true, limit: '20mb' }));
app.use(cors());
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, "./client/dist")))

app.use('/api/vi/user', userRoute);

app.use('*', function(req, res){
    res.sendFile(path.join(__dirname, "./client/dist/index.html"))
});

app.listen(PORT, () => {
    console.log(`App Lisine On ${PORT}`);
})