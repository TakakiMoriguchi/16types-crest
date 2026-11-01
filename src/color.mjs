// Colour from a birthday: OKLCH hue = the Sun's ecliptic longitude on that day.
const RAD = Math.PI / 180;

// Apparent solar ecliptic longitude in degrees (Astronomical Almanac low-precision
// formula, accurate to about 0.01°). Every day is evaluated at 12:00 UTC in the
// year 2000, a leap year, so 29 February has a value too.
export function solarLongitude(month, day) {
  const jd = Date.UTC(2000, month - 1, day, 12) / 86400000 + 2440587.5;
  const n = jd - 2451545.0;
  const L = 280.46 + 0.9856474 * n;
  const g = (357.528 + 0.9856003 * n) * RAD;
  const lambda = L + 1.915 * Math.sin(g) + 0.02 * Math.sin(2 * g);
  return ((lambda % 360) + 360) % 360;
}

function oklchToLinearSrgb(L, C, h) {
  const a = C * Math.cos(h * RAD);
  const b = C * Math.sin(h * RAD);
  const l = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3;
  const m = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3;
  const s = (L - 0.0894841775 * a - 1.291485548 * b) ** 3;
  return [
    4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
  ];
}

const encode = (x) => (x <= 0.0031308 ? 12.92 * x : 1.055 * x ** (1 / 2.4) - 0.055);

export function oklchToHex(L, C, h) {
  return (
    '#' +
    oklchToLinearSrgb(L, C, h)
      .map((x) => Math.round(Math.min(1, Math.max(0, encode(x))) * 255).toString(16).padStart(2, '0'))
      .join('')
  );
}

export function inSrgbGamut(L, C, h) {
  return oklchToLinearSrgb(L, C, h).every((x) => x >= -1e-4 && x <= 1 + 1e-4);
}

// Each day uses the most vivid colour its hue can have on screen: for that hue,
// the lightness between LIGHTNESS.min and LIGHTNESS.max with the highest chroma
// that still fits in sRGB. The range keeps lines visible on both light and dark
// backgrounds, since the pattern has no background of its own.
export const LIGHTNESS = { min: 0.5, max: 0.75 };
const CHROMA_MARGIN = 0.98;

function maxChroma(L, h) {
  let lo = 0;
  let hi = 0.4;
  for (let i = 0; i < 25; i++) {
    const c = (lo + hi) / 2;
    if (inSrgbGamut(L, c, h)) lo = c;
    else hi = c;
  }
  return lo;
}

export function vividOklch(h) {
  let best = { L: LIGHTNESS.min, C: 0 };
  for (let i = 0; i <= 50; i++) {
    const L = LIGHTNESS.min + ((LIGHTNESS.max - LIGHTNESS.min) * i) / 50;
    const C = maxChroma(L, h);
    if (C > best.C) best = { L, C };
  }
  return { L: best.L, C: best.C * CHROMA_MARGIN, h };
}

export function palette(month, day) {
  const h = solarLongitude(month, day);
  const { L, C } = vividOklch(h);
  return { hue: h, line: oklchToHex(L, C, h) };
}
