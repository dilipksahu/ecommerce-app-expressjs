const userService = require('../services/userService');
const { registerValidation, loginValidation } = require("../utils/validate");

class UserController {
    // register a new user
    register = async (req, res) => {
        const { error } = registerValidation(req.body);
        if (error) return res.status(400).send({success: false,message: error.details[0].message});
        try {
            const newUser = await userService.register(req.body);
            res.status(201).json(newUser);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    };

    // sigin user by email, password
    signIn = async (req,res) => {
        const { error } = loginValidation(req.body);
        if (error) return res.status(400).send({success: false,message: error.details[0].message});
        try {
            const token = await userService.authenticateUser(req.body);
            if (!token) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.header("auth-token", token).send({ success: true,message: "Login successful", "auth-token": token });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    // Get a user by ID
    getUserById = async (req, res) => {
        try {
            const user = await userService.getUserById(req.params.userId);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.json(user);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    };

    // Update a user by ID
    updateUserById = async (req, res) => {
        try {
            const updatedUser = await userService.updateUserById(req.params.userId, req.body, { new: true });
            if (!updatedUser) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.json(updatedUser);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    };

    // Delete a user by ID
    deleteUserById = async (req, res) => {
        try {
            const deletedUser = await userService.deleteUserById(req.params.userId);
            if (!deletedUser) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.json({ message: 'User deleted successfully' });
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    };

}

module.exports = new UserController();
