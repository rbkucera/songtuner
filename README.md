# PITCHBLCK

A themeable guitar and bass tuner with real-time pitch detection. Built for mobile Safari on iPhone.

## Features

- Real-time pitch detection using the McLeod Pitch Method (`pitchy` library)
- Auto-detects which string you're playing
- Hysteresis string locking prevents harmonic jumping mid-tune
- Octave error correction for reliable low-string detection
- EMA smoothing for stable readings, even on unplugged electric guitars
- Supports 11 tunings:
  - **Guitar**: Standard, Drop D, Open G, Open D, Open E, DADGAD, Half Step Down, Drop C
  - **Bass**: Standard (4-string), 5-String, Drop D
- Themeable component architecture — tap the header to switch themes

## Themes

Two built-in themes ship with the app:

- **PITCHBLCK** — LED bar graph meter, woven speaker-cloth texture, rose gold chrome, Orbitron typeface. Inspired by death metal, Tool, and premium guitar gear.
- **Analog Reborn** — SVG needle gauge over a cream graduated dial, black bakelite housing, chrome hardware, DM Serif Display typography. Inspired by 1950s analog instrumentation.

See [`src/themes/README.md`](src/themes/README.md) for how to create your own theme.

## Roadmap

- Theme gallery / community themes
- Reference tone playback (tap a string to hear the target pitch)
- Custom tuning editor
- PWA offline support with app manifest
- Visual/haptic feedback when string is in tune

## Development

### Prerequisites

- Node.js 18+
- npm

### Setup

```bash
npm install
npm run dev
```

Open on your phone (same network) or use the local URL. The tuner requires microphone access — tap the start button to begin.

### Build for Production

```bash
npm run build
```

Produces a `dist/` folder with static files (HTML, CSS, JS). Asset paths are relative (`base: './'`), so the build works in any subdirectory.

### Deploy

1. Run `npm run build` locally
2. Upload the contents of `dist/` to your web server (e.g., `~/rycera.com/tuner/`)
3. The included `.htaccess` handles SPA routing on Apache

## Tech Stack

- React 19 + TypeScript + Vite
- Tailwind CSS v4
- Web Audio API + `pitchy` (McLeod Pitch Method)
- Component-level theme system with design tokens
- Deployed as static files
