import { IDLE_TIMEOUT_MS, IDLE_WARNING_MS } from "./config";

type Options = {
  onWarning: (secondsRemaining: number) => void;
  onTimeout: () => void;
};

export class SilenceTimeout {
  private timeoutId: ReturnType<typeof setTimeout> | null = null;
  private warningId: ReturnType<typeof setInterval> | null = null;
  private lastActivityAt = 0;

  constructor(private readonly options: Options) {}

  start() {
    this.reset();
  }

  reset() {
    this.stop();
    this.lastActivityAt = Date.now();

    this.warningId = setInterval(() => {
      const remaining = IDLE_TIMEOUT_MS - (Date.now() - this.lastActivityAt);
      if (remaining <= IDLE_WARNING_MS && remaining > 0) {
        this.options.onWarning(Math.ceil(remaining / 1000));
      }
    }, 1000);

    this.timeoutId = setTimeout(() => {
      this.stop();
      this.options.onTimeout();
    }, IDLE_TIMEOUT_MS);
  }

  stop() {
    if (this.timeoutId) clearTimeout(this.timeoutId);
    if (this.warningId) clearInterval(this.warningId);
    this.timeoutId = null;
    this.warningId = null;
  }
}
