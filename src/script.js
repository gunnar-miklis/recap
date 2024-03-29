// session 1

// NOTE: VARIABLES
let flexibleVariable = false;
flexibleVariable = true;

const constantVariable = true;

// NOTE: TYPES
// primitive
let num = 1;
let str = 'text';
const bool = true;
const undef = undefined; // represents no initialization yet, will be assigned/initialized later.
const zero = null; // indicates intentional empty variable/array, absence of a value.
console.log(typeof num); // number
console.log(typeof str); // string
console.log(typeof bool); // boolean
console.log(typeof undef); // undefined
console.log(typeof zero); // object

// non-primitive
const obj = { first: 1, second: 2 };
obj.first;
obj.second;

const arr = [1, 2, 3, 4];
arr;

// embeded strings
console.log(`This is a random ${str}.`);
console.log(`This is number ${num}.`);
console.log(`This is object property: ${obj.second}.`);

// NOTE: expressions
num += 10;
console.log(num); // 11
num -= 6;
console.log(num); // 5
num *= 10;
console.log(num); // 50
num /= 10;
console.log(num); // 5
num **= 2;
console.log(num); // 25

// NOTE: methods
// number methods
num = 3.141;
console.log(Math.floor(num)); // 3
console.log(Math.ceil(num)); // 4
console.log(num.toFixed(1)); // 3.1 (string)
console.log(+num.toFixed(1)); // 3.1 (number)
console.log(Number(num.toFixed(1))); // 3.1 (number)
console.log(Math.floor(Math.random() * 10) + 1); // 1-10
console.log(Math.floor(Math.random() * 100) + 1); // 1-100

// string methods
console.log(str.length); // 4
console.log(str.indexOf('x')); // 2
console.log(str[2]); // x
console.log(str.charAt(2)); // 'x'
console.log(str.substring(1, 3)); // ex
console.log(str.indexOf('t')); // 0
console.log(str.lastIndexOf('t')); // 3
console.log(str.slice(0, 2)); // te
console.log(str.includes('x')); // true
console.log(str.split('')); // [t,e,x,t]
console.log(str.split('ex')); // [t,t]

// NOTE: operators
num = 5;
console.log(num === 5); // true
console.log(num === 1); // false
console.log(num !== 1); // true
console.log(num <= 5); // true
console.log(num < 5); // false
console.log(num > 5); // false
console.log(num > 1); // true
console.log(num >= 1); // true
console.log(num === 5 && num > 1); // true
console.log(num === 5 && num < 1); // false
console.log(num === 5 || num < 1); // true
console.log(typeof num === 'number' && num === 5); // true
console.log(typeof num === 'string'); // false
console.log(typeof num !== 'string'); // true

// NOTE: LOOPS
if (num > 10) {
	console.log(true); // false
} else if (num === 10) {
	console.log(true); // false
} else {
	console.log(true); // true
}

for (let i = 1; i <= 10; i++) {
	console.log(i); // 1,2,3,...10
}
for (let i = 1; i <= 10; i++) {
	console.log(i); // 1,2,3,4,5
	if (i === 5) break;
}
for (let i = 1; i <= 6; i++) {
	if (i === 2 || i === 3 || i === 4) continue;
	console.log(i); // 1,5,6
}
for (const entry of arr) {
	console.log('Array-Entry: ' + entry); // 'Array-Entry: 1, Array-Entry: 2, ...'
}

str = 'dark-red';
switch (str) {
	case 'blue':
		console.log(true);
		break;
	case 'white':
		console.log(true);
		break;
	case 'red':
	case 'light-red':
	case 'dark-red':
		console.log(true); // true
		break;
	default:
		console.log('None');
}

// NOTE: functions
function myfunction() {
	return true;
}
console.log(myfunction()); // true

function lowerCase(str) {
	return str.toLowerCase();
}
console.log(lowerCase('HELLO WORLD'));

function strMethods(str) {
	return {
		lowerCase: str.toLowerCase(),
		upperCase: str.toUpperCase(),
		length: str.length,
	};
}
console.log(strMethods('fooBAR').length);
console.log(strMethods('fooBAR').lowerCase);
console.log(strMethods('fooBAR').upperCase);

function isOddOrEven(num) {
	return num % 2 === 0 ? 'even' : 'odd';
}
console.log(isOddOrEven(3));
console.log(isOddOrEven(4));
console.log(isOddOrEven(1));
console.log(isOddOrEven(0));

// session 2

// NOTE: arrays
const names = ['Helen', 'John', 'Peter', 'Merry'];
console.log(names[0]); // 'Helen'

names.pop(); // remove last entry: 'Helen', 'John', 'Peter'
names.push('Merry'); // add after last entry: 'Helen', 'John', 'Peter', 'Merry'
names.shift(); // remove first entry: ''John', 'Peter', 'Merry'
names.unshift('Helen'); // add before first entry: 'Helen', 'John', 'Peter', 'Merry'
names.splice(2, 1); // remove at start position (2), X (1) amount: 'Helen', 'John', 'Merry'
names.splice(2, 0, 'Peter'); // remove nothing (0), add ('Peter') after start position (2): 'Helen', 'John', 'Peter', 'Merry'
names.splice(3, 0, 'foo', 'bar'); // 'Helen', 'John', 'Peter', 'foo', 'bar', 'Merry'
names.splice(3, 2); // 'Helen', 'John', 'Peter', 'Merry'

const phrase = 'Hello World !';
const words = phrase.split(' '); // [Hello, World, !]
console.log(words[0]); // 'Hello'
console.log(words.length); // 3
const phraseAgain = words.join(' '); // 'Hello World !'

