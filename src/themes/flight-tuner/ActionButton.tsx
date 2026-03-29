import { useTheme } from '../useTheme';
import type { ActionButtonProps } from '../types';

export function FlightTunerActionButton({ isListening, onClick }: ActionButtonProps) {
  const { theme } = useTheme();
  const t = theme.tokens;
  const activeColor = isListening ? (t.switchLive as string) : (t.switchIdle as string);

  return (
    <button
      onClick={onClick}
      style={{
        width: '100%',
        border: `2px solid ${isListening ? (t.colorAccentDark as string) : (t.plateBorder as string)}`,
        backgroundColor: t.plateBg as string,
        boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.04), inset 0 -1px 0 rgba(0,0,0,0.32), 0 3px 0 rgba(0,0,0,0.2)',
        padding: '10px 12px',
        color: t.colorText as string,
        cursor: 'pointer',
        WebkitAppearance: 'none',
      }}
      onPointerDown={(event) => {
        event.currentTarget.style.transform = 'translateY(1px)';
      }}
      onPointerUp={(event) => {
        event.currentTarget.style.transform = '';
      }}
      onPointerLeave={(event) => {
        event.currentTarget.style.transform = '';
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div
          style={{
            position: 'relative',
            width: '78px',
            height: '40px',
            border: `2px solid ${t.switchGuard as string}`,
            backgroundColor: t.plateInset as string,
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04), inset 0 -1px 0 rgba(0,0,0,0.35)',
            flexShrink: 0,
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: '4px',
              left: isListening ? '39px' : '4px',
              width: '31px',
              height: '28px',
              border: `1px solid ${t.colorBg as string}`,
              backgroundColor: activeColor,
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.18), inset 0 -1px 0 rgba(0,0,0,0.18)',
              transition: 'left 0.12s ease',
            }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              alignItems: 'center',
              fontFamily: t.fontReadout as string,
              fontSize: '9px',
              color: t.colorText as string,
              opacity: 0.76,
              letterSpacing: '0.06em',
            }}
          >
            <span style={{ textAlign: 'center' }}>OFF</span>
            <span style={{ textAlign: 'center' }}>ON</span>
          </div>
        </div>
        <div style={{ flex: 1, textAlign: 'left' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '8px',
            }}
          >
            <span
              style={{
                fontFamily: t.fontDisplay as string,
                fontSize: '17px',
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: t.colorText as string,
              }}
            >
              Arm Tuner
            </span>
            <span
              style={{
                width: '9px',
                height: '9px',
                borderRadius: '999px',
                backgroundColor: activeColor,
                border: `1px solid ${t.plateInset as string}`,
                flexShrink: 0,
              }}
            />
          </div>
          <div
            style={{
              marginTop: '1px',
              fontFamily: t.fontDisplay as string,
              fontSize: '9px',
              fontWeight: 500,
              letterSpacing: '0.09em',
              textTransform: 'uppercase',
              color: isListening ? (t.colorAccent as string) : (t.plateLabel as string),
              textShadow: isListening ? `0 0 6px ${t.colorAccentDark as string}` : 'none',
            }}
          >
            {isListening ? 'System Live' : 'Press To Begin'}
          </div>
        </div>
      </div>
    </button>
  );
}
