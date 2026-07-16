function Person(firstName, lastName) {
  // Allow Person(...) while still constructing a proper Person instance.
  if (!new.target && !(this instanceof Person)) {
    return new Person(firstName, lastName);
  }

  this.firstName = firstName;
  this.lastName = lastName;

  // This method intentionally lives here to demonstrate that functions assigned
  // inside a constructor are recreated for every instance.
  this.greet = function () {
    return `Hello, I'm ${this.firstName} ${this.lastName}!`;
  };
}

// All instances share one getName function through Person.prototype.
Person.prototype.getName = function () {
  return `${this.firstName} ${this.lastName}`;
};

console.log('--- Creating Instances ---');
const p1 = new Person('Tony', 'Stark');
const p2 = new Person('Bruce', 'Banner');
console.log(p1.getName());
console.log(p1.greet());
console.log('shared getName:', p1.getName === p2.getName);
console.log('separate greet:', p1.greet !== p2.greet);

console.log('\n--- Own vs Inherited Properties ---');
console.log('firstName is own:', Object.hasOwn(p1, 'firstName'));
console.log('greet is own:', Object.hasOwn(p1, 'greet'));
console.log('getName is own:', Object.hasOwn(p1, 'getName'));

console.log('\n--- Prototype Chain ---');
console.log('p1 instanceof Person:', p1 instanceof Person);
console.log('prototype link:', Object.getPrototypeOf(p1) === Person.prototype);
console.log('constructor link:', Person.prototype.constructor === Person);
console.log(
  'prototype inherits from Object.prototype:',
  Object.getPrototypeOf(Person.prototype) === Object.prototype,
);

console.log('\n--- What new Does ---');
// Conceptually, `new Person(...)` performs these steps:
// 1. Create an object linked to Person.prototype.
const manualPerson = Object.create(Person.prototype);
// 2. Call Person with that object as `this` to initialize its state.
Person.call(manualPerson, 'Natasha', 'Romanoff');
// 3. Return the initialized object (when the constructor returns no object).
console.log('manual construction:', manualPerson.getName());

console.log('\n--- Calling Without new ---');
const p3 = Person('Peter', 'Parker');
console.log('guard returns a Person instance:', p3 instanceof Person);
console.log(p3.getName());
