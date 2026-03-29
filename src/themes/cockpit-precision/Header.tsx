import type { HeaderProps } from '../types';

export function CockpitHeader(_props: HeaderProps) {
  return (
    <header style={{
      backgroundColor: '#2a2e34',
      borderBottom: '1px solid #d4a24e',
      padding: '12px 20px 10px',
      textAlign: 'center',
      boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04), inset 0 -1px 0 rgba(0,0,0,0.3)',
    }}>
      <h1 style={{
        fontFamily: "'Rajdhani', system-ui, sans-serif",
        fontWeight: 700,
        fontSize: '18px',
        letterSpacing: '0.3em',
        color: '#d4a24e',
        margin: 0,
        textTransform: 'uppercase',
      }}>
        Cockpit Precision
      </h1>
      <div style={{
        fontFamily: "'B612 Mono', ui-monospace, monospace",
        fontSize: '8px',
        letterSpacing: '0.25em',
        color: '#6b7280',
        textTransform: 'uppercase',
        marginTop: '2px',
      }}>
        Chromatic Tuning System
      </div>
    </header>
  );
}
