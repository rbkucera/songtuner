import type { PitchMeterProps } from '../types';

// ── Arc geometry ─────────────────────────────────────────
// D'Arsonval-style semicircular meter.
// Pivot at bottom center, needle sweeps a 140° arc.

const CX = 140;         // pivot x
const CY = 140;         // pivot y
const R_OUTER = 115;    // outer arc radius (color zones)
const R_INNER = 100;    // inner arc radius (zone band width = 15)
const R_TICK = 95;      // tick mark inner end
const R_LABEL = 82;     // label radius
const R_NEEDLE = 108;   // needle tip radius

const SWEEP_DEG = 140;  // total sweep in degrees
const HALF_SWEEP = SWEEP_DEG / 2; // ±70° from vertical
const MAX_CENTS = 50;

// Convert cents to angle in degrees (0 = straight up, negative = left)
function centsToAngle(cents: number): number {
  const clamped = Math.max(-MAX_CENTS, Math.min(MAX_CENTS, cents));
  return (clamped / MAX_CENTS) * HALF_SWEEP;
}

// Convert angle (degrees from vertical) to SVG coordinates
function polarToXY(angleDeg: number, radius: number): [number, number] {
  const rad = ((angleDeg - 90) * Math.PI) / 180; // -90 because SVG 0° is right
  return [CX + radius * Math.cos(rad), CY + radius * Math.sin(rad)];
}

// SVG arc path from angle1 to angle2 at given radius
function arcPath(startDeg: number, endDeg: number, r: number): string {
  const [x1, y1] = polarToXY(startDeg, r);
  const [x2, y2] = polarToXY(endDeg, r);
  const largeArc = Math.abs(endDeg - startDeg) > 180 ? 1 : 0;
  const sweep = endDeg > startDeg ? 1 : 0;
  return `M ${x1} ${y1} A ${r} ${r} 0 ${largeArc} ${sweep} ${x2} ${y2}`;
}

// SVG arc sector (filled band between two radii)
function arcSector(startDeg: number, endDeg: number, rOuter: number, rInner: number): string {
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

// ── Color zones (angles from vertical) ──────────────────
const ZONES: Array<{ start: number; end: number; color: string }> = [
  { start: -70, end: -25, color: '#b83030' },   // far flat — red
  { start: -25, end: -7,  color: '#c49020' },   // near flat — amber
  { start: -7,  end: 7,   color: '#2a8a3a' },   // in tune — green
  { start: 7,   end: 25,  color: '#c49020' },   // near sharp — amber
  { start: 25,  end: 70,  color: '#b83030' },    // far sharp — red
];

// ── Tick marks ───────────────────────────────────────────
function generateTicks() {
  const ticks: Array<{ angle: number; major: boolean }> = [];
  for (let cents = -MAX_CENTS; cents <= MAX_CENTS; cents += 5) {
    const angle = (cents / MAX_CENTS) * HALF_SWEEP;
    ticks.push({ angle, major: cents % 10 === 0 });
  }
  return ticks;
}

const TICKS = generateTicks();

// ── Component ────────────────────────────────────────────

export function AnalogMeter({ centsOff, inTune }: PitchMeterProps) {
  const needleAngle = centsToAngle(centsOff);
  const [nx, ny] = polarToXY(needleAngle, R_NEEDLE);

  // Readout color matches the zone the needle is in
  const absCents = Math.abs(centsOff);
  const readoutColor = inTune ? '#2a8a3a' : absCents < 15 ? '#c49020' : '#b83030';

  return (
    <div className="w-full px-2">
      <svg viewBox="0 0 280 170" style={{ width: '100%', maxWidth: '320px', display: 'block', margin: '0 auto' }}>
        {/* Dial face background */}
        <defs>
          <radialGradient id="dialGrad" cx="50%" cy="100%" r="80%">
            <stop offset="0%" stopColor="#f0ead8" />
            <stop offset="100%" stopColor="#d4ccb8" />
          </radialGradient>
        </defs>

        {/* Outer chrome bezel ring */}
        <path
          d={arcPath(-HALF_SWEEP - 5, HALF_SWEEP + 5, R_OUTER + 8)}
          fill="none"
          stroke="#a0a0a0"
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* Color zone bands */}
        {ZONES.map((zone, i) => (
          <path
            key={i}
            d={arcSector(zone.start, zone.end, R_OUTER, R_INNER)}
            fill={zone.color}
            opacity={
              // Brighten the zone the needle is currently in
              inTune && zone.color === '#2a8a3a' ? 0.9
              : Math.abs(needleAngle) >= Math.abs(zone.start) &&
                Math.abs(needleAngle) <= Math.abs(zone.end) + 2
                ? 0.7
                : 0.35
            }
          />
        ))}

        {/* Tick marks */}
        {TICKS.map(({ angle, major }, i) => {
          const [x1, y1] = polarToXY(angle, major ? R_TICK - 4 : R_TICK);
          const [x2, y2] = polarToXY(angle, R_INNER + 2);
          return (
            <line
              key={i}
              x1={x1} y1={y1} x2={x2} y2={y2}
              stroke="#2a2420"
              strokeWidth={major ? 1.5 : 0.75}
              opacity={major ? 0.7 : 0.4}
            />
          );
        })}

        {/* Labels */}
        {(() => {
          const [fx, fy] = polarToXY(-HALF_SWEEP + 5, R_LABEL);
          const [sx, sy] = polarToXY(HALF_SWEEP - 5, R_LABEL);
          return (
            <>
              <text x={fx} y={fy} textAnchor="middle" fontSize="9" fontFamily="'DM Serif Display', Georgia, serif" fill="#8a8070" fontStyle="italic">
                flat
              </text>
              <text x={sx} y={sy} textAnchor="middle" fontSize="9" fontFamily="'DM Serif Display', Georgia, serif" fill="#8a8070" fontStyle="italic">
                sharp
              </text>
            </>
          );
        })()}

        {/* Needle */}
        <line
          x1={CX}
          y1={CY}
          x2={nx}
          y2={ny}
          stroke="#1a1a1a"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* Needle shadow (subtle depth) */}
        <line
          x1={CX + 1}
          y1={CY + 1}
          x2={nx + 1}
          y2={ny + 1}
          stroke="rgba(0,0,0,0.15)"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* Pivot point — brass circle */}
        <circle cx={CX} cy={CY} r="6" fill="#c4a44a" />
        <circle cx={CX} cy={CY} r="3" fill="#a08030" />

        {/* In-tune indicator */}
        {inTune && (
          <circle cx={CX} cy={CY - 35} r="4" fill="#2a8a3a" opacity="0.9">
            <animate attributeName="opacity" values="0.9;0.5;0.9" dur="1.5s" repeatCount="indefinite" />
          </circle>
        )}
      </svg>

      {/* Cents readout below gauge */}
      <div style={{ textAlign: 'center', marginTop: '4px' }}>
        <span style={{
          fontFamily: "'Courier Prime', 'Courier New', monospace",
          fontSize: '18px',
          color: readoutColor,
          letterSpacing: '0.05em',
        }}>
          {inTune ? 'IN TUNE' : `${centsOff > 0 ? '+' : ''}${Math.round(centsOff)} cents`}
        </span>
      </div>
    </div>
  );
}
