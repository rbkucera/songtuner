import { useTheme } from '../useTheme';
import type { NoteDisplayProps } from '../types';

function statusText(isListening: boolean, hasSignal: boolean) {
  if (!isListening) return 'Stand by for signal';
  if (!hasSignal) return 'Sweep a string through the grid';
  return 'Pitch lock acquired';
}

export function HyperwaveNoteDisplay({ detected, isListening }: NoteDisplayProps) {
  const { theme } = useTheme();
  const t = theme.tokens;

  const noteMatch = detected?.noteName.match(/^([A-G][#b]?)(\d)$/);
  const notePart = noteMatch ? noteMatch[1] : detected?.noteName ?? '--';
  const octavePart = noteMatch ? noteMatch[2] : '';
  const accent = detected?.inTune ? (t.neonCyan as string) : (t.neonPink as string);

  return (
    <div
      style={{
        minWidth: '260px',
        padding: '18px 22px 16px',
        borderRadius: '18px',
        background: t.glassFill as string,
        border: `1px solid ${t.glassStroke}`,
        boxShadow: t.panelGlow as string,
        textAlign: 'center',
      }}
    >
      <p
        style={{
          margin: '0 0 8px',
          color: t.colorMuted as string,
          fontFamily: t.fontReadout as string,
          fontSize: '10px',
          letterSpacing: '0.24em',
          textTransform: 'uppercase',
        }}
      >
        {statusText(isListening, Boolean(detected))}
      </p>

      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center',
          gap: '6px',
          lineHeight: 0.9,
        }}
      >
        <span
          style={{
            color: detected ? accent : (t.colorText as string),
            fontFamily: t.fontDisplay as string,
            fontSize: '84px',
            textShadow: detected ? `0 0 18px ${accent}` : 'none',
          }}
        >
          {notePart}
        </span>
        <span
          style={{
            marginTop: '12px',
            color: detected ? (t.neonCyan as string) : (t.colorMuted as string),
            fontFamily: t.fontReadout as string,
            fontSize: '26px',
            fontWeight: 700,
          }}
        >
          {octavePart}
        </span>
      </div>

      <div
        style={{
          marginTop: '8px',
          display: 'flex',
          justifyContent: 'center',
          gap: '10px',
          color: t.colorMuted as string,
          fontFamily: t.fontReadout as string,
          fontSize: '12px',
          letterSpacing: '0.05em',
        }}
      >
        <span>{detected ? `${detected.detectedFrequency.toFixed(1)} Hz` : '--.- Hz'}</span>
        <span style={{ color: detected ? accent : (t.colorMuted as string) }}>
          {detected ? `${detected.centsOff > 0 ? '+' : ''}${Math.round(detected.centsOff)}c` : 'idle'}
        </span>
      </div>
    </div>
  );
}
