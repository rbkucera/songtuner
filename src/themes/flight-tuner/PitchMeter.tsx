import { useId } from 'react';
import { useTheme } from '../useTheme';
import type { PitchMeterProps } from '../types';

const MAX_CENTS = 50;
const SWEEP_DEG = 140;
const HALF_SWEEP = SWEEP_DEG / 2;
const CX = 160;
const CY = 144;
const R_OUTER = 125;
const R_INNER = 106;
const R_TICK_MAJOR = 101;
const R_TICK_MINOR = 104;
const R_LABEL = 88;
const R_NEEDLE = 118;

function clampCents(cents: number) {
  return Math.max(-MAX_CENTS, Math.min(MAX_CENTS, cents));
}

function centsToAngle(cents: number) {
  return (clampCents(cents) / MAX_CENTS) * HALF_SWEEP;
}

function polarToXY(angleDeg: number, radius: number): [number, number] {
  const radians = ((angleDeg - 90) * Math.PI) / 180;
  return [CX + radius * Math.cos(radians), CY + radius * Math.sin(radians)];
}

function arcPath(startDeg: number, endDeg: number, radius: number) {
  const [x1, y1] = polarToXY(startDeg, radius);
  const [x2, y2] = polarToXY(endDeg, radius);
  const largeArc = Math.abs(endDeg - startDeg) > 180 ? 1 : 0;
  const sweep = endDeg > startDeg ? 1 : 0;
  return `M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} ${sweep} ${x2} ${y2}`;
}

function arcBand(startDeg: number, endDeg: number, rOuter: number, rInner: number) {
  const [ox1, oy1] = polarToXY(startDeg, rOuter);
  const [ox2, oy2] = polarToXY(endDeg, rOuter);
  const [ix2, iy2] = polarToXY(endDeg, rInner);
  const [ix1, iy1] = polarToXY(startDeg, rInner);
  const largeArc = Math.abs(endDeg - startDeg) > 180 ? 1 : 0;

  return [
    `M ${ox1} ${oy1}`,
    `A ${rOuter} ${rOuter} 0 ${largeArc} 1 ${ox2} ${oy2}`,
    `L ${ix2} ${iy2}`,
    `A ${rInner} ${rInner} 0 ${largeArc} 0 ${ix1} ${iy1}`,
    'Z',
  ].join(' ');
}

const zoneDefs = [
  { start: -70, end: -22, token: 'dangerBand' },
  { start: -22, end: -7, token: 'warningBand' },
  { start: -7, end: 7, token: 'safeBand' },
  { start: 7, end: 22, token: 'warningBand' },
  { start: 22, end: 70, token: 'dangerBand' },
] as const;

const ticks = Array.from({ length: 21 }, (_, index) => {
  const cents = -50 + index * 5;
  return {
    cents,
    angle: (cents / MAX_CENTS) * HALF_SWEEP,
    major: cents % 10 === 0,
  };
});

