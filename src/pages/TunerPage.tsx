import { useState } from 'react';
import { useAudioPermission } from '../hooks/useAudioPermission';
import { usePitchDetection } from '../hooks/usePitchDetection';
import { useStringLock } from '../hooks/useStringLock';
import { TUNINGS } from '../lib/tunings';
import { TunerDisplay } from '../components/TunerDisplay';
import { TuningSelector } from '../components/TuningSelector';
import type { TuningDefinition } from '../types/song';

export function TunerPage() {
  const [tuning, setTuning] = useState<TuningDefinition>(TUNINGS.standard);
  const { state: permState, error, requestPermission, stopStream } = useAudioPermission();
  const { pitch, isListening, start, stop } = usePitchDetection();
  const { detect, reset } = useStringLock();

  // Apply hysteresis string lock to the raw pitch data
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
    reset(); // Clear string lock when switching tunings
    setTuning(newTuning);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100svh' }}>

      {/* Brand header */}
      <header style={{
        backgroundColor: '#141414',
        borderBottom: '2px solid #c4916a',
        padding: '14px 20px 12px',
        textAlign: 'center',
        position: 'relative',
      }}>
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 900,
          fontSize: '22px',
          letterSpacing: '0.35em',
          color: '#e8dcc8',
          margin: 0,
        }}>
          PITCH<span style={{ color: '#c4916a' }}>BLCK</span>
        </h1>
        <p style={{
          fontFamily: 'var(--font-display)',
          fontSize: '8px',
          letterSpacing: '0.3em',
          color: '#6a6258',
          margin: '3px 0 0',
        }}>
          TUNE TO THE VOID
        </p>
        {/* Decorative rose-gold corner accents */}
        <span style={{ position: 'absolute', top: '8px', left: '12px', color: '#c4916a', fontSize: '10px', opacity: 0.5 }}>◈</span>
        <span style={{ position: 'absolute', top: '8px', right: '12px', color: '#c4916a', fontSize: '10px', opacity: 0.5 }}>◈</span>
      </header>

      {/* Main display panel */}
      <div style={{
        flex: 1,
        backgroundColor: 'rgba(20,20,20,0.7)',
        borderBottom: '1px solid #2a2018',
        display: 'flex',
        flexDirection: 'column',
      }}>
        <TunerDisplay
          tuning={tuning}
          detected={detected}
          isListening={isListening}
        />
      </div>

      {/* Controls panel */}
      <div style={{
        backgroundColor: '#141414',
        borderTop: '2px solid #c4916a',
        padding: '16px 20px 24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
      }}>
        {/* Tuning selector */}
        <TuningSelector selected={tuning} onChange={handleTuningChange} />

        {/* Error messages */}
        {permState === 'denied' && (
          <p style={{ fontFamily: 'var(--font-display)', fontSize: '10px', letterSpacing: '0.1em', color: '#ff2200', textAlign: 'center', margin: 0 }}>
            MICROPHONE ACCESS DENIED — ENABLE IN BROWSER SETTINGS
          </p>
        )}
        {permState === 'error' && error && (
          <p style={{ fontFamily: 'var(--font-display)', fontSize: '10px', letterSpacing: '0.1em', color: '#ff2200', textAlign: 'center', margin: 0 }}>
            {error.toUpperCase()}
          </p>
        )}

        {/* Rose gold chrome start/stop button */}
        <button
          onClick={handleStartStop}
          style={{
            width: '100%',
            padding: '16px',
            borderRadius: '6px',
            border: `1px solid ${isListening ? '#7a1010' : '#7a4020'}`,
            background: isListening
              ? 'linear-gradient(180deg, #8a1010 0%, #5a0808 40%, #3a0404 100%)'
              : 'linear-gradient(180deg, #d4a572 0%, #b87333 40%, #8a5425 100%)',
            boxShadow: isListening
              ? '0 2px 0 #2a0404, inset 0 1px 0 rgba(255,100,100,0.2)'
              : '0 2px 0 #5a3010, inset 0 1px 0 rgba(255,220,170,0.4)',
            color: isListening ? '#ff6666' : '#1a0800',
            fontFamily: 'var(--font-display)',
            fontSize: '15px',
            fontWeight: 900,
            letterSpacing: '0.25em',
            cursor: 'pointer',
            transition: 'transform 0.08s',
            WebkitAppearance: 'none',
          }}
          onPointerDown={e => (e.currentTarget.style.transform = 'scale(0.97) translateY(1px)')}
          onPointerUp={e => (e.currentTarget.style.transform = '')}
          onPointerLeave={e => (e.currentTarget.style.transform = '')}
        >
          {isListening ? '◉ STOP' : '◉ START TUNING'}
        </button>
      </div>
    </div>
  );
}
