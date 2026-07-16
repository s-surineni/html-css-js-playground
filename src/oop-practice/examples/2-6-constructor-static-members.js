// Functions are objects. Assigning properties directly to a constructor creates
// static-like members that belong to the constructor, not its instances.
const LegacyTemperatureConverter = (() => {
  let nextId = 1; // Private shared state from the surrounding closure.

  function LegacyTemperatureConverter(unit = 'Celsius') {
    this.id = nextId++;
    this.unit = unit;
    LegacyTemperatureConverter.instanceCount++;
  }

  LegacyTemperatureConverter.FACTOR = 9 / 5;
  LegacyTemperatureConverter.instanceCount = 0;

  LegacyTemperatureConverter.isValidTemperature = function (value) {
    return typeof value === 'number' && Number.isFinite(value);
  };

  LegacyTemperatureConverter.create = function (unit) {
    return new this(unit);
  };

  LegacyTemperatureConverter.celsiusToFahrenheit = function (celsius) {
    if (!this.isValidTemperature(celsius)) {
      throw new TypeError('Temperature must be a finite number');
    }
    return celsius * this.FACTOR + 32;
  };

  LegacyTemperatureConverter.getNextId = function () {
    return nextId;
  };

  return LegacyTemperatureConverter;
})();

console.log('--- Constructor Function Static Members ---');
const legacyConverter1 = LegacyTemperatureConverter.create('Celsius');
const legacyConverter2 = LegacyTemperatureConverter.create('Fahrenheit');
console.log('constructor field:', LegacyTemperatureConverter.FACTOR);
console.log('constructor method:', LegacyTemperatureConverter.celsiusToFahrenheit(25));
console.log('shared instance count:', LegacyTemperatureConverter.instanceCount);
console.log('instance IDs from private closure:', legacyConverter1.id, legacyConverter2.id);
console.log('private next ID through public method:', LegacyTemperatureConverter.getNextId());
console.log('constructor method on instance:', legacyConverter1.celsiusToFahrenheit);
