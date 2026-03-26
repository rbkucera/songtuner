import type { TuningDefinition } from '../types/song';

// MIDI note to frequency: f = 440 * 2^((midi - 69) / 12)
export function midiToFrequency(midi: number): number {
  return 440 * Math.pow(2, (midi - 69) / 12);
}

// Note names for MIDI values
const NOTE_NAMES = ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B'];

export function midiToNoteName(midi: number): string {
  const octave = Math.floor(midi / 12) - 1;
  const note = NOTE_NAMES[midi % 12];
  return `${note}${octave}`;
}

// Guitar tunings
export const TUNINGS: Record<string, TuningDefinition> = {
  standard: {
    name: 'standard',
    displayName: 'Standard',
    midiNotes: [40, 45, 50, 55, 59, 64],
    noteNames: ['E2', 'A2', 'D3', 'G3', 'B3', 'E4'],
    stringCount: 6,
  },
  drop_d: {
    name: 'drop_d',
    displayName: 'Drop D',
    midiNotes: [38, 45, 50, 55, 59, 64],
    noteNames: ['D2', 'A2', 'D3', 'G3', 'B3', 'E4'],
    stringCount: 6,
  },
  open_g: {
    name: 'open_g',
    displayName: 'Open G',
    midiNotes: [38, 43, 50, 55, 59, 62],
    noteNames: ['D2', 'G2', 'D3', 'G3', 'B3', 'D4'],
    stringCount: 6,
  },
  open_d: {
    name: 'open_d',
    displayName: 'Open D',
    midiNotes: [38, 45, 50, 54, 57, 62],
    noteNames: ['D2', 'A2', 'D3', 'F#3', 'A3', 'D4'],
    stringCount: 6,
  },
  dadgad: {
    name: 'dadgad',
    displayName: 'DADGAD',
    midiNotes: [38, 45, 50, 55, 57, 62],
    noteNames: ['D2', 'A2', 'D3', 'G3', 'A3', 'D4'],
    stringCount: 6,
  },
  half_step_down: {
    name: 'half_step_down',
    displayName: 'Half Step Down',
    midiNotes: [39, 44, 49, 54, 58, 63],
    noteNames: ['Eb2', 'Ab2', 'Db3', 'Gb3', 'Bb3', 'Eb4'],
    stringCount: 6,
  },
  drop_c: {
    name: 'drop_c',
    displayName: 'Drop C',
    midiNotes: [36, 43, 48, 53, 57, 62],
    noteNames: ['C2', 'G2', 'C3', 'F3', 'A3', 'D4'],
    stringCount: 6,
  },
  open_e: {
    name: 'open_e',
    displayName: 'Open E',
    midiNotes: [40, 47, 52, 56, 59, 64],
    noteNames: ['E2', 'B2', 'E3', 'Ab3', 'B3', 'E4'],
    stringCount: 6,
  },
  bass_standard: {
    name: 'bass_standard',
    displayName: 'Bass Standard',
    midiNotes: [28, 33, 38, 43],
    noteNames: ['E1', 'A1', 'D2', 'G2'],
    stringCount: 4,
  },
  bass_5_string: {
    name: 'bass_5_string',
    displayName: 'Bass 5-String',
    midiNotes: [23, 28, 33, 38, 43],
    noteNames: ['B0', 'E1', 'A1', 'D2', 'G2'],
    stringCount: 5,
  },
  bass_drop_d: {
    name: 'bass_drop_d',
    displayName: 'Bass Drop D',
    midiNotes: [26, 33, 38, 43],
    noteNames: ['D1', 'A1', 'D2', 'G2'],
    stringCount: 4,
  },
};

export const GUITAR_TUNINGS = Object.values(TUNINGS).filter(t => t.stringCount === 6);
export const BASS_TUNINGS = Object.values(TUNINGS).filter(t => t.stringCount <= 5);

// Given MIDI note array from Songsterr, find the matching known tuning
export function identifyTuning(midiNotes: number[]): TuningDefinition | null {
  for (const tuning of Object.values(TUNINGS)) {
    if (tuning.midiNotes.length !== midiNotes.length) continue;
    if (tuning.midiNotes.every((n, i) => n === midiNotes[i])) {
      return tuning;
    }
  }
  return null;
}

// Create a custom tuning from MIDI notes (for unknown tunings from Songsterr)
export function createCustomTuning(midiNotes: number[]): TuningDefinition {
  return {
    name: 'custom',
    displayName: midiNotes.map(midiToNoteName).join(' '),
    midiNotes,
    noteNames: midiNotes.map(midiToNoteName),
    stringCount: midiNotes.length,
  };
}
