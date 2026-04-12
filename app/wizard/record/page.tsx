"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useWizard } from "@/lib/wizard-context";
import { cn } from "@/lib/utils";

const MIN_SECONDS = 60;
const MAX_SECONDS = 360; // 6 minutes

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export default function RecordStep() {
  const router = useRouter();
  const { state, update } = useWizard();

  const [status, setStatus] = useState<"idle" | "recording" | "paused" | "done">("idle");
  const [seconds, setSeconds] = useState(0);
  const [bars, setBars] = useState<number[]>(Array(32).fill(4));
  const [permissionDenied, setPermissionDenied] = useState(false);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animFrameRef = useRef<number>(0);
  const streamRef = useRef<MediaStream | null>(null);

  const prompt = state.selectedPrompt || state.customPrompt;

  const stopTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
  }, []);

  const stopAnimation = useCallback(() => {
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    setBars(Array(32).fill(4));
  }, []);

  const animateWaveform = useCallback((analyser: AnalyserNode) => {
    const data = new Uint8Array(analyser.frequencyBinCount);
    const frame = () => {
      analyser.getByteFrequencyData(data);
      const newBars = Array.from({ length: 32 }, (_, i) => {
        const val = data[Math.floor((i / 32) * data.length)] / 255;
        return Math.max(4, Math.round(val * 60));
      });
      setBars(newBars);
      animFrameRef.current = requestAnimationFrame(frame);
    };
    animFrameRef.current = requestAnimationFrame(frame);
  }, []);

  async function startRecording() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const audioCtx = new AudioContext();
      const source = audioCtx.createMediaStreamSource(stream);
      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 128;
      source.connect(analyser);
      analyserRef.current = analyser;

      const recorder = new MediaRecorder(stream);
      chunksRef.current = [];
      recorder.ondataavailable = (e) => chunksRef.current.push(e.data);
      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        const url = URL.createObjectURL(blob);
        update({ audioBlob: blob, audioUrl: url, recordingDuration: seconds });
        setStatus("done");
      };

      recorder.start();
      mediaRecorderRef.current = recorder;
      setStatus("recording");
      setSeconds(0);

      timerRef.current = setInterval(() => {
        setSeconds((s) => {
          if (s + 1 >= MAX_SECONDS) {
            recorder.stop();
            stopTimer();
            stopAnimation();
          }
          return s + 1;
        });
      }, 1000);

      animateWaveform(analyser);
    } catch {
      setPermissionDenied(true);
    }
  }

  function stopRecording() {
    mediaRecorderRef.current?.stop();
    streamRef.current?.getTracks().forEach((t) => t.stop());
    stopTimer();
    stopAnimation();
  }

  function reRecord() {
    setStatus("idle");
    setSeconds(0);
    setBars(Array(32).fill(4));
    update({ audioBlob: null, audioUrl: null, recordingDuration: 0 });
  }

  useEffect(() => {
    return () => {
      stopTimer();
      stopAnimation();
      streamRef.current?.getTracks().forEach((t) => t.stop());
    };
  }, [stopTimer, stopAnimation]);

  const pct = Math.min((seconds / MAX_SECONDS) * 100, 100);
  const tooShort = status === "done" && seconds < MIN_SECONDS;

  return (
    <div className="animate-fade-in-up">
      <div className="text-center mb-8">
        <h1 className="font-serif text-4xl text-ink mb-3">Your recording room</h1>
        <p className="font-body text-sepia-500 text-lg">
          Imagine you're talking over coffee. Just speak from the heart.
        </p>
      </div>

      {/* Prompt display */}
      <div className="parchment-paper rounded-2xl p-7 mb-8">
        <p className="font-sans text-xs text-sepia-400 uppercase tracking-wider mb-3">Your prompt</p>
        <p className="font-body text-sepia-700 text-lg leading-relaxed italic">
          "{prompt || "Share whatever is in your heart for " + (state.recipientName || "them")}"
        </p>
      </div>

      {/* Permission denied */}
      {permissionDenied && (
        <div role="alert" className="bg-red-50 border border-red-200 rounded-2xl p-6 mb-6 text-center">
          <p className="font-serif text-xl text-red-800 mb-2">Microphone access needed</p>
          <p className="font-sans text-base text-red-700">
            Please allow microphone access in your browser settings, then refresh the page.
          </p>
        </div>
      )}

      {/* Recording UI */}
      <div className="card-warm p-8 text-center">
        {/* Waveform */}
        <div
          className="flex items-center justify-center gap-1 h-20 mb-6"
          aria-hidden="true"
          aria-label="Live audio waveform"
        >
          {bars.map((h, i) => (
            <div
              key={i}
              className={cn(
                "w-1.5 rounded-full transition-all",
                status === "recording" ? "bg-burgundy" : "bg-sepia-200"
              )}
              style={{
                height: `${h}px`,
                animationDelay: `${i * 0.03}s`,
                transition: status === "recording" ? "height 0.1s ease" : "height 0.3s ease",
              }}
            />
          ))}
        </div>

        {/* Timer */}
        <div className="font-serif text-5xl text-ink mb-2 tabular-nums" aria-live="polite">
          {formatTime(seconds)}
        </div>
        <p className="font-sans text-sm text-sepia-400 mb-6">
          {status === "idle" && "4–6 minutes is perfect"}
          {status === "recording" && seconds < MIN_SECONDS && `Keep going — ${formatTime(MIN_SECONDS - seconds)} more`}
          {status === "recording" && seconds >= MIN_SECONDS && "Looking great — take your time"}
          {status === "done" && !tooShort && "Wonderful recording!"}
          {tooShort && "A little short — tap re-record for a bit more"}
        </p>

        {/* Progress bar */}
        <div className="w-full bg-sepia-100 rounded-full h-2 mb-8 overflow-hidden">
          <div
            className="h-2 rounded-full bg-burgundy transition-all duration-1000"
            style={{ width: `${pct}%` }}
            role="progressbar"
            aria-valuenow={seconds}
            aria-valuemin={0}
            aria-valuemax={MAX_SECONDS}
          />
        </div>

        {/* Big record button */}
        {status === "idle" && (
          <button
            onClick={startRecording}
            disabled={permissionDenied}
            className="w-24 h-24 rounded-full bg-red-600 hover:bg-red-500 text-white text-4xl shadow-warm-lg transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-red-300 mx-auto block"
            aria-label="Start recording"
          >
            🎙️
          </button>
        )}

        {status === "recording" && (
          <button
            onClick={stopRecording}
            className="w-24 h-24 rounded-full bg-red-600 text-white text-2xl shadow-warm-lg animate-record-pulse transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-red-300 mx-auto flex items-center justify-center font-sans font-500"
            aria-label="Stop recording"
          >
            ■ Stop
          </button>
        )}

        {status === "done" && (
          <div className="space-y-4">
            {state.audioUrl && (
              <div>
                <p className="font-sans text-sm text-sepia-500 mb-3">Listen back:</p>
                <audio
                  src={state.audioUrl}
                  controls
                  className="w-full rounded-xl"
                  aria-label="Your recording playback"
                />
              </div>
            )}
            <div className="flex gap-3 justify-center mt-4">
              <button onClick={reRecord} className="btn-secondary text-base px-6 py-3">
                🔄 Re-record
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="flex gap-4 mt-8">
        <button onClick={() => router.back()} className="btn-secondary flex-1 text-lg">
          ← Back
        </button>
        <button
          onClick={() => router.push("/wizard/preview")}
          disabled={status !== "done" || tooShort}
          className="btn-primary text-lg"
          style={{ flex: 2 }}
        >
          Create my letter →
        </button>
      </div>
    </div>
  );
}
