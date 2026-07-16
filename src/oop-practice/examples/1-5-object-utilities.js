// Plain objects do not have instances, so their members are not technically
// static. Direct properties and methods provide similar namespaced behavior.
const temperatureUtils = {
  FACTOR: 9 / 5,

  isValidTemperature(value) {
    return typeof value === 'number' && Number.isFinite(value);
  },

  celsiusToFahrenheit(celsius) {
    if (!this.isValidTemperature(celsius)) {
      throw new TypeError('Temperature must be a finite number');
    }
    return celsius * this.FACTOR + 32;
  },
};

console.log('--- Plain Object Utilities ---');
console.log('object property:', temperatureUtils.FACTOR);
console.log('object validation:', temperatureUtils.isValidTemperature(25));
console.log('object utility method:', temperatureUtils.celsiusToFahrenheit(25));
console.log('all members live directly on one object:', Object.hasOwn(temperatureUtils, 'FACTOR'));
