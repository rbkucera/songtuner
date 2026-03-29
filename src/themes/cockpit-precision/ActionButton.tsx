import type { ActionButtonProps } from '../types';

export function CockpitButton({ isListening, onClick }: ActionButtonProps) {
  return (
    <button
      onClick={onClick}
      style={{
        width: '100%',
        padding: '14px',
        borderRadius: '4px',
        border: `1px solid ${isListening ? '#d4a24e' : '#3a3f46'}`,
        background: isListening
          ? '#d4a24e'
          : '#22262b',
        boxShadow: isListening
          ? '0 0 12px rgba(212,162,78,0.25), inset 0 1px 0 rgba(255,255,255,0.15)'
          : 'inset 0 1px 0 rgba(255,255,255,0.04)',
        color: isListening ? '#1a1d21' : '#d4a24e',
        fontFamily: "'Rajdhani', system-ui, sans-serif",
        fontSize: '15px',
        fontWeight: 700,
        letterSpacing: '0.25em',
        textTransform: 'uppercase' as const,
        cursor: 'pointer',
        WebkitAppearance: 'none' as const,
      }}
      onPointerDown={e => (e.currentTarget.style.transform = 'translateY(1px)')}
      onPointerUp={e => (e.currentTarget.style.transform = '')}
      onPointerLeave={e => (e.currentTarget.style.transform = '')}
    >
      {isListening ? 'Disengage' : 'Engage'}
    </button>
  );
}
