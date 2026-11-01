# 16types-crest

Original flag-style crests for the 16 four-letter personality types, made to drop into a GitHub profile README.

<p align="center">
  <img src="dist/card/entj.svg" alt="ENTJ card" />
</p>

## Usage

Pick your type, then copy one of the snippets below into your README. Replace `entj` with your own four letters in lowercase.

### Card

```md
![ENTJ](https://cdn.jsdelivr.net/gh/TakakiMoriguchi/16types-crest@v1/dist/card/entj.svg)
```

For light backgrounds, add `-light`:

```md
![ENTJ](https://cdn.jsdelivr.net/gh/TakakiMoriguchi/16types-crest@v1/dist/card/entj-light.svg)
```

### Badge

<img src="dist/badge/entj.svg" alt="ENTJ badge" />

```md
![ENTJ](https://cdn.jsdelivr.net/gh/TakakiMoriguchi/16types-crest@v1/dist/badge/entj.svg)
```

### Flag only

<img src="dist/flag/entj.svg" width="150" alt="ENTJ flag" />

```md
<img src="https://cdn.jsdelivr.net/gh/TakakiMoriguchi/16types-crest@v1/dist/flag/entj.svg" width="150" alt="ENTJ" />
```

## Gallery

| | | | | |
|---|---|---|---|---|
| **NT** | <img src="dist/flag/intj.svg" width="120" alt="INTJ" /><br><code>intj</code> | <img src="dist/flag/intp.svg" width="120" alt="INTP" /><br><code>intp</code> | <img src="dist/flag/entj.svg" width="120" alt="ENTJ" /><br><code>entj</code> | <img src="dist/flag/entp.svg" width="120" alt="ENTP" /><br><code>entp</code> |
| **NF** | <img src="dist/flag/infj.svg" width="120" alt="INFJ" /><br><code>infj</code> | <img src="dist/flag/infp.svg" width="120" alt="INFP" /><br><code>infp</code> | <img src="dist/flag/enfj.svg" width="120" alt="ENFJ" /><br><code>enfj</code> | <img src="dist/flag/enfp.svg" width="120" alt="ENFP" /><br><code>enfp</code> |
| **SJ** | <img src="dist/flag/istj.svg" width="120" alt="ISTJ" /><br><code>istj</code> | <img src="dist/flag/isfj.svg" width="120" alt="ISFJ" /><br><code>isfj</code> | <img src="dist/flag/estj.svg" width="120" alt="ESTJ" /><br><code>estj</code> | <img src="dist/flag/esfj.svg" width="120" alt="ESFJ" /><br><code>esfj</code> |
| **SP** | <img src="dist/flag/istp.svg" width="120" alt="ISTP" /><br><code>istp</code> | <img src="dist/flag/isfp.svg" width="120" alt="ISFP" /><br><code>isfp</code> | <img src="dist/flag/estp.svg" width="120" alt="ESTP" /><br><code>estp</code> | <img src="dist/flag/esfp.svg" width="120" alt="ESFP" /><br><code>esfp</code> |

## How the flags work

Every flag is built from the four letters, so no two types share a flag.

| Letter | Element | |
|---|---|---|
| E / I | Layout | E: horizontal triband. I: vertical hoist bar. |
| N / S | Colour | NT: navy and gold. NF: plum and blush. SJ: teal and cream. SP: vermilion and yellow. |
| T / F | Emblem | T: four-point star. F: sun disc with a ring. |
| J / P | Pattern | J: straight pinstripes. P: diagonal sash. |

## Building

The SVGs in `dist/` are generated. To change a design, edit `build.mjs` and run:

```sh
node build.mjs
```

No dependencies are needed. Commit the regenerated `dist/` together with your change.

## Contributing

Issues and pull requests are welcome, for example new styles, themes, or design fixes.

## Disclaimer

This project is not affiliated with, endorsed by, or connected to 16Personalities (NERIS Analytics Limited), The Myers-Briggs Company, or any other personality assessment provider. All flag designs are original. The four-letter codes and the single trait words are used only to describe each type.

## License

[MIT](LICENSE)
