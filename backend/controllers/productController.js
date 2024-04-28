import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js";

/**
 * @desc fetch all product
 * @route GET /api/products
 * @access Public
 */
const getProducts = asyncHandler(async (req, res) => {
    const pageSize = 4 ;
    const page = Number(req.query.pageNumber) || 1;
    // i => allow case incensitive
    const keyword = req.query.keyword ? {
        name: {
            $regex: req.query.keyword,
            $options: 'i'
        }
    } : {}
    // here we return the count of the product that matches the keyword
    const count = await Product.countDocuments({...keyword});
    const products = await Product.find({ ...keyword }).limit(pageSize).skip(pageSize * (page - 1));
    res.json({ products, page, pages: Math.ceil(count / pageSize) });
});

/**
 * @desc fetch a product
 * @route GET /api/products/:id
 * @access Public
 */
const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        res.status(404);
        throw new Error('Resource not found');
    }

    return res.json(product);
});

/**
 * @desc update a product
 * @route PUT /api/products/:id
 * @access Public
 */
const updateProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if(!product) {
        res.status(404);
        throw new Error('Resource not found');
    }
    
    const updatedProduct = await Product.findOneAndUpdate(product._id, {
        $set: {
            name: req.body.name,
            description: req.body.description,
            image: req.body.image,
            brand: req.body.brand,
            category: req.body.category,
            price: req.body.price,
            countInStock: req.body.countInStock,
            numReviews: req.body.numReviews,
        }
    }, {
        new: true
    });

    res.json(updatedProduct);
});

/**
 * @desc create a product
 * @route POST /api/products
 * @access Private
 */
const createProduct = asyncHandler(async (req, res) => {
    const product = new Product({
        name: 'Sample name',
        price: 0,
        user: req.user._id,
        image: '/images/sample.jpg',
        brand: 'Sample brand',
        category: 'Sample category',
        countInStock: 0,
        numReviews: 0,
        description: 'Sample description'
    });

    const createdProduct = await product.save();
    return res.status(201).json(createdProduct)
})

/*
 * @desc remove a product
 * @route DELTE /api/products/:id
 * @access Private/admin
 */
const deleteProduct = asyncHandler(async (req, res) => {
   const product = await Product.findById(req.params.id);
   if(product){
       await Product.deleteOne({ _id: product._id });
       res.status(200).json({ message: 'Product deleted' })
   } else {
       res.status(404);
       throw new Error('Resource not found');
   }
});

/*
 * @desc create a new product
 * @route POST /api/products/:id/reviews
 * @access Private
 */
const createProductReview = asyncHandler(async (req, res) => {
    const { rating, comment } = req.body;
    const product = await Product.findById(req.params.id);
    if (product) {
        const alreadyReviewed = product.reviews.find(
            review => review.user.toString() === req.user._id.toString()
        );

        if (alreadyReviewed) {
            res.status(400);
            throw new Error('Product already reviewed');
        }

        const review = {
            name: req.user.name,
            rating: Number(rating),
            comment,
            user: req.user._id
        };

        product.reviews.push(review);
        product.numReviews = product.reviews.length;
        product.rating = product.reviews.reduce((acc, review) => acc + review.rating, 0) / product.reviews.length;
        await product.save();
        res.status(201).json({ message: 'Review added' });
    } else {
        res.status(404);
        throw new Error('Resource not found');
    }
 });

 /**
 * @desc fetch top products
 * @route GET /api/products/top
 * @access Public
 */
const getTopProduct = asyncHandler(async (req, res) => {
    const products = await Product.find({}).sort({rating: -1}).limit(3);
    return res.status(200).json(products);
});
 

export {
    getProducts,
    updateProduct,
    createProduct,
    getTopProduct,
    deleteProduct,
    getProductById,
    createProductReview
};