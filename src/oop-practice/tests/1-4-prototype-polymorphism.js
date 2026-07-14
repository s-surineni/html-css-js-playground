expect(Animal.isPrototypeOf(dog), true, 'dog delegates to Animal');
expect(dog.describe(), 'This animal says: Woof! Woof!', 'shared method dispatches to override');
expect(circle.getArea().toFixed(2), '78.54', 'circle supplies its area implementation');
expect(rectangle.getArea(), 24, 'rectangle supplies its area implementation');
expect(totalArea.toFixed(2), '114.54', 'mixed shapes can be processed uniformly');
