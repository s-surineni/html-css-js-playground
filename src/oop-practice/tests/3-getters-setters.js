const r = new Rectangle(10, 5);
expect(r.area, 50, 'area = width × height');
expect(r.perimeter, 30, 'perimeter = 2 × (w + h)');
r.width = 20;
expect(r.area, 100, 'area updates after a valid width setter');
let invalidWidthThrows = false;
try { r.width = -4; } catch (error) { invalidWidthThrows = error instanceof RangeError; }
expect(invalidWidthThrows, true, 'setter rejects non-positive width');
expect(r.width, 20, 'failed update leaves width unchanged');
r.height = 10;
expect(r.area, 200, 'height setter updates area');
let invalidConstructorThrows = false;
try { new Rectangle(0, 5); } catch (error) { invalidConstructorThrows = error instanceof RangeError; }
expect(invalidConstructorThrows, true, 'constructor uses the same validation');
