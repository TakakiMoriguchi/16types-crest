// Generates every pattern into dist/. Run with `node build.mjs`.
// Output: dist/{type}/{mmdd}.svg, for example dist/entj/0413.svg, plus dist/index.html.
import { mkdirSync, writeFileSync, rmSync, copyFileSync } from 'node:fs';
import { patternSvg } from './src/pattern.mjs';

export const TYPES = [];
for (const a of 'EI') for (const b of 'NS') for (const c of 'TF') for (const d of 'JP') TYPES.push(a + b + c + d);

// All 366 month/day pairs, 29 February included.
export const DAYS = [];
for (let m = 1; m <= 12; m++) {
  const last = new Date(Date.UTC(2000, m, 0)).getUTCDate();
  for (let d = 1; d <= last; d++) DAYS.push([m, d]);
}

const mmdd = (m, d) => String(m).padStart(2, '0') + String(d).padStart(2, '0');

rmSync('dist', { recursive: true, force: true });
let count = 0;
for (const type of TYPES) {
  const dir = `dist/${type.toLowerCase()}`;
  mkdirSync(dir, { recursive: true });
  for (const [m, d] of DAYS) {
    writeFileSync(`${dir}/${mmdd(m, d)}.svg`, patternSvg(type, m, d));
    count++;
  }
}
copyFileSync('site/index.html', 'dist/index.html');

console.log(`Built ${count} patterns (${TYPES.length} types x ${DAYS.length} days) into dist/`);
