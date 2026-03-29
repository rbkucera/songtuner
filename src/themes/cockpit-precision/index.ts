import type { ThemeDefinition } from '../types';
import { tokens } from './tokens';
import { CockpitHeader } from './Header';
import { CockpitMeter } from './PitchMeter';
import { CockpitButton } from './ActionButton';

const cockpitPrecision: ThemeDefinition = {
  id: 'cockpit-precision',
  name: 'Cockpit Precision',
  tokens,
  components: {
    Header: CockpitHeader,
    PitchMeter: CockpitMeter,
    ActionButton: CockpitButton,
  },
};

export default cockpitPrecision;
