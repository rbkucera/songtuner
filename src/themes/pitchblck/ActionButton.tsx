import type { ActionButtonProps } from '../types';

export function PitchBlckButton({ isListening, onClick }: ActionButtonProps) {
  return (
    <button
      onClick={onClick}
      style={{
        width: '100%',
        padding: '16px',
        borderRadius: '6px',
        border: isListening ? '1px solid #7a1010' : '1px solid #7a4020',
        background: isListening
          ? 'linear-gradient(180deg, #8a1010 0%, #5a0808 40%, #3a0404 100%)'
          : 'linear-gradient(180deg, #d4a572 0%, #b87333 40%, #8a5425 100%)',
        boxShadow: isListening
          ? '0 2px 0 #2a0404, inset 0 1px 0 rgba(255,100,100,0.2)'
          : '0 2px 0 #5a3010, inset 0 1px 0 rgba(255,220,170,0.4)',
        color: isListening ? '#ff6666' : '#1a0800',
        fontFamily: "'Orbitron', system-ui, sans-serif",
        fontSize: '15px',
        fontWeight: 900,
        letterSpacing: '0.25em',
        cursor: 'pointer',
        WebkitAppearance: 'none',
      }}
      onPointerDown={e => (e.currentTarget.style.transform = 'scale(0.97) translateY(1px)')}
      onPointerUp={e => (e.currentTarget.style.transform = '')}
      onPointerLeave={e => (e.currentTarget.style.transform = '')}
    >
      {isListening ? '◉ STOP' : '◉ START TUNING'}
    </button>
  );
}
