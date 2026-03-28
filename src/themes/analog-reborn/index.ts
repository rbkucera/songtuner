import type { ThemeDefinition } from '../types';
import { tokens } from './tokens';
import { AnalogHeader } from './Header';
import { AnalogNoteDisplay } from './NoteDisplay';
import { AnalogMeter } from './PitchMeter';
import { AnalogStringIndicator } from './StringIndicator';
import { AnalogButton } from './ActionButton';
import { AnalogTuningSelector } from './TuningSelector';

const analogReborn: ThemeDefinition = {
  id: 'analog-reborn',
  name: 'Analog Reborn',
  tokens,
  components: {
    Header: AnalogHeader,
    NoteDisplay: AnalogNoteDisplay,
    PitchMeter: AnalogMeter,
    StringIndicator: AnalogStringIndicator,
    ActionButton: AnalogButton,
    TuningSelector: AnalogTuningSelector,
  },
};

export default analogReborn;
