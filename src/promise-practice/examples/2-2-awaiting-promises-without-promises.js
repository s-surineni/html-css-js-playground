import { resolveSoon } from './needle-utils.js';

function loadStatus(callback) {
  resolveSoon((error) => {
    if (error) {
      callback(error);
      return;
    }
    callback(null, 'done');
  });
}

function main(callback) {
  console.log('starting...');
  loadStatus((error, result) => {
    if (error) {
      console.error('failed:', error.message);
      callback(error);
      return;
    }
    console.log('after await:', result);
    callback(null, result);
  });
}

main(() => {});
