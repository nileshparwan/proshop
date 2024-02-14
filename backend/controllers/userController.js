import asyncHandler from "../middleware/asyncHandler.js";

/**
 * @desc auth user
 * @route POST /api/users
 * @access  Public
 */
const authUser = asyncHandler(async (req, res) => {
    res.send('auth user');
});

/**
 * @desc Register user
 * @route POST /api/users
 * @access  Public
 */
const registerUser = asyncHandler(async (req, res) => {
    res.send('auth user');
});

/**
 * @desc logout user / clear cookie
 * @route POST /api/users/logout
 * @access Private
 */
const logoutUser = asyncHandler(async (req, res) => {
    res.send('auth user');
});

/**
 * @desc get user profile
 * @route POST /api/users/profile
 * @access Public
 */
const getUserProfile = asyncHandler(async (req, res) => {
    res.send('auth user');
});

/**
 * @desc Update user profile
 * @route PUT /api/users/profile
 * @access Private
 */
const updateUserProfile = asyncHandler(async (req, res) => {
    res.send('auth user');
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
}