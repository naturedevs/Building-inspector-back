import mongoose from 'mongoose';

// Define form schema
const formSchema = new mongoose.Schema({
	name: { type: String, required: true }
});

// Create and export the Frm model
const Frm = mongoose.model('Frm', formSchema);

export default Frm;
