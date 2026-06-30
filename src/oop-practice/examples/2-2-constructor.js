function Person(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
}

Person.prototype.getName = function() {
  return `${this.firstName} ${this.lastName}`
}

const p1 = new Person('Tony', 'Stark')
console.log(p1.getName());