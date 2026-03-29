# Creating a Theme

A theme controls all visual design aspects of the tuner — colors, fonts, textures, effects, and even the rendering of individual UI components (e.g., replacing an LED bar graph with an analog needle gauge). Themes do **not** control the order or structural layout of the page.

## Quick Start

1. Create a folder: `src/themes/my-theme/`
2. Create `tokens.ts` with your design tokens
3. Create component overrides for any slots you want to customize
4. Create `index.ts` exporting a `ThemeDefinition`
5. Register in `src/themes/registry.ts` (one import + one line)

That's it. No other files need to be modified.

## File Structure

```
src/themes/my-theme/
  index.ts          ← exports ThemeDefinition (required)
  tokens.ts         ← design tokens (required)
  PitchMeter.tsx    ← custom component overrides (optional)
  Header.tsx        ← ...
  ...
```

## Tokens

Every theme must provide the required tokens defined in `ThemeTokens` (`src/themes/types.ts`). These control the layout skeleton's colors and the default slot components.

### Required Tokens

```ts
import type { ThemeTokens } from '../types';

export const tokens: ThemeTokens = {
  // Fonts — Google Fonts URL (or '' for system fonts only)
  fontUrl: 'https://fonts.googleapis.com/css2?family=Your+Font&display=swap',
  fontDisplay: "'Your Font', system-ui, sans-serif",   // headings, labels, buttons
  fontReadout: "'Courier New', monospace",              // numeric readouts

  // Core colors — these are used by the layout skeleton and default components
  colorBg: '#000000',              // page background
  colorPanel: '#111111',           // controls area background
  colorPanelTranslucent: '#222',   // display area background (can be light or dark)
  colorText: '#ffffff',            // primary text
  colorMuted: '#888888',           // secondary / dimmed text
  colorAccent: '#ff0000',          // accent color (borders, highlights)
  colorAccentDark: '#aa0000',      // darker accent
  colorInTune: '#00ff00',          // "in tune" indicator color
  colorError: '#ff0000',           // error messages
  borderSubtle: '#333333',         // subtle borders

  // Background texture (CSS values, or 'none')
  bgTexture: 'none',              // CSS background-image value
  bgTextureSize: '0',             // CSS background-size value
};
```

### Custom Tokens

You can add any extra keys for your own components. The `[key: string]` index signature allows it:

```ts
export const tokens: ThemeTokens = {
  // ... required tokens ...

  // Your theme-specific tokens:
  needleColor: '#1a1a1a',
  dialFaceGradient: 'radial-gradient(...)',
  brass: '#c4a44a',
};
```

Access them in your components via `useTheme().theme.tokens.needleColor`.

### How Tokens Affect the Layout

The layout skeleton (`TunerPage.tsx`) reads several tokens directly:

| Token | Used for |
|-------|----------|
| `colorPanelTranslucent` | Display area background — set this to cream for a light dial, dark for an LED panel |
| `colorPanel` | Controls area background |
| `colorAccent` | Controls area top border |
| `borderSubtle` | Display area bottom border |
| `fontDisplay` | Error message font |
| `colorError` | Error message color |

**Key insight**: `colorPanelTranslucent` controls the main display area background. PITCHBLCK sets it to a dark translucent value; Analog Reborn sets it to cream `#f0ead8` to create the dial face. This one token fundamentally changes the feel.

## Component Slots

The tuner has 6 visual slots. Each has a strict props interface. You can override any subset — slots you don't override use a token-driven default implementation.

### Slot: Header

```ts
interface HeaderProps {}
```

Brand area at the top. No props — full creative freedom. Tapping the header opens the theme chooser (handled by the skeleton, not your component).

### Slot: NoteDisplay

```ts
interface NoteDisplayProps {
  detected: DetectedString | null;  // null when no pitch detected
  isListening: boolean;             // false before user taps start
}
```

