import { useTheme } from '../useTheme';
import { GUITAR_TUNINGS, BASS_TUNINGS } from '../../lib/tunings';
import type { TuningSelectorProps } from '../types';

export function FlightTunerTuningSelector({ selected, onChange }: TuningSelectorProps) {
  const { theme } = useTheme();
  const t = theme.tokens;

  return (
    <div className="px-5">
      <label
        style={{
          display: 'block',
          marginBottom: '5px',
          fontFamily: t.fontDisplay as string,
          fontSize: '10px',
          fontWeight: 600,
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          color: t.plateLabel as string,
        }}
      >
        Tuning Preset
      </label>
      <div style={{ position: 'relative' }}>
        <select
          value={selected.name}
          onChange={(event) => {
            const all = [...GUITAR_TUNINGS, ...BASS_TUNINGS];
            const tuning = all.find((entry) => entry.name === event.target.value);
            if (tuning) onChange(tuning);
          }}
          style={{
            width: '100%',
            border: `2px solid ${t.plateBorder as string}`,
            backgroundColor: t.plateBg as string,
            color: t.colorText as string,
            padding: '10px 36px 10px 12px',
            fontFamily: t.fontDisplay as string,
            fontSize: '15px',
            fontWeight: 600,
            letterSpacing: '0.04em',
            appearance: 'none',
            WebkitAppearance: 'none',
            outline: 'none',
            boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.04), inset 0 -1px 0 rgba(0,0,0,0.28)',
          }}
        >
          <optgroup
            label="GUITAR"
            style={{
              color: t.plateBg as string,
              backgroundColor: t.markerLight as string,
              fontWeight: 700,
            }}
          >
            {GUITAR_TUNINGS.map((tuning) => (
              <option
                key={tuning.name}
                value={tuning.name}
                style={{
                  color: t.plateBg as string,
                  backgroundColor: t.markerLight as string,
                }}
              >
                {tuning.displayName.toUpperCase()}
              </option>
            ))}
          </optgroup>
          <optgroup
            label="BASS"
            style={{
              color: t.plateBg as string,
              backgroundColor: t.markerLight as string,
              fontWeight: 700,
            }}
          >
            {BASS_TUNINGS.map((tuning) => (
              <option
                key={tuning.name}
                value={tuning.name}
                style={{
                  color: t.plateBg as string,
                  backgroundColor: t.markerLight as string,
                }}
              >
                {tuning.displayName.toUpperCase()}
              </option>
            ))}
          </optgroup>
        </select>
        <div
          style={{
            position: 'absolute',
            right: '12px',
            top: '50%',
            transform: 'translateY(-50%)',
            pointerEvents: 'none',
            color: t.colorAccent as string,
            fontSize: '10px',
            fontFamily: t.fontReadout as string,
          }}
        >
          V
        </div>
      </div>
    </div>
  );
}
