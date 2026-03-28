import { useTheme } from '../useTheme';
import { getStringLabel } from '../../lib/pitchUtils';
import type { StringIndicatorProps } from '../types';

export function DefaultStringIndicator({ tuning, activeStringIndex, inTune }: StringIndicatorProps) {
  const { theme } = useTheme();
  const t = theme.tokens;
  const stringsReversed = [...tuning.noteNames].reverse();

  return (
    <div className="flex justify-center gap-4 px-4">
      {stringsReversed.map((noteName, displayIndex) => {
        const actualIndex = tuning.stringCount - 1 - displayIndex;
        const isActive = activeStringIndex === actualIndex;
        const label = getStringLabel(actualIndex, tuning.stringCount);
        const activeColor = inTune ? t.colorInTune as string : t.colorAccent as string;
        const activeGlow = `0 0 12px ${activeColor}, 0 0 4px ${activeColor}`;

        return (
          <div
            key={actualIndex}
            className="flex flex-col items-center gap-1"
            style={{
              opacity: isActive ? 1 : 0.3,
              transform: isActive ? 'scale(1.08)' : 'scale(1)',
              transition: 'opacity 0.15s, transform 0.15s',
            }}
          >
            <div style={{
              width: `${2 + displayIndex * 0.9}px`,
              height: '52px',
              borderRadius: '2px',
              backgroundColor: isActive ? activeColor : t.colorMuted as string,
              boxShadow: isActive ? activeGlow : 'none',
              transition: 'background-color 0.15s, box-shadow 0.15s',
            }} />
            <span style={{
              fontFamily: t.fontDisplay as string,
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.05em',
              color: isActive ? activeColor : t.colorMuted as string,
              textShadow: isActive ? activeGlow : 'none',
            }}>
              {noteName}
            </span>
            <span style={{
              fontFamily: t.fontReadout as string,
              fontSize: '10px',
              color: t.borderSubtle as string,
            }}>
              {label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
