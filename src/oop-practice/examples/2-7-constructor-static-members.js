function TemperatureConverter(unit = 'Celsius') {
  this.unit = unit;
  TemperatureConverter.instanceCount++;
}

TemperatureConverter.FACTOR = 9 / 5;
TemperatureConverter.instanceCount = 0;

TemperatureConverter.create = function (unit) {
  return new this(unit);
};

TemperatureConverter.celsiusToFahrenheit = function (celsius) {
  return celsius * this.FACTOR + 32;
};

const kitchenConverter = TemperatureConverter.create('Celsius');
const labConverter = TemperatureConverter.create('Fahrenheit');

console.log('--- Constructor Static Members ---');
console.log('field:', TemperatureConverter.FACTOR);
console.log('method:', TemperatureConverter.celsiusToFahrenheit(25));
console.log('instances:', TemperatureConverter.instanceCount);
console.log('static method on instance:', kitchenConverter.celsiusToFahrenheit);
