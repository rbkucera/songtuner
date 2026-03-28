import { useTheme } from '../useTheme';
import type { PitchMeterProps } from '../types';

const TOTAL_BARS = 19;
const CENTER = Math.floor(TOTAL_BARS / 2);
const BAR_HEIGHTS = [18, 20, 24, 28, 32, 36, 42, 48, 56, 64, 56, 48, 42, 36, 32, 28, 24, 20, 18];

export function HyperwavePitchMeter({ centsOff, inTune }: PitchMeterProps) {
  const { theme } = useTheme();
  const t = theme.tokens;

  const magnitude = Math.min(CENTER, Math.round(Math.abs(centsOff) / 5));
  const direction = centsOff < 0 ? -1 : 1;

  const isLit = (index: number) => {
    if (inTune) return index === CENTER;
    if (index === CENTER) return true;
    if (direction < 0 && index < CENTER) return index >= CENTER - magnitude;
    if (direction > 0 && index > CENTER) return index <= CENTER + magnitude;
    return false;
  };

  const barColor = (distance: number) => {
    if (distance <= 2) return t.neonCyan as string;
    if (distance <= 5) return t.plasmaPurple as string;
    return t.neonPink as string;
  };

  return (
    <div
      style={{
        width: '100%',
        maxWidth: '340px',
        padding: '0 12px',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '10px',
          color: t.colorMuted as string,
          fontFamily: t.fontReadout as string,
          fontSize: '10px',
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
        }}
      >
        <span>Flat</span>
        <span style={{ color: inTune ? (t.neonCyan as string) : (t.colorMuted as string) }}>
          {inTune ? 'Locked' : 'Vector'}
        </span>
        <span>Sharp</span>
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
          gap: '6px',
          minHeight: '72px',
        }}
      >
        {BAR_HEIGHTS.map((height, index) => {
          const distance = Math.abs(index - CENTER);
          const active = isLit(index);
          const color = index === CENTER && inTune ? (t.neonCyan as string) : barColor(distance);

          return (
            <div
              key={index}
              style={{
                width: index === CENTER ? '10px' : '8px',
                height: `${height}px`,
                borderRadius: '999px',
                border: `1px solid ${active ? color : t.borderSubtle}`,
                background: active
                  ? `linear-gradient(180deg, rgba(255,255,255,0.55) 0%, ${color} 24%, rgba(10,10,18,0.95) 100%)`
                  : 'linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(26,30,58,0.85) 100%)',
                boxShadow: active ? `0 0 14px ${color}` : 'none',
              }}
            />
          );
        })}
      </div>

      <div
        style={{
          marginTop: '12px',
          textAlign: 'center',
          fontFamily: t.fontReadout as string,
          fontSize: '18px',
          color: inTune ? (t.neonCyan as string) : (t.colorText as string),
          textShadow: inTune ? (t.textGlowCyan as string) : 'none',
        }}
      >
        {inTune ? 'SYNCED' : `${centsOff > 0 ? '+' : ''}${Math.round(centsOff)} cents`}
      </div>
    </div>
  );
}
