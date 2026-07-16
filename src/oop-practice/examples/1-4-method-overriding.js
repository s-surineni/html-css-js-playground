const person = {
  firstName: 'Tony',
  lastName: 'Stark',
  getName() {
    return `${this.firstName} ${this.lastName}`;
  },
  describe() {
    return `Person: ${this.getName()}`;
  },
};

const superHero = Object.create(person);
superHero.firstName = 'Iron';
superHero.lastName = 'Man';
superHero.power = 'Suit';

superHero.describe = function () {
  return `Superhero: ${this.getName()} (${this.power})`;
};

console.log('--- Method Overriding ---');
console.log(superHero.describe());
console.log('own override:', Object.hasOwn(superHero, 'describe'));

delete superHero.describe;
console.log('inherited after delete:', superHero.describe());
