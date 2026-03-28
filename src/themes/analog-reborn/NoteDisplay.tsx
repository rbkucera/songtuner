import type { NoteDisplayProps } from '../types';

export function AnalogNoteDisplay({ detected, isListening }: NoteDisplayProps) {
  if (!isListening) {
    return (
      <div style={{ textAlign: 'center', padding: '8px 0' }}>
        <p style={{
          fontFamily: "'DM Serif Display', Georgia, serif",
          fontSize: '14px',
          fontStyle: 'italic',
          color: '#8a8070',
          letterSpacing: '0.1em',
          margin: 0,
        }}>
          Awaiting Signal
        </p>
      </div>
    );
  }

  if (!detected) {
    return (
      <div style={{ textAlign: 'center', padding: '8px 0' }}>
        <p style={{
          fontFamily: "'DM Serif Display', Georgia, serif",
          fontSize: '14px',
          fontStyle: 'italic',
          color: '#8a8070',
          letterSpacing: '0.1em',
          margin: 0,
        }}>
          Play a String
        </p>
      </div>
    );
  }

  const noteMatch = detected.noteName.match(/^([A-G][#b]?)(\d)$/);
  const notePart = noteMatch ? noteMatch[1] : detected.noteName;
  const octavePart = noteMatch ? noteMatch[2] : '';

  return (
    <div style={{ textAlign: 'center', lineHeight: 1, padding: '4px 0' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center', gap: '2px' }}>
        <span style={{
          fontFamily: "'DM Serif Display', Georgia, serif",
          fontSize: '56px',
          fontWeight: 400,
          color: detected.inTune ? '#2a8a3a' : '#2a2420',
          transition: 'color 0.2s',
        }}>
          {notePart}
        </span>
        <span style={{
          fontFamily: "'DM Serif Display', Georgia, serif",
          fontSize: '24px',
          fontWeight: 400,
          color: detected.inTune ? '#2a8a3a' : '#c4a44a',
          marginTop: '8px',
        }}>
          {octavePart}
        </span>
      </div>
      <div style={{
        fontFamily: "'Courier Prime', 'Courier New', monospace",
        fontSize: '12px',
        color: '#8a8070',
        letterSpacing: '0.08em',
        marginTop: '2px',
      }}>
        {detected.detectedFrequency.toFixed(1)} Hz
      </div>
    </div>
  );
}
