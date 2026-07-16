class Shape {
  getArea() {
    throw new Error('getArea() must be implemented');
  }
}

class Circle extends Shape {
  constructor(radius) {
    super();
    this.radius = radius;
  }

  getArea() {
    return Math.PI * this.radius ** 2;
  }
}

class Square extends Shape {
  constructor(side) {
    super();
    this.side = side;
  }

  getArea() {
    return this.side ** 2;
  }
}

// JavaScript also supports duck typing: any object with getArea() fits.
const triangle = {
  base: 8,
  height: 3,
  getArea() {
    return this.base * this.height / 2;
  },
};

function totalArea(shapes) {
  return shapes.reduce((total, shape) => total + shape.getArea(), 0);
}

const shapes = [new Circle(5), new Square(4), triangle];
console.log('--- Abstraction, Duck Typing, and Polymorphism ---');
console.log('total area:', totalArea(shapes).toFixed(2));
