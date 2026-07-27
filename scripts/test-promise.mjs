import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { runCode } from '../src/lib/code-playground.js';

const root = fileURLToPath(new URL('../src/promise-practice/', import.meta.url));

async function sourcesById(directory) {
  const sources = new Map();
  for (const filename of await readdir(join(root, directory))) {
    const id = filename.match(/^(\d+(?:-\d+)?)-.*\.js$/)?.[1];
    if (!id) continue;
    if (sources.has(id)) throw new Error(`Duplicate ${directory} id: ${id}`);
    sources.set(id, await readFile(join(root, directory, filename), 'utf8'));
  }
  return sources;
}

const examples = await sourcesById('examples');
const tests = await sourcesById('tests');
let failures = 0;

for (const [id, test] of [...tests].sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))) {
  const example = examples.get(id);
  if (!example) {
    console.error(`❌ ${id}: test has no matching example`);
    failures++;
    continue;
  }

  let runResult;
  try {
    runResult = runCode(example, test);
  } catch (e) {
    console.error(`❌ ${id}: ${e.message}`);
    failures++;
    continue;
  }

  let { logs, assertions, result, error } = runResult;

  if (result instanceof Promise) {
    try {
      const awaited = await result;
      if (awaited && typeof awaited === 'object' && 'assertions' in awaited) {
        assertions = awaited.assertions;
        result = awaited.result;
        error = awaited.error;
      }
    } catch (e) {
      console.error(`❌ ${id}: ${e.message}`);
      failures++;
      continue;
    }
  }

  if (error) {
    console.error(`❌ ${id}: ${error.message}`);
    failures++;
    continue;
  }

  const failedAssertions = assertions.filter(({ passed }) => !passed);
}

const untested = [...examples.keys()].filter((id) => !tests.has(id));
if (untested.length > 0) {
  console.error(`❌ Examples without tests: ${untested.join(', ')}`);
  failures += untested.length;
}

if (failures > 0) process.exitCode = 1;