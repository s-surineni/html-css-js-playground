import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { runCode } from '../src/lib/code-playground.js';

const root = fileURLToPath(new URL('../src/oop-practice/', import.meta.url));

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

  const result = runCode(example, test);
  const failedAssertions = result.assertions.filter(({ passed }) => !passed);
  if (result.error || failedAssertions.length > 0) {
    console.error(`❌ ${id}: ${result.error ?? `${failedAssertions.length} assertion(s) failed`}`);
    for (const assertion of failedAssertions) {
      console.error(`   ${assertion.label}: expected`, assertion.expected, 'but got', assertion.actual);
    }
    failures++;
  } else {
    console.log(`✅ ${id}: ${result.assertions.length} assertions`);
  }
}

const untested = [...examples.keys()].filter((id) => !tests.has(id));
if (untested.length > 0) {
  console.error(`❌ Examples without tests: ${untested.join(', ')}`);
  failures += untested.length;
}

if (failures > 0) process.exitCode = 1;
