import type { TuningDefinition } from '../types/song';
import type { DetectedString } from '../lib/pitchUtils';
import { PitchMeter } from './PitchMeter';
import { StringIndicator } from './StringIndicator';

interface TunerDisplayProps {
  tuning: TuningDefinition;
  detected: DetectedString | null;
  isListening: boolean;
}

export function TunerDisplay({ tuning, detected, isListening }: TunerDisplayProps) {
  if (!isListening) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center gap-6">
        <StringIndicator tuning={tuning} activeStringIndex={null} inTune={false} />
        <p style={{ fontFamily: 'var(--font-display)', fontSize: '11px', letterSpacing: '0.15em', color: '#6a6258' }}>
          PRESS START TO BEGIN
        </p>
      </div>
    );
  }

  if (!detected) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center gap-6">
        <StringIndicator tuning={tuning} activeStringIndex={null} inTune={false} />
        <p style={{ fontFamily: 'var(--font-display)', fontSize: '11px', letterSpacing: '0.15em', color: '#6a6258' }}>
          PLAY A STRING
        </p>
      </div>
    );
  }

  // Split note name into note + octave for large display (e.g. "E" + "2")
  const noteMatch = detected.noteName.match(/^([A-G][#b]?)(\d)$/);
  const notePart = noteMatch ? noteMatch[1] : detected.noteName;
  const octavePart = noteMatch ? noteMatch[2] : '';

  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-5">
      {/* Large note display */}
      <div className="text-center" style={{ lineHeight: 1 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center', gap: '4px' }}>
          <span style={{
            fontFamily: 'var(--font-display)',
            fontSize: '88px',
            fontWeight: 900,
            letterSpacing: '-0.02em',
            color: detected.inTune ? '#00e644' : '#e8dcc8',
            textShadow: detected.inTune ? '0 0 30px #00e644, 0 0 10px #00e644' : 'none',
            transition: 'color 0.2s, text-shadow 0.2s',
          }}>
            {notePart}
          </span>
          <span style={{
            fontFamily: 'var(--font-display)',
            fontSize: '32px',
            fontWeight: 400,
            color: detected.inTune ? '#00e644' : '#c4916a',
            marginTop: '16px',
          }}>
            {octavePart}
          </span>
        </div>
        <div style={{
          fontFamily: 'var(--font-readout)',
          fontSize: '13px',
          color: '#6a6258',
          letterSpacing: '0.1em',
          marginTop: '2px',
        }}>
          {detected.detectedFrequency.toFixed(1)} Hz
        </div>
      </div>

      {/* LED bar graph meter */}
      <PitchMeter centsOff={detected.centsOff} inTune={detected.inTune} />

      {/* String indicator */}
      <StringIndicator
        tuning={tuning}
        activeStringIndex={detected.stringIndex}
        inTune={detected.inTune}
      />
    </div>
  );
}
