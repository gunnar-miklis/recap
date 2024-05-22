// https://www.codewars.com/kata/56069d0c4af7f633910000d3/solutions/javascript
function search(budget, prices) {
	return prices
		.filter((price) => price <= budget)
		.sort((a, b) => a - b)
		.join(',');
}
console.log(search(3, [6, 1, 2, 9, 2]));
console.log(search(14, [7, 3, 23, 9, 14, 20, 7]));

// https://www.codewars.com/kata/58279e13c983ca4a2a00002a/train/javascript
const list1 = [
	{
		firstName: 'Sofia',
		lastName: 'I.',
		country: 'Argentina',
		continent: 'Americas',
		age: 35,
		language: 'Java',
	},
	{
		firstName: 'Lukas',
		lastName: 'X.',
		country: 'Croatia',
		continent: 'Europe',
		age: 35,
		language: 'Python',
	},
	{
		firstName: 'Madison',
		lastName: 'U.',
		country: 'United States',
		continent: 'Americas',
		age: 32,
		language: 'Ruby',
	},
];
function greetDevelopers(list) {
	list.forEach(
		(developer) =>
			(developer.greeting = `Hi ${developer.firstName}, what do you like the most about ${developer.language}?`),
	);
	return list;
}
console.log(greetDevelopers(list1));

// https://www.codewars.com/kata/coding-meetup-number-3-higher-order-functions-series-is-ruby-coming
const list2 = [
	{
		firstName: 'Sofia',
		lastName: 'I.',
		country: 'Argentina',
		continent: 'Americas',
		age: 35,
		language: 'Java',
	},
	{
		firstName: 'Lukas',
		lastName: 'X.',
		country: 'Croatia',
		continent: 'Europe',
		age: 35,
		language: 'Python',
	},
	{
		firstName: 'Madison',
		lastName: 'U.',
		country: 'United States',
		continent: 'Americas',
		age: 32,
		language: 'Ruby',
	},
];
const list3 = [
	{
		firstName: 'Sofia',
		lastName: 'I.',
		country: 'Argentina',
		continent: 'Americas',
		age: 35,
		language: 'Java',
	},
	{
		firstName: 'Lukas',
		lastName: 'X.',
		country: 'Croatia',
		continent: 'Europe',
		age: 35,
		language: 'Python',
	},
];
function isRubyComing(list) {
	return list.some((developer) => developer.language === 'Ruby');
}
console.log(isRubyComing(list2));
console.log(isRubyComing(list3));

// https://www.codewars.com/kata/coding-meetup-number-4-higher-order-functions-series-find-the-first-python-developer
const list4 = [
	{
		firstName: 'Mark',
		lastName: 'G.',
		country: 'Scotland',
		continent: 'Europe',
		age: 22,
		language: 'JavaScript',
	},
	{
		firstName: 'Victoria',
		lastName: 'T.',
		country: 'Puerto Rico',
		continent: 'Americas',
		age: 30,
		language: 'Python',
	},
	{
		firstName: 'Emma',
		lastName: 'B.',
		country: 'Norway',
		continent: 'Europe',
		age: 19,
		language: 'Clojure',
	},
];
function getFirstPython(list) {
	const foundDev = list.find((developer) => developer.language === 'Python');
	return foundDev
		? `${foundDev.firstName}, ${foundDev.country}`
		: 'There will be no Python developers';
}
console.log(getFirstPython(list4));

// https://www.codewars.com/kata/coding-meetup-number-6-higher-order-functions-series-can-they-code-in-the-same-language
const list5 = [
	{
		firstName: 'Daniel',
		lastName: 'J.',
		country: 'Aruba',
		continent: 'Americas',
		age: 42,
		language: 'JavaScript',
	},
	{
		firstName: 'Kseniya',
		lastName: 'T.',
		country: 'Belarus',
		continent: 'Europe',
		age: 22,
		language: 'JavaScript',
	},
	{
		firstName: 'Hanna',
		lastName: 'L.',
		country: 'Hungary',
		continent: 'Europe',
		age: 65,
		language: 'JavaScript',
	},
];
function isSameLanguage(list) {
	return list.every((developer) => developer.language === list[0].language);
}
console.log(isSameLanguage(list5));

// https://www.codewars.com/kata/coding-meetup-number-12-higher-order-functions-series-find-github-admins
const list6 = [
	{
		firstName: 'Harry',
		lastName: 'K.',
		country: 'Brazil',
		continent: 'Americas',
		age: 22,
		language: 'JavaScript',
		githubAdmin: 'yes',
	},
	{
		firstName: 'Kseniya',
		lastName: 'T.',
		country: 'Belarus',
		continent: 'Europe',
		age: 49,
		language: 'Ruby',
		githubAdmin: 'no',
	},
	{
		firstName: 'Jing',
		lastName: 'X.',
		country: 'China',
		continent: 'Asia',
		age: 34,
		language: 'JavaScript',
		githubAdmin: 'yes',
	},
	{
		firstName: 'Piotr',
		lastName: 'B.',
		country: 'Poland',
		continent: 'Europe',
		age: 128,
		language: 'JavaScript',
		githubAdmin: 'no',
	},
];
function findAdmin(list, obj) {
	return list.filter(
		(developer) =>
			developer.language === obj && developer.githubAdmin === 'yes',
	);
}
console.log(findAdmin(list6, 'JavaScript'));

