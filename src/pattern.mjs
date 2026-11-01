// Builds one seamless pattern tile from a four-letter type and a birthday.
// Only the lines are drawn; the background is transparent.
//
// The tile is 100 x 100 and is made of four layers of thin lines, one per letter.
// Layers are woven: where an upper layer crosses a lower one, the lower line gets
// a short gap, so it looks like it passes underneath.
//
//   layer (bottom to top)  letter  first / second
//   two lines              T / F   vertical / horizontal
//   cross through centre   N / S   diagonal X / upright +
//   outer shape            E / I   diamond / circle
//   centre shape           J / P   square / circle
import { palette } from './color.mjs';

const SIZE = 100;
const STROKE_WIDTH = 1.6;
const GAP_RADIUS = 3.4;
const MIN_CROSSING_ANGLE = 20; // degrees; shallower contacts (tangents, overlaps) are not cut

const circlePoints = (cx, cy, r, n = 240) =>
  Array.from({ length: n + 1 }, (_, i) => [cx + r * Math.cos((2 * Math.PI * i) / n), cy + r * Math.sin((2 * Math.PI * i) / n)]);

// Each layer has its SVG markup and polylines used to find crossings.
export function layers(type) {
  const [e, n, t, j] = [type[0] === 'E', type[1] === 'N', type[2] === 'T', type[3] === 'J'];
  return [
    t
      ? { svg: '<path d="M25 0V100M75 0V100"/>', lines: [[[25, 0], [25, 100]], [[75, 0], [75, 100]]] }
      : { svg: '<path d="M0 25H100M0 75H100"/>', lines: [[[0, 25], [100, 25]], [[0, 75], [100, 75]]] },
    n
      ? { svg: '<path d="M0 0L100 100M100 0L0 100"/>', lines: [[[0, 0], [100, 100]], [[100, 0], [0, 100]]] }
      : { svg: '<path d="M50 0V100M0 50H100"/>', lines: [[[50, 0], [50, 100]], [[0, 50], [100, 50]]] },
    e
      ? { svg: '<path d="M50 0L100 50L50 100L0 50Z"/>', lines: [[[50, 0], [100, 50], [50, 100], [0, 50], [50, 0]]] }
      : { svg: '<circle cx="50" cy="50" r="50"/>', lines: [circlePoints(50, 50, 50)] },
    j
      ? { svg: '<rect x="25" y="25" width="50" height="50" rx="2"/>', lines: [[[25, 25], [75, 25], [75, 75], [25, 75], [25, 25]]] }
      : { svg: '<circle cx="50" cy="50" r="25"/>', lines: [circlePoints(50, 50, 25)] },
  ];
}

const shifted = (lines, dx, dy) => lines.map((l) => l.map(([x, y]) => [x + dx, y + dy]));

// Points where two sets of polylines cross at a clear angle.
function crossings(a, b) {
  const minSin = Math.sin((MIN_CROSSING_ANGLE * Math.PI) / 180);
  const out = [];
  for (const pa of a) for (const pb of b) {
    for (let i = 1; i < pa.length; i++) for (let k = 1; k < pb.length; k++) {
      const [x1, y1] = pa[i - 1], [x2, y2] = pa[i], [x3, y3] = pb[k - 1], [x4, y4] = pb[k];
      const dx1 = x2 - x1, dy1 = y2 - y1, dx2 = x4 - x3, dy2 = y4 - y3;
      const den = dx1 * dy2 - dy1 * dx2;
      if (Math.abs(den) / (Math.hypot(dx1, dy1) * Math.hypot(dx2, dy2)) < minSin) continue;
      const t = ((x3 - x1) * dy2 - (y3 - y1) * dx2) / den;
      const u = ((x3 - x1) * dy1 - (y3 - y1) * dx1) / den;
      if (t < -1e-9 || t > 1 + 1e-9 || u < -1e-9 || u > 1 + 1e-9) continue;
      out.push([x1 + t * dx1, y1 + t * dy1]);
    }
  }
  return out;
}

// Gap centres for a lower layer: every crossing with any upper layer, including
// upper layers of the neighbouring tiles, folded back into this tile so that the
// gaps on opposite edges line up.
export function gapsFor(all, index) {
  const pts = [];
  const add = ([x, y]) => {
    if (x < -GAP_RADIUS || x > SIZE + GAP_RADIUS || y < -GAP_RADIUS || y > SIZE + GAP_RADIUS) return;
    if (pts.some(([px, py]) => Math.hypot(px - x, py - y) < 0.5)) return;
    pts.push([x, y]);
  };
  for (let up = index + 1; up < all.length; up++) {
    for (const dx of [-SIZE, 0, SIZE]) for (const dy of [-SIZE, 0, SIZE]) {
      for (const [x, y] of crossings(all[index].lines, shifted(all[up].lines, dx, dy))) {
        for (const ox of [-SIZE, 0, SIZE]) for (const oy of [-SIZE, 0, SIZE]) add([x + ox, y + oy]);
      }
    }
  }
  return pts;
}

const num = (v) => String(Math.round(v * 100) / 100);

// The woven geometry depends only on the type, so it is built once per type.
const geometryCache = new Map();
function geometry(type) {
  if (!geometryCache.has(type)) {
    const all = layers(type);
    geometryCache.set(type, { all, gaps: all.map((_, i) => gapsFor(all, i)) });
  }
  return geometryCache.get(type);
}

export function patternSvg(type, month, day, { size = 200 } = {}) {
  const { line } = palette(month, day);
  const { all, gaps: gapsByLayer } = geometry(type);
  const mm = String(month).padStart(2, '0');
  const dd = String(day).padStart(2, '0');
  let defs = '';
  let body = '';
  all.forEach((layer, i) => {
    const gaps = gapsByLayer[i];
    if (gaps.length === 0) {
      body += layer.svg;
      return;
    }
    const id = `g${i}`;
    const holes = gaps.map(([x, y]) => `<circle cx="${num(x)}" cy="${num(y)}" r="${GAP_RADIUS}"/>`).join('');
    defs += `<mask id="${id}" maskUnits="userSpaceOnUse" x="-10" y="-10" width="120" height="120"><rect x="-10" y="-10" width="120" height="120" fill="#fff"/><g fill="#000">${holes}</g></mask>`;
    body += `<g mask="url(#${id})">${layer.svg}</g>`;
  });
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${SIZE} ${SIZE}">` +
    `<title>${type} ${mm}-${dd}</title>` +
    `<defs>${defs}</defs>` +
    `<g fill="none" stroke="${line}" stroke-width="${STROKE_WIDTH}" stroke-linejoin="round">${body}</g>` +
    `</svg>\n`
  );
}
