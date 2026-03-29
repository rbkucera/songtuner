import { useTheme } from '../useTheme';
import { getStringLabel } from '../../lib/pitchUtils';
import type { StringIndicatorProps } from '../types';

export function FlightTunerStringIndicator({
  tuning,
  activeStringIndex,
  inTune,
}: StringIndicatorProps) {
  const { theme } = useTheme();
  const t = theme.tokens;
  const stringsReversed = [...tuning.noteNames].reverse();

  return (
    <div
      style={{
        width: 'min(100%, 360px)',
        padding: '0 12px 2px',
        boxSizing: 'border-box',
        margin: '-4px auto 0',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'center', gap: '4px' }}>
        {stringsReversed.map((noteName, displayIndex) => {
          const actualIndex = tuning.stringCount - 1 - displayIndex;
          const isActive = activeStringIndex === actualIndex;
          const label = getStringLabel(actualIndex, tuning.stringCount);
          const liveColor = inTune ? (t.colorInTune as string) : (t.colorAccent as string);
          const stripeColor = isActive ? liveColor : (t.tickSoft as string);

          return (
            <div
              key={actualIndex}
              style={{
                flex: 1,
                minWidth: 0,
                maxWidth: '46px',
                border: `2px solid ${t.plateInset as string}`,
                borderRadius: '14px',
                boxShadow: `inset 1px 1px 0 rgba(255,255,255,0.04), inset -1px -1px 0 ${t.gaugeEdge as string}, inset 0 2px 2px rgba(0,0,0,0.15), inset 0 -1px 0 rgba(255,255,255,0.1)`,
                padding: '3px',
                boxSizing: 'border-box',
              }}
            >
              <div
                style={{
                  border: `4px solid ${isActive ? liveColor : (t.gaugeBezel as string)}`,
                  borderRadius: '10px',
                  background: `linear-gradient(180deg, ${t.dialFace as string} 0%, ${t.dialFaceShadow as string} 100%)`,
                  padding: '8px 3px 7px',
                  textAlign: 'center',
                  boxShadow: isActive
                    ? `inset 0 0 0 1px ${liveColor}33, inset 0 1px 0 rgba(255,255,255,0.24), 0 3px 0 rgba(0,0,0,0.16)`
                    : 'inset 0 1px 0 rgba(255,255,255,0.22), 0 3px 0 rgba(0,0,0,0.16)',
                  transform: isActive ? 'translateY(-1px)' : 'translateY(0)',
                  transition: 'transform 0.12s ease, border-color 0.12s ease',
                }}
              >
              <div
                style={{
                  width: '100%',
                  height: '3px',
                  backgroundColor: isActive ? liveColor : (t.borderSubtle as string),
                  marginBottom: '6px',
                  opacity: isActive ? 1 : 0.55,
                }}
              />
              <div
                style={{
                  margin: '0 auto 6px',
                  width: `${2 + displayIndex * 0.8}px`,
                  minWidth: '2px',
                  height: '34px',
                  borderRadius: '1px',
                  background: `linear-gradient(180deg, ${t.markerLight as string} 0%, ${stripeColor} 100%)`,
                }}
              />
              <div
                style={{
                  fontFamily: t.fontDisplay as string,
                  fontSize: '12px',
                  fontWeight: 700,
                  color: isActive ? (t.dialText as string) : (t.tickStrong as string),
                  lineHeight: 1.05,
                }}
              >
                {noteName}
              </div>
              <div
                style={{
                  marginTop: '1px',
                  fontFamily: t.fontReadout as string,
                  fontSize: '8px',
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  color: isActive ? (t.dialText as string) : (t.tickStrong as string),
                  opacity: 0.9,
                }}
              >
                CH {label}
              </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
