import { useTheme } from '../useTheme';
import { GUITAR_TUNINGS, BASS_TUNINGS } from '../../lib/tunings';
import type { TuningSelectorProps } from '../types';

export function DefaultTuningSelector({ selected, onChange }: TuningSelectorProps) {
  const { theme } = useTheme();
  const t = theme.tokens;

  return (
    <div className="px-5">
      <label style={{
        display: 'block',
        fontFamily: t.fontDisplay as string,
        fontSize: '10px',
        fontWeight: 700,
        letterSpacing: '0.2em',
        color: t.colorMuted as string,
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
            backgroundColor: t.colorBg as string,
            color: t.colorText as string,
            border: `1px solid ${t.colorAccent}`,
            borderRadius: '4px',
            padding: '10px 36px 10px 12px',
            fontFamily: t.fontDisplay as string,
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
              <option key={t.name} value={t.name}>{t.displayName.toUpperCase()}</option>
            ))}
          </optgroup>
          <optgroup label="BASS">
            {BASS_TUNINGS.map(t => (
              <option key={t.name} value={t.name}>{t.displayName.toUpperCase()}</option>
            ))}
          </optgroup>
        </select>
        <div style={{
          position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)',
          pointerEvents: 'none', color: t.colorAccent as string, fontSize: '12px',
        }}>▼</div>
      </div>
    </div>
  );
}
