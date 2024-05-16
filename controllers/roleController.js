
import express from 'express'
import Role from '../models/roleModel.js';

const router = express.Router();

// Read All
router.get('/', async(req, res) => {
    try {
        const roleList = await Role.find();
        res.json(roleList);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create Role
router.post('/', async(req, res) => {
    try {
        const { name } = req.body;
        const newRole = new Role({
            name,
        });
        const savedRole = await newRole.save();
        res.status(201).json(savedRole);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update Role
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        const updatedRole = await Role.findByIdAndUpdate(
            id,
            { name },
            { new: true, runValidators: true }
        );
        if (!updatedRole) {
            return res.status(404).json({ message: 'Role not found' });
        }
        res.json(updatedRole);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete Role
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;  
        const deletedRole = await Role.findByIdAndDelete(id);
        if (!deletedRole) {
            return res.status(404).json({ message: 'Role not found' });
        }
        res.json({ message: 'Role deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

export default router;
