import { resolveSoonWithPromise } from './needle-utils.js';

function loadStatus() {
  return resolveSoonWithPromise().then(() => 'done');
}

async function main() {
  console.log('starting...');
  const status = await loadStatus();
  console.log('after await:', status);
  return status;
}

const mainPromise = main();
