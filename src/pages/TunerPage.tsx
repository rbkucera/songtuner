import { useState, useMemo } from 'react';
import { useAudioPermission } from '../hooks/useAudioPermission';
import { usePitchDetection } from '../hooks/usePitchDetection';
import { identifyString } from '../lib/pitchUtils';
import { TUNINGS } from '../lib/tunings';
import { TunerDisplay } from '../components/TunerDisplay';
import { TuningSelector } from '../components/TuningSelector';
import type { TuningDefinition } from '../types/song';

export function TunerPage() {
  const [tuning, setTuning] = useState<TuningDefinition>(TUNINGS.standard);
  const { state: permState, error, requestPermission, stopStream } = useAudioPermission();
  const { pitch, isListening, start, stop } = usePitchDetection();

  const detected = useMemo(() => {
    if (!pitch) return null;
    return identifyString(pitch.frequency, tuning);
  }, [pitch, tuning]);

  const handleStartStop = async () => {
    if (isListening) {
      stop();
      stopStream();
    } else {
      const mediaStream = await requestPermission();
      if (mediaStream) {
        start(mediaStream);
      }
    }
  };

  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <header className="px-4 pt-4 pb-2">
        <h1 className="text-2xl font-bold text-center">SongTuner</h1>
      </header>

      {/* Tuning selector */}
      <div className="py-3">
        <TuningSelector selected={tuning} onChange={setTuning} />
      </div>

      {/* Tuner display */}
      <TunerDisplay
        tuning={tuning}
        detected={detected}
        frequency={pitch?.frequency ?? null}
        isListening={isListening}
      />

      {/* Error message */}
      {permState === 'denied' && (
        <div className="px-4 py-2 text-center">
          <p className="text-tune-flat text-sm">
            Microphone access denied. Please enable it in your browser settings.
          </p>
        </div>
      )}
      {permState === 'error' && error && (
        <div className="px-4 py-2 text-center">
          <p className="text-tune-flat text-sm">{error}</p>
        </div>
      )}

      {/* Start/Stop button */}
      <div className="p-6">
        <button
          onClick={handleStartStop}
          className={`w-full py-4 rounded-2xl text-lg font-semibold transition-colors active:scale-[0.98] ${
            isListening
              ? 'bg-tune-flat text-white'
              : 'bg-accent text-white'
          }`}
        >
          {isListening ? 'Stop Tuning' : 'Start Tuning'}
        </button>
      </div>
    </div>
  );
}
