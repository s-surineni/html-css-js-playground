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
  set width(value) {
    if (!Number.isFinite(value) || value <= 0) {
      throw new RangeError('Width must be a finite positive number');
    }
    this._width = value;
  }
  get width() {
    return this._width;
  }
  set height(value) {
    if (!Number.isFinite(value) || value <= 0) {
      throw new RangeError('Height must be a finite positive number');
    }
    this._height = value;
  }
  get height() {
    return this._height;
  }
}
