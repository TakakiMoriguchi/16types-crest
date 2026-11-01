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

// Lightness and chroma are the same for every day, so no birthday looks louder
// than another. Both colours stay inside sRGB for all hues (checked in tests).
export const LINE = { L: 0.75, C: 0.127 };
export const BACKGROUND = { L: 0.27, C: 0.04 };

export function palette(month, day) {
  const h = solarLongitude(month, day);
  return {
    hue: h,
    line: oklchToHex(LINE.L, LINE.C, h),
    background: oklchToHex(BACKGROUND.L, BACKGROUND.C, h),
  };
}
