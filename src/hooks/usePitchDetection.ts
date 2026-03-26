import { useState, useRef, useCallback, useEffect } from 'react';
import { PitchDetector } from 'pitchy';

export interface PitchData {
  frequency: number;
  clarity: number;
}

const MIN_CLARITY = 0.85;
const FFT_SIZE = 4096;
const EMA_ALPHA = 0.3; // Lower = smoother, higher = more responsive
const HOLD_MS = 500;   // Keep showing last pitch for this long after signal drops

export function usePitchDetection(stream: MediaStream | null) {
  const [pitch, setPitch] = useState<PitchData | null>(null);
  const [isListening, setIsListening] = useState(false);

  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const rafRef = useRef<number>(0);
  const detectorRef = useRef<PitchDetector<Float32Array> | null>(null);
  const smoothedFreqRef = useRef<number | null>(null);
  const lastGoodTimeRef = useRef<number>(0);
  const lastGoodPitchRef = useRef<PitchData | null>(null);

  const start = useCallback(() => {
    if (!stream || isListening) return;

    const audioContext = new AudioContext();
    const analyser = audioContext.createAnalyser();
    analyser.fftSize = FFT_SIZE;

    const source = audioContext.createMediaStreamSource(stream);
    source.connect(analyser);

    audioContextRef.current = audioContext;
    analyserRef.current = analyser;
    detectorRef.current = PitchDetector.forFloat32Array(analyser.fftSize);
    smoothedFreqRef.current = null;
    lastGoodTimeRef.current = 0;
    lastGoodPitchRef.current = null;

    setIsListening(true);

    const buffer = new Float32Array(analyser.fftSize);

    const detect = () => {
      analyser.getFloatTimeDomainData(buffer);

      const [frequency, clarity] = detectorRef.current!.findPitch(
        buffer,
        audioContext.sampleRate
      );

      const now = performance.now();

      if (clarity >= MIN_CLARITY && frequency > 20 && frequency < 2000) {
        // Apply EMA smoothing to frequency
        const prev = smoothedFreqRef.current;
        const smoothed = prev !== null
          ? EMA_ALPHA * frequency + (1 - EMA_ALPHA) * prev
          : frequency;
        smoothedFreqRef.current = smoothed;

        const pitchData = { frequency: smoothed, clarity };
        lastGoodPitchRef.current = pitchData;
        lastGoodTimeRef.current = now;
        setPitch(pitchData);
      } else {
        // Hold the last good reading for HOLD_MS
        const elapsed = now - lastGoodTimeRef.current;
        if (elapsed < HOLD_MS && lastGoodPitchRef.current) {
          // Keep showing last good pitch (already set)
        } else {
          // Signal truly gone — clear display
          smoothedFreqRef.current = null;
          lastGoodPitchRef.current = null;
          setPitch(null);
        }
      }

      rafRef.current = requestAnimationFrame(detect);
    };

    detect();
  }, [stream, isListening]);

  const stop = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = 0;
    }
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
    analyserRef.current = null;
    detectorRef.current = null;
    smoothedFreqRef.current = null;
    lastGoodTimeRef.current = 0;
    lastGoodPitchRef.current = null;
    setIsListening(false);
    setPitch(null);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (audioContextRef.current) audioContextRef.current.close();
    };
  }, []);

  return { pitch, isListening, start, stop };
}
