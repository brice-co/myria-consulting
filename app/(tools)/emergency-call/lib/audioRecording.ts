export class CallRecorder {
  private mediaRecorder: MediaRecorder | null = null;
  private chunks: Blob[] = [];
  private _isRecording = false;

  isRecording() {
    return this._isRecording;
  }

  async startRecording(stream: MediaStream): Promise<void> {
    this.chunks = [];
    this.mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });
    
    this.mediaRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) this.chunks.push(e.data);
    };

    this.mediaRecorder.start();
    this._isRecording = true;
  }

  async stopRecording(): Promise<Blob | null> {
    return new Promise((resolve) => {
      if (!this.mediaRecorder) {
        resolve(null);
        return;
      }

      this.mediaRecorder.onstop = () => {
        const blob = new Blob(this.chunks, { type: 'audio/webm' });
        this._isRecording = false;
        resolve(blob);
      };

      this.mediaRecorder.stop();
    });
  }
}

export function downloadRecording(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
