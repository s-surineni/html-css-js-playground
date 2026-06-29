// Prototype-based OOP on plain objects.
const person = {
  firstName: 'Tony',
  lastName: 'Stark',
  getName: function () {
    return `${this.firstName} ${this.lastName}`;
  },
};
console.log(person.getName());

const superHero = {};
Object.setPrototypeOf(superHero, person);
superHero.firstName = 'Iron';
superHero.lastName = 'Man';
console.log(superHero.getName());
