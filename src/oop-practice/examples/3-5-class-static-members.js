class TemperatureConverter {
  static FACTOR = 9 / 5;
  static instanceCount = 0;

  constructor(label) {
    this.label = label;
    TemperatureConverter.instanceCount++;
  }

  static create(label) {
    return new this(label);
  }

  static celsiusToFahrenheit(celsius) {
    return celsius * this.FACTOR + 32;
  }
}

const kitchenConverter = TemperatureConverter.create('Kitchen');
const labConverter = TemperatureConverter.create('Laboratory');

class CustomConverter extends TemperatureConverter {}
CustomConverter.FACTOR = 2;

console.log('--- Class Static Members ---');
console.log('conversion:', TemperatureConverter.celsiusToFahrenheit(25));
console.log('instances:', TemperatureConverter.instanceCount);
console.log('static method on instance:', kitchenConverter.celsiusToFahrenheit);
console.log('subclass conversion:', CustomConverter.celsiusToFahrenheit(10));
