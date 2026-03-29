import type { ThemeDefinition } from './types';
import pitchblck from './pitchblck';
import hyperwave84 from './hyperwave-84';
import flightTuner from './flight-tuner';
// To add a theme: import it and add to the themes object below.

export const themes: Record<string, ThemeDefinition> = {
  pitchblck,
  'hyperwave-84': hyperwave84,
  'flight-tuner': flightTuner
};

export const defaultThemeId = 'pitchblck';
