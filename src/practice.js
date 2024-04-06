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
console.log( finalGrades )
