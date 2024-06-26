import express from 'express';
import cors from 'cors'
import authController from './controllers/authController.js';
import userController from './controllers/userController.js';
import roleController from './controllers/roleController.js';
import frmController from './controllers/frmController.js';
import mongoose from 'mongoose';

const app = express();
app.use(express.json());
app.use(cors());
app.use('/auth', authController);
app.use('/users', userController);
app.use('/roles', roleController);
app.use('/frms', frmController);

mongoose.connect('mongodb://localhost:27017/inspect_db', {
    // useNewUrlParser: true,
    // useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

export default app;