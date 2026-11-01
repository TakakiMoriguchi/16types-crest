import { test } from 'node:test';
import assert from 'node:assert/strict';
import { solarLongitude, inSrgbGamut, oklchToHex, LINE } from '../src/color.mjs';
import { layers, gapsFor, patternSvg } from '../src/pattern.mjs';

test('solar longitude matches the equinoxes and solstices of 2000', () => {
  const near = (a, b) => Math.abs(((a - b + 540) % 360) - 180) < 1.5;
  assert.ok(near(solarLongitude(3, 20), 0));
  assert.ok(near(solarLongitude(6, 21), 90));
  assert.ok(near(solarLongitude(9, 22), 180));
  assert.ok(near(solarLongitude(12, 21), 270));
});

test('line colour stays in sRGB and readable on light and dark for every hue', () => {
  const lum = (hex) => {
    const c = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255).map((v) => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
    return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
  };
  const contrast = (a, b) => { const x = lum(a), y = lum(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); };
  for (let h = 0; h < 360; h += 0.5) {
    assert.ok(inSrgbGamut(LINE.L, LINE.C, h), `out of gamut at ${h}`);
    const hex = oklchToHex(LINE.L, LINE.C, h);
    assert.ok(contrast(hex, '#ffffff') >= 4, `low contrast on white at ${h}`);
    assert.ok(contrast(hex, '#0d1117') >= 4, `low contrast on dark at ${h}`);
  }
});

test('pattern has no background', () => {
  assert.ok(!patternSvg('ENTJ', 4, 13).includes('<rect width="100" height="100"'));
});

test('every type has four layers and the top layer is never cut', () => {
  for (const a of 'EI') for (const b of 'NS') for (const c of 'TF') for (const d of 'JP') {
    const all = layers(a + b + c + d);
    assert.equal(all.length, 4);
    assert.equal(gapsFor(all, 3).length, 0);
  }
});

test('gaps on opposite edges line up so tiles join seamlessly', () => {
  for (const type of ['ENTJ', 'ISFP', 'INTP', 'ESFJ']) {
    const all = layers(type);
    for (let i = 0; i < all.length; i++) {
      const gaps = gapsFor(all, i);
      for (const [x, y] of gaps) {
        if (Math.abs(x) < 1e-6) assert.ok(gaps.some(([u, v]) => Math.abs(u - 100) < 1e-6 && Math.abs(v - y) < 1e-6), `${type} layer ${i} (${x},${y})`);
        if (Math.abs(y) < 1e-6) assert.ok(gaps.some(([u, v]) => Math.abs(v - 100) < 1e-6 && Math.abs(u - x) < 1e-6), `${type} layer ${i} (${x},${y})`);
      }
    }
  }
});

test('output is the same for the same input', () => {
  assert.equal(patternSvg('ENTJ', 4, 13), patternSvg('ENTJ', 4, 13));
  assert.notEqual(patternSvg('ENTJ', 4, 13), patternSvg('ENTJ', 4, 14));
});
