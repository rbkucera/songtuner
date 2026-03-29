import type { PitchMeterProps } from '../types';

// ── Arc geometry ─────────────────────────────────────────
// 180° semicircular gauge. Pivot at bottom center, needle sweeps full semicircle.

const CX = 140;         // pivot x
const CY = 150;         // pivot y
const R_OUTER = 120;    // outer arc radius (color zones)
const R_INNER = 108;    // inner arc radius (zone band width = 12)
const R_TICK = 104;     // tick mark inner end
const R_LABEL = 86;     // label radius
const R_NEEDLE = 100;   // needle tip radius

const HALF_SWEEP = 90;  // ±90° from vertical (180° total)
const MAX_CENTS = 50;

// Convert cents to angle in degrees (0 = straight up, negative = left)
function centsToAngle(cents: number): number {
  const clamped = Math.max(-MAX_CENTS, Math.min(MAX_CENTS, cents));
  return (clamped / MAX_CENTS) * HALF_SWEEP;
}

// Convert angle (degrees from vertical) to SVG coordinates
function polarToXY(angleDeg: number, radius: number): [number, number] {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
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
  { start: -90, end: -36, color: '#dc2626' },   // far flat — red
  { start: -36, end: -13, color: '#d4a24e' },   // near flat — amber
  { start: -13, end: 13,  color: '#4ade80' },   // in tune — green
  { start: 13,  end: 36,  color: '#d4a24e' },   // near sharp — amber
  { start: 36,  end: 90,  color: '#dc2626' },   // far sharp — red
];

// ── Tick marks ───────────────────────────────────────────
function generateTicks() {
  const ticks: Array<{ angle: number; major: boolean; cents: number }> = [];
  for (let cents = -MAX_CENTS; cents <= MAX_CENTS; cents += 5) {
    const angle = (cents / MAX_CENTS) * HALF_SWEEP;
    ticks.push({ angle, major: cents % 10 === 0, cents });
  }
  return ticks;
}

const TICKS = generateTicks();

// Labels at specific cent values
const LABELS = [-50, -30, -10, 0, 10, 30, 50];

// ── Component ────────────────────────────────────────────

