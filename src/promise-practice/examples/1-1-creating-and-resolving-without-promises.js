import needle from 'needle';

function resolveSoon(callback) {
  needle.get(`https://official-joke-api.appspot.com/random_joke`, (error, response, body) => {
    if (error) {
      callback(error);
      return;
    }
    if (response.statusCode < 200 || response.statusCode >= 300) {
      callback(new Error(`HTTP ${response.statusCode}: ${response.statusMessage}`));
      return;
    }
    try {
      callback(null, body);
    } catch (err) {
      callback(err);
    }
  });
}
resolveSoon()