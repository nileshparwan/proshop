import express from 'express';
import dotEnv from 'dotenv';
import connectDB from './config/db.js';

export default () => {
    const app = express();
    // environment variable
    dotEnv.config();

    // mongo db connection
    connectDB();

    return app;
};