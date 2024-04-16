// TESTING: fack data, and some edge cases
//	* can use "Thunder Client" Extension to mock GET/POST/PUT/DELETE requests
const students = [
	{
		name: 'bob', // => first letter will be capitalized
		age: 27,
		lang: ['en', 'de'],
	},
	{
		name: 'mara',
		age: 29,
		lang: ['en', 'de', 'pt'],
		enrolled: false,
	},
	{
		name: 'HARU', // => will be capitalized
		age: 26,
		lang: ['en', 'jp'],
		enrolled: true,
	},
	{
		name: 'Ahmed',
		age: 28,
		lang: ['  EN      '], // => will be trimmed and lowercased and validated
		enrolled: true,
	},
];
