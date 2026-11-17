// Pomodoro end-of-phase alarm. Prefers a real sound file placed at
// public/sounds/pomodoro-alarm.mp3 (see PomodoroTimer.jsx); falls back to a
// synthesized 3-beep tone (Web Audio) if that file is missing or blocked.
const ALARM_SRC = "/sounds/pomodoro-alarm.mp3";

let ctx = null;
let alarmAudio = null;
let alarmAudioFailed = false;

function getContext() {
  if (!ctx) {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    ctx = new AudioCtx();
  }
  return ctx;
}

function beep(startAt, frequency = 880, duration = 0.18) {
  const audioCtx = getContext();
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = "sine";
  osc.frequency.value = frequency;
  gain.gain.setValueAtTime(0.0001, startAt);
  gain.gain.exponentialRampToValueAtTime(0.35, startAt + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, startAt + duration);
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.start(startAt);
  osc.stop(startAt + duration + 0.02);
}

function playBeepSequence() {
  const audioCtx = getContext();
  if (audioCtx.state === "suspended") audioCtx.resume();
  const now = audioCtx.currentTime;
  beep(now, 740);
  beep(now + 0.24, 880);
  beep(now + 0.48, 1046);
}

function getAlarmAudio() {
  if (!alarmAudio) {
    alarmAudio = new Audio(ALARM_SRC);
    alarmAudio.preload = "auto";
    alarmAudio.addEventListener("error", () => {
      alarmAudioFailed = true;
    });
  }
  return alarmAudio;
}

// Call this from a real click handler (e.g. the Start button) so the
// browser's autoplay policy lets audio play later without a fresh gesture.
export function unlockAudio() {
  const audioCtx = getContext();
  if (audioCtx.state === "suspended") audioCtx.resume();

  const audio = getAlarmAudio();
  const original = audio.volume;
  audio.volume = 0;
  const playPromise = audio.play();
  if (playPromise?.catch) {
    playPromise
      .then(() => {
        audio.pause();
        audio.currentTime = 0;
        audio.volume = original;
      })
      .catch(() => {
        audio.volume = original;
      });
  }
}

export function playPomodoroAlarm() {
  if (alarmAudioFailed) {
    playBeepSequence();
    return;
  }
  const audio = getAlarmAudio();
  audio.currentTime = 0;
  const playPromise = audio.play();
  if (playPromise?.catch) {
    playPromise.catch(() => playBeepSequence());
  }
}
