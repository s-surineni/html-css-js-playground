import { resolveSoon } from './needle-utils.js';

function loadJokePage(pageNumber, callback) {
  if (pageNumber > 2) {
    resolveSoon((error) => {
      if (error) {
        callback(error);
        return;
      }
      callback(null, []);
    });
    return;
  }

  resolveSoon((error, joke) => {
    if (error) {
      callback(error);
      return;
    }
    callback(null, [{ id: 100 + pageNumber, setup: joke.setup }]);
  });
}

function processJokePages(pageNumber = 1) {
  loadJokePage(pageNumber, (error, page) => {
    if (error) {
      console.error('unable to load page:', error.message);
      return;
    }
    if (page.length === 0) return;
    console.log('loaded page:', page.map(({ id }) => id));
    processJokePages(pageNumber + 1);
  });
}

processJokePages();
