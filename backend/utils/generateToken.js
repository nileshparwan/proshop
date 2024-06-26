import jwt from 'jsonwebtoken';

const generateToken = (res, userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '30d' });

    // set JWT as HTTP-Only cookie
    res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: process.env.NODE_ENV !== 'development' ? 'None' : 'Strict',
        expires: 30 * 24 * 60 * 60 * 1000, // Expires in 24 hours
        maxAge: 30 * 24 * 60 * 60 * 1000, // Max age in milliseconds (24 hours)
    });
};

export default generateToken;