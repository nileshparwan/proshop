import init from './server.js';
import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';

const start = () => {
    const app = init();
    const PORT = process.env.PORT || 5000;

    // routes
    app.use('/api/products', productRoutes);
    app.use('/api/users', userRoutes);
    app.use('/api/orders', orderRoutes);
    app.use('/api/upload', uploadRoutes);
    app.get('/api/config/paypal', (req, res)=> res.status(200).json({clientId: process.env.PAYPAL_CLIENT_ID}))

    app.listen(PORT, () => console.log('Server running on port:', PORT));
};

start();