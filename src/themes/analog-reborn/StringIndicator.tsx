import { getStringLabel } from '../../lib/pitchUtils';
import type { StringIndicatorProps } from '../types';

export function AnalogStringIndicator({ tuning, activeStringIndex, inTune }: StringIndicatorProps) {
  const stringsReversed = [...tuning.noteNames].reverse();

  return (
    <div className="flex justify-center gap-4 px-4">
      {stringsReversed.map((noteName, displayIndex) => {
        const actualIndex = tuning.stringCount - 1 - displayIndex;
        const isActive = activeStringIndex === actualIndex;
        const label = getStringLabel(actualIndex, tuning.stringCount);

        const activeColor = inTune ? '#2a8a3a' : '#c4a44a';

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
            {/* String line */}
            <div style={{
              width: `${2 + displayIndex * 0.9}px`,
              height: '44px',
              borderRadius: '1px',
              backgroundColor: isActive ? activeColor : '#b8a888',
              boxShadow: isActive ? `0 0 8px ${activeColor}` : 'none',
              transition: 'background-color 0.15s, box-shadow 0.15s',
            }} />
            {/* Note name */}
            <span style={{
              fontFamily: "'DM Serif Display', Georgia, serif",
              fontSize: '11px',
              color: isActive ? activeColor : '#8a8070',
            }}>
              {noteName}
            </span>
            {/* String number */}
            <span style={{
              fontFamily: "'Courier Prime', 'Courier New', monospace",
              fontSize: '9px',
              color: '#a09880',
            }}>
              {label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