// https://www.codewars.com/kata/582746fa14b3892727000c4f/train/javascript
const list7 = [
	{
		firstName: 'Noah',
		lastName: 'M.',
		country: 'Switzerland',
		continent: 'Europe',
		age: 19,
		language: 'JavaScript',
	},
	{
		firstName: 'Maia',
		lastName: 'S.',
		country: 'Tahiti',
		continent: 'Oceania',
		age: 28,
		language: 'JavaScript',
	},
	{
		firstName: 'Shufen',
		lastName: 'L.',
		country: 'Taiwan',
		continent: 'Asia',
		age: 35,
		language: 'HTML',
	},
	{
		firstName: 'Sumayah',
		lastName: 'M.',
		country: 'Tajikistan',
		continent: 'Asia',
		age: 30,
		language: 'CSS',
	},
];
function countDevelopers(list) {
	return list.reduce((count, developer) => {
		if (
			developer.continent === 'Europe' &&
			developer.language === 'JavaScript'
		)
			count++;
		return count;
	}, 0);
}
function countDevelopers2(list) {
	return list.reduce(
		(count, developer) =>
			developer.continent === 'Europe' &&
			developer.language === 'JavaScript'
				? count + 1 // COMMENT: care with count++,  "this incrementation doesn't affect the current iteration; it takes effect after the expression is evaluated.""
				: count,
		0,
	);
}
function countDevelopers3(list) {
	return list.filter(
		(developer) =>
			developer.continent === 'Europe' &&
			developer.language === 'JavaScript',
	).length;
}
console.log(countDevelopers(list7));
console.log(countDevelopers2(list7));
console.log(countDevelopers3(list7));

// https://www.codewars.com/kata/coding-meetup-number-5-higher-order-functions-series-prepare-the-count-of-languages
const list8 = [
	{
		firstName: 'Noah',
		lastName: 'M.',
		country: 'Switzerland',
		continent: 'Europe',
		age: 19,
		language: 'C',
	},
	{
		firstName: 'Anna',
		lastName: 'R.',
		country: 'Liechtenstein',
		continent: 'Europe',
		age: 52,
		language: 'JavaScript',
	},
	{
		firstName: 'Ramon',
		lastName: 'R.',
		country: 'Paraguay',
		continent: 'Americas',
		age: 29,
		language: 'Ruby',
	},
	{
		firstName: 'George',
		lastName: 'B.',
		country: 'England',
		continent: 'Europe',
		age: 81,
		language: 'C',
	},
];
function countLanguages(list) {
	return list.reduce((obj, developer) => {
		const lang = developer.language;
		obj[lang] = obj[lang] ? obj[lang] + 1 : 1;
		return obj; // COMMENT: obj gets mutated on each iteration
	}, {});
}
function countLanguages3(list) {
	return list.reduce((obj, developer) => {
		const lang = developer.language;
		obj[lang] = (obj[lang] || 0) + 1;
		return obj;
	}, {});
}
// COMMENT: When to not use .reduce()
//	* Note that reduce() is always equivalent to a for...of loop, except that instead of mutating a variable in the upper scope, we now return the new value for each iteration.
//	* If your accumulator is an array or an object and you are copying the array or object on each iteration, you may accidentally introduce quadratic complexity into your code, causing performance to quickly degrade on large data.
//	* If [obj] gets mutated [on each iteration] anyway, you may want to convert the reduce() to a simple for loop instead, which is much clearer.
//	* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce#when_to_not_use_reduce
function countLanguages2(list) {
	const obj = {};
	list.forEach((developer) => {
		const lang = developer.language;
		obj[lang] = obj[lang] ? obj[lang] + 1 : 1;
	});
	return obj;
}
function countLanguages4(list) {
	const obj = {};
	for (const developer of list) {
		const lang = developer.language;
		const currCount = obj[lang] ?? 0;
		obj[lang] = currCount + 1;
	}
	return obj; // COMMENT: clearer syntax + better performance
}
console.log(countLanguages(list8));
console.log(countLanguages2(list8));
console.log(countLanguages3(list8));
console.log(countLanguages4(list8));

// https://www.codewars.com/kata/582ba36cc1901399a70005fc/train/javascript
const list9 = [
	{
		firstName: 'Maria',
		lastName: 'Y.',
		country: 'Cyprus',
		continent: 'Europe',
		age: 30,
		language: 'Java',
	},
	{
		firstName: 'Victoria',
		lastName: 'T.',
		country: 'Puerto Rico',
		continent: 'Americas',
		age: 70,
		language: 'Python',
	},
];
function getAverageAge(list) {
	return Math.round(
		list.reduce((sum, developer) => sum + developer.age, 0) / list.length,
	);
}
console.log(getAverageAge(list9));

// https://www.codewars.com/kata/583952fbc23341c7180002fd/train/javascript
const list10 = [
	{
		firstName: 'Noah',
		lastName: 'M.',
		country: 'Switzerland',
		continent: 'Europe',
		age: 19,
		language: 'C',
		meal: 'vegetarian',
	},
	{
		firstName: 'Anna',
		lastName: 'R.',
		country: 'Liechtenstein',
		continent: 'Europe',
		age: 52,
		language: 'JavaScript',
		meal: 'standard',
	},
	{
		firstName: 'Ramona',
		lastName: 'R.',
		country: 'Paraguay',
		continent: 'Americas',
		age: 29,
		language: 'Ruby',
		meal: 'vegan',
	},
	{
		firstName: 'George',
		lastName: 'B.',
		country: 'England',
		continent: 'Europe',
		age: 81,
		language: 'C',
		meal: 'vegetarian',
	},
];
function orderFood(list) {
	const options = {};
	for (const { meal } of list) {
		if (!options[meal]) options[meal] = 1;
		else options[meal] += 1;
	}
	return options;
}
console.log(orderFood(list10));
function orderFood2(list) {
	return list.reduce((options, { meal }) => {
		options[meal] = !options[meal] ? 1 : options[meal] + 1;
		return options;
	}, {});
}
console.log(orderFood2(list10));
