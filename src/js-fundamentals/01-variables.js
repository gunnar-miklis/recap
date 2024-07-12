// NOTE: VARIABLES --------------------------------------------------
let flexibleVariable = false;
flexibleVariable = true;

const constantVariable = true;

// NOTE: Scope
// represents, where variables can be used/accessed.
// global (anywhere), function (itself and their children), block (inside: {})
// why not use VAR:
//	1. can be re-declared and updated
//	2. global window pollution
//	3. using var in loops makes it also available global
// use CONST as much as possible, if needed LET.

// NOTE: Hoisting
// delcarations of variables and functions are moved to the top of their scope in JS during compilation
// only declarations are hoisted. not initialization. not assignment.
// best practice: declare all variables/functions at the top of their scope
// (arrow function are not hoisted)

// NOTE: Shadowing
// variable from a certain scope is the same as the outer scope.
// best practice: avoid shadowing, another programmer might assume a different behavior of inner/outer scope

// NOTE: TYPES --------------------------------------------------
// primitive
let num = 1;
const str = 'text';
const bool = true;
const undef = undefined; // represents no initialization yet, will be assigned/initialized later.
const zero = null; // indicates intentional empty variable/array, absence of a value.
console.log(typeof num); // number
console.log(typeof str); // string
console.log(typeof bool); // boolean
console.log(typeof undef); // undefined
console.log(typeof zero); // object

// COMMENT: primitives passed (copied) by value, they are "independent", each have their own space in memory
let passValue = 'example';
const passValueCopy = passValue;
console.log(passValue); // => 'example'
console.log(passValueCopy); // => 'example'
console.log(passValue === passValueCopy); // => true
passValue = 'some changes'; // only this one changes
console.log(passValue); // => 'some changes'
console.log(passValueCopy); // => 'example'
console.log(passValue === passValueCopy); // => false

// non-primitive
const arr = [1, 2, 3, 4];
console.log(arr);
const obj = { first: 1, second: 2 };
console.log(obj.first);
console.log(obj.second);

// COMMENT: non-primitives passed (coppied) by reference, they are "bound", both referring to the same space in memory
const passReference = [1, 2, 3, 4];
const passReferenceCopy = passReference;
console.log(passReference); // => [1,2,3,4]
console.log(passReferenceCopy); // => [1,2,3,4]
console.log(passReference === passReferenceCopy); // => true
passReference.push(5); // "both" change
console.log(passReference); // => [1,2,3,4,5]
console.log(passReferenceCopy); // => [1,2,3,4,5]
console.log(passReference === passReferenceCopy); // => true
// COMMENT: care! values of arrays can't be compared like that
const differentArrayButSameValues = [1, 2, 3, 4];
console.log(passReference === differentArrayButSameValues); // => false

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
console.log(str.replace(str[0], 'T'));
// embeded strings
console.log(`This is a random ${str}.`);
console.log(`This is number ${num}.`);

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

export { num, arr, obj };

// NOTE: conditional/logical operators
const isUndefined = undefined; // falsy
const isEmpty = ''; // falsy, but defined
const hasValue = 'value'; // truthy

// if "null" or "undefined" ?? return right side
const result1 = isUndefined ?? 'do this';
console.log(result1); // => 'do this'
const result2 = isEmpty ?? 'this wont happen';
console.log(result2); // => ''
const result3 = hasValue ?? 'this wont happen';
console.log(result3); // => 'value'

// if truthy && return right side
const result4 = isUndefined && 'this wont happen';
console.log(result4); // => undefined
const result5 = isEmpty && 'this wont happen';
console.log(result5); // => ''
const result6 = hasValue && 'do this';
console.log(result6); // => 'do this'

// if falsy (0, '', false, NaN, null, undefined) || return right side
const result7 = isUndefined || 'do this';
console.log(result7); // => 'do this'
const result8 = isEmpty || 'do this';
console.log(result8); // => 'do this'
const result9 = hasValue || 'this wont happen';
console.log(result9); // => 'value'

// ternary
console.log(isUndefined ? 'this wont happen' : 'do this'); // => 'do this'
console.log(isEmpty ? 'this wont happen' : 'do this'); // => 'do this'
console.log(hasValue ? 'do this' : 'this wont happen'); // => 'do this'
