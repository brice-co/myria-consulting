"use client"

import { useCallback, useEffect, useRef, useState } from "react"

type SpeechState =
  | "idle"
  | "starting"
  | "listening"
  | "speaking"
  | "paused"
  | "stopped"
  | "error"

interface UseSpeechRecognitionOptions {
  onResult: (text: string) => void
  onUserSpeaking?: (speaking: boolean) => void
  silenceTimeout?: number
}

export function useSpeechRecognition({
  onResult,
  onUserSpeaking,
  silenceTimeout = 2000
}: UseSpeechRecognitionOptions) {

  const recognitionRef = useRef<any>(null)
  const streamRef = useRef<MediaStream | null>(null)

  const silenceTimerRef = useRef<NodeJS.Timeout | null>(null)
  const restartTimerRef = useRef<NodeJS.Timeout | null>(null)

  const stateRef = useRef<SpeechState>("idle")
  const ttsLockRef = useRef(false)

  const [state, setState] = useState<SpeechState>("idle")

  const setFSM = (next: SpeechState) => {
    stateRef.current = next
    setState(next)
  }

  // ------------------------------------------------
  // Silence detection
  // ------------------------------------------------

  const resetSilenceTimer = () => {
    if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current)

    silenceTimerRef.current = setTimeout(() => {
      onUserSpeaking?.(false)
    }, silenceTimeout)
  }

  // ------------------------------------------------
  // Recognition Factory
  // ------------------------------------------------

  const createRecognition = useCallback(() => {

    const SpeechRecognitionCtor =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition

    if (!SpeechRecognitionCtor) {
      throw new Error("SpeechRecognition not supported")
    }

    const recognition = new SpeechRecognitionCtor()

    recognition.continuous = true
    recognition.interimResults = true
    recognition.lang = "en-US"

    recognition.onstart = () => {
      setFSM("listening")
    }

    recognition.onresult = (event: any) => {

      if (ttsLockRef.current) return

      const result = event.results[event.results.length - 1]

      if (!result) return

      if (!result.isFinal) {
        onUserSpeaking?.(true)
        resetSilenceTimer()
        return
      }

      const text = result[0].transcript.trim()

      if (!text) return

      onUserSpeaking?.(false)

      resetSilenceTimer()

      onResult(text)
    }

    recognition.onerror = (event: any) => {

      const error = event.error

      if (error === "aborted" || error === "no-speech") return

      console.error("SpeechRecognition error:", error)

      setFSM("error")

      scheduleRestart()
    }

    recognition.onend = () => {

      if (stateRef.current === "paused") return
      if (stateRef.current === "stopped") return

      scheduleRestart()
    }

    return recognition

  }, [onResult, onUserSpeaking])

  // ------------------------------------------------
  // Auto Reconnect
  // ------------------------------------------------

  const scheduleRestart = () => {

    if (restartTimerRef.current) return

    restartTimerRef.current = setTimeout(() => {

      restartTimerRef.current = null

      if (stateRef.current === "paused") return
      if (stateRef.current === "stopped") return

      try {

        recognitionRef.current?.abort()

        const recognition = createRecognition()

        recognitionRef.current = recognition

        recognition.start()

      } catch (err) {

        console.error("STT restart failed", err)

      }

    }, 300)

  }

  // ------------------------------------------------
  // Start
  // ------------------------------------------------

  const start = useCallback(async () => {

    if (stateRef.current !== "idle" && stateRef.current !== "stopped") return

    setFSM("starting")

    try {

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        }
      })

      streamRef.current = stream

      const recognition = createRecognition()

      recognitionRef.current = recognition

      recognition.start()

    } catch (err) {

      console.error("Microphone start failed", err)

      setFSM("error")

    }

  }, [createRecognition])

  // ------------------------------------------------
  // Stop
  // ------------------------------------------------

  const stop = useCallback(() => {

    setFSM("stopped")

    try {
      recognitionRef.current?.abort()
    } catch {}

    recognitionRef.current = null

    streamRef.current?.getTracks().forEach(t => t.stop())

    streamRef.current = null

  }, [])

  // ------------------------------------------------
  // Pause (for TTS)
  // ------------------------------------------------

  const pause = useCallback(() => {

    setFSM("paused")

    try {
      recognitionRef.current?.abort()
    } catch {}

  }, [])

  // ------------------------------------------------
  // Resume after TTS
  // ------------------------------------------------

  const resume = useCallback(() => {

    if (stateRef.current === "stopped") return

    ttsLockRef.current = true

    setTimeout(() => {
      ttsLockRef.current = false
    }, 800)

    setFSM("starting")

    scheduleRestart()

  }, [])

  // ------------------------------------------------
  // Cleanup
  // ------------------------------------------------

  useEffect(() => {

    return () => {

      try {
        recognitionRef.current?.abort()
      } catch {}

      streamRef.current?.getTracks().forEach(t => t.stop())

    }

  }, [])

  return {
    start,
    stop,
    pause,
    resume,
    state,
    isListening: state === "listening"
  }
}