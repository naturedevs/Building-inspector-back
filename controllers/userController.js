
import express from 'express'
import User from '../models/userModel.js';

const router = express.Router();

router.get('/list', async (req, res) => {
    try {
        const userList = await User.find();
        res.json(userList);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get("/", function (req, res) {
    res.send("This is User Controller");
});

export default router;
