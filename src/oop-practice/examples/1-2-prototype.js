// Prototype-based OOP on plain objects.
// demonstrates getter and setter
// polymorphism
const person = {
  firstName: 'Tony',
  lastName: 'Stark',
  getName: function () {
    return `${this.firstName} ${this.lastName}`;
  },
  get name() {
    return `${this.firstName} ${this.lastName}`;
  },

  set name(value) {
    const [firstName, lastName] = value.split(' ')
    this.firstName = firstName;
    this.lastName = lastName;
    console.log(this.name)
  }
};
console.log(person.getName());

const superHero = {
  power: 'Suit',
  getName: function () {
    return `${this.firstName} ${this.lastName} ${this.power}`
  }
};
Object.setPrototypeOf(superHero, person);
superHero.firstName = 'Iron';
superHero.lastName = 'Man';
console.log(superHero.getName());
console.log(superHero.name)
superHero.name = "Reed Richards"