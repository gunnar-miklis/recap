import { arr } from './01-variables.js';

// NOTE: DATA STRUCTURES --------------------------------------------------
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

// NOTE: iteration
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
const namesInChar = names.map((name) => {
	return name.split('');
});
console.log(namesInChar);
const chars = namesInChar.flat();
console.log(chars);

// NOTE: sorting
// COMMENT: care! array mutation, mutable methods
//	* .push()
//	* .pop()
//	* .shift()
//	* .unshift()
//	* .splice()
//	* .reverse()
//	* .sort()
//	* [...spread]
// COMMENT: copy array
//	* shallow copy: [...array]
//	* shallow copy: array.slice()
//	* shallow copy: [].concat(array)
//	* shallow copy: for loop
//	* shallow copy: Array.from()
//	* shallow copy: Object.assign()
//	* DEEP copy: JSON.parse(JSON.stringify( array ))

// COMMENT: care! .sort() is ordering according to "string unicode code points" by default, needs a comparing function to work properly (a,b)=>a-b
const numbers = [22, 23, 99, 68, 1, 0, 9, 112, 223, 64, 18];
let numbersCopy = Array.from(numbers);
const numbersSortedDefault = numbersCopy.sort();
console.log(numbersSortedDefault); // => 0, 1, 112, 18, 22, 223, 23, etc.
numbersCopy = Array.from(numbers);
const numbersSortedCorrect = numbersCopy.sort((a, b) => a - b);
console.log(numbersSortedCorrect); // => 0, 1, 9, 18, 22, 23, 64, 68, etc.
// COMMENT: care! array clone, copy reference/value/shallow/deep
let charsCopy = Array.from(chars);
const charsSorted = charsCopy.sort((a, b) => a.localeCompare(b));
console.log(charsSorted);
charsCopy = Array.from(chars);
const charsSortedDescending = charsCopy.sort((a, b) => b.localeCompare(a));
console.log(charsSortedDescending);
const charsSortedReverse = charsSorted.reverse();
console.log(charsSortedReverse);

// NOTE: filter
const sentencesFiltered = separatedSentences.filter((sentence) =>
	sentence.includes('is'),
);
console.log(sentencesFiltered); // ['This is the first sentence', 'Here is the third']
const countNs = sentences
	.split('')
	.filter((character) => character === 'n').length;
console.log(countNs); // 6

// NOTE: operation during iteration
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

// NOTE: spread operator
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

// NOTE: destructuring
const cities = [
	['barcelona', 'es'],
	['berlin', 'de'],
	['paris', 'fr'],
	['amsterdam', 'nl'],
	['lisbon', 'pt'],
	[['two'], ['dimensional'], ['data structure']],
];
const [city1] = cities;
console.log(city1); // ['barcelona', 'es']
const [, , city3] = cities;
console.log(city3); // ['paris', 'fr']
const [, [city2, language]] = cities;
console.log(city2, language); // 'berlin', 'de'
const [, , , , , nestedArray] = cities;
console.log(nestedArray); // [['two'], ['dimensional'], ['data structure']]
const [, , , , , [, [dimension], entry3]] = cities;
console.log(dimension); // 'dimension'
console.log(entry3); // [ 'data structure' ]
