import express from 'express';
import dotEnv from 'dotenv';
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';

export default () => {
    const app = express();

    // environment variable
    dotEnv.config();

    // body parser middleware
    app.use(express.json());
    app.use(cookieParser());
    app.use(express.urlencoded({ extended: true }));

    // mongo db connection
    connectDB();

    return app;
};