import jwt from 'jsonwebtoken';
import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
import generateToken from '../utils/generateToken.js';

/**
 * @desc auth user
 * @route POST /api/users
 * @access  Public
 */
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const pwdIsValid = await user.matchPassword(password);

    if (user && pwdIsValid) {
        // set JWT as HTTP-Only cookie and token
        generateToken(res, user._id);

        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        });
    } else {
        res.status(401);
        throw new Error('Invalid email or password');
    }
});

/**
 * @desc Register user
 * @route POST /api/users
 * @access  Public
 */
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    const userExists = User.findOne({ email });

    if (!userExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    const user = await User.create({
        name,
        email,
        password
    });

    if (user) {
        // set JWT as HTTP-Only cookie and token
        generateToken(res, user._id);

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});

/**
 * @desc logout user / clear cookie
 * @route POST /api/users/logout
 * @access Private
 */
const logoutUser = asyncHandler(async (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expiresIn: new Date(0)
    });

    res.status(200).json({ message: 'Logged out successfully' });
});

/**
 * @desc get user profile
 * @route POST /api/users/profile
 * @access Public
 */
const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        });
    } else {
        res.status(400);
        throw new Error('User not found');
    }
});

/**
 * @desc Update user profile
 * @route PUT /api/users/profile
 * @access Private
 */
const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    const emailExists = await User.findOne({ email: req.body.email });

    if (user) {
        if (emailExists && req.body.email !== user.email) {
            res.status(400);
            throw new Error('Email exists');
        }

        if(req.body.name && req.body.name !== user.name) {
            user.name = req.body.name;
        }

        if(req.body.email && req.body.email !== user.email) {
            user.email = req.body.email;
        }

        if (req.body.password) {
            user.password = req.body.password;
        }

        const updatedUser = await user.save();

        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin
        });
    } else {
        res.status(400);
        throw new Error('User not found');
    }
});

/**
 * @desc get users
 * @route GET /api/users
 * @access Private/Admin
 */
const getUsers = asyncHandler(async (req, res) => {
    res.send('auth user');
});

/**
 * @desc get user by id
 * @route DELETE /api/users/:id
 * @access Private/Admin
 */
const getUserById = asyncHandler(async (req, res) => {
    res.send('auth user');
});

/**
 * @desc Delete users
 * @route DELETE /api/users
 * @access Private/Admin
 */
const deleteUser = asyncHandler(async (req, res) => {
    res.send('auth user');
});

/**
 * @desc update user
 * @route PUT /api/users/:id
 * @access Private/Admin
 */
const updateUser = asyncHandler(async (req, res) => {
    res.send('auth user');
});

export {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    deleteUser,
    getUserById,
    updateUser
};