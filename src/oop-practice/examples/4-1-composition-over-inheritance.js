const canFly = {
  fly() {
    return `${this.name} flies`;
  },
};

const canSwim = {
  swim() {
    return `${this.name} swims`;
  },
};

function createDuck(name) {
  return Object.assign({ name }, canFly, canSwim);
}

function createAirplane(name) {
  return Object.assign({ name }, canFly);
}

const duck = createDuck('Duck');
const airplane = createAirplane('Plane');

console.log('--- Composition Over Inheritance ---');
console.log(duck.fly());
console.log(duck.swim());
console.log(airplane.fly());
console.log('airplane can swim:', typeof airplane.swim === 'function');
