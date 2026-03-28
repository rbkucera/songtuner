import { useTheme } from '../useTheme';
import { getStringLabel } from '../../lib/pitchUtils';
import type { StringIndicatorProps } from '../types';

export function HyperwaveStringIndicator({
  tuning,
  activeStringIndex,
  inTune,
}: StringIndicatorProps) {
  const { theme } = useTheme();
  const t = theme.tokens;

  const stringsReversed = [...tuning.noteNames].reverse();

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '10px',
        padding: '0 10px',
        width: '100%',
        maxWidth: '360px',
      }}
    >
      {stringsReversed.map((noteName, displayIndex) => {
        const actualIndex = tuning.stringCount - 1 - displayIndex;
        const isActive = actualIndex === activeStringIndex;
        const glowColor = inTune ? (t.neonCyan as string) : (t.neonPink as string);

        return (
          <div
            key={actualIndex}
            style={{
              flex: 1,
              minWidth: 0,
              borderRadius: '14px',
              padding: '10px 6px 8px',
              background: isActive ? (t.neonCyanSoft as string) : 'rgba(12,16,40,0.55)',
              border: `1px solid ${isActive ? glowColor : t.borderSubtle}`,
              boxShadow: isActive ? `0 0 14px ${glowColor}` : 'none',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                width: '3px',
                height: '44px',
                margin: '0 auto 8px',
                borderRadius: '999px',
                background: isActive
                  ? `linear-gradient(180deg, ${glowColor} 0%, rgba(255,255,255,0.95) 50%, ${glowColor} 100%)`
                  : 'linear-gradient(180deg, rgba(125,124,163,0.25) 0%, rgba(125,124,163,0.7) 100%)',
                boxShadow: isActive ? `0 0 12px ${glowColor}` : 'none',
              }}
            />
            <div
              style={{
                color: isActive ? glowColor : (t.colorText as string),
                fontFamily: t.fontDisplay as string,
                fontSize: '12px',
                letterSpacing: '0.05em',
              }}
            >
              {noteName}
            </div>
            <div
              style={{
                marginTop: '2px',
                color: t.colorMuted as string,
                fontFamily: t.fontReadout as string,
                fontSize: '10px',
              }}
            >
              CH {getStringLabel(actualIndex, tuning.stringCount)}
            </div>
          </div>
        );
      })}
    </div>
  );
}
