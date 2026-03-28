import { GUITAR_TUNINGS, BASS_TUNINGS } from '../../lib/tunings';
import type { TuningSelectorProps } from '../types';

export function AnalogTuningSelector({ selected, onChange }: TuningSelectorProps) {
  return (
    <div className="px-5">
      <label style={{
        display: 'block',
        fontFamily: "'DM Serif Display', Georgia, serif",
        fontSize: '10px',
        fontStyle: 'italic',
        letterSpacing: '0.15em',
        color: '#e8e2d6',
        marginBottom: '6px',
      }}>
        Tuning
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
            backgroundColor: '#1c1814',
            color: '#e8e2d6',
            border: '1px solid #a0a0a0',
            borderRadius: '3px',
            padding: '10px 36px 10px 12px',
            fontFamily: "'DM Serif Display', Georgia, serif",
            fontSize: '14px',
            fontWeight: 400,
            appearance: 'none',
            WebkitAppearance: 'none',
            outline: 'none',
            boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.3)',
          }}
        >
          <optgroup label="Guitar">
            {GUITAR_TUNINGS.map(t => (
              <option key={t.name} value={t.name}>{t.displayName}</option>
            ))}
          </optgroup>
          <optgroup label="Bass">
            {BASS_TUNINGS.map(t => (
              <option key={t.name} value={t.name}>{t.displayName}</option>
            ))}
          </optgroup>
        </select>
        <div style={{
          position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)',
          pointerEvents: 'none', color: '#a0a0a0', fontSize: '10px',
        }}>&#9660;</div>
      </div>
    </div>
  );
}
