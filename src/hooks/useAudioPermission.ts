import { useState, useCallback } from 'react';

export type PermissionState = 'prompt' | 'granted' | 'denied' | 'error';

export function useAudioPermission() {
  const [state, setState] = useState<PermissionState>('prompt');
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);

  const requestPermission = useCallback(async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: false,
          noiseSuppression: false,
          autoGainControl: false,
        },
      });
      setStream(mediaStream);
      setState('granted');
      setError(null);
      return mediaStream;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Microphone access denied';
      if (message.includes('denied') || message.includes('dismissed')) {
        setState('denied');
      } else {
        setState('error');
      }
      setError(message);
      return null;
    }
  }, []);

  const stopStream = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
      setState('prompt');
    }
  }, [stream]);

  return { state, stream, error, requestPermission, stopStream };
}
