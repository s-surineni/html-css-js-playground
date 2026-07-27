function delay(ms, value, callback) {
  setTimeout(() => callback(value), ms);
}

function fetchData(callback) {
  delay(30, 'fetching', () => {
    callback({ raw: '  hello world  ' });
  });
}

function parse(data, callback) {
  delay(20, 'parsing', () => {
    callback(data.raw.trim().toUpperCase());
  });
}

function log(result, callback) {
  delay(10, 'logging', () => {
    console.log('final result:', result);
    callback();
  });
}

function pipeline(callback) {
  fetchData((data) => {
    parse(data, (parsed) => {
      log(parsed, callback);
    });
  });
}

pipeline();