import { useState, useRef, useCallback, useEffect } from 'react';
import { PitchDetector } from 'pitchy';

export interface PitchData {
  frequency: number;
  clarity: number;
}

const MIN_CLARITY = 0.9;
const FFT_SIZE = 4096;

export function usePitchDetection(stream: MediaStream | null) {
  const [pitch, setPitch] = useState<PitchData | null>(null);
  const [isListening, setIsListening] = useState(false);

  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const rafRef = useRef<number>(0);
  const detectorRef = useRef<PitchDetector<Float32Array> | null>(null);

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

    setIsListening(true);

    const buffer = new Float32Array(analyser.fftSize);

    const detect = () => {
      analyser.getFloatTimeDomainData(buffer);

      const [frequency, clarity] = detectorRef.current!.findPitch(
        buffer,
        audioContext.sampleRate
      );

      if (clarity >= MIN_CLARITY && frequency > 20 && frequency < 2000) {
        setPitch({ frequency, clarity });
      } else {
        setPitch(null);
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
