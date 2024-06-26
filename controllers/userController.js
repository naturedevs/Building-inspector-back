
import express from 'express'
import User from '../models/userModel.js';

const router = express.Router();

// Read All
router.get('/', async(req, res) => {
    try {
        const itemList = await User.find();
        res.json(itemList);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create
router.post('/', async(req, res) => {
    try {
        const { username, email, password } = req.body;
        const newItem = new User({
            username,
            email,
            password,
        });
        const savedItem = await newItem.save();
        res.status(201).json(savedItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { username, email, password } = req.body;
        const updatedItem = await User.findByIdAndUpdate(
            id,
            { username, email, password },
            { new: true, runValidators: true }
        );
        if (!updatedItem) {
            return res.status(404).json({ message: 'Data not found' });
        }
        res.json(updatedItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;  
        const deletedItem = await User.findByIdAndDelete(id);
        if (!deletedItem) {
            return res.status(404).json({ message: 'Data not found' });
        }
        res.json({ message: 'Data deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

export default router;
