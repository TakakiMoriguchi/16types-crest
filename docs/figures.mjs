// Generates the figures used in README.md into docs/figures/. Run with `node docs/figures.mjs`.
import { mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { layers, patternSvg } from '../src/pattern.mjs';
import { palette, solarLongitude } from '../src/color.mjs';

const OUT = 'docs/figures';
rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });

// Neutral grey reads on both light and dark GitHub themes.
const GREY = '#8b949e';
const frame = (inner, size = 120) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="-6 -6 112 112">` +
  `<rect x="-4" y="-4" width="108" height="108" rx="6" fill="none" stroke="${GREY}" stroke-opacity="0.35" stroke-width="1"/>` +
  `<g fill="none" stroke="${GREY}" stroke-width="2.4" stroke-linejoin="round">${inner}</g></svg>\n`;

// One figure per letter. layers() order: 0 T/F, 1 N/S, 2 E/I, 3 J/P.
const LETTERS = [
  ['n', 'ENTJ', 1], ['s', 'ESTJ', 1],
  ['t', 'ENTJ', 0], ['f', 'ENFJ', 0],
  ['e', 'ENTJ', 2], ['i', 'INTJ', 2],
  ['j', 'ENTJ', 3], ['p', 'ENTP', 3],
];
for (const [letter, type, index] of LETTERS) writeFileSync(`${OUT}/${letter}.svg`, frame(layers(type)[index].svg));

// How a pattern is built: the four layers of ENTJ, then the woven tile.
const entj = layers('ENTJ');
[0, 1, 2, 3].forEach((index, step) => writeFileSync(`${OUT}/build-${step + 1}.svg`, frame(entj[index].svg, 96)));
writeFileSync(`${OUT}/build-result.svg`, patternSvg('ENTJ', 4, 13, { size: 96 }));

// Examples: all 16 types on the same day.
for (const a of 'EI') for (const b of 'NS') for (const c of 'TF') for (const d of 'JP') {
  const t = a + b + c + d;
  writeFileSync(`${OUT}/type-${t.toLowerCase()}.svg`, patternSvg(t, 4, 13, { size: 96 }));
}
// Examples: one type through the year.
for (const [m, d] of [[1, 15], [3, 20], [5, 5], [6, 21], [8, 10], [9, 22], [11, 1], [12, 21]]) {
  const mmdd = String(m).padStart(2, '0') + String(d).padStart(2, '0');
  writeFileSync(`${OUT}/day-${mmdd}.svg`, patternSvg('ENTJ', m, d, { size: 80 }));
}

// Hue strip: the line colour of every day of the year.
let strip = `<svg xmlns="http://www.w3.org/2000/svg" width="732" height="56" viewBox="0 0 732 56">`;
let i = 0;
for (let m = 1; m <= 12; m++) {
  const last = new Date(Date.UTC(2000, m, 0)).getUTCDate();
  for (let d = 1; d <= last; d++, i++) {
    strip += `<rect x="${i * 2}" y="0" width="2.2" height="36" fill="${palette(m, d).line}"/>`;
    if (d === 1) strip += `<text x="${i * 2 + 2}" y="52" font-family="sans-serif" font-size="12" fill="${GREY}">${m}</text>`;
  }
}
writeFileSync(`${OUT}/hue-strip.svg`, strip + '</svg>\n');

console.log(`Figures written to ${OUT}/ (equinox check: ${solarLongitude(3, 20).toFixed(1)}°)`);
