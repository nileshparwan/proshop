import dotEnv from 'dotenv';
// import path, { dirname } from 'path';
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
    
    // // List of allowed domains
    // const allowedOrigins = ['https://proshops.vercel.app/', 'http://localhost:3000/'];

    // // Middleware to disable CORS
    // app.use((req, res, next) => {
    //     const origin = req.headers.origin;

    //     // Check if the request's origin is in the allowed list
    //     if (allowedOrigins.includes(origin)) {
    //         res.setHeader('Access-Control-Allow-Origin', origin);
    //         res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    //         res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    //         res.setHeader('Access-Control-Allow-Credentials', 'true');
    //     }

    //     // Continue to the next middleware
    //     next();
    // });

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