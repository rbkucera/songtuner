import type { HeaderProps } from '../types';

export function AnalogHeader(_props: HeaderProps) {
  return (
    <header style={{
      backgroundColor: '#1c1814',
      borderBottom: '1px solid #a0a0a0',
      padding: '14px 20px 10px',
      textAlign: 'center',
    }}>
      <h1 style={{
        fontFamily: "'DM Serif Display', Georgia, serif",
        fontWeight: 400,
        fontSize: '20px',
        letterSpacing: '0.25em',
        color: '#c4a44a',
        margin: 0,
        textTransform: 'uppercase',
      }}>
        Analog Reborn
      </h1>
      {/* Decorative brass divider */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        marginTop: '6px',
      }}>
        <div style={{ width: '40px', height: '1px', background: 'linear-gradient(90deg, transparent, #c4a44a)' }} />
        <span style={{ color: '#c4a44a', fontSize: '8px', lineHeight: 1 }}>&#9670;</span>
        <div style={{ width: '40px', height: '1px', background: 'linear-gradient(90deg, #c4a44a, transparent)' }} />
      </div>
    </header>
  );
}
