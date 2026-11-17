import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { FiPlay, FiPause, FiRotateCcw } from "react-icons/fi";
import { playPomodoroAlarm, unlockAudio } from "../lib/pomodoroAlarm";
import { logPomodoroSession } from "../lib/pomodoroLog";

const DEFAULTS = { work: 25, break: 5 };
const RADIUS = 54;
const CIRC = 2 * Math.PI * RADIUS;

export default function PomodoroTimer({ userId, onSessionLogged }) {
  const { t } = useTranslation();
  const [durations, setDurations] = useState(DEFAULTS);
  const [mode, setMode] = useState("work");
  const [secondsLeft, setSecondsLeft] = useState(DEFAULTS.work * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [completed, setCompleted] = useState(0);
  const [pendingMode, setPendingMode] = useState(null);
  const intervalRef = useRef(null);
  const workStartedAtRef = useRef(null);

  useEffect(() => {
    if (!isRunning) return;
    intervalRef.current = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          playPomodoroAlarm();
          const nextMode = mode === "work" ? "break" : "work";
          if (mode === "work") {
            setCompleted((c) => c + 1);
            const completedAt = new Date().toISOString();
            const startedAt = workStartedAtRef.current || completedAt;
            workStartedAtRef.current = null;
            if (userId) {
              logPomodoroSession({
                userId,
                startedAt,
                completedAt,
                durationMinutes: durations.work,
              }).then((ok) => ok && onSessionLogged?.());
            }
          }
          setIsRunning(false);
          setPendingMode(nextMode);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, [isRunning, mode, durations, userId, onSessionLogged]);

  const totalSeconds = durations[mode] * 60;
  const progress = 1 - secondsLeft / totalSeconds;
  const mins = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const secs = String(secondsLeft % 60).padStart(2, "0");

  const handleDurationChange = (key, value) => {
    const minutes = Math.max(1, Math.min(90, Number(value) || 1));
    setDurations((d) => ({ ...d, [key]: minutes }));
    if (!isRunning && mode === key) setSecondsLeft(minutes * 60);
  };

  const toggleRun = () => {
    unlockAudio();
    if (!isRunning && mode === "work" && !workStartedAtRef.current) {
      workStartedAtRef.current = new Date().toISOString();
    }
    setIsRunning((r) => !r);
  };

  const reset = () => {
    setIsRunning(false);
    setPendingMode(null);
    setMode("work");
    setSecondsLeft(durations.work * 60);
    workStartedAtRef.current = null;
  };

  const confirmNext = () => {
    unlockAudio();
    setMode(pendingMode);
    setSecondsLeft(durations[pendingMode] * 60);
    setPendingMode(null);
    setIsRunning(true);
    if (pendingMode === "work") workStartedAtRef.current = new Date().toISOString();
  };

  return (
    <div className="flex flex-col items-center bg-carbon/30 backdrop-blur-sm border border-papel/15 rounded-3xl px-8 py-8 w-full max-w-xs">
      <p className="text-xs uppercase tracking-[0.25em] text-papel/60 mb-4">
        {mode === "work" ? t("portal.focus.pomodoro.work") : t("portal.focus.pomodoro.break")}
      </p>

      <div className="relative w-44 h-44 flex items-center justify-center">
        <svg className="absolute inset-0 -rotate-90" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r={RADIUS} fill="none" stroke="rgba(243,238,230,0.15)" strokeWidth="6" />
          <circle
            cx="60"
            cy="60"
            r={RADIUS}
            fill="none"
            stroke="#A9825A"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={CIRC}
            strokeDashoffset={CIRC * (1 - progress)}
            style={{ transition: "stroke-dashoffset 1s linear" }}
          />
        </svg>
        <span className="font-display font-black text-papel text-4xl tabular-nums">
          {mins}:{secs}
        </span>
      </div>

      <div className="flex items-center gap-3 mt-6">
        <button
          onClick={toggleRun}
          className="w-14 h-14 rounded-full bg-papel text-carbon flex items-center justify-center text-xl hover:bg-tostado hover:text-papel transition-colors"
          aria-label={isRunning ? t("portal.focus.pomodoro.pause") : t("portal.focus.pomodoro.start")}
        >
          {isRunning ? <FiPause /> : <FiPlay className="ml-0.5" />}
        </button>
        <button
          onClick={reset}
          className="w-11 h-11 rounded-full border border-papel/30 text-papel flex items-center justify-center hover:bg-papel/10 transition-colors"
          aria-label={t("portal.focus.pomodoro.reset")}
        >
          <FiRotateCcw />
        </button>
      </div>

      <div className="flex items-center gap-4 mt-6 text-xs text-papel/70">
        <label className="flex items-center gap-1.5">
          {t("portal.focus.pomodoro.work")}
          <input
            type="number"
            min={1}
            max={90}
            value={durations.work}
            onChange={(e) => handleDurationChange("work", e.target.value)}
            disabled={isRunning}
            className="w-12 bg-transparent border border-papel/20 rounded px-1.5 py-0.5 text-center text-papel disabled:opacity-40"
          />
        </label>
        <label className="flex items-center gap-1.5">
          {t("portal.focus.pomodoro.break")}
          <input
            type="number"
            min={1}
            max={90}
            value={durations.break}
            onChange={(e) => handleDurationChange("break", e.target.value)}
            disabled={isRunning}
            className="w-12 bg-transparent border border-papel/20 rounded px-1.5 py-0.5 text-center text-papel disabled:opacity-40"
          />
        </label>
      </div>

      <p className="text-xs text-papel/50 mt-4">
        {t("portal.focus.pomodoro.completed", { count: completed })}
      </p>

      {pendingMode && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-carbon/70 backdrop-blur-sm px-6">
          <div className="bg-carbon border border-papel/20 rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl">
            <p className="text-xs uppercase tracking-[0.25em] text-tostado font-semibold mb-3">
              {mode === "work" ? t("portal.focus.pomodoro.workDoneLabel") : t("portal.focus.pomodoro.breakDoneLabel")}
            </p>
            <h3 className="font-display font-bold text-papel text-xl mb-6">
              {pendingMode === "break"
                ? t("portal.focus.pomodoro.confirmBreak", { minutes: durations.break })
                : t("portal.focus.pomodoro.confirmWork", { minutes: durations.work })}
            </h3>
            <button
              onClick={confirmNext}
              className="w-full bg-papel hover:bg-tostado text-carbon hover:text-papel font-semibold py-3 rounded-full transition-colors"
            >
              {pendingMode === "break"
                ? t("portal.focus.pomodoro.startBreak")
                : t("portal.focus.pomodoro.startWork")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
