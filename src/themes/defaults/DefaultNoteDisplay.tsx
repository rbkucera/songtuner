import { useTheme } from '../useTheme';
import type { NoteDisplayProps } from '../types';

export function DefaultNoteDisplay({ detected, isListening }: NoteDisplayProps) {
  const { theme } = useTheme();
  const t = theme.tokens;

  if (!isListening) {
    return (
      <div className="text-center py-6">
        <p style={{ fontFamily: t.fontDisplay as string, fontSize: '11px', letterSpacing: '0.15em', color: t.colorMuted as string }}>
          PRESS START TO BEGIN
        </p>
      </div>
    );
  }

  if (!detected) {
    return (
      <div className="text-center py-6">
        <p style={{ fontFamily: t.fontDisplay as string, fontSize: '11px', letterSpacing: '0.15em', color: t.colorMuted as string }}>
          PLAY A STRING
        </p>
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
