import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
const root = resolve(import.meta.dirname, '..');
let checked = 0;
const failures = [];
function walk(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === 'node_modules' || entry.name === '.git') continue;
    const path = join(dir, entry.name);
    if (entry.isDirectory()) walk(path);
    else if (entry.name.endsWith('.md')) {
      checked++;
      const text = readFileSync(path, 'utf8');
      for (const match of text.matchAll(/\]\(([^)]+)\)/g)) {
        const href = match[1];
        if (/^(https?:|mailto:|#)/.test(href)) continue;
        if (!existsSync(resolve(dirname(path), href.split('#')[0]))) failures.push({ path, href });
      }
    }
  }
}
walk(root);
if (failures.length) { console.error(JSON.stringify(failures)); process.exit(1); }
console.log(`Checked ${checked} Markdown documents; no broken local file links.`);
