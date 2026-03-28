import type { ThemeTokens } from '../types';

export const tokens: ThemeTokens = {
  // Fonts
  fontUrl: 'https://fonts.googleapis.com/css2?family=Courier+Prime&family=DM+Serif+Display:ital@0;1&display=swap',
  fontDisplay: "'DM Serif Display', Georgia, serif",
  fontReadout: "'Courier Prime', 'Courier New', monospace",

  // Core colors — these control the layout skeleton
  colorBg: '#1c1814',                 // bakelite body
  colorPanel: '#2a2420',              // bakelite controls area
  colorPanelTranslucent: '#f0ead8',   // cream dial face (display area bg)
  colorText: '#2a2420',               // dark text on cream
  colorMuted: '#8a8070',              // subdued text
  colorAccent: '#a0a0a0',            // chrome — skeleton border color
  colorAccentDark: '#686868',         // chrome shadow
  colorInTune: '#2a8a3a',            // vintage green
  colorError: '#b83030',             // vintage red
  borderSubtle: '#3a3430',           // dark bakelite border

  // No texture — solid bakelite
  bgTexture: 'none',
  bgTextureSize: '0',

  // Analog-specific tokens
  brass: '#c4a44a',
  cream: '#f0ead8',
  creamDark: '#d4ccb8',
  needleColor: '#1a1a1a',
  chromeHi: '#d8d8d8',
  chromeMid: '#a0a0a0',
  chromeLo: '#686868',
  vintageAmber: '#c49020',
  vintageRed: '#b83030',
  bakelite: '#1c1814',
  bakeliteLight: '#2a2420',
  textOnBakelite: '#e8e2d6',
};
