import { num, arr } from './01-variables.js';

// NOTE: LOOPS --------------------------------------------------
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

const str = 'dark-red';
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

// NOTE: FUNCTIONS --------------------------------------------------
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

// NOTE: Promise: a value that will eventually become available
//	* a Promise is an object representing the eventual complition (resolve) or failure (reject) of an asynchronous operation
//	* code wrapped in a Promise runs outside the main thread (asynchronously)
//	* can only be settled once
const pendingPromise = new Promise((resolve, reject) =>
	true ? resolve('success') : reject('failed'),
);
const pendingPromise2 = new Promise((resolve, reject) =>
	true ? resolve('success') : reject('failed'),
);
const pendingPromise3 = new Promise((resolve, reject) =>
	false ? resolve('success') : reject('failed'),
);

// settle 1 promise
pendingPromise
	.then((result) => console.log('Promise settled, result:', result))
	.catch((e) => console.error(e));

// settle ALL promises
// COMMENT: if 1 promise reject, ALL will be rejected
//	* resolve ALL :>> 'ALL Promises settled, result: [ 'success', 'success', 'success' ]'
//	* reject 1 :>> 'Error: failed'
Promise.all([pendingPromise, pendingPromise2, pendingPromise3])
	.then((result) => console.log('ALL Promises settled, result:', result))
	.catch((e) => console.error('Error: ', e));

// settle SOME promises
// COMMENT: with async, write code as if it was synchronous
(async () => {
	const allResults = [];

	try {
		// success
		const result1 = await pendingPromise;
		allResults.push(result1);
		console.log('result :>> ', result1);

		// success
		const result2 = await pendingPromise2;
		allResults.push(result2);
		console.log('result2 :>> ', result2);

		// fail => catch() => throw error
		const result3 = await pendingPromise3;
		allResults.push(result3);
		console.log('result3 :>> ', result3);
	} catch (e) {
		console.error(e); // => result3 = failed
	}

	console.log('async/await, allResult:', allResults); // => result1 + result2 = [success, success]
})();

// NOTE: async
function randomTimer(timer) {
	if (!timer) timer = Math.floor(Math.random() * 3000 + 1000);

	return new Promise((resolve, reject) => {
		setTimeout(() => resolve(`Promise resolved after ${timer}s =>`), timer);
	});
}

async function asyncCall() {
	randomTimer()
		.then((result) => {
			console.log(result, 'asyncCall() done');
		})
		.catch((error) => console.error(error))
		.finally(() => console.log('=> asyncCall() finished'));
}
asyncCall();

(async () => {
	try {
		const result = await randomTimer(1000);
		console.log(result, 'anonymous() done');
	} catch (error) {
		console.error(error);
	}
})();

// NOTE: fetch
(async () => {
	try {
		const response = await fetch('https://api.spacexdata.com/v4/launches');
		const responseJson = await response.json();
		const { name, date_utc: date } = responseJson[0];
		console.log(name, date.slice(0,10)); // => FalconSat, 2006-03-24
	} catch (error) {
		console.error( error )
	}
})()