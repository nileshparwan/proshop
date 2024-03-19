import path from 'path';
import dotEnv from 'dotenv';
import express from 'express';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';

export default () => {
    const app = express();

    // environment variable
    dotEnv.config();

    // body parser middleware
    app.use(express.json());
    app.use(cookieParser());
    app.use(express.urlencoded({ extended: true }));

    // Middleware to disable CORS
    app.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Accept, Content-Type, Authorization');
        res.setHeader('Access-Control-Allow-Credentials', 'true');
        next();
    });

    // set __dirname to current directory
    const __dirname = path.resolve();
    console.log(__dirname);
    app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

    // custom middleware
    app.use(notFound);
    app.use(errorHandler);

    // mongo db connection
    connectDB();

    return app;
};