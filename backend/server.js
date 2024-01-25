import express from 'express';
import dotEnv from 'dotenv';
import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

export default () => {
    const app = express();
    
    // environment variable
    dotEnv.config();

    // mongo db connection
    connectDB();

    // middleware
    app.use(notFound);
    app.use(errorHandler);

    return app;
};