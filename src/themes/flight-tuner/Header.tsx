import { useTheme } from '../useTheme';

export function FlightTunerHeader() {
  const { theme } = useTheme();
  const t = theme.tokens;

  return (
    <header
      style={{
        backgroundColor: t.colorPanel as string,
        borderBottom: `2px solid ${t.colorAccentDark as string}`,
        padding: '8px 12px 7px',
      }}
    >
      <div
        style={{
          maxWidth: '420px',
          margin: '0 auto',
          border: `2px solid ${t.plateBorder as string}`,
          backgroundColor: t.plateBg as string,
          boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.04), inset 0 -1px 0 rgba(0,0,0,0.35)',
          padding: '6px 10px 5px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '10px',
            color: t.plateLabel as string,
            fontFamily: t.fontDisplay as string,
            fontSize: '9px',
            fontWeight: 500,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
          }}
        >
          <span>Flight Deck</span>
          <span style={{ color: t.colorAccent as string }}>Cal-01</span>
          <span>Mark II</span>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            marginTop: '4px',
          }}
        >
          <div
            style={{
              flex: 1,
              height: '1px',
              backgroundColor: t.colorAccentDark as string,
              opacity: 0.7,
            }}
          />
          <h1
            style={{
              margin: 0,
              fontFamily: t.fontDisplay as string,
              fontSize: '25px',
              fontWeight: 700,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: t.colorText as string,
              lineHeight: 1,
            }}
          >
            Flight Tuner
          </h1>
          <div
            style={{
              flex: 1,
              height: '1px',
              backgroundColor: t.colorAccentDark as string,
              opacity: 0.7,
            }}
          />
        </div>
      </div>
    </header>
  );
}
