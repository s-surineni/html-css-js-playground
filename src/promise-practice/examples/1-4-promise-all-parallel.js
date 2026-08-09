import { resolveSoonWithPromise } from './1-1-needle-utils.js';

// Start every request before awaiting any result, allowing Needle to perform
// the three HTTP requests in parallel.
const resultsPromise = Promise.all([
  resolveSoonWithPromise(),
  resolveSoonWithPromise(),
  resolveSoonWithPromise(),
]).then((jokes) => {
  // Promise.all preserves input order even if the requests finish in a
  // different order.
  console.log('all jokes in input order:', jokes);
  return jokes;
});

resultsPromise.catch((error) => {
  // Promise.all rejects as soon as any one of its input Promises rejects.
  console.error('unable to load every joke:', error.message);
});
