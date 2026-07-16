// A method receives `this` from the object used to call it.
const hero = {
  name: 'Tony Stark',
  introduce() {
    return `I am ${this.name}`;
  },
};

console.log('--- Method Receiver ---');
console.log(hero.introduce());

// A regular function can receive an explicit receiver with call/apply/bind.
const introduce = hero.introduce;
console.log('call:', introduce.call({ name: 'Bruce Banner' }));
console.log('apply:', introduce.apply({ name: 'Natasha Romanoff' }));

const boundIntroduce = introduce.bind(hero);
console.log('bind:', boundIntroduce());

// Arrow functions capture `this` from the surrounding scope instead.
function createArrowExample() {
  return {
    name: 'Inner object',
    readName: () => this.name,
  };
}

const arrowExample = createArrowExample.call({ name: 'Outer receiver' });
console.log('arrow function:', arrowExample.readName());
