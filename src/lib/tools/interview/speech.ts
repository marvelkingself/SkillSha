export interface FillerWordStats {
  totalWords: number;
  fillerCount: number;
  fillerPercentage: number;
  detectedWords: { word: string; count: number }[];
  pacingFeedback: string;
}

const COMMON_FILLER_WORDS = [
  'um',
  'uh',
  'like',
  'you know',
  'basically',
  'actually',
  'literally',
  'sort of',
  'kind of',
  'i mean',
  'right',
];

export function analyzeSpeechTranscript(transcript: string): FillerWordStats {
  if (!transcript || !transcript.trim()) {
    return {
      totalWords: 0,
      fillerCount: 0,
      fillerPercentage: 0,
      detectedWords: [],
      pacingFeedback: 'No speech detected.',
    };
  }

  const cleanText = transcript.toLowerCase();
  const words = cleanText.split(/\s+/).filter((w) => w.length > 0);
  const totalWords = words.length;

  const counts: Record<string, number> = {};
  let totalFillers = 0;

  for (const filler of COMMON_FILLER_WORDS) {
    if (filler.includes(' ')) {
      // phrase matching
      const regex = new RegExp(`\\b${filler}\\b`, 'gi');
      const matches = cleanText.match(regex);
      if (matches && matches.length > 0) {
        counts[filler] = matches.length;
        totalFillers += matches.length;
      }
    } else {
      // single word matching
      const count = words.filter((w) => w.replace(/[^a-z]/g, '') === filler).length;
      if (count > 0) {
        counts[filler] = count;
        totalFillers += count;
      }
    }
  }

  const fillerPercentage = totalWords > 0 ? Math.round((totalFillers / totalWords) * 100) : 0;
  const detectedWords = Object.entries(counts).map(([word, count]) => ({ word, count }));

  let pacingFeedback = 'Excellent fluency and clean articulation with minimal filler words.';
  if (fillerPercentage > 12) {
    pacingFeedback = 'High use of filler words. Try pausing for 2 seconds to collect your thoughts instead of vocalizing pauses.';
  } else if (fillerPercentage > 5) {
    pacingFeedback = 'Moderate filler words detected. Practice answering with deliberate pauses to sound more authoritative.';
  }

  return {
    totalWords,
    fillerCount: totalFillers,
    fillerPercentage,
    detectedWords,
    pacingFeedback,
  };
}

export function speakText(text: string, onEnd?: () => void): SpeechSynthesisUtterance | null {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return null;
  }

  window.speechSynthesis.cancel(); // cancel previous speech
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 1.0;
  utterance.pitch = 1.0;

  // Prefer English natural voices if available
  const voices = window.speechSynthesis.getVoices();
  const preferredVoice =
    voices.find((v) => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha'))) ||
    voices.find((v) => v.lang.startsWith('en')) ||
    voices[0];

  if (preferredVoice) {
    utterance.voice = preferredVoice;
  }

  if (onEnd) {
    utterance.onend = onEnd;
    utterance.onerror = onEnd;
  }

  window.speechSynthesis.speak(utterance);
  return utterance;
}

export function stopSpeaking(): void {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}

export function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}
