import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { globSync } from 'node:fs'
import { defineConfig } from 'vite'

const root = dirname(fileURLToPath(import.meta.url))

// Multi-page app: every .html under the project root and src/ is a build entry,
// so `vite build` emits all demos (not just index.html). New demos under
// src/<feature>/<feature>.html are picked up automatically.
const input = Object.fromEntries(
  globSync(['index.html', 'src/**/*.html'], { cwd: root }).map((file) => [
    file.replace(/\.html$/, '').replace(/\//g, '-'),
    resolve(root, file),
  ]),
)

export default defineConfig({
  build: {
    rollupOptions: { input },
  },
})
