class TemperatureConverter {
  // Static fields belong to the class, not to individual instances.
  // Uppercase is only a naming convention; this public field is still mutable.
  static FACTOR = 9 / 5;
  static instanceCount = 0;
  static #nextId = 1;

  // Instance fields belong to each object created from the class.
  unit = 'Celsius';

  constructor(label) {
    this.id = TemperatureConverter.#nextId++;
    this.label = label;
    TemperatureConverter.instanceCount++;
  }

  // Validation and factory methods are common static utilities.
  static isValidTemperature(value) {
    return typeof value === 'number' && Number.isFinite(value);
  }

  static create(label) {
    return new this(label);
  }

  static celsiusToFahrenheit(celsius) {
    if (!this.isValidTemperature(celsius)) {
      throw new TypeError('Temperature must be a finite number');
    }
    return celsius * this.FACTOR + 32;
  }

  static fahrenheitToCelsius(fahrenheit) {
    if (!this.isValidTemperature(fahrenheit)) {
      throw new TypeError('Temperature must be a finite number');
    }
    return (fahrenheit - 32) / this.FACTOR;
  }
}

console.log('--- Calling Static Methods on the Class ---');
console.log('25°C in Fahrenheit:', TemperatureConverter.celsiusToFahrenheit(25));
console.log('77°F in Celsius:', TemperatureConverter.fahrenheitToCelsius(77));

console.log('\n--- Static Factory and Shared State ---');
const converter1 = TemperatureConverter.create('Kitchen');
const converter2 = TemperatureConverter.create('Laboratory');
console.log('instances created:', TemperatureConverter.instanceCount);
console.log('private counter generated IDs:', converter1.id, converter2.id);

console.log('\n--- Static vs Instance Fields ---');
console.log('class FACTOR:', TemperatureConverter.FACTOR);
console.log('instance unit:', converter1.unit);
console.log('instance FACTOR:', converter1.FACTOR);
console.log('instance static method:', converter1.celsiusToFahrenheit);

console.log('\n--- Static Validation ---');
console.log('25 is valid:', TemperatureConverter.isValidTemperature(25));
console.log('NaN is valid:', TemperatureConverter.isValidTemperature(NaN));

console.log('\n--- Public Static Fields Are Mutable ---');
const originalFactor = TemperatureConverter.FACTOR;
TemperatureConverter.FACTOR = 2;
console.log('changed FACTOR:', TemperatureConverter.FACTOR);
TemperatureConverter.FACTOR = originalFactor;
console.log('restored FACTOR:', TemperatureConverter.FACTOR);

console.log('\n--- Static Members and Inheritance ---');
class CustomConverter extends TemperatureConverter {}
CustomConverter.FACTOR = 2;
console.log('custom conversion:', CustomConverter.celsiusToFahrenheit(10));
console.log('base FACTOR is unchanged:', TemperatureConverter.FACTOR);
