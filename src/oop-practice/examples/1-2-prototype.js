// Method overriding and property shadowing with plain objects.
const person = {
  firstName: 'Tony',
  lastName: 'Stark',
  getName() {
    return `${this.firstName} ${this.lastName}`;
  },
  describe() {
    return `Person: ${this.getName()}`;
  }
};

const superHero = Object.create(person);
superHero.firstName = 'Iron';
superHero.lastName = 'Man';
superHero.power = 'Suit';

// An own method shadows person.describe.
superHero.describe = function () {
  return `Superhero: ${this.getName()} (${this.power})`;
};

console.log(person.describe());
console.log(superHero.describe());
console.log('Own override:', Object.hasOwn(superHero, 'describe'));

// Removing the override reveals the inherited implementation.
delete superHero.describe;
console.log(superHero.describe());
