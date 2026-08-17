import { resolveSoonWithPromise } from './needle-utils.js';

function loadJokePage(pageNumber) {
  if (pageNumber > 2) {
    return resolveSoonWithPromise().then(() => []);
  }

  return resolveSoonWithPromise().then((joke) => [
    { id: 100 + pageNumber, setup: joke.setup },
  ]);
}

async function* fetchJokePages() {
  for (let pageNumber = 1; ; pageNumber++) {
    const jokes = await loadJokePage(pageNumber);
    if (jokes.length === 0) return;
    yield jokes;
  }
}

async function main() {
  const allJokes = [];
  for await (const page of fetchJokePages()) {
    allJokes.push(...page);
    console.log('loaded page:', page.map(({ id }) => id));
  }
  return allJokes;
}

const iterationPromise = main();
