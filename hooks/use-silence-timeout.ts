"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type SilenceTimeoutOptions = {
  enabled: boolean;
  warningMs: number;
  timeoutMs: number;
  onTimeout: () => void;
};

export function useSilenceTimeout({ enabled, warningMs, timeoutMs, onTimeout }: SilenceTimeoutOptions) {
  const [warning, setWarning] = useState(false);
  const lastActivityRef = useRef(Date.now());
  const onTimeoutRef = useRef(onTimeout);

  useEffect(() => { onTimeoutRef.current = onTimeout; }, [onTimeout]);

  const markActivity = useCallback(() => {
    lastActivityRef.current = Date.now();
    setWarning(false);
  }, []);

  useEffect(() => {
    if (!enabled) { setWarning(false); return; }
    lastActivityRef.current = Date.now();

    const timer = window.setInterval(() => {
      const elapsed = Date.now() - lastActivityRef.current;
      if (elapsed >= timeoutMs) {
        setWarning(false);
        onTimeoutRef.current();
        return;
      }
      setWarning(elapsed >= warningMs);
    }, 1_000);

    return () => window.clearInterval(timer);
  }, [enabled, timeoutMs, warningMs]);

  return { warning, markActivity };
}
