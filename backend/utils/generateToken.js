import jwt from 'jsonwebtoken';

const generateToken = (res, userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '30d' });

    // set JWT as HTTP-Only cookie
    res.cookie('jwt', token, {
        path: '/',
        httpOnly: true,
        sameSite: 'strict',
        maxAge: 30 * 24 * 60 * 1000,
        secure: process.env.NODE_ENV !== 'development',
        domain: process.env.NODE_ENV !== 'development' ? 'proshops.vercel.app' : 'localhost'
    });
};

export default generateToken;