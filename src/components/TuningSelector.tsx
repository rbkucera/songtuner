import { GUITAR_TUNINGS, BASS_TUNINGS } from '../lib/tunings';
import type { TuningDefinition } from '../types/song';

interface TuningSelectorProps {
  selected: TuningDefinition;
  onChange: (tuning: TuningDefinition) => void;
}

export function TuningSelector({ selected, onChange }: TuningSelectorProps) {
  return (
    <div className="px-4">
      <label className="text-text-secondary text-sm block mb-2">Tuning</label>
      <select
        value={selected.name}
        onChange={(e) => {
          const all = [...GUITAR_TUNINGS, ...BASS_TUNINGS];
          const tuning = all.find(t => t.name === e.target.value);
          if (tuning) onChange(tuning);
        }}
        className="w-full bg-bg-card text-text-primary border border-text-secondary/20 rounded-lg px-4 py-3 text-base appearance-none"
      >
        <optgroup label="Guitar">
          {GUITAR_TUNINGS.map(t => (
            <option key={t.name} value={t.name}>
              {t.displayName} ({t.noteNames.join(' ')})
            </option>
          ))}
        </optgroup>
        <optgroup label="Bass">
          {BASS_TUNINGS.map(t => (
            <option key={t.name} value={t.name}>
              {t.displayName} ({t.noteNames.join(' ')})
            </option>
          ))}
        </optgroup>
      </select>
    </div>
  );
}
