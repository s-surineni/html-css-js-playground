function resolveSoon(todoId, callback) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', `https://jsonplaceholder.typicode.com/todos/${todoId}`);
  xhr.onload = () => {
    if (xhr.status < 200 || xhr.status >= 300) {
      callback(new Error(`HTTP ${xhr.status}: ${xhr.statusText}`));
      return;
    }
    try {
      const todo = JSON.parse(xhr.responseText);
      callback(null, todo);
    } catch (error) {
      callback(error);
    }
  };
  xhr.onerror = () => callback(new Error('Network error'));
  xhr.send();
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
