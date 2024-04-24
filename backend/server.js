import path from 'path';
import dotEnv from 'dotenv';
import express from 'express';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import cors from 'cors'

export default () => {
    const app = express();

    // environment variable
    dotEnv.config();

    // move build folder to backend
    // use this line to run the application on backend localhost
    // app.use(express.static('build'))
    app.use(cors({
        origin: true,
        credentials: true
    }));
    // body parser middleware
    app.use(express.json());
    // to parse cookie
    app.use(cookieParser());
    app.use(express.urlencoded({ extended: true }));

    // set __dirname to current directory
    const __dirname = path.resolve();
    app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

    app.use((req, res, next) => {
        if (req.method === "OPTIONS") {
            return res.status(200).json({});
        }
        next();
    });

    // mongo db connection
    connectDB();

    return app;
};