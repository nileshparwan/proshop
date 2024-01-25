import express from 'express';
import products from '../data/products.js';

const router = express.Router();

router.get('/api/products', (req, res) => {
    res.json(products);
});

router.get('/api/products/:id', (req, res) => {
    const product = products.find(p => p._id === req.params.id);
    if (!req.params.id) {
        throw new Error('Product Id is missing');
    }
    if (!product) {
        throw new Error(`Couldn't find product for the given id ${req.params.id}`);
    }
    return res.json(product);
});

export default router;