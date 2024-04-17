import { Schema, model } from 'mongoose';

// NOTE: data modeling
// structuring: embedded
//	* fewer queries will be needed to retrieve data
//	* represents one-to-one relation
//	* example...
const person = {
	_id: '_person',
	name: 'Lucy',
	age: 30,
	address: {
		street: 'Streetname',
		number: 123,
		city: 'Berlin',
	},
};
const address = {
	street: 'Streetname',
	number: 123,
	city: 'Berlin',
	residents: [
		{
			name: 'Lucy',
			age: 30,
		},
	],
};
// structuring: normalized (references)
//	* useful when there'd be duplicate data
//	* represents one-to-many or many-to-many relationships
//	* example...
const person1 = {
	_id: '_person1',
	name: 'Lucy',
	age: 30,
	address_id: '_address1',
};
const address1 = {
	_id: '_address1',
	street: 'Streetname',
	number: 123,
	city: 'Berlin',
	residents_ids: ['_person1', '_person2', '_person3'],
};
// example: "blog"
//	* 1 User can have many Posts
//	* 1 Post have 1 User (author)

// NOTE: Schema utilities
function capitalize(studentName) {
	if (typeof studentName !== 'string') return;
	return studentName[0].toUpperCase() + studentName.slice(1).toLowerCase();
}

function isTwoLetterCountryCode(input) {
	if (typeof input !== 'string') return;

	const twoLetterCountryCode = new RegExp(/^[a-z]{2}$/);
	return twoLetterCountryCode.test(input);
}

// NOTE: mongoose.Schema( definition )
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
		lang: [
			// => defines array, (this works aswell --> lang: type: [String] )
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
		campus: {
			type: Schema.Types.ObjectId,
			ref: 'Campus',
		},
	},
	{
		timestamps: true,
	},
);

const CampusSchema = new Schema({
	city: {
		type: String,
		uppercase: true,
		required: true,
		unique: true,
	},
	students: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Student',
		},
	],
});

// NOTE: mongoose.model( name, schema )
// => creates the collection named 'Student -> students'
const StudentModel = model('Student', StudentSchema);
const CampusModel = model('Campus', CampusSchema);

export { StudentModel, CampusModel };
