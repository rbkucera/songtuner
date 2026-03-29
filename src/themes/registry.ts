import type { ThemeDefinition } from './types';
import pitchblck from './pitchblck';
import analogReborn from './analog-reborn';
import hyperwave84 from './hyperwave-84';
import flightTuner from './flight-tuner';
// To add a theme: import it and add to the themes object below.

export const themes: Record<string, ThemeDefinition> = {
  pitchblck,
  'analog-reborn': analogReborn,
  'hyperwave-84': hyperwave84,
  'flight-tuner': flightTuner,
};

export const defaultThemeId = 'pitchblck';