export function CockpitMeter({ centsOff, inTune }: PitchMeterProps) {
  const needleAngle = centsToAngle(centsOff);

  // Triangle needle: 3 points — tip, and two base points flanking the pivot
  const [tipX, tipY] = polarToXY(needleAngle, R_NEEDLE);
  const baseOffset = 3; // half-width of needle base
  const perpAngle = needleAngle + 90;
  const perpRad = (perpAngle - 90) * Math.PI / 180;
  const b1x = CX + baseOffset * Math.cos(perpRad);
  const b1y = CY + baseOffset * Math.sin(perpRad);
  const b2x = CX - baseOffset * Math.cos(perpRad);
  const b2y = CY - baseOffset * Math.sin(perpRad);

  // Readout color matches zone
  const absCents = Math.abs(centsOff);
  const readoutColor = inTune ? '#4ade80' : absCents < 15 ? '#d4a24e' : '#dc2626';

  return (
    <div className="w-full px-2">
      <svg viewBox="0 0 280 170" style={{ width: '100%', maxWidth: '320px', display: 'block', margin: '0 auto' }}>
        <defs>
          <radialGradient id="cockpitDialGrad" cx="50%" cy="100%" r="85%">
            <stop offset="0%" stopColor="#22262b" />
            <stop offset="100%" stopColor="#1a1d21" />
          </radialGradient>
        </defs>

        {/* Dark dial face background */}
        <path
          d={arcSector(-HALF_SWEEP, HALF_SWEEP, R_OUTER + 4, 0)}
          fill="url(#cockpitDialGrad)"
        />

        {/* Outer bezel ring */}
        <path
          d={arcPath(-HALF_SWEEP - 2, HALF_SWEEP + 2, R_OUTER + 6)}
          fill="none"
          stroke="#3a3f46"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d={arcPath(-HALF_SWEEP - 2, HALF_SWEEP + 2, R_OUTER + 6)}
          fill="none"
          stroke="rgba(212,162,78,0.15)"
          strokeWidth="1"
          strokeLinecap="round"
        />

        {/* Color zone bands */}
        {ZONES.map((zone, i) => (
          <path
            key={i}
            d={arcSector(zone.start, zone.end, R_OUTER, R_INNER)}
            fill={zone.color}
            opacity={
              inTune && zone.color === '#4ade80' ? 0.85
              : !inTune && absCents >= Math.abs(zone.start) * MAX_CENTS / HALF_SWEEP &&
                absCents <= Math.abs(zone.end) * MAX_CENTS / HALF_SWEEP + 5
                ? 0.6
                : 0.25
            }
          />
        ))}

        {/* Tick marks */}
        {TICKS.map(({ angle, major }, i) => {
          const [x1, y1] = polarToXY(angle, major ? R_TICK - 5 : R_TICK);
          const [x2, y2] = polarToXY(angle, R_INNER + 1);
          return (
            <line
              key={i}
              x1={x1} y1={y1} x2={x2} y2={y2}
              stroke={major ? '#e8e4dc' : '#6b7280'}
              strokeWidth={major ? 1.2 : 0.6}
              opacity={major ? 0.8 : 0.5}
            />
          );
        })}

        {/* Numeric cent labels */}
        {LABELS.map(cents => {
          const angle = (cents / MAX_CENTS) * HALF_SWEEP;
          const [x, y] = polarToXY(angle, R_LABEL);
          return (
            <text
              key={cents}
              x={x}
              y={y}
              textAnchor="middle"
              dominantBaseline="central"
              fontSize="8"
              fontFamily="'B612 Mono', ui-monospace, monospace"
              fill="#6b7280"
            >
              {cents === 0 ? '0' : cents > 0 ? `+${cents}` : `${cents}`}
            </text>
          );
        })}

        {/* FLAT / SHARP labels */}
        {(() => {
          const [fx, fy] = polarToXY(-HALF_SWEEP + 12, R_LABEL - 14);
          const [sx, sy] = polarToXY(HALF_SWEEP - 12, R_LABEL - 14);
          return (
            <>
              <text x={fx} y={fy} textAnchor="middle" fontSize="7" fontFamily="'Rajdhani', system-ui, sans-serif" fontWeight="600" fill="#6b7280" letterSpacing="0.1em">
                FLAT
              </text>
              <text x={sx} y={sy} textAnchor="middle" fontSize="7" fontFamily="'Rajdhani', system-ui, sans-serif" fontWeight="600" fill="#6b7280" letterSpacing="0.1em">
                SHARP
              </text>
            </>
          );
        })()}

        {/* Center reference mark at 0 */}
        {(() => {
          const [mx, my] = polarToXY(0, R_OUTER + 2);
          return (
            <polygon
              points={`${mx},${my - 5} ${mx - 3},${my + 1} ${mx + 3},${my + 1}`}
              fill="#d4a24e"
              opacity="0.7"
            />
          );
        })()}

        {/* Needle shadow */}
        <polygon
          points={`${tipX + 1},${tipY + 1} ${b1x + 1},${b1y + 1} ${b2x + 1},${b2y + 1}`}
          fill="rgba(0,0,0,0.3)"
        />

        {/* Triangle needle */}
        <polygon
          points={`${tipX},${tipY} ${b1x},${b1y} ${b2x},${b2y}`}
          fill="#e07020"
        />

        {/* Pivot cap */}
        <circle cx={CX} cy={CY} r="7" fill="#1a1d21" stroke="#d4a24e" strokeWidth="1.5" />
        <circle cx={CX} cy={CY} r="3" fill="#d4a24e" opacity="0.6" />

        {/* In-tune LED indicator */}
        {inTune && (
          <circle cx={CX} cy={CY - 30} r="3.5" fill="#4ade80" opacity="0.9">
            <animate attributeName="opacity" values="0.9;0.4;0.9" dur="1.5s" repeatCount="indefinite" />
          </circle>
        )}
      </svg>

      {/* Cents readout below gauge */}
      <div style={{ textAlign: 'center', marginTop: '4px' }}>
        <span style={{
          fontFamily: "'B612 Mono', ui-monospace, monospace",
          fontSize: '16px',
          color: readoutColor,
          letterSpacing: '0.08em',
        }}>
          {inTune ? 'IN TUNE' : `${centsOff > 0 ? '+' : ''}${Math.round(centsOff)} \u00A2`}
        </span>
      </div>
    </div>
  );
}
