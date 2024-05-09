
import express from 'express'
import User from '../models/userModel.js';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const router = express.Router();
const secretKey = 'steponcs0118';

router.post('/auth/register', async (req, res) => {
    
    const { username, email, password, confirmPassword } = req.body;
  
    try {
        // Check if user already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }
  
        // Create new user
        user = new User({
            username,
            email,
            password
        });
        // Hash password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
  
        // Save user to database
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.post("/auth/login", async (req, res) => {
    
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).end();
        return;
    }
    try{
        const user = await User.findOne({email});
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const tmp = jwt.sign({email: user.email}, secretKey);
        const token = `MY ${tmp}`;
        res.status(200).json({ token });
    }
    catch(error){
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// GET USER FROM TOKEN API
router.get('/auth/me', async (req, res) => {
    
    const defaultReturnObject = { authenticated: false, user: null };
    try {
        const token = String(req?.headers?.authorization?.replace('MY ', ''));
        jwt.verify(token, secretKey, (err, decoded) => {
            if (err) {
                console.error('Invalid token:', err.message);
                res.status(400).json(defaultReturnObject);
            } else {
                console.log('Decoded token:', decoded);
                const email = decoded.email;
                let login_user = new User({
                    email
                });
                res.status(200).json({ authenticated: true, user: login_user });
            }
        });
    }
    catch (err) {
        console.log('POST auth/me, Something Went Wrong', err);
        res.status(400).json(defaultReturnObject);
    }

});

router.get("/", function (req, res) {
    res.send("Here is Auth Controller");
});

export default router;