Shows the detected note name, octave, and frequency. Must handle two states:
- `detected === null` — no pitch detected. Render a placeholder to maintain vertical space (e.g., a dimmed `--`). The skeleton shows a semi-transparent overlay with a prompt ("TAP START TO BEGIN" / "PLAY A STRING") on top.
- `detected !== null` — active detection with note data

`DetectedString` fields: `noteName` ("E2"), `detectedFrequency` (Hz), `centsOff`, `inTune`, `stringIndex`, `targetFrequency`.

### Slot: PitchMeter

```ts
interface PitchMeterProps {
  centsOff: number;   // negative = flat, positive = sharp
  inTune: boolean;    // true when |centsOff| <= 5
}
```

The main cents visualization. This is where themes differ most — LED bar graph, needle gauge, oscilloscope, whatever you want. Always rendered (even when idle with `centsOff: 0, inTune: false`). When no note is detected, a semi-transparent overlay covers the display area with a prompt.

`centsOff` range is roughly -50 to +50 in practice. Values are already EMA-smoothed upstream — **do not add CSS transitions** to the indicator position or you'll get double-buffered lag.

### Slot: StringIndicator

```ts
interface StringIndicatorProps {
  tuning: TuningDefinition;         // has noteNames[], stringCount, etc.
  activeStringIndex: number | null; // which string is detected (0 = lowest)
  inTune: boolean;
}
```

Displays the instrument's strings. Always rendered (even when idle, with `activeStringIndex: null`). `tuning.noteNames` is ordered low to high (e.g., `['E2','A2','D3','G3','B3','E4']`). Use `getStringLabel(index, total)` from `src/lib/pitchUtils.ts` for display numbers.

### Slot: ActionButton

```ts
interface ActionButtonProps {
  isListening: boolean;
  onClick: () => void;
}
```

Start/stop button. Show different visual states for listening vs idle.

### Slot: TuningSelector

```ts
interface TuningSelectorProps {
  selected: TuningDefinition;
  onChange: (tuning: TuningDefinition) => void;
}
```

Tuning dropdown. Use `GUITAR_TUNINGS` and `BASS_TUNINGS` from `src/lib/tunings.ts` to populate options. Call `onChange` with the selected `TuningDefinition` object.

## Theme Definition

Wire everything together in `index.ts`:

```ts
import type { ThemeDefinition } from '../types';
import { tokens } from './tokens';
import { MyHeader } from './Header';
import { MyMeter } from './PitchMeter';

const myTheme: ThemeDefinition = {
  id: 'my-theme',           // unique slug, used as registry key
  name: 'My Theme',         // display name shown in theme chooser
  tokens,
  components: {
    Header: MyHeader,        // custom header
    PitchMeter: MyMeter,     // custom meter
    // NoteDisplay, StringIndicator, ActionButton, TuningSelector
    // → omitted, so they use the token-driven defaults
  },
};

export default myTheme;
```

## Register the Theme

In `src/themes/registry.ts`, add one import and one entry:

```ts
import myTheme from './my-theme';

export const themes: Record<string, ThemeDefinition> = {
  pitchblck,
  'analog-reborn': analogReborn,
  'my-theme': myTheme,          // ← add this
};
```

## Accessing Theme Data in Components

```ts
import { useTheme } from '../useTheme';

function MyComponent() {
  const { theme, themeId, setTheme } = useTheme();
  const t = theme.tokens;

  return <div style={{ color: t.colorText as string }}>...</div>;
}
```

## Existing Themes for Reference

| Theme | Overrides | Style |
|-------|-----------|-------|
| **PITCHBLCK** (`src/themes/pitchblck/`) | Header, PitchMeter, ActionButton | LED bar graph, speaker cloth, rose gold chrome |
| **Analog Reborn** (`src/themes/analog-reborn/`) | All 6 slots | SVG needle gauge, bakelite, chrome, serif typography |

Study these for examples of token usage, SVG rendering, and material effects.
