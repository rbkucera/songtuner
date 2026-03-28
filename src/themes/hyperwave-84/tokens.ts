import type { ThemeTokens } from '../types';

export const tokens: ThemeTokens = {
  fontUrl: 'https://fonts.googleapis.com/css2?family=Audiowide&family=Space+Mono:wght@400;700&display=swap',
  fontDisplay: "'Audiowide', system-ui, sans-serif",
  fontReadout: "'Space Mono', ui-monospace, monospace",

  colorBg: '#070816',
  colorPanel: '#0f1026',
  colorPanelTranslucent: 'rgba(11, 14, 38, 0.92)',
  colorText: '#f5eefe',
  colorMuted: '#7d7ca3',
  colorAccent: '#ff47b5',
  colorAccentDark: '#6b1e63',
  colorInTune: '#5ffbff',
  colorError: '#ff667f',
  borderSubtle: '#2a2f5d',

  bgTexture: 'linear-gradient(180deg, rgba(255,71,181,0.07), rgba(95,251,255,0.03)), repeating-linear-gradient(90deg, rgba(95,251,255,0.08) 0px, rgba(95,251,255,0.08) 1px, transparent 1px, transparent 40px), repeating-linear-gradient(0deg, rgba(255,71,181,0.06) 0px, rgba(255,71,181,0.06) 1px, transparent 1px, transparent 40px)',
  bgTextureSize: 'auto, 40px 40px, 40px 40px',

  neonPink: '#ff47b5',
  neonPinkSoft: 'rgba(255, 71, 181, 0.2)',
  neonCyan: '#5ffbff',
  neonCyanSoft: 'rgba(95, 251, 255, 0.18)',
  plasmaPurple: '#8b5cff',
  plasmaPurpleSoft: 'rgba(139, 92, 255, 0.18)',
  warningAmber: '#ffb347',
  glassFill: 'rgba(12, 16, 40, 0.72)',
  glassStroke: 'rgba(95, 251, 255, 0.26)',
  panelGlow: '0 0 0 1px rgba(95,251,255,0.08), inset 0 1px 0 rgba(255,255,255,0.05), 0 0 28px rgba(139,92,255,0.15)',
  textGlowPink: '0 0 12px rgba(255, 71, 181, 0.55)',
  textGlowCyan: '0 0 12px rgba(95, 251, 255, 0.6)',
};
