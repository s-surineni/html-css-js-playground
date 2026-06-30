const r = new Rectangle(10, 5);
expect(r.area, 50, 'area = width × height');
expect(r.perimeter, 30, 'perimeter = 2 × (w + h)');
r.width = 20;
expect(r.area, 100, 'area updates after a valid width setter');
r.width = -4;
expect(r.width, 20, 'setter rejects non-positive width');
