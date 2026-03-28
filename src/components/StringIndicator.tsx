import type { TuningDefinition } from '../types/song';
import { getStringLabel } from '../lib/pitchUtils';

interface StringIndicatorProps {
  tuning: TuningDefinition;
  activeStringIndex: number | null;
  inTune: boolean;
}

export function StringIndicator({ tuning, activeStringIndex, inTune }: StringIndicatorProps) {
  // Display strings highest (thinnest) to lowest (thickest), left to right
  const stringsReversed = [...tuning.noteNames].reverse();

  return (
    <div className="flex justify-center gap-4 px-4">
      {stringsReversed.map((noteName, displayIndex) => {
        const actualIndex = tuning.stringCount - 1 - displayIndex;
        const isActive = activeStringIndex === actualIndex;
        const label = getStringLabel(actualIndex, tuning.stringCount);

        const activeColor = inTune ? '#00e644' : '#c4916a';
        const activeGlow = inTune
          ? '0 0 12px #00e644, 0 0 4px #00e644'
          : '0 0 12px #c4916a, 0 0 4px #c4916a';

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
            <div
              style={{
                width: `${2 + displayIndex * 0.9}px`,
                height: '52px',
                borderRadius: '2px',
                backgroundColor: isActive ? activeColor : '#6a6258',
                boxShadow: isActive ? activeGlow : 'none',
                transition: 'background-color 0.15s, box-shadow 0.15s',
              }}
            />
            {/* Note name */}
            <span style={{
              fontFamily: 'var(--font-display)',
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.05em',
              color: isActive ? activeColor : '#6a6258',
              textShadow: isActive ? activeGlow : 'none',
            }}>
              {noteName}
            </span>
            {/* String number */}
            <span style={{
              fontFamily: 'var(--font-readout)',
              fontSize: '10px',
              color: '#4a4040',
            }}>
              {label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
