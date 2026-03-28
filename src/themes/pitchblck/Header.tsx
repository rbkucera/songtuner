import type { HeaderProps } from '../types';

export function PitchBlckHeader(_props: HeaderProps) {
  return (
    <header style={{
      backgroundColor: '#141414',
      borderBottom: '2px solid #c4916a',
      padding: '14px 20px 12px',
      textAlign: 'center',
      position: 'relative',
    }}>
      <h1 style={{
        fontFamily: "'Orbitron', system-ui, sans-serif",
        fontWeight: 900,
        fontSize: '22px',
        letterSpacing: '0.35em',
        color: '#e8dcc8',
        margin: 0,
      }}>
        PITCH<span style={{ color: '#c4916a' }}>BLCK</span>
      </h1>
      <p style={{
        fontFamily: "'Orbitron', system-ui, sans-serif",
        fontSize: '8px',
        letterSpacing: '0.3em',
        color: '#6a6258',
        margin: '3px 0 0',
      }}>
        TUNE TO THE VOID
      </p>
      <span style={{ position: 'absolute', top: '8px', left: '12px', color: '#c4916a', fontSize: '10px', opacity: 0.5 }}>◈</span>
      <span style={{ position: 'absolute', top: '8px', right: '12px', color: '#c4916a', fontSize: '10px', opacity: 0.5 }}>◈</span>
    </header>
  );
}
