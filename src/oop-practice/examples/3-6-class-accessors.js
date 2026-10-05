class Rectangle {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  get area() {
    return this._width * this._height;
  }

  get perimeter() {
    return 2 * (this._width + this._height);
  }

  get width() {
    return this._width;
  }

  set width(value) {
    if (!Number.isFinite(value) || value <= 0) throw new RangeError('Invalid width');
    this._width = value;
  }

  get height() {
    return this._height;
  }

  set height(value) {
    if (!Number.isFinite(value) || value <= 0) throw new RangeError('Invalid height');
    this._height = value;
  }
}

const rectangle = new Rectangle(10, 5);
console.log('--- Class Accessors ---');
console.log('area:', rectangle.area);
console.log('perimeter:', rectangle.perimeter);
