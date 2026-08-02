function resolveSoon(todoId, callback) {
  const https = require('node:https');
  https.get(`https://jsonplaceholder.typicode.com/todos/${todoId}`, (res) => {
    let body = '';
    res.on('data', (chunk) => { body += chunk; });
    res.on('end', () => {
      if (res.statusCode < 200 || res.statusCode >= 300) {
        callback(new Error(`HTTP ${res.statusCode}: ${res.statusMessage}`));
        return;
      }
      try {
        callback(null, JSON.parse(body));
      } catch (error) {
        callback(error);
      }
    });
  }).on('error', (error) => callback(error));
}

console.log('callback registered');
console.log('waiting for callback...');

resolveSoon(1, (error, todo) => {
  if (error) {
    console.error('unable to load todo:', error.message);
    return;
  }
  console.log('resolved value:', todo.title);
});
