const person = {
  firstName: 'Tony',
  lastName: 'Stark',

  get name() {
    return `${this.firstName} ${this.lastName}`;
  },

  set name(value) {
    if (typeof value !== 'string') return;
    const [firstName, ...lastNameParts] = value.trim().split(/\s+/);
    if (!firstName || lastNameParts.length === 0) return;
    this.firstName = firstName;
    this.lastName = lastNameParts.join(' ');
  },
};

const superHero = Object.create(person);
superHero.firstName = 'Iron';
superHero.lastName = 'Man';

console.log('--- Inherited Accessors ---');
console.log('before:', superHero.name);
superHero.name = 'Miles Gonzalo Morales';
console.log('after:', superHero.name);
console.log('prototype unchanged:', person.name);
console.log('accessor remains inherited:', Object.hasOwn(superHero, 'name'));
