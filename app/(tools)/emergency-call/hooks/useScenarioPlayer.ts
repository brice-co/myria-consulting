import { useState, useRef, useCallback } from 'react';
import { Scenario, ScenarioStep } from '@/app/(tools)/emergency-call/lib/scenarios';

interface TranscriptEntry {
  speaker: string;
  text: string;
}

export const useScenarioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [transcript, setTranscript] = useState<TranscriptEntry[]>([]);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [currentScenario, setCurrentScenario] = useState<Scenario | null>(null);
  const [currentAgentType, setCurrentAgentType] = useState<'911' | '311' | 'orchestrator'>('orchestrator');
  const [callDuration, setCallDuration] = useState(0);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const durationIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const pausedAtRef = useRef<{ stepIndex: number } | null>(null);

  const speakText = useCallback((text: string, agentType: '911' | '311' | 'orchestrator', onEnd?: () => void) => {
    if (!('speechSynthesis' in window)) {
      onEnd?.();
      return;
    }

    speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    
    const voices = speechSynthesis.getVoices();
    const googleUS = voices.find(v => v.name === 'Google US English')
      || voices.find(v => v.name.includes('Google') && v.lang === 'en-US')
      || voices.find(v => v.lang === 'en-US')
      || voices.find(v => v.lang.startsWith('en'));
    if (googleUS) utterance.voice = googleUS;

    switch (agentType) {
      case '911':
        utterance.rate = 1.15;
        utterance.pitch = 0.85;
        break;
      case '311':
        utterance.rate = 0.95;
        utterance.pitch = 1.15;
        break;
      case 'orchestrator':
      default:
        utterance.rate = 1.05;
        utterance.pitch = 1.0;
        break;
    }

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => {
      setIsSpeaking(false);
      onEnd?.();
    };
    utterance.onerror = () => {
      setIsSpeaking(false);
      onEnd?.();
    };

    speechSynthesis.speak(utterance);
  }, []);

  const playStep = useCallback((scenario: Scenario, stepIndex: number, activeAgentType: '911' | '311' | 'orchestrator') => {
    if (stepIndex >= scenario.steps.length) {
      setTimeout(() => {
        setIsPlaying(false);
        if (durationIntervalRef.current) clearInterval(durationIntervalRef.current);
      }, 1000);
      return;
    }

    const step = scenario.steps[stepIndex];
    setCurrentStepIndex(stepIndex);

    // Track agent type locally through the chain
    let nextAgentType = activeAgentType;
    if (step.speaker === 'system' && step.text.includes('Transferred to 911')) {
      nextAgentType = '911';
      setCurrentAgentType('911');
    } else if (step.speaker === 'system' && step.text.includes('Transferred to 311')) {
      nextAgentType = '311';
      setCurrentAgentType('311');
    }

    timeoutRef.current = setTimeout(() => {
      const speakerLabel = step.speaker === 'agent' ? 'Agent' 
        : step.speaker === 'caller' ? 'Caller' 
        : 'System';

      setTranscript(prev => [...prev, { speaker: speakerLabel, text: step.text }]);

      if (step.speaker === 'agent') {
        speakText(step.text, nextAgentType, () => {
          playStep(scenario, stepIndex + 1, nextAgentType);
        });
      } else if (step.speaker === 'system') {
        setTimeout(() => playStep(scenario, stepIndex + 1, nextAgentType), 1500);
      } else {
        setTimeout(() => playStep(scenario, stepIndex + 1, nextAgentType), step.text.length * 40 + 500);
      }
    }, step.delay);
  }, [speakText]);

  const startScenario = useCallback((scenario: Scenario) => {
    // Reset
    speechSynthesis.cancel();
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (durationIntervalRef.current) clearInterval(durationIntervalRef.current);

    setCurrentScenario(scenario);
    setCurrentAgentType(scenario.type);
    setTranscript([]);
    setCurrentStepIndex(0);
    setIsPlaying(true);
    setIsPaused(false);
    setCallDuration(0);

    durationIntervalRef.current = setInterval(() => {
      setCallDuration(prev => prev + 1);
    }, 1000);

    playStep(scenario, 0, scenario.type);
  }, [playStep]);

  const stopScenario = useCallback(() => {
    speechSynthesis.cancel();
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (durationIntervalRef.current) clearInterval(durationIntervalRef.current);
    
    setIsPlaying(false);
    setIsPaused(false);
    setIsSpeaking(false);
    setCurrentScenario(null);
    setTranscript([]);
    setCurrentStepIndex(0);
    setCallDuration(0);
  }, []);

  const togglePause = useCallback(() => {
    if (isPaused) {
      setIsPaused(false);
      if (currentScenario && pausedAtRef.current) {
        durationIntervalRef.current = setInterval(() => {
          setCallDuration(prev => prev + 1);
        }, 1000);
        playStep(currentScenario, pausedAtRef.current.stepIndex, currentAgentType);
      }
    } else {
      setIsPaused(true);
      speechSynthesis.cancel();
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (durationIntervalRef.current) clearInterval(durationIntervalRef.current);
      pausedAtRef.current = { stepIndex: currentStepIndex + 1 };
      setIsSpeaking(false);
    }
  }, [isPaused, currentScenario, currentStepIndex, playStep]);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return {
    isPlaying,
    isPaused,
    transcript,
    isSpeaking,
    currentStepIndex,
    currentScenario,
    currentAgentType,
    callDuration,
    formattedDuration: formatDuration(callDuration),
    startScenario,
    stopScenario,
    togglePause,
  };
};
