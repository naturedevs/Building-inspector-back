import mongoose from 'mongoose';

// Define role schema
const roleSchema = new mongoose.Schema({
	name: { type: String, required: true }
});

// Create and export the Role model
const Role = mongoose.model('Role', roleSchema);

export default Role;
