import type { NoteDisplayProps } from '../types';

export function AnalogNoteDisplay({ detected }: NoteDisplayProps) {
  if (!detected) {
    // Idle placeholder — keeps vertical space consistent while overlay shows prompt
    return (
      <div style={{ textAlign: 'center', lineHeight: 1, padding: '4px 0' }}>
        <span style={{
          fontFamily: "'DM Serif Display', Georgia, serif",
          fontSize: '56px',
          color: '#8a8070',
          opacity: 0.15,
        }}>
          --
        </span>
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
