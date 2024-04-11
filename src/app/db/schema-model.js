import { Schema, model } from 'mongoose';

// mongoose.Schema( definition )
const StudentSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
			unique: true
		},
		age: {
			type: Number,
			min: 18,
			max: 65,
		},
		lang: {
			type: [String],
			lowercase: true,
			trim: true,
		},
		enrolled: {
			type: Boolean,
			default: false,
		},
		updated: {
			type: Date,
			default: Date.now,
		},
	},
	{
		timestamps: true,
	},
);

// mongoose.model( name, schema )
// => creates the collection named 'Student -> students'
const StudentModel = model('Student', StudentSchema);

export default StudentModel;
