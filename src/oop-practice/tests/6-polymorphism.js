expect(new Circle(5).getArea().toFixed(2), '78.54', 'Circle area = π·r²');
expect(new Square(4).getArea(), 16, 'Square area = s²');
expect(new Shape().getArea(), 0, 'base Shape returns 0');
const total = [new Circle(5), new Square(4)].reduce((sum, s) => sum + s.getArea(), 0);
expect(total.toFixed(2), '94.54', 'polymorphic sum over a mixed array');
