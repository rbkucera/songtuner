interface PitchMeterProps {
  centsOff: number; // -50 to +50 range displayed
  inTune: boolean;
}

export function PitchMeter({ centsOff, inTune }: PitchMeterProps) {
  // Clamp cents to display range
  const clampedCents = Math.max(-50, Math.min(50, centsOff));
  // Convert to percentage (0% = far flat, 50% = in tune, 100% = far sharp)
  const position = ((clampedCents + 50) / 100) * 100;

  const getColor = () => {
    if (inTune) return 'bg-tune-good';
    return Math.abs(centsOff) < 20 ? 'bg-tune-sharp' : 'bg-tune-flat';
  };

  return (
    <div className="w-full px-6">
      {/* Labels */}
      <div className="flex justify-between text-sm text-text-secondary mb-2">
        <span>Flat</span>
        <span>Sharp</span>
      </div>

      {/* Track */}
      <div className="relative h-3 bg-bg-card rounded-full overflow-hidden">
        {/* Center marker */}
        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-text-secondary/30 -translate-x-1/2 z-10" />

        {/* Indicator */}
        <div
          className={`absolute top-0 bottom-0 w-4 rounded-full ${getColor()}`}
          style={{ left: `calc(${position}% - 8px)` }}
        />
      </div>

      {/* Cents readout */}
      <div className="text-center mt-2">
        <span className={`text-lg font-mono ${inTune ? 'text-tune-good' : 'text-text-secondary'}`}>
          {centsOff > 0 ? '+' : ''}{Math.round(centsOff)} cents
        </span>
      </div>
    </div>
  );
}
