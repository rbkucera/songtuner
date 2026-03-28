import { useTheme } from '../useTheme';
import type { ActionButtonProps } from '../types';

export function HyperwaveActionButton({ isListening, onClick }: ActionButtonProps) {
  const { theme } = useTheme();
  const t = theme.tokens;

  const accent = isListening ? (t.neonCyan as string) : (t.neonPink as string);

  return (
    <button
      onClick={onClick}
      style={{
        width: '100%',
        padding: '15px 16px',
        borderRadius: '14px',
        border: `1px solid ${accent}`,
        background: isListening
          ? 'linear-gradient(180deg, rgba(95,251,255,0.3) 0%, rgba(17,24,56,1) 100%)'
          : 'linear-gradient(180deg, rgba(255,71,181,0.32) 0%, rgba(24,12,38,1) 100%)',
        boxShadow: `0 0 20px ${isListening ? t.neonCyanSoft : t.neonPinkSoft}, inset 0 1px 0 rgba(255,255,255,0.12)`,
        color: accent,
        fontFamily: t.fontDisplay as string,
        fontSize: '15px',
        letterSpacing: '0.16em',
        textTransform: 'uppercase',
        cursor: 'pointer',
        WebkitAppearance: 'none',
      }}
    >
      {isListening ? 'Disengage Scanner' : 'Start Hyperwave Scan'}
    </button>
  );
}
