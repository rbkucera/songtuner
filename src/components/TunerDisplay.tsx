import type { TuningDefinition } from '../types/song';
import type { DetectedString } from '../lib/pitchUtils';
import { PitchMeter } from './PitchMeter';
import { StringIndicator } from './StringIndicator';

interface TunerDisplayProps {
  tuning: TuningDefinition;
  detected: DetectedString | null;
  frequency: number | null;
  isListening: boolean;
}

export function TunerDisplay({ tuning, detected, frequency, isListening }: TunerDisplayProps) {
  if (!isListening) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-text-secondary text-lg">Tap "Start Tuning" to begin</p>
      </div>
    );
  }

  if (!detected) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center gap-8">
        <div className="text-center">
          <p className="text-text-secondary text-lg">Listening...</p>
          <p className="text-text-secondary text-sm mt-1">Play a string on your instrument</p>
          {frequency && (
            <p className="text-text-secondary/50 text-xs mt-2 font-mono">
              {frequency.toFixed(1)} Hz (low clarity)
            </p>
          )}
        </div>
        <StringIndicator tuning={tuning} activeStringIndex={null} inTune={false} />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-6">
      {/* Detected note - large display */}
      <div className="text-center">
        <span
          className={`text-7xl font-bold font-mono ${
            detected.inTune ? 'text-tune-good' : 'text-text-primary'
          }`}
        >
          {detected.noteName}
        </span>
        <p className="text-text-secondary text-sm mt-1 font-mono">
          {detected.detectedFrequency.toFixed(1)} Hz
        </p>
      </div>

      {/* Pitch meter */}
      <PitchMeter centsOff={detected.centsOff} inTune={detected.inTune} />

      {/* In-tune indicator */}
      {detected.inTune && (
        <div className="text-tune-good text-2xl font-semibold animate-pulse">
          In Tune
        </div>
      )}

      {/* String indicator */}
      <StringIndicator
        tuning={tuning}
        activeStringIndex={detected.stringIndex}
        inTune={detected.inTune}
      />
    </div>
  );
}
