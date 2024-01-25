import init from './server.js';
import productRoutes from './routes/productRoutes.js';

const start = () => {
    const app = init();
    const PORT = process.env.PORT || 5000;

    app.use('/api/products', productRoutes);

    app.get('/', (req, res) => {
        res.send('listening....');
    });
    
    app.listen(PORT, () => console.log('Server running on port:', PORT));
}

start();