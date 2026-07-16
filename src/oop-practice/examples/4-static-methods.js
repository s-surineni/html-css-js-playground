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

console.log('\n--- Static-Like Members on a Plain Object ---');
// Plain objects have no class/instance distinction. Properties and methods
// placed directly on the object provide similar namespaced utility behavior.
const temperatureUtils = {
  FACTOR: 9 / 5,

  celsiusToFahrenheit(celsius) {
    return celsius * this.FACTOR + 32;
  },
};
console.log('object property:', temperatureUtils.FACTOR);
console.log('object utility method:', temperatureUtils.celsiusToFahrenheit(25));

console.log('\n--- Static Members on a Constructor Function ---');
// Functions are objects, so public static-like members can be assigned directly
// to the constructor. A closure provides private shared state.
const LegacyTemperatureConverter = (() => {
  let nextId = 1;

  function LegacyTemperatureConverter(unit = 'Celsius') {
    this.id = nextId++;
    this.unit = unit;
  }

  LegacyTemperatureConverter.FACTOR = 9 / 5;

  LegacyTemperatureConverter.create = function (unit) {
    return new LegacyTemperatureConverter(unit);
  };

  LegacyTemperatureConverter.celsiusToFahrenheit = function (celsius) {
    return celsius * this.FACTOR + 32;
  };

  LegacyTemperatureConverter.getNextId = function () {
    return nextId;
  };

  return LegacyTemperatureConverter;
})();

const legacyConverter1 = LegacyTemperatureConverter.create('Celsius');
const legacyConverter2 = LegacyTemperatureConverter.create('Fahrenheit');
console.log('constructor static field:', LegacyTemperatureConverter.FACTOR);
console.log(
  'constructor static method:',
  LegacyTemperatureConverter.celsiusToFahrenheit(25),
);
console.log('instance IDs from private closure:', legacyConverter1.id, legacyConverter2.id);
console.log('private next ID through public method:', LegacyTemperatureConverter.getNextId());
console.log('static method on instance:', legacyConverter1.celsiusToFahrenheit);
