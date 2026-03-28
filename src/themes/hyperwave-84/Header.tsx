import { useTheme } from '../useTheme';
import type { HeaderProps } from '../types';

export function HyperwaveHeader(_props: HeaderProps) {
  const { theme } = useTheme();
  const t = theme.tokens;

  return (
    <header
      style={{
        background:
          'linear-gradient(180deg, rgba(17,20,46,0.98) 0%, rgba(10,11,28,0.98) 100%)',
        borderBottom: `1px solid ${t.glassStroke}`,
        boxShadow: `inset 0 -1px 0 ${t.neonPinkSoft}, ${t.panelGlow}`,
        padding: '14px 18px 12px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: '0 auto 0 0',
          width: '100%',
          background:
            'linear-gradient(90deg, transparent 0%, rgba(95,251,255,0.18) 48%, transparent 100%)',
          height: '1px',
          top: '10px',
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 'auto 18px 10px auto',
          width: '46px',
          height: '46px',
          borderRadius: '999px',
          background: 'radial-gradient(circle, rgba(255,71,181,0.24) 0%, transparent 72%)',
          filter: 'blur(2px)',
          pointerEvents: 'none',
        }}
      />
      <p
        style={{
          margin: '0 0 4px',
          color: t.colorMuted as string,
          fontFamily: t.fontReadout as string,
          fontSize: '9px',
          letterSpacing: '0.34em',
          textTransform: 'uppercase',
        }}
      >
        Neo Arcade Tuning System
      </p>
      <h1
        style={{
          margin: 0,
          color: t.colorText as string,
          fontFamily: t.fontDisplay as string,
          fontSize: '24px',
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          textShadow: `${t.textGlowPink}, ${t.textGlowCyan}`,
        }}
      >
        Hyperwave <span style={{ color: t.neonCyan as string }}>84</span>
      </h1>
      <div
        style={{
          marginTop: '4px',
          display: 'flex',
          justifyContent: 'center',
          gap: '10px',
          color: t.colorAccent as string,
          fontFamily: t.fontReadout as string,
          fontSize: '10px',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
        }}
      >
        <span>Cyberpunk Guitar Tuner</span>
      </div>
    </header>
  );
}
