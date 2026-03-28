import type { ThemeDefinition } from './types';
import pitchblck from './pitchblck';
// To add a theme: import it and add to the themes object below.
// import myTheme from './my-theme';

export const themes: Record<string, ThemeDefinition> = {
  pitchblck,
};

export const defaultThemeId = 'pitchblck';
