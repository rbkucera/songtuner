import type { ThemeDefinition } from '../types';
import { tokens } from './tokens';
import { HyperwaveHeader } from './Header';
import { HyperwaveNoteDisplay } from './NoteDisplay';
import { HyperwavePitchMeter } from './PitchMeter';
import { HyperwaveStringIndicator } from './StringIndicator';
import { HyperwaveActionButton } from './ActionButton';
import { HyperwaveTuningSelector } from './TuningSelector';

const hyperwave84: ThemeDefinition = {
  id: 'hyperwave-84',
  name: 'Hyperwave 84',
  tokens,
  components: {
    Header: HyperwaveHeader,
    NoteDisplay: HyperwaveNoteDisplay,
    PitchMeter: HyperwavePitchMeter,
    StringIndicator: HyperwaveStringIndicator,
    ActionButton: HyperwaveActionButton,
    TuningSelector: HyperwaveTuningSelector,
  },
};

export default hyperwave84;
