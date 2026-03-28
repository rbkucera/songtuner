import { useTheme } from '../useTheme';
import type { PitchMeterProps } from '../types';

const TOTAL_SEGMENTS = 21;
const CENTER = Math.floor(TOTAL_SEGMENTS / 2);

export function DefaultPitchMeter({ centsOff, inTune }: PitchMeterProps) {
  const { theme } = useTheme();
  const t = theme.tokens;

  function segmentColor(dist: number) {
    if (dist <= 2) return { active: t.colorInTune as string, dim: `${t.colorInTune}12` };
    if (dist <= 5) return { active: t.colorAccent as string, dim: `${t.colorAccent}12` };
    return { active: t.colorError as string, dim: `${t.colorError}12` };
  }

  const litCount = inTune ? 1 : Math.min(CENTER, Math.round(Math.abs(centsOff) / 5));
  const direction = centsOff < 0 ? 'left' : 'right';

  const isLit = (index: number): boolean => {
    if (litCount === 0) return index === CENTER;
    if (index === CENTER) return true;
    if (direction === 'left' && index < CENTER) return index >= CENTER - litCount;
    if (direction === 'right' && index > CENTER) return index <= CENTER + litCount;
    return false;
  };

  const outerDist = inTune ? 0 : Math.min(CENTER, Math.round(Math.abs(centsOff) / 5));
  const { active: readoutColor } = segmentColor(outerDist);

  return (
    <div className="w-full px-4">
      <div className="flex justify-between mb-2" style={{ fontFamily: t.fontDisplay as string, fontSize: '10px', letterSpacing: '0.15em', color: t.colorMuted as string }}>
        <span>FLAT</span>
        <span>SHARP</span>
      </div>
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
      <div className="text-center mt-3">
        <span style={{
          fontFamily: t.fontReadout as string,
          fontSize: '20px',
          color: inTune ? t.colorInTune as string : readoutColor,
          textShadow: `0 0 10px ${inTune ? t.colorInTune : readoutColor}`,
        }}>
          {inTune ? 'IN TUNE' : `${centsOff > 0 ? '+' : ''}${Math.round(centsOff)} cents`}
        </span>
      </div>
    </div>
  );
}
