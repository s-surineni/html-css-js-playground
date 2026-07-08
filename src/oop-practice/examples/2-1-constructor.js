function Person(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;

  this.greet = function() {
    return `Hello, I'm ${this.firstName} ${this.lastName}!`;
  }
}

Person.prototype.getName = function() {
  return `${this.firstName} ${this.lastName}`
}

const p1 = new Person('Tony', 'Stark')
console.log(p1.getName());
console.log(p1.greet());