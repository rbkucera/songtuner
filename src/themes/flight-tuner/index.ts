import type { ThemeDefinition } from '../types';
import { tokens } from './tokens';
import { FlightTunerHeader } from './Header';
import { FlightTunerNoteDisplay } from './NoteDisplay';
import { FlightTunerPitchMeter } from './PitchMeter';
import { FlightTunerStringIndicator } from './StringIndicator';
import { FlightTunerActionButton } from './ActionButton';
import { FlightTunerTuningSelector } from './TuningSelector';

const flightTuner: ThemeDefinition = {
  id: 'flight-tuner',
  name: 'Flight Tuner',
  tokens,
  components: {
    Header: FlightTunerHeader,
    NoteDisplay: FlightTunerNoteDisplay,
    PitchMeter: FlightTunerPitchMeter,
    StringIndicator: FlightTunerStringIndicator,
    ActionButton: FlightTunerActionButton,
    TuningSelector: FlightTunerTuningSelector,
  },
};

export default flightTuner;
