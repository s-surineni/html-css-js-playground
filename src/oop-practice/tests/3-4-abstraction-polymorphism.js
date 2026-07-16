expect(new Circle(5).getArea().toFixed(2), '78.54', 'Circle implements the contract');
expect(new Square(4).getArea(), 16, 'Square implements the contract');
expect(triangle.getArea(), 12, 'plain object satisfies the same interface');
expect(totalArea(shapes).toFixed(2), '106.54', 'mixed implementations work uniformly');
let baseShapeThrows = false;
try { new Shape().getArea(); } catch (error) { baseShapeThrows = /must be implemented/.test(error.message); }
expect(baseShapeThrows, true, 'base class documents an abstract-style contract');
