import type { ThemeTokens } from '../types';

export const tokens: ThemeTokens = {
  // Fonts — B612 Mono was designed by Airbus for cockpit screens
  fontUrl: 'https://fonts.googleapis.com/css2?family=B612+Mono:wght@400;700&family=Rajdhani:wght@500;600;700&display=swap',
  fontDisplay: "'Rajdhani', system-ui, sans-serif",
  fontReadout: "'B612 Mono', ui-monospace, monospace",

  // Core colors — dark instrument panel
  colorBg: '#1a1d21',
  colorPanel: '#22262b',
  colorPanelTranslucent: '#1a1d21',
  colorText: '#e8e4dc',
  colorMuted: '#6b7280',
  colorAccent: '#d4a24e',
  colorAccentDark: '#8a6a2e',
  colorInTune: '#4ade80',
  colorError: '#ef4444',
  borderSubtle: '#2e3338',

  // No texture — clean panel
  bgTexture: 'none',
  bgTextureSize: '0',

  // Cockpit-specific tokens
  amber: '#d4a24e',
  amberDim: 'rgba(212,162,78,0.3)',
  needleOrange: '#e07020',
  greenZone: '#4ade80',
  redZone: '#dc2626',
  amberZone: '#d4a24e',
  plateColor: '#2a2e34',
  plateBorder: '#d4a24e',
};