const sentences =
	"This is the first sentence. Then there's another. Here is the third. And last, number four.";
const separatedSentences = sentences.split('. ');
console.log(separatedSentences[0]);
console.log(separatedSentences[1]);
console.log(separatedSentences[2]);
console.log(separatedSentences[3]);

// iteration
for (let i = 0; i < names.length; i++) {
	console.log(names[i]);
}
for (const entry of names) {
	console.log(entry);
}
names.forEach((entry) => {
	console.log(entry);
});
names.forEach((entry, i) => {
	console.log(`${i + 1}. ${entry}`); // '1. Helen', '2. John', '3. Peter', '4. Merry'
});
names.map((entry) => {
	console.log(entry);
});

// filter
const sentencesFiltered = separatedSentences.filter((sentence) =>
	sentence.includes('is'),
);
console.log(sentencesFiltered); // ['This is the first sentence', 'Here is the third']
const countNs = sentences
	.split('')
	.filter((character) => character === 'n').length;
console.log(countNs); // 6

// operation during iteration
const sumArr = arr.reduce((sum, entry) => {
	return sum + entry;
}, 0);
console.log(sumArr); // 1+2+3+4 = 10

// pass test during iteration
const randomNumbers = [45, 4, 9, 16, 25];
function isNumberGreaterThanTen(inputNumber) {
	return inputNumber > 10;
}
let result = null;
result = randomNumbers.some((entry) => isNumberGreaterThanTen(entry));
console.log(result); // true
result = randomNumbers.every(isNumberGreaterThanTen);
console.log(result); // false
result = randomNumbers.filter((entry) => !isNumberGreaterThanTen(entry));
console.log(result); // lesser than ten: 4, 9
result = randomNumbers.filter(isNumberGreaterThanTen);
console.log(result); // greater than ten: 45, 16, 25

// spread operator
const winter = ['dec', 'jan', 'feb'];
const spring = ['mar', 'apr', 'may'];
const winterAndSpring = [winter, spring];
console.log(winterAndSpring.length); // 2
console.log(winterAndSpring); // [ ['dec', 'jan', 'feb'], ['mar', 'apr', 'may'] ]
const winterAndSpringSpreaded = [...winter, ...spring];
console.log(winterAndSpringSpreaded.length); // 6
console.log(winterAndSpringSpreaded); // ['dec', 'jan', 'feb', 'mar', 'apr', 'may']

const highestNumber = Math.max(...randomNumbers); // 45
const lowestNumber = Math.min(...randomNumbers); // 4

// session 3

// NOTE: objects
obj; // { first: 1, second: 2 }
console.log(obj.first); // 1
console.log(obj['first']); // 1

obj.third = 3; // { first: 1, second: 2, third: 3 }
obj['fourth'] = 4; // { first: 1, second: 2, third: 3, fourth: 4 }
delete obj.fourth; // { first: 1, second: 2, third: 3 }

Object.keys(obj).forEach((key) => {
	console.log(key); // 'first', 'second', 'third'
});
Object.values(obj).forEach((value) => {
	console.log(value); // 1, 2, 3
});

// NOTE: nested structures
const objInArray = [
	{ name: 'Bob', age: 17 },
	{ name: 'Sara', age: 19 },
	{ name: 'Ted', age: 22 },
	{ name: 'Mari', age: 24 },
];
console.log(objInArray[1].name); // Sara
console.log(objInArray[3].age); // 24

const arrayInObj = {
	Cities: ['Berlin', 'Paris', 'London'],
	Students: [
		{ name: 'Bob', age: 17 },
		{ name: 'Sara', age: 19 },
		{ name: 'Ted', age: 22 },
		{ name: 'Mari', age: 24 },
	],
};
console.log(arrayInObj.Students[1].name); // Sara
console.log(arrayInObj.Students[3].age); // 24
console.log(arrayInObj.Cities[0]); // Berlin

const arrayInArray = [
	['red', 'green', 'blue'],
	['sweet', 'sour', 'bitter'],
	['sunny', 'cloudy', 'rainy'],
];
console.log(arrayInArray[1][0]); // sweet

const functionInObj = {
	firstName: 'John',
	lastName: 'Doe',
	fullName: function () {
		return `${this.firstName} ${this.lastName}`;
	},
};
console.log(functionInObj.fullName()); // John Doe
const functionInObj2 = {
	firstName: 'John',
	lastName: 'Doe',
	fullName: () => `${functionInObj2.firstName} ${functionInObj2.lastName}`,
};
console.log(functionInObj2.fullName()); // John Doe

const objMethods = {
	firstName: 'John',
	lastName: 'Doe',
	age: 33,
	gender: 'male',
	money: 10,
	turnover: 0,
	displayUserInfo() {
		return `${this.firstName} ${this.lastName} is ${this.age} years old. ${
			this.gender === 'male' ? 'He' : 'She'
		} has ${this.money} money.`;
	},
	increaseMoney(amount) {
		this.money += amount;
		this.turnover += amount;
	},
	decreaseMoney(amount) {
		this.money -= amount;
		this.turnover -= amount;
	},
};
console.log(objMethods.displayUserInfo()); // 'John Doe is 33 years old. He has 10 money'
objMethods.increaseMoney(50);
objMethods.decreaseMoney(20);
console.log(objMethods.displayUserInfo()); // 'John Doe is 33 years old. He has 40 money'
console.log(objMethods.turnover); // 30

// TODO: classes


