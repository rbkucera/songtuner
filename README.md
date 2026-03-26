# SongTuner

A guitar tuning app that knows what tuning your favorite songs use. Built for mobile Safari on iPhone.

## Current State (Phase 1)

Standalone guitar/bass tuner with real-time pitch detection via the device microphone. Supports 11 tunings across guitar and bass.

### Features

- Real-time pitch detection using the McLeod Pitch Method (`pitchy` library)
- Auto-detects which string you're playing
- Visual pitch meter with cents-off readout and flat/sharp guidance
- Supports 11 tunings:
  - **Guitar**: Standard, Drop D, Open G, Open D, Open E, DADGAD, Half Step Down, Drop C
  - **Bass**: Standard (4-string), 5-String, Drop D
- EMA smoothing for stable readings, even on unplugged electric guitars
- Dark theme, mobile-first UI

### Planned (Phase 2+)

- Song search by artist + title (via Songsterr API + Claude AI fallback)
- Per-song instrument roles (lead guitar, rhythm guitar, bass)
- Auto-select the correct tuning for a song
- PHP + MySQL backend for caching song data (Dreamhost)

## Development

### Prerequisites

- Node.js 18+
- npm

### Setup

```bash
npm install
npm run dev
```

Open on your phone (same network) or use the local URL. The tuner requires microphone access — tap "Start Tuning" to begin.

### Build for Production

```bash
npm run build
```

This produces a `dist/` folder with static files (HTML, CSS, JS). Asset paths are relative (`base: './'`), so the build works in any subdirectory.

### Deploy to Dreamhost

1. Run `npm run build` locally
2. Upload the contents of `dist/` to your Dreamhost directory (e.g., `~/rycera.com/tuner/`)
3. The included `.htaccess` handles SPA routing on Apache

## Tech Stack

- React 18 + TypeScript + Vite
- Tailwind CSS v4
- Web Audio API + `pitchy` (McLeod Pitch Method)
- Deployed as static files on Dreamhost shared hosting
