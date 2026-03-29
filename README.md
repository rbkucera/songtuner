# PITCHBLCK

A themeable guitar and bass tuner with real-time pitch detection. Works offline as a PWA — install it on your phone and tune anywhere, no internet required.

## Features

- Real-time pitch detection using the McLeod Pitch Method (`pitchy` library)
- Auto-detects which string you're playing
- Hysteresis string locking prevents harmonic jumping mid-tune
- Octave error correction for reliable low-string detection
- EMA smoothing for stable readings, even on unplugged electric guitars
- **PWA with offline support** — install to your home screen, works without internet
- Supports 11 tunings:
  - **Guitar**: Standard, Drop D, Open G, Open D, Open E, DADGAD, Half Step Down, Drop C
  - **Bass**: Standard (4-string), 5-String, Drop D
- Themeable component architecture — tap the header to switch themes

## Install on Your Phone

PITCHBLCK works as a Progressive Web App (PWA). After installing, it runs offline — no internet needed to tune.

### iPhone / iPad (Safari)

1. Open the app URL in **Safari**
2. Tap the **Share** button (square with arrow)
3. Scroll down and tap **Add to Home Screen**
4. Tap **Add**

### Android (Chrome)

1. Open the app URL in **Chrome**
2. Tap the **three-dot menu** (⋮)
3. Tap **Install app** or **Add to Home Screen**
4. Tap **Install**

Once installed, the app opens in standalone mode (no browser chrome) and works fully offline. Theme fonts are cached as you use them — switch to a theme while online and its fonts will be available offline too.

## Themes

Four built-in themes ship with the app:

- **PITCHBLCK** — LED bar graph meter, woven speaker-cloth texture, rose gold chrome, Orbitron typeface. Inspired by death metal, Tool, and premium guitar gear.
- **Analog Reborn** — SVG needle gauge over a cream graduated dial, black bakelite housing, chrome hardware, DM Serif Display typography. Inspired by 1950s analog instrumentation.
- **Hyperwave 84** — Neon cyberpunk LED bars with glow effects, glass morphism panels, Audiowide typeface. Inspired by retro arcade and synthwave aesthetics.
- **Cockpit Precision** — Aviation-inspired SVG dial gauge with dark instrument panel, amber accents, B612 Mono typeface (designed by Airbus for cockpit screens).

See [`src/themes/README.md`](src/themes/README.md) for how to create your own theme.

## Roadmap

- Theme gallery / community themes
- Reference tone playback (tap a string to hear the target pitch)
- Custom tuning editor
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
- PWA with offline support (`vite-plugin-pwa` + Workbox)
- Deployed as static files
