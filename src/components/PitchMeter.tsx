// 21-segment LED bar graph tuning meter.
// Segments light up from center outward: green (close), amber (near), red (far).
// Inactive segments are dimly visible — classic LED "off" look.

interface PitchMeterProps {
  centsOff: number;
  inTune: boolean;
}

const TOTAL_SEGMENTS = 21; // must be odd
const CENTER = Math.floor(TOTAL_SEGMENTS / 2); // index 10

// Map a segment's distance from center to its color role
function segmentColor(distFromCenter: number): { active: string; dim: string } {
  if (distFromCenter <= 2) return { active: '#00e644', dim: 'rgba(0,230,68,0.07)' };
  if (distFromCenter <= 5) return { active: '#ff7700', dim: 'rgba(255,119,0,0.07)' };
  return { active: '#ff2200', dim: 'rgba(255,34,0,0.07)' };
}

export function PitchMeter({ centsOff, inTune }: PitchMeterProps) {
  // How many segments to light on each side of center (1 segment = ~5 cents)
  const litCount = inTune ? 1 : Math.min(CENTER, Math.round(Math.abs(centsOff) / 5));
  const direction = centsOff < 0 ? 'left' : 'right'; // flat = left, sharp = right

  const isLit = (index: number): boolean => {
    if (litCount === 0) return index === CENTER;
    if (index === CENTER) return true;
    if (direction === 'left' && index < CENTER) return index >= CENTER - litCount;
    if (direction === 'right' && index > CENTER) return index <= CENTER + litCount;
    return false;
  };

  const outerLitDist = inTune ? 0 : Math.min(CENTER, Math.round(Math.abs(centsOff) / 5));
  const { active: readoutColor } = segmentColor(outerLitDist);

  return (
    <div className="w-full px-4">
      {/* Direction labels */}
      <div className="flex justify-between mb-2" style={{ fontFamily: 'var(--font-display)', fontSize: '10px', letterSpacing: '0.15em', color: '#6a6258' }}>
        <span>FLAT</span>
        <span>SHARP</span>
      </div>

      {/* LED segments */}
      <div className="flex justify-center gap-1">
        {Array.from({ length: TOTAL_SEGMENTS }, (_, i) => {
          const dist = Math.abs(i - CENTER);
          const { active, dim } = segmentColor(dist);
          const lit = isLit(i);
          const isCenter = i === CENTER;
          return (
            <div
              key={i}
              style={{
                width: isCenter ? '5px' : '4px',
                height: '28px',
                borderRadius: '2px',
                backgroundColor: lit ? active : dim,
                boxShadow: lit ? `0 0 6px ${active}, 0 0 2px ${active}` : 'none',
                transition: 'background-color 0.05s, box-shadow 0.05s',
              }}
            />
          );
        })}
      </div>

      {/* Cents readout */}
      <div className="text-center mt-3">
        <span style={{
          fontFamily: 'var(--font-readout)',
          fontSize: '20px',
          color: inTune ? '#00e644' : readoutColor,
          textShadow: `0 0 10px ${inTune ? '#00e644' : readoutColor}`,
        }}>
          {inTune ? 'IN TUNE' : `${centsOff > 0 ? '+' : ''}${Math.round(centsOff)} cents`}
        </span>
      </div>
    </div>
  );
}
