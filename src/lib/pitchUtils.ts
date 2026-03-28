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
// If octave-corrected frequency is within this many cents of a string,
// and the raw frequency is not, prefer the corrected version.
const OCTAVE_CORRECTION_THRESHOLD_CENTS = 50;

// Calculate cents difference between two frequencies
export function frequencyToCents(detected: number, target: number): number {
  return 1200 * Math.log2(detected / target);
}

// Find the best matching string for a given frequency, checking both
// the raw frequency and octave-shifted candidates (×2, ×0.5).
// Pitchy can sometimes return a frequency an octave off from the fundamental.
function bestMatchForFrequency(
  freq: number,
  tuning: TuningDefinition
): { stringIndex: number; cents: number } | null {
  const candidates = [freq, freq * 2, freq / 2];
  let best: { stringIndex: number; cents: number } | null = null;

  for (const candidate of candidates) {
    for (let i = 0; i < tuning.midiNotes.length; i++) {
      const targetFreq = midiToFrequency(tuning.midiNotes[i]);
      const cents = frequencyToCents(candidate, targetFreq);
      if (Math.abs(cents) <= MAX_SEMITONES_OFF * 100) {
        if (!best || Math.abs(cents) < Math.abs(best.cents)) {
          // Prefer the raw frequency over octave shifts unless the shift is
          // significantly better (within OCTAVE_CORRECTION_THRESHOLD_CENTS).
          const rawCents = frequencyToCents(freq, targetFreq);
          const isOctaveShift = candidate !== freq;
          const rawIsClose = Math.abs(rawCents) <= MAX_SEMITONES_OFF * 100;
          if (!isOctaveShift || !rawIsClose ||
              Math.abs(cents) < Math.abs(rawCents) - OCTAVE_CORRECTION_THRESHOLD_CENTS) {
            best = { stringIndex: i, cents };
          }
        }
      }
    }
  }

  return best;
}

// Find the closest string in a tuning to a detected frequency
export function identifyString(
  detectedFrequency: number,
  tuning: TuningDefinition
): DetectedString | null {
  const match = bestMatchForFrequency(detectedFrequency, tuning);
  if (!match) return null;

  const targetFreq = midiToFrequency(tuning.midiNotes[match.stringIndex]);

  return {
    stringIndex: match.stringIndex,
    noteName: midiToNoteName(tuning.midiNotes[match.stringIndex]),
    targetFrequency: targetFreq,
    detectedFrequency,
    centsOff: match.cents,
    inTune: Math.abs(match.cents) <= IN_TUNE_THRESHOLD_CENTS,
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
