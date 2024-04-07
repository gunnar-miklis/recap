// session 7
// 1
const cities = [
	'miami',
	'barcelona',
	'madrid',
	'amsterdam',
	'berlin',
	'sao paulo',
	'lisbon',
	'mexico city',
	'paris',
];

function Capitalize(word) {
	return word[0].toUpperCase() + word.slice(1);
}

const citiesCapitalized = cities.map((city) =>
	city.split(' ').length > 1
		? city
				.split(' ')
				.map((words) => Capitalize(words))
				.join(' ')
		: Capitalize(city),
);
console.log(citiesCapitalized);

// 2
const students = [
	{
		name: 'Tony Parker',
		firstProject: 80,
		secondProject: 75,
		finalExam: 90,
	},
	{
		name: 'Marc Barchini',
		firstProject: 84,
		secondProject: 65,
		finalExam: 65,
	},
	{
		name: 'Claudia Lopez',
		firstProject: 45,
		secondProject: 95,
		finalExam: 99,
	},
	{
		name: 'Alvaro Briattore',
		firstProject: 82,
		secondProject: 92,
		finalExam: 70,
	},
	{
		name: 'Isabel Ortega',
		firstProject: 90,
		secondProject: 32,
		finalExam: 85,
	},
	{
		name: 'Francisco Martinez',
		firstProject: 90,
		secondProject: 55,
		finalExam: 78,
	},
	{
		name: 'Jorge Carrillo',
		firstProject: 83,
		secondProject: 77,
		finalExam: 90,
	},
	{
		name: 'Miguel López',
		firstProject: 80,
		secondProject: 75,
		finalExam: 75,
	},
	{
		name: 'Carolina Perez',
		firstProject: 85,
		secondProject: 72,
		finalExam: 67,
	},
	{
		name: 'Ruben Pardo',
		firstProject: 89,
		secondProject: 72,
		finalExam: 65,
	},
];

const finalGrades = students.map((student) => {
	const projects = 0.4 * ((student.firstProject + student.secondProject) / 2);
	const finalExam = 0.6 * student.finalExam;
	return {
		name: student.name,
		finalGrade: Math.round(projects + finalExam),
	};
});
console.log(finalGrades);

// 3
const product = {
	name: 'AmazonBasics Apple Certified Lightning to USB Cable',
	price: 7.99,
	manufacturer: 'Amazon',
	reviews: [
		{
			user: 'Pavel Nedved',
			comments: 'It was really useful, strongly recommended',
			rate: 4,
		},
		{ user: 'Alvaro Trezeguet', comments: 'It lasted 2 days', rate: 1 },
		{ user: 'David Recoba', comments: 'Awesome', rate: 5 },
		{ user: 'Jose Romero', comments: 'Good value for money', rate: 4 },
		{ user: 'Antonio Cano', comments: 'It broked really fast', rate: 2 },
	],
};
const averageRating =
	product.reviews.reduce(
		(avgRate, { rate: userRate }) => avgRate + userRate,
		0,
	) / product.reviews.length;
console.log(averageRating);

// 4
const places = [
	{
		title: "Awesome Suite 20' away from la Rambla",
		price: 200,
		type: 'Private Room',
		pool: true,
		garage: false,
	},
	{
		title: 'Private apartment',
		price: 190,
		type: 'Entire Place',
		pool: true,
		garage: true,
	},
	{
		title: 'Apartment with awesome views',
		price: 400,
		type: 'Entire Place',
		pool: false,
		garage: false,
	},
	{
		title: 'Apartment in la Rambla',
		price: 150,
		type: 'Private Room',
		pool: false,
		garage: true,
	},
	{
		title: 'Comfortable place in Barcelona´s center',
		price: 390,
		type: 'Entire place',
		pool: true,
		garage: true,
	},
	{
		title: 'Room near Sagrada Familia',
		price: 170,
		type: 'Private Room',
		pool: false,
		garage: false,
	},
	{
		title: 'Great house next to Camp Nou',
		price: 140,
		type: 'Entire place',
		pool: true,
		garage: true,
	},
	{
		title: 'New apartment with 2 beds',
		price: 2000,
		type: 'Entire place',
		pool: false,
		garage: true,
	},
	{
		title: 'Awesome Suite',
		price: 230,
		type: 'Private Room',
		pool: false,
		garage: false,
	},
	{
		title: "Apartment 10' from la Rambla",
		price: 930,
		type: 'Entire place',
		pool: true,
		garage: true,
	},
];
const placesWithPool = places.filter((place) => place.pool);
const placesWithPoolNamesOnly = placesWithPool.flatMap((place) => place.title);
console.log(placesWithPoolNamesOnly);

// 5
const numbers = [
	1, 60, 112, 123, 32, 100, 99, 73, 45, 23, 99, 68, 1, 0, 9, 223, 1, 1,
];
const oddAndGreaterFifty = numbers.filter(
	(number) => number % 2 !== 0 && number > 50,
);
console.log(oddAndGreaterFifty);

// 6
const countOccurrence = {};
numbers.forEach((number) => {
	// COMMENT: if 'left-side' is null/undefined ?? return value XYZ (0) on 'right-side'
	countOccurrence[number] = countOccurrence[number] ?? 0;
	countOccurrence[number]++;
});
console.log(countOccurrence);
// COMMENT: Object.fromEntries(): creates new object from key-value-pair array: [['first',1],['second',2],['third',3]] => {'first':1,'second':2,'third':3}
// COMMENT: Object.entries(): return an object as key-value-pair array: {'first':1,'second':2,'third':3} => [['first',1],['second',2],['third',3]]
// COMMENT: deconstruct key-value-pair
const countOccurenceFiltered = Object.fromEntries(
	Object.entries(countOccurrence).filter(([key, value]) => value > 1), // equal to: Object.entries(countOccurrence).filter((entry) => entry[1] > 1),
);
console.log(countOccurenceFiltered); // => { 1: 4, 99: 2 }

// 7
const authors = [
	{ name: 'Anna', books: ['Harry Potter'] },
	{ name: 'Bob', books: [] },
	{
		name: 'Alice',
		books: ['The Lord of the Rings', 'The Shining', 'Romeo and Juliet'],
	},
];
const allBooks = authors.flatMap((person) => person.books);
allBooks;
