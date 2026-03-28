import { useState } from 'react';
import { useAudioPermission } from '../hooks/useAudioPermission';
import { usePitchDetection } from '../hooks/usePitchDetection';
import { useStringLock } from '../hooks/useStringLock';
import { useTheme } from '../themes/useTheme';
import { themes } from '../themes/registry';
import { TUNINGS } from '../lib/tunings';
import { DefaultHeader } from '../themes/defaults/DefaultHeader';
import { DefaultNoteDisplay } from '../themes/defaults/DefaultNoteDisplay';
import { DefaultPitchMeter } from '../themes/defaults/DefaultPitchMeter';
import { DefaultStringIndicator } from '../themes/defaults/DefaultStringIndicator';
import { DefaultActionButton } from '../themes/defaults/DefaultActionButton';
import { DefaultTuningSelector } from '../themes/defaults/DefaultTuningSelector';
import type { TuningDefinition } from '../types/song';

export function TunerPage() {
  const { theme, themeId, setTheme } = useTheme();
  const t = theme.tokens;

  // Theme chooser state
  const [showThemeChooser, setShowThemeChooser] = useState(false);

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
      {/* Slot: Header — tap to open theme chooser */}
      <div onClick={() => setShowThemeChooser(true)} style={{ cursor: 'pointer' }}>
        <Header />
      </div>

      {/* Theme chooser overlay */}
      {showThemeChooser && (
        <div
          onClick={() => setShowThemeChooser(false)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.8)',
            zIndex: 100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              backgroundColor: '#1a1a1a',
              border: '1px solid #444',
              borderRadius: '8px',
              padding: '24px',
              width: '100%',
              maxWidth: '320px',
            }}
          >
            <h2 style={{
              fontFamily: 'system-ui, sans-serif',
              fontSize: '14px',
              fontWeight: 600,
              color: '#aaa',
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              margin: '0 0 16px',
              textAlign: 'center',
            }}>
              Choose Theme
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {Object.values(themes).map((t) => (
                <button
                  key={t.id}
                  onClick={() => {
                    setTheme(t.id);
                    setShowThemeChooser(false);
                  }}
                  style={{
                    padding: '14px 16px',
                    borderRadius: '6px',
                    border: t.id === themeId ? '2px solid #fff' : '1px solid #333',
                    backgroundColor: t.id === themeId ? '#333' : '#222',
                    color: '#eee',
                    fontFamily: 'system-ui, sans-serif',
                    fontSize: '16px',
                    fontWeight: t.id === themeId ? 700 : 400,
                    textAlign: 'left',
                    cursor: 'pointer',
                    WebkitAppearance: 'none',
                  }}
                >
                  {t.name}
                  {t.id === themeId && <span style={{ float: 'right', fontSize: '14px' }}>✓</span>}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

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
