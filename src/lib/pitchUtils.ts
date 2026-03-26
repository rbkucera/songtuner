import { midiToFrequency, midiToNoteName } from './tunings';
import type { TuningDefinition } from '../types/song';

export interface DetectedString {
  stringIndex: number;       // 0-based, 0 = lowest string
  noteName: string;          // e.g. "E2"
  targetFrequency: number;   // Hz
  detectedFrequency: number; // Hz
  centsOff: number;          // negative = flat, positive = sharp
  inTune: boolean;           // within ±5 cents
}

const IN_TUNE_THRESHOLD_CENTS = 5;
const MAX_SEMITONES_OFF = 3;

// Calculate cents difference between two frequencies
export function frequencyToCents(detected: number, target: number): number {
  return 1200 * Math.log2(detected / target);
}

// Find the closest string in a tuning to a detected frequency
export function identifyString(
  detectedFrequency: number,
  tuning: TuningDefinition
): DetectedString | null {
  let closestIndex = -1;
  let closestCents = Infinity;

  for (let i = 0; i < tuning.midiNotes.length; i++) {
    const targetFreq = midiToFrequency(tuning.midiNotes[i]);
    const cents = frequencyToCents(detectedFrequency, targetFreq);

    // Only consider strings within ±3 semitones (±300 cents)
    if (Math.abs(cents) < Math.abs(closestCents) && Math.abs(cents) <= MAX_SEMITONES_OFF * 100) {
      closestCents = cents;
      closestIndex = i;
    }
  }

  if (closestIndex === -1) return null;

  const targetFreq = midiToFrequency(tuning.midiNotes[closestIndex]);

  return {
    stringIndex: closestIndex,
    noteName: midiToNoteName(tuning.midiNotes[closestIndex]),
    targetFrequency: targetFreq,
    detectedFrequency,
    centsOff: closestCents,
    inTune: Math.abs(closestCents) <= IN_TUNE_THRESHOLD_CENTS,
  };
}

// Get a human-readable direction label
export function getDirection(centsOff: number): 'flat' | 'in-tune' | 'sharp' {
  if (Math.abs(centsOff) <= IN_TUNE_THRESHOLD_CENTS) return 'in-tune';
  return centsOff < 0 ? 'flat' : 'sharp';
}

// String number label (guitars traditionally count from highest to lowest)
export function getStringLabel(stringIndex: number, totalStrings: number): string {
  return `${totalStrings - stringIndex}`;
}
