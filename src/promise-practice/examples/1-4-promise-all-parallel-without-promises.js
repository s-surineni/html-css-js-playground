import { resolveSoon } from './needle-utils.js';

function parallel(tasks, callback) {
  const results = [];
  let completed = 0;
  let failed = false;

  for (let i = 0; i < tasks.length; i++) {
    tasks[i]((error, result) => {
      if (failed) return;
      if (error) {
        failed = true;
        callback(error);
        return;
      }
      results[i] = result;
      completed++;
      if (completed === tasks.length) {
        callback(null, results);
      }
    });
  }
}

parallel(
  [
    (cb) => resolveSoon(cb),
    (cb) => resolveSoon(cb),
    (cb) => resolveSoon(cb),
  ],
  (error, jokes) => {
    if (error) {
      console.error('unable to load every joke:', error.message);
      return;
    }
    console.log('all jokes in input order:', jokes.map((joke) => joke.setup));
  },
);
