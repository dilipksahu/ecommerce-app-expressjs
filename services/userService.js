const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

class UserService {
    async register(userData) {
        try {
            const { name, email, password } = userData;

            // Hash the password
            const saltRounds = 10;
            const passwordHash = await bcrypt.hash(password, saltRounds);

            const newUser = new User({
                name,
                email,
                password: passwordHash,
            });

            await newUser.save();
            return newUser;
        } catch (err) {
            console.log(err);
            return err;
        }
    }

    async authenticateUser(userData) {
       try {
        const { email, password } = userData;
         // Find user by email
         const user = await User.findOne({ email });
         if (!user) {
             throw new Error('User not found');
         }
 
         // Verify password
         const passwordMatch = await bcrypt.compare(password, user.password);
         if (!passwordMatch) {
             throw new Error('Incorrect password');
         }
 
         // Generate JWT token
         const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
         return token;
       } catch (err) {
         console.log(err);
         return err;
       }
    }

    async getUserById(userId) {
        return await User.findById(userId);
    }

    async updateUserById(userId, updateData) {
        return await User.findByIdAndUpdate(userId, updateData, { new: true });
    }

    async deleteUserById(userId) {
        return await User.findByIdAndDelete(userId);
    }
}

module.exports = new UserService();
