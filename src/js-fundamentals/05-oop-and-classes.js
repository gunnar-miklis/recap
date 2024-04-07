// NOTE: OOP --------------------------------------------------
// structure code by classes and objects.
// using methods to perform actions.
// allows: controlling data and access

// NOTE: new + constructor
// unique class method for declaring and initializing an object
// NEW, exectues the constructor method

// NOTE: inheritance
// OOP feature that allows code reusability in a class of another class
// keyword: extends

// NOTE: polymorphism
// change the function of an inherent method (overwrite)

// NOTE: abstraction
// hiding implementation details
// just showing what's necessary to the outside, and hiding the rest

// NOTE: encapsulation
// helps in hiding (abstracting) data
// protects internal data from outside interference
// - use of public / private properties ("privacy encapsulation")
// - use of methods (getter/setter) to access data (restrict direct access/only through methods)

// NOTE: classes
class Rectangle {
	constructor(width, height, color) {
		this.width = width;
		this.height = height;
		this.color = color;
	}

	getDimensions() {
		return `w:${this.width}, h:${this.height}`;
	}
	setDimensions(w, h) {
		this.width = w;
		this.height = h;
	}

	getColor() {
		return this.color;
	}
	setColor(c) {
		this.color = c;
	}

	// COMMENT: abstraction (abstract method, calculation is "hidden" for the user)
	calculateArea() {
		return this.width * this.height;
	}
}

const rectangle1 = new Rectangle(10, 20, 'red');
console.log(rectangle1.getColor()); // red
console.log(rectangle1.getDimensions()); // w:10, h:20
console.log(rectangle1.calculateArea()); // 200
rectangle1.setColor('blue');
rectangle1.setDimensions(50, 30);
console.log(rectangle1.getColor()); // blue
console.log(rectangle1.getDimensions()); // w:50, h:30

const rectangle2 = new Rectangle(15, 15, 'green');
console.log(rectangle2.getColor()); // green
console.log(rectangle2.getDimensions()); // w:15, h:15

// COMMENT: inheritance
// COMMENT: abstraction (Rectangle is the abstract class while Square represents a define class)
class Square extends Rectangle {
	constructor(side, color) {
		super(side, side, color);
		this.width = side;
		this.height = side;
	}
}

const sqaure = new Square(7, 'purple');
console.log(sqaure.color); // purple
console.log(sqaure.getDimensions()); // w:7, h:7
console.log(sqaure.calculateArea()); // 49

class Animal {
	// COMMENT: encapsulation
	static #instanceCounter = 1;
	#count = Animal.#instanceCounter++;

	#name;

	constructor(name) {
		this.#name = name;
	}

	get name() {
		return this.#name;
	}
	set name(n) {
		this.#name = n;
	}

	get instanceCount() {
		return this.#count;
	}
}
class Dog extends Animal {
	constructor(name, color) {
		super(name);
		this._color = color;
	}
	get color() {
		return this._color;
	}
	set color(c) {
		this._color = c;
	}
}
class Cat extends Dog {
	// COMMENT: encapsulation
	#age;

	constructor(name, color, age) {
		super(name, color);
		this.#age = age;
	}

	// COMMENT: polymorphism
	get color() {
		return `The color of ${this.name} is ${this._color}.`;
	}

	get age() {
		return this.#age;
	}
	set age(a) {
		this.#age = a;
	}
}
const animal = new Animal('Horse');
console.log(animal.instanceCount); // 1
console.log(animal.name); // Horse
animal.name = 'Panda';
console.log(animal.name); // Panda
console.log(animal); // Animal {}

const dog = new Dog('Mr Dog', 'black');
console.log(dog.instanceCount); // 2
console.log(dog.name); // Mr Dog
console.log(dog.color); // black
console.log(dog); // Dog { _color: 'black' }

const cat = new Cat('Sir Tiger', 'orange', 4);
console.log(cat.instanceCount); // 3
console.log(cat.name); // Sir Tiger
console.log(cat.color); // The color of Sir Tiger is orange.
console.log(cat.age); // 4
console.log(cat); // Cat { _color: 'orange' }

// COMMENT: more encapsulation
class Account {
	#balance;

	constructor(name, balance) {
		this._name = name; // COMMENT: the underscore has no technical functionality. But it's a former "prefix convention" to indicate a private property. Used with getter/setter methods.
		this.#balance = balance; // COMMENT: the hash actually has the technical functionality to hide private properties.
	}

	get name() {
		return this._name;
	}
	set name(n) {
		this._name = n;
	}
	// get balance() {
	// 	return this.#balance;
	// }
}
const account = new Account('Bob', 1200);
console.log(account._name);
console.log(account.name);
// console.log( account.balance); // "undefined" unless there's a getter method
