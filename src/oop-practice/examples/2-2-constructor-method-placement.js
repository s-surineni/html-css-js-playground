function Person(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;

  // Intentionally recreated for every instance.
  this.greet = function () {
    return `Hello, ${this.firstName}`;
  };
}

// Created once and shared through Person.prototype.
Person.prototype.getName = function () {
  return `${this.firstName} ${this.lastName}`;
};

const tony = new Person('Tony', 'Stark');
const bruce = new Person('Bruce', 'Banner');

console.log('--- Instance vs Prototype Methods ---');
console.log('own greet:', Object.hasOwn(tony, 'greet'));
console.log('own getName:', Object.hasOwn(tony, 'getName'));
console.log('greet shared:', tony.greet === bruce.greet);
console.log('getName shared:', tony.getName === bruce.getName);
