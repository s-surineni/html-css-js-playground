function Person(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
}

console.log('--- Constructor Basics ---');
const tony = new Person('Tony', 'Stark');
const bruce = new Person('Bruce', 'Banner');
console.log(tony.firstName, tony.lastName);
console.log('instanceof Person:', tony instanceof Person);
console.log('prototype link:', Object.getPrototypeOf(tony) === Person.prototype);
console.log('constructor link:', tony.constructor === Person);
