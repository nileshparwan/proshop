import init from './server.js';
import products from './data/products.js';

const start = () => {
    const app = init();
    const PORT = process.env.PORT || 5000;

    app.get('/', (req, res) => {
        res.send('listening....');
    });
    
    app.get('/api/products', (req, res) => {
        res.json(products);
    });
    
    app.get('/api/products/:id', (req, res) => {
        const product = products.find(p => p._id === req.params.id);
        if (!req.params.id) {
            throw new Error('Product Id is missing');
        }
        if (!product) {
            throw new Error(`Couldn't find product for the given id ${req.params.id}`);
        }
        return res.json(product);
    });
    
    app.listen(PORT, () => console.log('Server running on port:', PORT));
}

start();