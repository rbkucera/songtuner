import { GUITAR_TUNINGS, BASS_TUNINGS } from '../lib/tunings';
import type { TuningDefinition } from '../types/song';

interface TuningSelectorProps {
  selected: TuningDefinition;
  onChange: (tuning: TuningDefinition) => void;
}

export function TuningSelector({ selected, onChange }: TuningSelectorProps) {
  return (
    <div className="px-5">
      <label style={{
        display: 'block',
        fontFamily: 'var(--font-display)',
        fontSize: '10px',
        fontWeight: 700,
        letterSpacing: '0.2em',
        color: '#6a6258',
        marginBottom: '6px',
      }}>
        TUNING
      </label>
      <div style={{ position: 'relative' }}>
        <select
          value={selected.name}
          onChange={(e) => {
            const all = [...GUITAR_TUNINGS, ...BASS_TUNINGS];
            const tuning = all.find(t => t.name === e.target.value);
            if (tuning) onChange(tuning);
          }}
          style={{
            width: '100%',
            backgroundColor: '#0f0f0f',
            color: '#e8dcc8',
            border: '1px solid #c4916a',
            borderRadius: '4px',
            padding: '10px 36px 10px 12px',
            fontFamily: 'var(--font-display)',
            fontSize: '13px',
            fontWeight: 700,
            letterSpacing: '0.05em',
            appearance: 'none',
            WebkitAppearance: 'none',
            outline: 'none',
          }}
        >
          <optgroup label="GUITAR">
            {GUITAR_TUNINGS.map(t => (
              <option key={t.name} value={t.name}>
                {t.displayName.toUpperCase()}
              </option>
            ))}
          </optgroup>
          <optgroup label="BASS">
            {BASS_TUNINGS.map(t => (
              <option key={t.name} value={t.name}>
                {t.displayName.toUpperCase()}
              </option>
            ))}
          </optgroup>
        </select>
        {/* Custom rose-gold dropdown arrow */}
        <div style={{
          position: 'absolute',
          right: '12px',
          top: '50%',
          transform: 'translateY(-50%)',
          pointerEvents: 'none',
          color: '#c4916a',
          fontSize: '12px',
        }}>
          ▼
        </div>
      </div>
    </div>
  );
}
