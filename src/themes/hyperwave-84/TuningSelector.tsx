import { useTheme } from '../useTheme';
import { GUITAR_TUNINGS, BASS_TUNINGS } from '../../lib/tunings';
import type { TuningSelectorProps } from '../types';

export function HyperwaveTuningSelector({ selected, onChange }: TuningSelectorProps) {
  const { theme } = useTheme();
  const t = theme.tokens;

  return (
    <div>
      <label
        style={{
          display: 'block',
          marginBottom: '8px',
          color: t.colorMuted as string,
          fontFamily: t.fontReadout as string,
          fontSize: '10px',
          letterSpacing: '0.24em',
          textTransform: 'uppercase',
        }}
      >
        Tuning Matrix
      </label>
      <div style={{ position: 'relative' }}>
        <select
          value={selected.name}
          onChange={(e) => {
            const all = [...GUITAR_TUNINGS, ...BASS_TUNINGS];
            const tuning = all.find((candidate) => candidate.name === e.target.value);
            if (tuning) onChange(tuning);
          }}
          style={{
            width: '100%',
            padding: '12px 42px 12px 14px',
            borderRadius: '12px',
            border: `1px solid ${t.glassStroke}`,
            background: t.glassFill as string,
            boxShadow: t.panelGlow as string,
            color: t.colorText as string,
            fontFamily: t.fontDisplay as string,
            fontSize: '13px',
            letterSpacing: '0.04em',
            appearance: 'none',
            WebkitAppearance: 'none',
            outline: 'none',
          }}
        >
          <optgroup label="GUITAR">
            {GUITAR_TUNINGS.map((tuning) => (
              <option key={tuning.name} value={tuning.name}>
                {tuning.displayName.toUpperCase()}
              </option>
            ))}
          </optgroup>
          <optgroup label="BASS">
            {BASS_TUNINGS.map((tuning) => (
              <option key={tuning.name} value={tuning.name}>
                {tuning.displayName.toUpperCase()}
              </option>
            ))}
          </optgroup>
        </select>
        <div
          style={{
            position: 'absolute',
            right: '14px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: t.neonCyan as string,
            pointerEvents: 'none',
            fontSize: '12px',
          }}
        >
          V
        </div>
      </div>
    </div>
  );
}
