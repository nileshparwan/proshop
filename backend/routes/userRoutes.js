import express from 'express';
import {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    deleteUser,
    getUserById,
    updateUser
} from '../controllers/userController.js';

const router = express.Router();

router.route('/').get(getUsers);
router.route('/login').post(authUser);
router.route('/logout').post(logoutUser);
router.route('/register').post(registerUser)
router.route('/profile').get(getUserProfile).put(updateUserProfile);
router.route('/:id').delete(deleteUser).get(getUserById).put(updateUser);

export default router;