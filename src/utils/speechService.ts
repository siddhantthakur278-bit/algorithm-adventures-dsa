// Speech Recognition (Voice-to-Text) & Speech Synthesis (Text-to-Voice) Utility

export interface SpeechRecognitionController {
  stop: () => void;
  abort: () => void;
}

export function isSpeechSynthesisSupported(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window;
}

export function isSpeechRecognitionSupported(): boolean {
  if (typeof window === 'undefined') return false;
  return Boolean((window as any).SpeechRecognition || (window as any).webkitSpeechRecognition);
}

let activeUtterance: SpeechSynthesisUtterance | null = null;

/**
 * Text-to-Speech: Speaks text aloud in natural human voice
 */
export function speakText(
  text: string,
  callbacks?: {
    onStart?: () => void;
    onEnd?: () => void;
    onError?: (error: any) => void;
  }
): () => void {
  if (!isSpeechSynthesisSupported()) {
    callbacks?.onError?.('Speech Synthesis not supported in this browser.');
    return () => {};
  }

  try {
    window.speechSynthesis.cancel();

    // Clean markdown code blocks and urls for smoother speech
    const cleanSpeech = text
      .replace(/```[\s\S]*?```/g, ' Code snippet omitted for voice playback. ')
      .replace(/`([^`]+)`/g, '$1')
      .replace(/https?:\/\/\S+/g, ' link ')
      .replace(/[#*_~]/g, '')
      .trim();

    if (!cleanSpeech) {
      callbacks?.onEnd?.();
      return () => {};
    }

    const utterance = new SpeechSynthesisUtterance(cleanSpeech);
    activeUtterance = utterance;

    utterance.rate = 1.05;
    utterance.pitch = 1.0;

    // Pick best natural sounding English voice
    const voices = window.speechSynthesis.getVoices();
    const naturalVoice = voices.find(
      (v) =>
        v.lang.startsWith('en') &&
        (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha') || v.name.includes('Daniel'))
    ) || voices.find((v) => v.lang.startsWith('en'));

    if (naturalVoice) {
      utterance.voice = naturalVoice;
    }

    utterance.onstart = () => {
      callbacks?.onStart?.();
    };

    utterance.onend = () => {
      activeUtterance = null;
      callbacks?.onEnd?.();
    };

    utterance.onerror = (e) => {
      activeUtterance = null;
      callbacks?.onError?.(e);
    };

    window.speechSynthesis.speak(utterance);

    return () => {
      window.speechSynthesis.cancel();
      activeUtterance = null;
      callbacks?.onEnd?.();
    };
  } catch (err) {
    callbacks?.onError?.(err);
    return () => {};
  }
}

/**
 * Stop any currently playing voice speech
 */
export function stopSpeaking(): void {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    activeUtterance = null;
  }
}

/**
 * Voice-to-Text: Listens to microphone audio and transcribes into text in real time
 */
export function startSpeechToText(
  callbacks: {
    onResult: (transcript: string, isFinal: boolean) => void;
    onError?: (error: any) => void;
    onEnd?: () => void;
    onStart?: () => void;
  }
): SpeechRecognitionController | null {
  if (!isSpeechRecognitionSupported()) {
    callbacks.onError?.('Speech Recognition is not supported in this browser. Try Chrome, Edge, or Safari.');
    return null;
  }

  try {
    const SpeechRecognitionClass = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognitionClass();

    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      callbacks.onStart?.();
    };

    recognition.onresult = (event: any) => {
      let finalTranscript = '';
      let interimTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        const item = event.results[i];
        if (item.isFinal) {
          finalTranscript += item[0].transcript;
        } else {
          interimTranscript += item[0].transcript;
        }
      }

      const combined = finalTranscript || interimTranscript;
      const isFinal = Boolean(finalTranscript);
      callbacks.onResult(combined, isFinal);
    };

    recognition.onerror = (event: any) => {
      callbacks.onError?.(event.error || event);
    };

    recognition.onend = () => {
      callbacks.onEnd?.();
    };

    recognition.start();

    return {
      stop: () => {
        try {
          recognition.stop();
        } catch {}
      },
      abort: () => {
        try {
          recognition.abort();
        } catch {}
      },
    };
  } catch (err) {
    callbacks.onError?.(err);
    return null;
  }
}
