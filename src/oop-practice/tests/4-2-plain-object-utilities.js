expect(temperatureUtils.FACTOR, 1.8, 'object stores shared configuration');
expect(temperatureUtils.isValidTemperature(25), true, 'object groups validation');
expect(temperatureUtils.isValidTemperature(NaN), false, 'validation rejects NaN');
expect(temperatureUtils.celsiusToFahrenheit(25), 77, 'object groups utility behavior');
expect(Object.hasOwn(temperatureUtils, 'celsiusToFahrenheit'), true, 'method belongs directly to object');
