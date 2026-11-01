// Generates every crest SVG into dist/. Run with `node build.mjs`.
import { mkdirSync, writeFileSync, rmSync } from 'node:fs';

const LETTERS = [
  { E: 'Extraverted', I: 'Introverted' },
  { N: 'Intuitive', S: 'Observant' },
  { T: 'Thinking', F: 'Feeling' },
  { J: 'Judging', P: 'Prospecting' },
];

// One palette per temperament group (2nd + 3rd/4th letter).
const PALETTES = {
  NT: { primary: '#23306E', field: '#3E52B5', accent: '#F2C14E' },
  NF: { primary: '#6E1F45', field: '#B04A7C', accent: '#F7D9E6' },
  SJ: { primary: '#14524A', field: '#2C8C7C', accent: '#EDE6D2' },
  SP: { primary: '#9C2F1F', field: '#D9583F', accent: '#FFE08A' },
};

const THEMES = {
  dark: { bg: '#0D1117', border: '#30363D', text: '#E6EDF3', sub: '#8B949E' },
  light: { bg: '#FFFFFF', border: '#D0D7DE', text: '#1F2328', sub: '#59636E' },
};

const FONT = "'Segoe UI', Helvetica, Arial, sans-serif";

const types = [];
for (const a of 'EI') for (const b of 'NS') for (const c of 'TF') for (const d of 'JP') types.push(a + b + c + d);

const group = (t) => (t[1] === 'N' ? 'N' + t[2] : 'S' + t[3]);

// The flag encodes each letter:
//   E/I  layout   E = horizontal triband, I = vertical hoist bar
//   N/S  palette  (with T/F or J/P, see group())
//   T/F  emblem   T = four-point star, F = sun disc with ring
//   J/P  pattern  J = straight pinstripes, P = diagonal sash
function flag(t) {
  const p = PALETTES[group(t)];
  const out = [];

  const sash = `<path d="M0 200 L40 200 L300 26 L300 0 L260 0 L0 174 Z" fill="${p.accent}"/>`;

  // The sash runs over the bands of E flags but under the hoist bar of I flags.
  out.push(`<rect width="300" height="200" fill="${p.field}"/>`);
  if (t[0] === 'E') {
    out.push(`<rect width="300" height="56" fill="${p.primary}"/>`);
    out.push(`<rect y="144" width="300" height="56" fill="${p.primary}"/>`);
    if (t[3] === 'P') out.push(sash);
  } else {
    if (t[3] === 'P') out.push(sash);
    out.push(`<rect width="110" height="200" fill="${p.primary}"/>`);
  }

  if (t[3] === 'J') {
    if (t[0] === 'E') {
      out.push(`<rect y="60" width="300" height="4" fill="${p.accent}"/>`);
      out.push(`<rect y="136" width="300" height="4" fill="${p.accent}"/>`);
    } else {
      out.push(`<rect x="114" width="4" height="200" fill="${p.accent}"/>`);
      out.push(`<rect x="124" width="4" height="200" fill="${p.accent}"/>`);
    }
  }

  const [cx, cy] = t[0] === 'E' ? [150, 100] : [55, 100];
  if (t[0] === 'E') out.push(`<circle cx="${cx}" cy="${cy}" r="34" fill="${p.primary}"/>`);
  if (t[2] === 'T') {
    const s = 26, w = 7;
    out.push(
      `<path d="M${cx} ${cy - s} L${cx + w} ${cy - w} L${cx + s} ${cy} L${cx + w} ${cy + w} L${cx} ${cy + s} L${cx - w} ${cy + w} L${cx - s} ${cy} L${cx - w} ${cy - w} Z" fill="${p.accent}"/>`,
    );
  } else {
    out.push(`<circle cx="${cx}" cy="${cy}" r="14" fill="${p.accent}"/>`);
    out.push(`<circle cx="${cx}" cy="${cy}" r="23" stroke="${p.accent}" stroke-width="4" fill="none"/>`);
  }

  return out.join('');
}

function nestedFlag(t, id, x, y, w, h, r) {
  return (
    `<clipPath id="${id}"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}"/></clipPath>` +
    `<g clip-path="url(#${id})"><svg x="${x}" y="${y}" width="${w}" height="${h}" viewBox="0 0 300 200" preserveAspectRatio="none">${flag(t)}</svg></g>`
  );
}

const traits = (t) => [...t].map((ch, i) => LETTERS[i][ch]);

function flagSvg(t) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="200" viewBox="0 0 300 200"><title>${t}</title>${flag(t)}</svg>\n`;
}

function cardSvg(t, theme) {
  const c = THEMES[theme];
  const [a, b, d, e] = traits(t);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="440" height="160" viewBox="0 0 440 160" fill="none">
<title>${t} - ${traits(t).join(', ')}</title>
<rect x="0.5" y="0.5" width="439" height="159" rx="10" fill="${c.bg}" stroke="${c.border}"/>
${nestedFlag(t, 'f', 20, 20, 180, 120, 6)}
<g font-family="${FONT}">
<text x="222" y="42" font-size="11" letter-spacing="2" fill="${c.sub}">PERSONALITY TYPE</text>
<text x="220" y="88" font-size="46" font-weight="700" letter-spacing="4" fill="${c.text}">${t}</text>
<g font-size="13" fill="${c.sub}">
<text x="222" y="114"><tspan font-weight="700" fill="${c.text}">${t[0]}</tspan> ${a}</text>
<text x="322" y="114"><tspan font-weight="700" fill="${c.text}">${t[1]}</tspan> ${b}</text>
<text x="222" y="136"><tspan font-weight="700" fill="${c.text}">${t[2]}</tspan> ${d}</text>
<text x="322" y="136"><tspan font-weight="700" fill="${c.text}">${t[3]}</tspan> ${e}</text>
</g>
</g>
</svg>
`;
}

function badgeSvg(t) {
  const p = PALETTES[group(t)];
  return `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="28" viewBox="0 0 100 28" fill="none">
<title>${t}</title>
<clipPath id="r"><rect width="100" height="28" rx="4"/></clipPath>
<g clip-path="url(#r)">
<rect width="100" height="28" fill="${p.primary}"/>
<svg width="42" height="28" viewBox="0 0 300 200" preserveAspectRatio="none">${flag(t)}</svg>
</g>
<text x="71" y="19" text-anchor="middle" font-family="${FONT}" font-size="13" font-weight="700" letter-spacing="1.5" fill="#FFFFFF">${t}</text>
</svg>
`;
}

rmSync('dist', { recursive: true, force: true });
for (const dir of ['flag', 'badge', 'card']) mkdirSync(`dist/${dir}`, { recursive: true });

for (const t of types) {
  const name = t.toLowerCase();
  writeFileSync(`dist/flag/${name}.svg`, flagSvg(t));
  writeFileSync(`dist/badge/${name}.svg`, badgeSvg(t));
  writeFileSync(`dist/card/${name}.svg`, cardSvg(t, 'dark'));
  writeFileSync(`dist/card/${name}-light.svg`, cardSvg(t, 'light'));
}

console.log(`Built ${types.length} types into dist/`);
