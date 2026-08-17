// =====================================
// Reusable live JS code playground
// =====================================
// Renders an editable code box + Run/Reset buttons + an output panel into any
// element. Running evaluates the edited code with the Function constructor,
// captures console output, and displays it. The code runs in the page's own
// context (NOT sandboxed) — intended for local learning playgrounds, never for
// untrusted input. Do not reuse this on a page that evaluates third-party text.
//
// Usage:
//   import { mountCodePlayground } from '../lib/code-playground.js';
//   import '../lib/code-playground.css';
//   mountCodePlayground(targetEl, { code: 'console.log(1)', test: 'return 2;' });

// Format a console argument the way a dev console would.
function format(value) {
  if (typeof value === 'string') return value;
  if (typeof value === 'function') return value.toString();
  if (value instanceof Error) return value.toString();
  try {
    return JSON.stringify(value);
  } catch {
    return String(value);
  }
}

// Structural equality for assertions: handles primitives, arrays, and plain
// objects. Uses Object.is for primitives so NaN === NaN and +0 !== -0.
function deepEqual(a, b) {
  if (Object.is(a, b)) return true;
  if (typeof a !== 'object' || typeof b !== 'object' || a === null || b === null) {
    return false;
  }
  if (Array.isArray(a) !== Array.isArray(b)) return false;
  const keysA = Object.keys(a);
  const keysB = Object.keys(b);
  if (keysA.length !== keysB.length) return false;
  return keysA.every((k) => deepEqual(a[k], b[k]));
}

// Strip ES module import lines so playground code can document imports while
// still running inside `Function` with injected bindings.
function stripImports(source) {
  return source.replace(/^\s*import\s.+?;?\s*$/gm, '');
}

// Evaluate `userCode`, then run `test` in the same scope so it can see whatever
// the code declares. The test gets two helpers in scope:
//   console.{log,error,warn} — captured into `logs`
//   expect(actual, expected, label?) — recorded into `assertions`
// Optional `bindings` are injected as named locals (e.g. resolveSoonWithPromise).
// Returns { logs, assertions, result, error }.
export function runCode(userCode, test = '', bindings = {}) {
  const logs = [];
  const capture = (...args) => logs.push(args.map(format).join(' '));
  const sandboxConsole = { log: capture, error: capture, warn: capture };

  const assertions = [];
  const expect = (actual, expected, label) => {
    const passed = deepEqual(actual, expected);
    assertions.push({ passed, label, actual, expected });
    return passed;
  };

  const bindingNames = Object.keys(bindings);
  const bindingValues = Object.values(bindings);

  try {
    const body = `${stripImports(userCode)}\n;return (function () {\n${test}\n})();`;
    const compile = Function; // dynamic compile — see security note in header
    const result = new compile('console', 'expect', ...bindingNames, body)(
      sandboxConsole,
      expect,
      ...bindingValues,
    );
    return { logs, assertions, result, error: null };
  } catch (error) {
    return { logs, assertions, result: null, error };
  }
}

// Render one assertion as a single ✅/❌ line, showing the expected/actual diff
// when it fails.
function formatAssertion({ passed, label, actual, expected }) {
  if (passed) return `✅ ${label ?? `${format(actual)} === ${format(expected)}`}`;
  const what = label ? `${label}\n   ` : '';
  return `❌ ${what}expected ${format(expected)} but got ${format(actual)}`;
}

// Build the combined log + assertion + result lines and render them into
// `outputEl`. If a test returns a promise, wait for it so asynchronous logs and
// assertions are included before the final output is painted.
async function renderOutput(outputEl, userCode, test, bindings = {}, isCurrent = () => true) {
  const runResult = runCode(userCode, test, bindings);
  const { logs, assertions } = runResult;
  let { result, error } = runResult;

  if (!error && result && typeof result.then === 'function') {
    outputEl.classList.remove('has-error');
    outputEl.textContent = 'Running asynchronous example…';
    try {
      result = await result;
    } catch (caughtError) {
      error = caughtError;
    }
  }

  if (!isCurrent()) return;

  const lines = [...logs, ...assertions.map(formatAssertion)];
  if (typeof result === 'string' && result.length) lines.push(result);

  const failed = assertions.some((a) => !a.passed);

  if (error) {
    outputEl.classList.add('has-error');
    const prefix = lines.length ? lines.join('\n') + '\n' : '';
    outputEl.textContent = `${prefix}❌ ${error.name}: ${error.message}`;
  } else if (failed) {
    outputEl.classList.add('has-error');
    outputEl.textContent = lines.join('\n');
  } else {
    outputEl.classList.remove('has-error');
    // Assertion lines already carry their own ✅; only the log-only path needs a
    // leading marker.
    if (!lines.length) outputEl.textContent = '✅ (no output)';
    else outputEl.textContent = assertions.length ? lines.join('\n') : '✅ ' + lines.join('\n');
  }
}

const IDLE_MESSAGE = 'Click Run to execute your code.';

/**
 * Mount an editable code playground into `target`.
 *
 * @param {HTMLElement} target  Element to append the playground into.
 * @param {object} options
 * @param {string} options.code             Starter code shown in the editor (required).
 * @param {string} [options.test='']        Snippet run after the code. It can console.log,
 *                                           call expect(actual, expected, label?) to assert,
 *                                           and/or return a string to display.
 * @param {object} [options.bindings={}]    Extra named values injected into run scope.
 * @param {string} [options.label]          aria-label for the editor textarea.
 * @param {boolean} [options.autoRun=false] Run once immediately after mounting.
 * @returns {{ getCode: () => string, setCode: (c: string) => void, run: () => Promise<void>, reset: () => void, elements: object }}
 */
export function mountCodePlayground(target, options = {}) {
  const { code = '', test = '', bindings = {}, label = 'Code editor', autoRun = false } = options;

  const editor = document.createElement('textarea');
  editor.className = 'code-editor';
  editor.spellcheck = false;
  editor.value = code;
  editor.setAttribute('aria-label', label);
  // Tab inserts two spaces instead of moving focus out of the editor.
  editor.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab') return;
    e.preventDefault();
    const { selectionStart: start, selectionEnd: end, value } = editor;
    editor.value = value.slice(0, start) + '  ' + value.slice(end);
    editor.selectionStart = editor.selectionEnd = start + 2;
  });

  const output = document.createElement('div');
  output.className = 'output';
  output.textContent = IDLE_MESSAGE;

  let runId = 0;
  const run = () => {
    const currentRunId = ++runId;
    return renderOutput(output, editor.value, test, bindings, () => currentRunId === runId);
  };
  const reset = () => {
    runId++;
    editor.value = code;
    output.classList.remove('has-error');
    output.textContent = IDLE_MESSAGE;
  };

  const runBtn = document.createElement('button');
  runBtn.type = 'button';
  runBtn.textContent = '▶ Run';
  runBtn.addEventListener('click', run);

  const resetBtn = document.createElement('button');
  resetBtn.type = 'button';
  resetBtn.className = 'secondary';
  resetBtn.textContent = '↺ Reset';
  resetBtn.addEventListener('click', reset);

  const actions = document.createElement('div');
  actions.className = 'actions';
  actions.append(runBtn, resetBtn);

  target.append(editor, actions, output);

  if (autoRun) run();

  return {
    getCode: () => editor.value,
    setCode: (c) => {
      editor.value = c;
    },
    run,
    reset,
    elements: { editor, actions, runBtn, resetBtn, output },
  };
}
