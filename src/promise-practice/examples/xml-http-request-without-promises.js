function getUser(callback) {
  const request = new XMLHttpRequest();

  request.open(
    'GET',
    'https://jsonplaceholder.typicode.com/users/1',
  );

  request.onload = () => {
    if (request.status >= 200 && request.status < 300) {
      callback(null, JSON.parse(request.responseText));
      return;
    }

    callback(new Error(`HTTP error: ${request.status}`));
  };

  request.onerror = () => {
    callback(new Error('Network request failed'));
  };

  request.send();
}

getUser((error, user) => {
  if (error) {
    console.error(error);
    return;
  }

  console.log(user);
});
