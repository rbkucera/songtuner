import type { ThemeDefinition } from '../types';
import { tokens } from './tokens';
import { PitchBlckHeader } from './Header';
import { PitchBlckMeter } from './PitchMeter';
import { PitchBlckButton } from './ActionButton';

const pitchblck: ThemeDefinition = {
  id: 'pitchblck',
  name: 'PITCHBLCK',
  tokens,
  components: {
    Header: PitchBlckHeader,
    PitchMeter: PitchBlckMeter,
    ActionButton: PitchBlckButton,
  },
};

export default pitchblck;
