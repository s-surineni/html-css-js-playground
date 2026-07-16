const temperatureUtils = {
  FACTOR: 9 / 5,

  isValidTemperature(value) {
    return typeof value === 'number' && Number.isFinite(value);
  },

  celsiusToFahrenheit(celsius) {
    if (!this.isValidTemperature(celsius)) throw new TypeError('Invalid temperature');
    return celsius * this.FACTOR + 32;
  },
};

console.log('--- Plain Object as a Utility Namespace ---');
console.log('configuration:', temperatureUtils.FACTOR);
console.log('validation:', temperatureUtils.isValidTemperature(25));
console.log('conversion:', temperatureUtils.celsiusToFahrenheit(25));
