import { FAIL_URL, resolveSoonWithPromise } from './needle-utils.js';

function loadRecord(recordId) {
  if (recordId === 99) {
    return resolveSoonWithPromise(FAIL_URL).then(
      () => {
        throw new Error(`Record ${recordId} not found`);
      },
      () => {
        throw new Error(`Record ${recordId} not found`);
      },
    );
  }

  return resolveSoonWithPromise().then((joke) => ({
    id: recordId,
    title: joke.setup,
  }));
}

async function run(recordId) {
  try {
    const record = await loadRecord(recordId);
    console.log('loaded:', record.title);
    return record;
  } catch (error) {
    console.log('caught:', error.message);
    return error.message;
  }
}

const runPromise = run(99);
