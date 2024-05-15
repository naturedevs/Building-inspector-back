
import express from 'express'
import User from '../models/userModel.js';

const router = express.Router();

// Read All
router.get('/', async(req, res) => {
    try {
        const userList = await User.find();
        res.json(userList);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create User
router.post('/', async(req, res) => {
    try {
        const { name, email, password } = req.body;
        const newUser = new User({
            name,
            email,
            password,
        });
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update User
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, password } = req.body;
        // Find the user by ID and update
        const updatedUser = await User.findByIdAndUpdate(
            id,
            { name, email, password },
            { new: true, runValidators: true }
        );
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Respond with the updated user
        res.json(updatedUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete User
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;  
        // Find the user by ID and delete
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Respond with a success message
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

export default router;
