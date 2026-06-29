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
  if (value instanceof Error) return value.toString();
  try {
    return JSON.stringify(value);
  } catch {
    return String(value);
  }
}

// Evaluate `userCode`, then run `test` in the same scope so it can see whatever
// the code declares. Captures console.log/error/warn. Returns { logs, result, error }.
export function runCode(userCode, test = '') {
  const logs = [];
  const capture = (...args) => logs.push(args.map(format).join(' '));
  const sandboxConsole = { log: capture, error: capture, warn: capture };
  try {
    const body = `${userCode}\n;return (function () {\n${test}\n})();`;
    const compile = Function; // dynamic compile — see security note in header
    const result = new compile('console', body)(sandboxConsole);
    return { logs, result, error: null };
  } catch (error) {
    return { logs, result: null, error };
  }
}

// Build the combined log + result lines and render them into `outputEl`,
// toggling the error state.
function renderOutput(outputEl, userCode, test) {
  const { logs, result, error } = runCode(userCode, test);
  const lines = [...logs];
  if (typeof result === 'string' && result.length) lines.push(result);

  if (error) {
    outputEl.classList.add('has-error');
    const prefix = lines.length ? lines.join('\n') + '\n' : '';
    outputEl.textContent = `${prefix}❌ ${error.name}: ${error.message}`;
  } else {
    outputEl.classList.remove('has-error');
    outputEl.textContent = lines.length ? '✅ ' + lines.join('\n') : '✅ (no output)';
  }
}

const IDLE_MESSAGE = 'Click Run to execute your code.';

/**
 * Mount an editable code playground into `target`.
 *
 * @param {HTMLElement} target  Element to append the playground into.
 * @param {object} options
 * @param {string} options.code             Starter code shown in the editor (required).
 * @param {string} [options.test='']        Snippet run after the code; its return value is displayed.
 * @param {string} [options.label]          aria-label for the editor textarea.
 * @param {boolean} [options.autoRun=false] Run once immediately after mounting.
 * @returns {{ getCode: () => string, setCode: (c: string) => void, run: () => void, reset: () => void, elements: object }}
 */
export function mountCodePlayground(target, options = {}) {
  const { code = '', test = '', label = 'Code editor', autoRun = false } = options;

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

  const run = () => renderOutput(output, editor.value, test);
  const reset = () => {
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
