import { useTheme } from '../useTheme';
import type { ActionButtonProps } from '../types';

export function DefaultActionButton({ isListening, onClick }: ActionButtonProps) {
  const { theme } = useTheme();
  const t = theme.tokens;

  return (
    <button
      onClick={onClick}
      style={{
        width: '100%',
        padding: '16px',
        borderRadius: '6px',
        border: `1px solid ${t.colorAccent}`,
        background: isListening ? t.colorError as string : t.colorAccent as string,
        color: isListening ? '#fff' : t.colorPanel as string,
        fontFamily: t.fontDisplay as string,
        fontSize: '15px',
        fontWeight: 900,
        letterSpacing: '0.25em',
        cursor: 'pointer',
        WebkitAppearance: 'none',
      }}
    >
      {isListening ? 'STOP' : 'START TUNING'}
    </button>
  );
}
