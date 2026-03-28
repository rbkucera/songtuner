import type { ThemeDefinition } from './types';
import pitchblck from './pitchblck';
import analogReborn from './analog-reborn';
// To add a theme: import it and add to the themes object below.

export const themes: Record<string, ThemeDefinition> = {
  pitchblck,
  'analog-reborn': analogReborn,
};

export const defaultThemeId = 'pitchblck';
