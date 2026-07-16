expect(temperatureUtils.FACTOR, 1.8, 'utility object stores its configuration directly');
expect(temperatureUtils.isValidTemperature(25), true, 'utility validates finite numbers');
expect(temperatureUtils.isValidTemperature(NaN), false, 'utility rejects NaN');
expect(temperatureUtils.celsiusToFahrenheit(25), 77, 'utility converts temperatures');
expect(
  Object.hasOwn(temperatureUtils, 'celsiusToFahrenheit'),
  true,
  'utility method belongs directly to the object',
);
