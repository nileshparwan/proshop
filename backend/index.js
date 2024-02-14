import init from './server.js';
import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

const start = () => {
    const app = init();
    const PORT = process.env.PORT || 5000;

    app.use('/api/products', productRoutes);
    app.use('/api/users', userRoutes);

    // middleware
    app.use(notFound);
    app.use(errorHandler);

    app.listen(PORT, () => console.log('Server running on port:', PORT));
};

start();