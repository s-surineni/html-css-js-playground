import needle from 'needle';

function resolveSoon(todoId, callback) {
  needle.get(`https://jsonplaceholder.typicode.com/todos/${todoId}`, (error, response) => {
    if (error) {
      callback(error);
      return;
    }
    if (response.statusCode < 200 || response.statusCode >= 300) {
      callback(new Error(`HTTP ${response.statusCode}: ${response.statusMessage}`));
      return;
    }
    try {
      callback(null, response.body);
    } catch (err) {
      callback(err);
    }
  });
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