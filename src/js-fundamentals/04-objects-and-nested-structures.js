import { obj } from './01-variables.js';

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
// (arrow functions can't use THIS)
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

// NOTE: destructuring
const person = {
	name: {
		firstName: 'Ana',
		lastName: 'Smith',
		fullName: function () {
			return `${this.firstName} ${this.lastName}`;
		},
	},
	age: 27,
	adress: {
		street: 'Long Str',
		number: 123,
		city: 'London',
	},
	profession: 'Developer',
};
const {
	name,
	age,
	adress: { street, number, city },
	profession: occupation,
} = person;
console.log(name.fullName(), age, `${street}. ${number}, ${city}`, occupation);
