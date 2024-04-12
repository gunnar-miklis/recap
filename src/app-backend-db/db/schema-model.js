import { Schema, model } from 'mongoose';

function capitalize(studentName) {
	if (typeof studentName !== 'string') return;
	return studentName[0].toUpperCase() + studentName.slice(1).toLowerCase();
}

function isTwoLetterCountryCode(input) {
	if (typeof input !== 'string') return;

	const twoLetterCountryCode = new RegExp(/^[a-z]{2}$/);
	return twoLetterCountryCode.test(input);
}

// mongoose.Schema( definition )
const StudentSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
			unique: true,
			set: capitalize,
		},
		age: {
			type: Number,
			min: 18,
			max: 65,
		},
		lang: [ // => defines array, (this works aswell --> lang: type: [String] )
			{
				type: String,
				lowercase: true,
				trim: true,
				validate: isTwoLetterCountryCode,
			},
		],
		enrolled: {
			type: Boolean,
			default: false,
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
