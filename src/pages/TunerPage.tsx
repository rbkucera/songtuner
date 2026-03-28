import { useState } from 'react';
import { useAudioPermission } from '../hooks/useAudioPermission';
import { usePitchDetection } from '../hooks/usePitchDetection';
import { useStringLock } from '../hooks/useStringLock';
import { useTheme } from '../themes/useTheme';
import { TUNINGS } from '../lib/tunings';
import { DefaultHeader } from '../themes/defaults/DefaultHeader';
import { DefaultNoteDisplay } from '../themes/defaults/DefaultNoteDisplay';
import { DefaultPitchMeter } from '../themes/defaults/DefaultPitchMeter';
import { DefaultStringIndicator } from '../themes/defaults/DefaultStringIndicator';
import { DefaultActionButton } from '../themes/defaults/DefaultActionButton';
import { DefaultTuningSelector } from '../themes/defaults/DefaultTuningSelector';
import type { TuningDefinition } from '../types/song';

export function TunerPage() {
  const { theme } = useTheme();
  const t = theme.tokens;

  // Resolve themed slot components
  const Header = theme.components?.Header ?? DefaultHeader;
  const NoteDisplay = theme.components?.NoteDisplay ?? DefaultNoteDisplay;
  const Meter = theme.components?.PitchMeter ?? DefaultPitchMeter;
  const Strings = theme.components?.StringIndicator ?? DefaultStringIndicator;
  const Button = theme.components?.ActionButton ?? DefaultActionButton;
  const Selector = theme.components?.TuningSelector ?? DefaultTuningSelector;

  // Tuner state
  const [tuning, setTuning] = useState<TuningDefinition>(TUNINGS.standard);
  const { state: permState, error, requestPermission, stopStream } = useAudioPermission();
  const { pitch, isListening, start, stop } = usePitchDetection();
  const { detect, reset } = useStringLock();

  const detected = detect(pitch, tuning);

  const handleStartStop = async () => {
    if (isListening) {
      stop();
      stopStream();
      reset();
    } else {
      const mediaStream = await requestPermission();
      if (mediaStream) {
        reset();
        start(mediaStream);
      }
    }
  };

  const handleTuningChange = (newTuning: TuningDefinition) => {
    reset();
    setTuning(newTuning);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100svh' }}>
      {/* Slot: Header */}
      <Header />

      {/* Slot: Display area */}
      <div style={{
        flex: 1,
        backgroundColor: t.colorPanelTranslucent as string,
        borderBottom: `1px solid ${t.borderSubtle}`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '20px',
        padding: '16px 0',
      }}>
        <NoteDisplay detected={detected} isListening={isListening} />
        {detected && (
          <>
            <Meter centsOff={detected.centsOff} inTune={detected.inTune} />
            <Strings tuning={tuning} activeStringIndex={detected.stringIndex} inTune={detected.inTune} />
          </>
        )}
        {isListening && !detected && (
          <Strings tuning={tuning} activeStringIndex={null} inTune={false} />
        )}
        {!isListening && (
          <Strings tuning={tuning} activeStringIndex={null} inTune={false} />
        )}
      </div>

      {/* Slot: Controls area */}
      <div style={{
        backgroundColor: t.colorPanel as string,
        borderTop: `2px solid ${t.colorAccent}`,
        padding: '16px 20px 24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
      }}>
        <Selector selected={tuning} onChange={handleTuningChange} />

        {permState === 'denied' && (
          <p style={{ fontFamily: t.fontDisplay as string, fontSize: '10px', letterSpacing: '0.1em', color: t.colorError as string, textAlign: 'center', margin: 0 }}>
            MICROPHONE ACCESS DENIED — ENABLE IN BROWSER SETTINGS
          </p>
        )}
        {permState === 'error' && error && (
          <p style={{ fontFamily: t.fontDisplay as string, fontSize: '10px', letterSpacing: '0.1em', color: t.colorError as string, textAlign: 'center', margin: 0 }}>
            {error.toUpperCase()}
          </p>
        )}

        <Button isListening={isListening} onClick={handleStartStop} />
      </div>
    </div>
  );
}
