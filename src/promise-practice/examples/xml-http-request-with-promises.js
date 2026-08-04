function getUser() {
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();

    request.open(
      'GET',
      'https://jsonplaceholder.typicode.com/users/1',
    );

    request.onload = () => {
      if (request.status >= 200 && request.status < 300) {
        // Resolve where the callback version returns the successful result.
        resolve(JSON.parse(request.responseText));
        return;
      }

      // Reject where the callback version reports an error.
      reject(new Error(`HTTP error: ${request.status}`));
    };

    request.onerror = () => {
      reject(new Error('Network request failed'));
    };

    request.send();
  });
}

getUser()
  .then((user) => {
    console.log(user);
  })
  .catch((error) => {
    console.error(error);
  });
