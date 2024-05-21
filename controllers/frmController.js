
import express from 'express'
import Frm from '../models/frmModel.js';

const router = express.Router();

// Read All
router.get('/', async(req, res) => {
    try {
        const itemList = await Frm.find();
        res.json(itemList);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create
router.post('/', async(req, res) => {
    try {
        const { name } = req.body;
        const newItem = new Frm({
            name,
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
        const { name } = req.body;
        const updatedItem = await Frm.findByIdAndUpdate(
            id,
            { name },
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
        const deletedItem = await Frm.findByIdAndDelete(id);
        if (!deletedItem) {
            return res.status(404).json({ message: 'Data not found' });
        }
        res.json({ message: 'Data deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

export default router;
