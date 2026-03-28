import type { ActionButtonProps } from '../types';

export function AnalogButton({ isListening, onClick }: ActionButtonProps) {
  return (
    <button
      onClick={onClick}
      style={{
        width: '100%',
        padding: '14px',
        borderRadius: '4px',
        border: '1px solid #888',
        background: isListening
          ? 'linear-gradient(180deg, #888 0%, #666 50%, #777 100%)'
          : 'linear-gradient(180deg, #d8d8d8 0%, #a0a0a0 50%, #c0c0c0 100%)',
        boxShadow: isListening
          ? 'inset 0 2px 4px rgba(0,0,0,0.4), 0 1px 0 rgba(255,255,255,0.1)'
          : '0 2px 0 #555, inset 0 1px 0 rgba(255,255,255,0.5)',
        color: isListening ? '#ccc' : '#1a1a1a',
        fontFamily: "'DM Serif Display', Georgia, serif",
        fontSize: '15px',
        fontWeight: 400,
        letterSpacing: '0.2em',
        textTransform: 'uppercase',
        cursor: 'pointer',
        WebkitAppearance: 'none',
        transition: 'box-shadow 0.08s',
      }}
      onPointerDown={e => (e.currentTarget.style.transform = 'translateY(1px)')}
      onPointerUp={e => (e.currentTarget.style.transform = '')}
      onPointerLeave={e => (e.currentTarget.style.transform = '')}
    >
      {isListening ? 'Disengage' : 'Engage'}
    </button>
  );
}
