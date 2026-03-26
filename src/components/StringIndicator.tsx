import type { TuningDefinition } from '../types/song';
import { getStringLabel } from '../lib/pitchUtils';

interface StringIndicatorProps {
  tuning: TuningDefinition;
  activeStringIndex: number | null;
  inTune: boolean;
}

export function StringIndicator({ tuning, activeStringIndex, inTune }: StringIndicatorProps) {
  // Display strings from highest (thinnest) to lowest (thickest), left to right
  const stringsReversed = [...tuning.noteNames].reverse();

  return (
    <div className="flex justify-center gap-3 px-4">
      {stringsReversed.map((noteName, displayIndex) => {
        const actualIndex = tuning.stringCount - 1 - displayIndex;
        const isActive = activeStringIndex === actualIndex;
        const label = getStringLabel(actualIndex, tuning.stringCount);

        return (
          <div
            key={actualIndex}
            className={`flex flex-col items-center gap-1 transition-all duration-150 ${
              isActive ? 'scale-110' : 'opacity-40'
            }`}
          >
            {/* String line */}
            <div
              className={`w-1 h-16 rounded-full ${
                isActive
                  ? inTune
                    ? 'bg-tune-good'
                    : 'bg-tune-sharp'
                  : 'bg-text-secondary/30'
              }`}
              style={{
                // Thicker strings on the left (higher index = lower/thicker)
                width: `${2 + displayIndex * 0.8}px`,
              }}
            />
            {/* Note name */}
            <span
              className={`text-sm font-mono ${
                isActive
                  ? inTune
                    ? 'text-tune-good'
                    : 'text-text-primary'
                  : 'text-text-secondary'
              }`}
            >
              {noteName}
            </span>
            {/* String number */}
            <span className="text-xs text-text-secondary">{label}</span>
          </div>
        );
      })}
    </div>
  );
}
