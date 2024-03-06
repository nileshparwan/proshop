import path from 'path';
import dotEnv from 'dotenv';
import express from 'express';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';

export default () => {
    const app = express();

    // environment variable
    dotEnv.config();

    // body parser middleware
    app.use(express.json());
    app.use(cookieParser());
    app.use(express.urlencoded({ extended: true }));

    // set __dirname to current directory
    const __dirname = path.resolve();
    app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

    // if (process.env.NODE_ENV === 'production') {
    //     // set static folder
    //     app.use(express.static(path.join(dirname('/frontend/build'))));
    //     // any route that is not api will be redirected to index.html
    //     app.get('*', (req, res) => {
    //         res.sendFile(path.resolve(dirname('frontend', 'build', 'index.html')));
    //     });
    // } else {
    //     app.get('/', (req, res) => {
    //         res.send('API is running');
    //     })
    // }

    // mongo db connection
    connectDB();

    return app;
};