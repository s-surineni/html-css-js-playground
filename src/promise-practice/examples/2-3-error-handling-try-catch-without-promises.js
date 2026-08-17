import { FAIL_URL, resolveSoon } from './needle-utils.js';

function loadRecord(recordId, callback) {
  if (recordId === 99) {
    resolveSoon((error) => {
      callback(error ?? new Error(`Record ${recordId} not found`));
    }, FAIL_URL);
    return;
  }

  resolveSoon((error, joke) => {
    if (error) {
      callback(error);
      return;
    }
    callback(null, { id: recordId, title: joke.setup });
  });
}

function run(recordId, callback) {
  loadRecord(recordId, (error, record) => {
    if (error) {
      console.log('caught:', error.message);
    } else {
      console.log('loaded:', record.title);
    }
    callback();
  });
}

run(99, () => {});
