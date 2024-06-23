const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const AuthMiddleware = require('../middlewares/authMiddleware');

// POST /api/users (Create a new user)
router.post('/', userController.register);

// GET /api/users/ (Signin User by email,password)
router.post('/signin', userController.signIn);

// GET /api/users/:userId (Get a user by ID)
router.get('/:userId', AuthMiddleware.authenticateToken, userController.getUserById);

// PUT /api/users/:userId (Update a user by ID)
router.put('/:userId', AuthMiddleware.authenticateToken, userController.updateUserById);

// DELETE /api/users/:userId (Delete a user by ID)
router.delete('/:userId', AuthMiddleware.authenticateToken, userController.deleteUserById);

module.exports = router;
