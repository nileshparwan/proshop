import colors from 'colors';
import users from './data/users.js';
import products from './data/products.js';
import User from './models/userModel.js';
import Product from './models/productModel.js';
import Order from './models/orderModel.js';
import connectDB from './config/db.js';
import dotEnv from 'dotenv';

dotEnv.config();
connectDB();

const importData = async () => {
    let createUsers;

    try {
        await User.deleteMany();
        await Order.deleteMany();
        await Product.deleteMany();
        console.log('models have been removed'.blue.inverse);
    } catch (error) {
        console.error(`Delete: ${error}`.red.inverse);
        process.exit();
    }

    try {
        createUsers = await User.insertMany(users);
        console.log('users have been inserted'.blue.inverse);
    } catch (error) {
        console.error(`User insert: ${error}`.red.inverse);
        process.exit();
    }

    try {
        const adminUser = createUsers[0]._id;
        const sampleProducts = products.map((product) => {
            return { ...product, user: adminUser };
        });
        await Product.insertMany(sampleProducts);
        console.log('products have been inserted'.blue.inverse);
    } catch (error) {
        console.error(`Product Insert: ${error}`.red.inverse);
        process.exit();
    }

    console.log('Data imported!'.green.inverse);
    process.exit();
};

const destroyData = async () => {
    try {
        await User.deleteMany();
        await Order.deleteMany();
        await Product.deleteMany();

        console.log('Data Destroyed!'.red.inverse);
        process.exit();
    } catch (error) {
        console.error(`Destroy: ${error}`.red.inverse);
        process.exit(1);
    }
};

if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}