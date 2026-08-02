function resolveSoon(todoId, callback) {
  fetch(`https://jsonplaceholder.typicode.com/todos/${todoId}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      return response.json();
    })
    .then((todo) => callback(null, todo))
    .catch((error) => callback(error));
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
