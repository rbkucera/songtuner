import { useRef, useCallback } from 'react';
import { identifyString, frequencyToCents } from '../lib/pitchUtils';
import { midiToFrequency, midiToNoteName } from '../lib/tunings';
import type { DetectedString } from '../lib/pitchUtils';
import type { TuningDefinition } from '../types/song';
import type { PitchData } from './usePitchDetection';

// Require the candidate string to be this many cents closer than the
// locked string before allowing a switch. Prevents harmonic jumping.
const SWITCH_HYSTERESIS_CENTS = 150;

export function useStringLock() {
  const lockedIndexRef = useRef<number | null>(null);

  const detect = useCallback(
    (pitch: PitchData | null, tuning: TuningDefinition): DetectedString | null => {
      if (!pitch) {
        // Signal gone — clear the lock so the next note starts fresh
        lockedIndexRef.current = null;
        return null;
      }

      const candidate = identifyString(pitch.frequency, tuning);

      if (!candidate) {
        lockedIndexRef.current = null;
        return null;
      }

      const lockedIndex = lockedIndexRef.current;

      if (lockedIndex === null) {
        // No lock yet — accept the first clean detection
        lockedIndexRef.current = candidate.stringIndex;
        return candidate;
      }

      if (candidate.stringIndex === lockedIndex) {
        // Same string as locked — return fresh cents for this string
        lockedIndexRef.current = lockedIndex;
        return candidate;
      }

      // Different string detected — measure how far off the locked string is
      const lockedTargetFreq = midiToFrequency(tuning.midiNotes[lockedIndex]);
      const lockedCents = frequencyToCents(pitch.frequency, lockedTargetFreq);

      // Only switch if the candidate is significantly closer than the locked string
      const candidateIsSignificantlyBetter =
        Math.abs(candidate.centsOff) < Math.abs(lockedCents) - SWITCH_HYSTERESIS_CENTS;

      if (candidateIsSignificantlyBetter) {
        lockedIndexRef.current = candidate.stringIndex;
        return candidate;
      }

      // Stay on the locked string — re-report cents against the locked target
      return {
        stringIndex: lockedIndex,
        noteName: midiToNoteName(tuning.midiNotes[lockedIndex]),
        targetFrequency: lockedTargetFreq,
        detectedFrequency: pitch.frequency,
        centsOff: lockedCents,
        inTune: Math.abs(lockedCents) <= 5,
      };
    },
    []
  );

  const reset = useCallback(() => {
    lockedIndexRef.current = null;
  }, []);

  return { detect, reset };
}
