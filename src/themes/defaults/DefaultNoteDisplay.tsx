import { useTheme } from '../useTheme';
import type { NoteDisplayProps } from '../types';

export function DefaultNoteDisplay({ detected }: NoteDisplayProps) {
  const { theme } = useTheme();
  const t = theme.tokens;

  if (!detected) {
    // Idle placeholder — keeps vertical space consistent while overlay shows prompt
    return (
      <div style={{ textAlign: 'center', lineHeight: 1 }}>
        <span style={{
          fontFamily: t.fontDisplay as string,
          fontSize: '88px',
          fontWeight: 900,
          letterSpacing: '-0.02em',
          color: t.colorMuted as string,
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
    <div className="text-center" style={{ lineHeight: 1 }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center', gap: '4px' }}>
        <span style={{
          fontFamily: t.fontDisplay as string,
          fontSize: '88px',
          fontWeight: 900,
          letterSpacing: '-0.02em',
          color: detected.inTune ? t.colorInTune as string : t.colorText as string,
          textShadow: detected.inTune ? `0 0 30px ${t.colorInTune}, 0 0 10px ${t.colorInTune}` : 'none',
          transition: 'color 0.2s, text-shadow 0.2s',
        }}>
          {notePart}
        </span>
        <span style={{
          fontFamily: t.fontDisplay as string,
          fontSize: '32px',
          fontWeight: 400,
          color: detected.inTune ? t.colorInTune as string : t.colorAccent as string,
          marginTop: '16px',
        }}>
          {octavePart}
        </span>
      </div>
      <div style={{
        fontFamily: t.fontReadout as string,
        fontSize: '13px',
        color: t.colorMuted as string,
        letterSpacing: '0.1em',
        marginTop: '2px',
      }}>
        {detected.detectedFrequency.toFixed(1)} Hz
      </div>
    </div>
  );
}
