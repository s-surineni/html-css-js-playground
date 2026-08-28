import needle from 'needle';

needle.get('https://jsonplaceholder.typicode.com/users/1', (error, response, body) => {
  if (error) {
    console.error(error);
    return;
  }
  console.log(body);
});