export function FlightTunerPitchMeter({ centsOff, inTune }: PitchMeterProps) {
  const { theme } = useTheme();
  const t = theme.tokens;
  const meterId = useId().replace(/:/g, '');
  const clampedCents = clampCents(centsOff);
  const needleAngle = centsToAngle(clampedCents);
  const [needleX, needleY] = polarToXY(needleAngle, R_NEEDLE);
  const statusColor = inTune
    ? (t.counterDigit as string)
    : Math.abs(clampedCents) <= 15
      ? (t.warningBand as string)
      : (t.dangerBand as string);
  const roundedCents = Math.round(clampedCents);
  const signChar = roundedCents > 0 ? '+' : roundedCents < 0 ? '-' : '0';
  const digits = Math.abs(roundedCents).toString().padStart(2, '0').slice(-2).split('');

  return (
    <div className="w-full" style={{ padding: '0 12px', marginBottom: '-6px' }}>
      <div
        style={{
          position: 'relative',
          width: 'min(100%, 360px)',
          margin: '0 auto',
          padding: '8px 12px',
          boxSizing: 'border-box',
        }}
      >
        {[
          { top: '3px', left: '3px' },
          { top: '3px', right: '3px' },
          { bottom: '3px', left: '3px' },
          { bottom: '3px', right: '3px' },
        ].map((position, index) => (
          <span
            key={`meter-bolt-${index}`}
            style={{
              position: 'absolute',
              width: '10px',
              height: '10px',
              borderRadius: '999px',
              backgroundColor: t.boltColor as string,
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.3), inset 0 -1px 0 rgba(0,0,0,0.25)',
              ...position,
            }}
          />
        ))}
        <div
          style={{
            border: `2px solid ${t.plateInset as string}`,
            boxShadow: `inset 1px 1px 0 rgba(255,255,255,0.04), inset -1px -1px 0 ${t.gaugeEdge as string}, inset 0 2px 2px rgba(0,0,0,0.15), inset 0 -1px 0 rgba(255,255,255,0.1)`,
            borderRadius: '30px',
            padding: '4px',
          }}
        >
        <div
          style={{
            border: `5px solid ${t.gaugeBezel as string}`,
            borderRadius: '26px',
            background: `linear-gradient(180deg, ${t.dialFace as string} 0%, ${t.dialFaceShadow as string} 100%)`,
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.34), inset 0 -2px 0 rgba(0,0,0,0.08), 0 3px 0 rgba(0,0,0,0.22)',
            padding: '7px 8px 9px',
          }}
        >
          <svg
            viewBox="0 0 320 194"
            style={{ width: '100%', maxWidth: '320px', display: 'block', margin: '0 auto' }}
          >
            <defs>
              <radialGradient id={`flight-dial-${meterId}`} cx="50%" cy="100%" r="90%">
                <stop offset="0%" stopColor={t.dialFace as string} />
                <stop offset="100%" stopColor={t.dialFaceShadow as string} />
              </radialGradient>
            </defs>

            <path
              d={arcBand(-HALF_SWEEP - 4, HALF_SWEEP + 4, R_OUTER + 10, R_OUTER + 2)}
              fill={t.plateInset as string}
              opacity="0.92"
            />

            <path
              d={arcBand(-HALF_SWEEP, HALF_SWEEP, R_OUTER, R_INNER)}
              fill={`url(#flight-dial-${meterId})`}
              stroke={t.tickSoft as string}
              strokeWidth="1.1"
            />

            {zoneDefs.map((zone) => (
              <path
                key={`${zone.start}-${zone.end}`}
                d={arcBand(zone.start, zone.end, R_OUTER - 4, R_INNER + 6)}
                fill={t[zone.token] as string}
                opacity={zone.token === 'safeBand' ? 0.78 : 0.64}
              />
            ))}

            {ticks.map(({ angle, major, cents }) => {
              const [x1, y1] = polarToXY(angle, major ? R_TICK_MAJOR : R_TICK_MINOR);
              const [x2, y2] = polarToXY(angle, R_INNER + 1);
              const [tx, ty] = polarToXY(angle, R_LABEL);

              return (
                <g key={cents}>
                  <line
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke={major ? (t.tickStrong as string) : (t.tickSoft as string)}
                    strokeWidth={major ? '1.8' : '1'}
                    strokeLinecap="square"
                  />
                  {major && cents !== 0 && (
                    <text
                      x={tx}
                      y={ty + 4}
                      textAnchor="middle"
                      fontFamily={t.fontReadout as string}
                      fontSize="10"
                      letterSpacing="0.05em"
                      fill={t.dialText as string}
                    >
                      {Math.abs(cents)}
                    </text>
                  )}
                </g>
              );
            })}

            <text
              x={CX}
              y="82"
              textAnchor="middle"
              fontFamily={t.fontDisplay as string}
              fontSize="10"
              fontWeight="600"
              letterSpacing="0.16em"
              fill={t.dialMuted as string}
              style={{ textTransform: 'uppercase' }}
            >
              Cents Offset
            </text>
            <text
              x="96"
              y="132"
              textAnchor="middle"
              fontFamily={t.fontDisplay as string}
              fontSize="9"
              fontWeight="600"
              letterSpacing="0.12em"
              fill={t.dialMuted as string}
              style={{ textTransform: 'uppercase' }}
            >
              Flat
            </text>
            <text
              x="224"
              y="132"
              textAnchor="middle"
              fontFamily={t.fontDisplay as string}
              fontSize="9"
              fontWeight="600"
              letterSpacing="0.12em"
              fill={t.dialMuted as string}
              style={{ textTransform: 'uppercase' }}
            >
              Sharp
            </text>
            <text
              x={CX}
              y="118"
              textAnchor="middle"
              fontFamily={t.fontReadout as string}
              fontSize="8"
              letterSpacing="0.08em"
              fill={t.dialMuted as string}
            >
              CAL
            </text>

            <line
              x1={CX}
              y1={CY}
              x2={needleX}
              y2={needleY}
              stroke={t.dialText as string}
              strokeWidth="3"
              strokeLinecap="round"
            />
            <line
              x1={CX + 1}
              y1={CY + 1}
              x2={needleX + 1}
              y2={needleY + 1}
              stroke="rgba(0,0,0,0.12)"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <circle
              cx={CX}
              cy={CY}
              r="10.5"
              fill={t.gaugeBezel as string}
              stroke={t.plateInset as string}
              strokeWidth="1.5"
            />
            <circle
              cx={CX}
              cy={CY}
              r="7.2"
              fill={t.plateBg as string}
              stroke={t.gaugeEdge as string}
              strokeWidth="1"
            />
            <circle
              cx={CX}
              cy={CY}
              r="4.2"
              fill={t.plateInset as string}
              stroke={t.colorAccentDark as string}
              strokeWidth="0.8"
            />
            <circle cx={CX} cy={CY} r="2.1" fill="#0b0e10" />
            <line
              x1={CX - 1.8}
              y1={CY - 1.8}
              x2={CX + 1.8}
              y2={CY + 1.8}
              stroke={t.gaugeEdge as string}
              strokeWidth="0.8"
              strokeLinecap="round"
              opacity="0.85"
            />
            <path
              d={arcPath(-2.4, 2.4, R_OUTER - 12)}
              fill="none"
              stroke={t.markerLight as string}
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
        </div>
        </div>
      </div>

      <div
        style={{
          position: 'relative',
          width: 'min(100%, 360px)',
          margin: '4px auto 0',
          padding: '0 12px',
          boxSizing: 'border-box',
        }}
      >
        <div
          style={{
            border: `2px solid ${t.plateInset as string}`,
            boxShadow: `inset 1px 1px 0 rgba(255,255,255,0.04), inset -1px -1px 0 ${t.gaugeEdge as string}, inset 0 2px 2px rgba(0,0,0,0.15), inset 0 -1px 0 rgba(255,255,255,0.1)`,
            borderRadius: '22px',
            padding: '4px',
          }}
        >
        <div
          style={{
            border: `5px solid ${t.gaugeBezel as string}`,
            borderRadius: '18px',
            background: `linear-gradient(180deg, ${t.dialFace as string} 0%, ${t.dialFaceShadow as string} 100%)`,
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.32), inset 0 -2px 0 rgba(0,0,0,0.08), 0 3px 0 rgba(0,0,0,0.2)',
            padding: '8px 12px',
            minHeight: '58px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
            {[signChar, ...digits].map((char, index) => (
              <div
                key={`${index}-${char}`}
                style={{
                  width: index === 0 ? '30px' : '34px',
                  height: '40px',
                  border: `2px solid ${t.counterBorder as string}`,
                  borderRadius: '2px',
                  background: `linear-gradient(180deg, #202528 0%, ${t.counterWindow as string} 100%)`,
                  boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.45), inset 0 -1px 0 rgba(255,255,255,0.04)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <span
                  style={{
                    fontFamily: t.fontReadout as string,
                    fontSize: index === 0 ? '24px' : '28px',
                    fontWeight: 500,
                    lineHeight: 1,
                    color: statusColor,
                  }}
                >
                  {char}
                </span>
              </div>
            ))}
          </div>
          <span
            style={{
              fontFamily: t.fontDisplay as string,
              fontSize: '22px',
              fontWeight: 600,
              letterSpacing: '0.06em',
              color: t.dialText as string,
              textTransform: 'uppercase',
              lineHeight: 1,
            }}
          >
            Cents
          </span>
        </div>
        </div>
      </div>
    </div>
  );
}
