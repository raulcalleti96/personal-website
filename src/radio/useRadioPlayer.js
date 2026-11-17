import { useCallback, useEffect, useRef, useState } from "react";

const VOLUME_KEY = "radio_volume";

function readVolume() {
  try {
    const v = parseFloat(localStorage.getItem(VOLUME_KEY));
    return Number.isFinite(v) ? Math.min(1, Math.max(0, v)) : 0.9;
  } catch {
    return 0.9;
  }
}

// One <audio> element plays the tracks in order and wraps from the last back
// to the first. Reusing the same element keeps later, non-click track changes
// allowed by the browser's autoplay policy. `tracks` only holds playable ones.
export function useRadioPlayer(tracks, meta = {}) {
  const count = tracks.length;
  const audioRef = useRef(null);
  const indexRef = useRef(0);
  const wantPlayRef = useRef(false);
  const errorsInRowRef = useRef(0);

  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [durations, setDurations] = useState({});
  const [failed, setFailed] = useState({});
  const [volume, setVolumeState] = useState(readVolume);

  const getAudio = () => {
    if (!audioRef.current) audioRef.current = new Audio();
    return audioRef.current;
  };

  const loadTrack = useCallback(
    (i, autoplay) => {
      if (!count) return;
      const next = ((i % count) + count) % count;
      const audio = getAudio();
      indexRef.current = next;
      setIndex(next);
      setTime(0);
      audio.src = tracks[next].src;
      audio.load();
      if (autoplay) {
        wantPlayRef.current = true;
        audio.play().catch(() => {});
      }
    },
    [count, tracks]
  );

  const advance = useCallback(() => {
    if (count === 1) {
      const audio = getAudio();
      audio.currentTime = 0;
      audio.play().catch(() => {});
      return;
    }
    loadTrack(indexRef.current + 1, wantPlayRef.current);
  }, [count, loadTrack]);

  useEffect(() => {
    if (!count) return undefined;
    const audio = getAudio();
    audio.preload = "auto";
    audio.volume = volume;
    if (!audio.src) audio.src = tracks[0].src;

    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    const onPlaying = () => {
      errorsInRowRef.current = 0;
    };
    const onTime = () => setTime(audio.currentTime);
    const onMeta = () => {
      if (Number.isFinite(audio.duration)) setDurations((d) => ({ ...d, [indexRef.current]: audio.duration }));
    };
    const onError = () => {
      setFailed((f) => ({ ...f, [indexRef.current]: true }));
      errorsInRowRef.current += 1;
      // Skip an unplayable file, but stop if every track is failing.
      if (errorsInRowRef.current >= count) {
        wantPlayRef.current = false;
        setPlaying(false);
        return;
      }
      if (wantPlayRef.current) loadTrack(indexRef.current + 1, true);
    };

    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("playing", onPlaying);
    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("loadedmetadata", onMeta);
    audio.addEventListener("ended", advance);
    audio.addEventListener("error", onError);
    return () => {
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("playing", onPlaying);
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("loadedmetadata", onMeta);
      audio.removeEventListener("ended", advance);
      audio.removeEventListener("error", onError);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count, tracks, advance, loadTrack]);

  // Stop sound when leaving the page.
  useEffect(
    () => () => {
      const audio = audioRef.current;
      if (audio) {
        audio.pause();
        audio.removeAttribute("src");
        audio.load();
      }
    },
    []
  );

  // Read every file's length up front for the tracklist.
  useEffect(() => {
    const probes = tracks.map((track, i) => {
      const probe = new Audio();
      probe.preload = "metadata";
      probe.addEventListener("loadedmetadata", () => {
        if (Number.isFinite(probe.duration)) setDurations((d) => ({ ...d, [i]: probe.duration }));
      });
      probe.addEventListener("error", () => setFailed((f) => ({ ...f, [i]: true })));
      probe.src = track.src;
      return probe;
    });
    return () => probes.forEach((p) => p.removeAttribute("src"));
  }, [tracks]);

  const play = useCallback(() => {
    if (!count) return;
    wantPlayRef.current = true;
    errorsInRowRef.current = 0;
    getAudio().play().catch(() => {});
  }, [count]);

  const pause = useCallback(() => {
    wantPlayRef.current = false;
    getAudio().pause();
  }, []);

  const toggle = useCallback(() => (playing ? pause() : play()), [playing, play, pause]);
  const next = useCallback(() => loadTrack(indexRef.current + 1, true), [loadTrack]);
  const previous = useCallback(() => {
    // Like a CD player: restart the track first, go back only near its start.
    if (getAudio().currentTime > 3) {
      getAudio().currentTime = 0;
      return;
    }
    loadTrack(indexRef.current - 1, true);
  }, [loadTrack]);
  const goTo = useCallback((i) => loadTrack(i, true), [loadTrack]);
  const seek = useCallback((seconds) => {
    getAudio().currentTime = seconds;
    setTime(seconds);
  }, []);

  const setVolume = useCallback((v) => {
    setVolumeState(v);
    if (audioRef.current) audioRef.current.volume = v;
    try {
      localStorage.setItem(VOLUME_KEY, String(v));
    } catch {
      // volume just won't be remembered
    }
  }, []);

  // Lock-screen / headset controls.
  useEffect(() => {
    if (!count || !("mediaSession" in navigator)) return undefined;
    navigator.mediaSession.metadata = new window.MediaMetadata({
      title: tracks[index].title,
      artist: meta.artist || "",
      album: meta.album || "",
    });
    navigator.mediaSession.setActionHandler("play", play);
    navigator.mediaSession.setActionHandler("pause", pause);
    navigator.mediaSession.setActionHandler("nexttrack", next);
    navigator.mediaSession.setActionHandler("previoustrack", previous);
    return () => {
      ["play", "pause", "nexttrack", "previoustrack"].forEach((a) => navigator.mediaSession.setActionHandler(a, null));
    };
  }, [count, tracks, index, meta.artist, meta.album, play, pause, next, previous]);

  return { index, playing, time, durations, failed, volume, play, pause, toggle, next, previous, goTo, seek, setVolume };
}
