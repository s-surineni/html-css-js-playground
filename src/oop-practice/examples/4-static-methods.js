class TemperatureConverter {
  static FACTOR = 9 / 5;

  static celsiusToFahrenheit(celsius) {
    return celsius * this.FACTOR + 32;
  }
  static fahrenheitToCelsius(fahrenheit) {
    return (fahrenheit - 32) / this.FACTOR;
  }
}
