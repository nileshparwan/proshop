import init from './server.js';
import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

const start = () => {
    const app = init();
    const PORT = process.env.PORT || 5000;

    // routes
    app.use('/api/products', productRoutes);
    app.use('/api/users', userRoutes);
    app.use('/api/orders', orderRoutes);
    app.use('/api/upload', uploadRoutes);
    app.get('/api/config/paypal', (req, res)=> res.status(200).json({clientId: process.env.PAYPAL_CLIENT_ID}))

    // custom middleware
    app.use(notFound);
    app.use(errorHandler);

    // Middleware to disable CORS
    app.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Accept, Content-Type, Authorization');
        res.setHeader('Access-Control-Allow-Credentials', 'true');
        // Continue to the next middleware
        next();
    });

    app.listen(PORT, () => console.log('Server running on port:', PORT));
};

start();