function delay(ms, value, callback) {
  setTimeout(() => callback(value), ms);
}

delay(50, 1, (value) => {
  console.log('step 1:', value);

  delay(50, value + 1, (value) => {
    console.log('step 2:', value);

    delay(50, value + 1, (value) => {
      console.log('step 3:', value);
    });
  });
});