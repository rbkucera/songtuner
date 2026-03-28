import type { ThemeTokens } from '../types';

export const tokens: ThemeTokens = {
  fontUrl: 'https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Share+Tech+Mono&display=swap',
  fontDisplay: "'Orbitron', system-ui, sans-serif",
  fontReadout: "'Share Tech Mono', ui-monospace, monospace",

  colorBg: '#0b0b0c',
  colorPanel: '#141414',
  colorPanelTranslucent: 'rgba(20,20,20,0.7)',
  colorText: '#e8dcc8',
  colorMuted: '#6a6258',
  colorAccent: '#c4916a',
  colorAccentDark: '#8a5425',
  colorInTune: '#00e644',
  colorError: '#ff2200',
  borderSubtle: '#2a2018',

  bgTexture: 'repeating-linear-gradient(45deg,#161616 0px,#161616 1px,transparent 1px,transparent 5px),repeating-linear-gradient(-45deg,#161616 0px,#161616 1px,transparent 1px,transparent 5px)',
  bgTextureSize: '6px 6px',

  // PITCHBLCK-specific LED tokens
  ledGreenActive: '#00e644',
  ledGreenDim: 'rgba(0,230,68,0.07)',
  ledAmberActive: '#ff7700',
  ledAmberDim: 'rgba(255,119,0,0.07)',
  ledRedActive: '#ff2200',
  ledRedDim: 'rgba(255,34,0,0.07)',
};
