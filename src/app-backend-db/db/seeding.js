import mongoose from 'mongoose';
import { StudentModel, CampusModel } from './schema-model.js';

// TESTING: fack data, and some edge cases
//	* can use "Thunder Client" Extension to mock GET/POST/PUT/DELETE requests
const students = [
	{
		name: 'bob', // => capitalize
		age: 27,
		lang: ['en', 'de'],
		campus: '661ea0adcc1a52a1fe82868b',
	},
	{
		name: 'mara',
		age: 29,
		lang: ['en', 'de', 'pt'],
		enrolled: false,
		campus: '661ea0adcc1a52a1fe82868b',
	},
	{
		name: 'HARU', // => capitalize
		age: 26,
		lang: ['en', 'jp'],
		enrolled: true,
		campus: '661ea0adcc1a52a1fe82868b',
	},
	{
		name: 'Ahmed',
		age: 28,
		lang: ['  EN      '], // => trim + lowercase + validate: isTwoLetterCountryCode
		enrolled: true,
		campus: '661ea0adcc1a52a1fe82868c',
	},
];

const campuses = [
	{
		city: 'BERLIN',
		students: [],
	},
	{
		city: 'LISBON',
		students: [],
	},
	{
		city: 'PARIS',
		students: [],
	},
];

(async () => {
	try {
		await mongoose.connect('mongodb://127.0.0.1/refresh-dev');
		const createdCampuses = await CampusModel.insertMany(campuses);
		const createdStudents = await StudentModel.insertMany(students);
		console.log(
			`${createdStudents.length} students and ${createdCampuses.length} campuses added!`,
		);
	} catch (err) {
		console.error(err);
	} finally {
		mongoose.connection.close();
	}
})();
