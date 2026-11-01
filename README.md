# 16types-crest

A seamless line pattern made from your four-letter personality type and your birthday. Every type and every day of the year gives a different pattern, 5,856 in total.

<p align="center">
  <img src="docs/figures/type-entj.svg" width="96" alt="ENTJ, 13 April" />
  <img src="docs/figures/type-infp.svg" width="96" alt="INFP, 13 April" />
  <img src="docs/figures/type-istj.svg" width="96" alt="ISTJ, 13 April" />
  <img src="docs/figures/type-esfp.svg" width="96" alt="ESFP, 13 April" />
</p>

## Usage

Use the four letters you got from a test such as 16Personalities, and your birthday as month and day (`MMDD`).

```
https://takakimoriguchi.github.io/16types-crest/{type}/{MMDD}.svg
```

For example, ENTJ born on 13 April:

```md
![ENTJ](https://takakimoriguchi.github.io/16types-crest/entj/0413.svg)
```

The image is one tile that repeats without seams, so it also works as a background:

```css
background: url(https://takakimoriguchi.github.io/16types-crest/entj/0413.svg) repeat;
```

You can also pick your type and birthday on the [pattern page](https://takakimoriguchi.github.io/16types-crest/) and copy the snippet from there.

> The URL is public. Anyone who reads your README can see the month and day in it. The year is never used.

## How the shapes work

Each pair of letters draws one layer of thin lines. The four layers are stacked into one 100 x 100 tile.

<table>
  <tr>
    <th>Letters</th>
    <th colspan="2">Shape</th>
    <th>Rule</th>
    <th>Why</th>
  </tr>
  <tr>
    <td><b>N / S</b></td>
    <td align="center"><img src="docs/figures/n.svg" width="72" alt="N: diagonal cross" /><br><b>N</b></td>
    <td align="center"><img src="docs/figures/s.svg" width="72" alt="S: upright cross" /><br><b>S</b></td>
    <td>Cross through the centre.<br>N: diagonal ×<br>S: upright +</td>
    <td>Intuitive leaves the vertical and horizontal grid and jumps across it. Observant stays on the real-world axes, grounded in what can be seen.</td>
  </tr>
  <tr>
    <td><b>T / F</b></td>
    <td align="center"><img src="docs/figures/t.svg" width="72" alt="T: vertical lines" /><br><b>T</b></td>
    <td align="center"><img src="docs/figures/f.svg" width="72" alt="F: horizontal lines" /><br><b>F</b></td>
    <td>Two lines.<br>T: vertical<br>F: horizontal</td>
    <td>Thinking builds a vertical line of reasoning, one step on top of another. Feeling spreads sideways, as connection between people.</td>
  </tr>
  <tr>
    <td><b>E / I</b></td>
    <td align="center"><img src="docs/figures/e.svg" width="72" alt="E: diamond" /><br><b>E</b></td>
    <td align="center"><img src="docs/figures/i.svg" width="72" alt="I: circle" /><br><b>I</b></td>
    <td>Outer shape.<br>E: diamond<br>I: circle</td>
    <td>The four corners of the diamond point outward, like energy going out. The circle is closed and complete in itself, like energy kept inside.</td>
  </tr>
  <tr>
    <td><b>J / P</b></td>
    <td align="center"><img src="docs/figures/j.svg" width="72" alt="J: square" /><br><b>J</b></td>
    <td align="center"><img src="docs/figures/p.svg" width="72" alt="P: circle" /><br><b>P</b></td>
    <td>Centre shape.<br>J: square<br>P: circle</td>
    <td>Straight edges and corners make clear boundaries, like a plan. A circle has no corners and can turn any way, like an open, flexible approach.</td>
  </tr>
</table>

### Weaving

The layers are woven. Where an upper layer crosses a lower one, the lower line gets a short gap, so it looks like it passes underneath. From bottom to top the order is T / F, N / S, E / I, J / P. The row below shows each layer of ENTJ on its own, in the order of the letters.

<table>
  <tr>
    <td align="center"><img src="docs/figures/build-1.svg" width="72" alt="" /><br>E</td>
    <td align="center">+</td>
    <td align="center"><img src="docs/figures/build-2.svg" width="72" alt="" /><br>N</td>
    <td align="center">+</td>
    <td align="center"><img src="docs/figures/build-3.svg" width="72" alt="" /><br>T</td>
    <td align="center">+</td>
    <td align="center"><img src="docs/figures/build-4.svg" width="72" alt="" /><br>J</td>
    <td align="center">=</td>
    <td align="center"><img src="docs/figures/build-result.svg" width="72" alt="ENTJ, 13 April" /><br>ENTJ</td>
  </tr>
</table>

## How the colour works

The colour comes from where the Sun is on your birthday.

| | Rule | Why |
|---|---|---|
| Hue | The Sun's ecliptic longitude on that day, used directly as the hue angle | Over one year the Sun moves once around the ecliptic, 0° to 360°, just as hue goes once around the colour wheel. Every day gets its own colour. |
| Lightness and chroma | The most vivid colour of that hue that a screen can show, with lightness kept between 0.50 and 0.75 | Every day gets its colour at full strength. The lightness range keeps the lines visible on both light and dark pages. |
| Background | None, only the lines are drawn | The pattern sits on any background. |
| Colour space | OKLCH | Lightness and vividness are measured the way the eye sees them, so the most vivid point of each hue can be found fairly. |

<p align="center"><img src="docs/figures/hue-strip.svg" alt="Line colour for every day from January to December" /></p>

| Day | Sun's longitude | Hue |
|---|---|---|
| March equinox (about 20 March) | 0° | red-pink |
| June solstice (about 21 June) | 90° | yellow |
| September equinox (about 22 September) | 180° | green-cyan |
| December solstice (about 21 December) | 270° | blue |

ENTJ through the year:

<p align="center">
  <img src="docs/figures/day-0115.svg" width="64" alt="15 January" />
  <img src="docs/figures/day-0320.svg" width="64" alt="20 March" />
  <img src="docs/figures/day-0505.svg" width="64" alt="5 May" />
  <img src="docs/figures/day-0621.svg" width="64" alt="21 June" />
  <img src="docs/figures/day-0810.svg" width="64" alt="10 August" />
  <img src="docs/figures/day-0922.svg" width="64" alt="22 September" />
  <img src="docs/figures/day-1101.svg" width="64" alt="1 November" />
  <img src="docs/figures/day-1221.svg" width="64" alt="21 December" />
</p>

The longitude is computed with the low-precision formula from the Astronomical Almanac, for each day at 12:00 UTC in the year 2000. 2000 is a leap year, so 29 February is included.

## All 16 types

On 13 April:

| | | | |
|---|---|---|---|
| <img src="docs/figures/type-intj.svg" width="80" alt="INTJ" /><br><code>intj</code> | <img src="docs/figures/type-intp.svg" width="80" alt="INTP" /><br><code>intp</code> | <img src="docs/figures/type-entj.svg" width="80" alt="ENTJ" /><br><code>entj</code> | <img src="docs/figures/type-entp.svg" width="80" alt="ENTP" /><br><code>entp</code> |
| <img src="docs/figures/type-infj.svg" width="80" alt="INFJ" /><br><code>infj</code> | <img src="docs/figures/type-infp.svg" width="80" alt="INFP" /><br><code>infp</code> | <img src="docs/figures/type-enfj.svg" width="80" alt="ENFJ" /><br><code>enfj</code> | <img src="docs/figures/type-enfp.svg" width="80" alt="ENFP" /><br><code>enfp</code> |
| <img src="docs/figures/type-istj.svg" width="80" alt="ISTJ" /><br><code>istj</code> | <img src="docs/figures/type-isfj.svg" width="80" alt="ISFJ" /><br><code>isfj</code> | <img src="docs/figures/type-estj.svg" width="80" alt="ESTJ" /><br><code>estj</code> | <img src="docs/figures/type-esfj.svg" width="80" alt="ESFJ" /><br><code>esfj</code> |
| <img src="docs/figures/type-istp.svg" width="80" alt="ISTP" /><br><code>istp</code> | <img src="docs/figures/type-isfp.svg" width="80" alt="ISFP" /><br><code>isfp</code> | <img src="docs/figures/type-estp.svg" width="80" alt="ESTP" /><br><code>estp</code> | <img src="docs/figures/type-esfp.svg" width="80" alt="ESFP" /><br><code>esfp</code> |

## Building

No dependencies are needed.

```sh
node build.mjs          # all 5,856 patterns into dist/
node docs/figures.mjs   # the figures in this README
node --test test/*.test.mjs
```

`dist/` is not committed. On every push to `main`, GitHub Actions builds it and publishes it to GitHub Pages.

## Contributing

Issues and pull requests are welcome.

## Support

If you like this project, you can [buy me a beer](https://buymeacoffee.com/takakimoriguchi).

## Disclaimer

This project is not affiliated with, endorsed by, or connected to 16Personalities (NERIS Analytics Limited), The Myers-Briggs Company, or any other personality assessment provider. All designs are original. The four-letter codes and the single trait words are used only to describe each type.

## License

[MIT](LICENSE)
