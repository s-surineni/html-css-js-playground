expect(rectangle.area, 50, 'area is computed by a getter');
expect(rectangle.perimeter, 30, 'perimeter is computed by a getter');
rectangle.width = 20;
expect(rectangle.area, 100, 'setter updates validated state');
let invalidWidthThrows = false;
try { rectangle.width = -4; } catch (error) { invalidWidthThrows = error instanceof RangeError; }
expect(invalidWidthThrows, true, 'setter rejects invalid state');
expect(rectangle.width, 20, 'failed update leaves state unchanged');
