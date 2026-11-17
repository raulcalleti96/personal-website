import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FiArrowLeft, FiPlay, FiPause, FiSkipBack, FiSkipForward, FiVolume2, FiLock } from "react-icons/fi";
import Garland from "./Garland";
import Snow from "./Snow";
import { ALBUM, TRACKS } from "./playlist";
import { useRadioPlayer } from "./useRadioPlayer";
import { supabase } from "../supabaseClient";
import { canListenToAll } from "../portal/lib/access";
import "./navidudu.css";

const fmt = (s) => {
  if (!Number.isFinite(s)) return "--:--";
  return `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
};

const pad = (n) => String(n).padStart(2, "0");

const ghostBtn =
  "w-10 h-10 rounded-full border border-[var(--nv-snow)]/30 flex items-center justify-center hover:bg-[var(--nv-snow)]/10 transition-colors disabled:opacity-35 disabled:hover:bg-transparent";

function Equalizer({ active }) {
  return (
    <span className="inline-flex items-end gap-[2px] h-3.5" aria-hidden="true">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className={`w-[3px] rounded-sm bg-[var(--nv-gold)] ${active ? "eq-bar" : ""}`}
          style={{ height: active ? undefined : "40%", animationDelay: `${i * 0.18}s` }}
        />
      ))}
    </span>
  );
}

// Forest silhouette along the bottom edge of the page.
function Pines() {
  const trees = [
    { x: 4, h: 62 }, { x: 13, h: 86 }, { x: 25, h: 54 }, { x: 38, h: 78 },
    { x: 52, h: 58 }, { x: 66, h: 90 }, { x: 80, h: 60 }, { x: 92, h: 80 },
  ];
  return (
    <svg
      className="absolute bottom-0 inset-x-0 w-full h-40 pointer-events-none z-10"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <rect x="0" y="94" width="100" height="6" fill="#020706" />
      {trees.map((t, i) => (
        <g key={i} fill="#020706">
          <polygon points={`${t.x},${100 - t.h} ${t.x - 4.2},${100 - t.h * 0.45} ${t.x + 4.2},${100 - t.h * 0.45}`} />
          <polygon points={`${t.x},${100 - t.h * 0.72} ${t.x - 6},${100 - t.h * 0.18} ${t.x + 6},${100 - t.h * 0.18}`} />
          <rect x={t.x - 0.5} y="90" width="1" height="10" />
        </g>
      ))}
    </svg>
  );
}

export default function Radio() {
  // Only songs with an audio file are playable; the rest stay in the tracklist.
  // Until we know who is listening, only the first song is unlocked.
  const [session, setSession] = useState(null);
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: sub } = supabase.auth.onAuthStateChange((_event, next) => setSession(next));
    return () => sub.subscription.unsubscribe();
  }, []);
  const fullAccess = canListenToAll(session);

  const tracks = useMemo(
    () =>
      TRACKS.map((t, i) => ({
        ...t,
        locked: Boolean(t.file) && i > 0 && !fullAccess,
        src: t.file && (i === 0 || fullAccess) ? `/radio/${t.file}` : null,
      })),
    [fullAccess]
  );
  const playable = useMemo(() => tracks.filter((t) => t.src), [tracks]);
  const player = useRadioPlayer(playable, { artist: ALBUM.title, album: ALBUM.title });
  const { index, playing, time, durations, volume } = player;
  const hasAudio = playable.length > 0;
  const current = hasAudio ? playable[index] : null;
  const currentLength = durations[index];
  const currentNumber = current ? tracks.indexOf(current) + 1 : null;

  useEffect(() => {
    const previous = document.title;
    document.title = ALBUM.title;
    return () => {
      document.title = previous;
    };
  }, []);

  return (
    <div className="navidudu relative min-h-screen overflow-hidden">
      <Snow />
      <Garland />

      <div className="relative z-20">
        <header className="px-6 sm:px-10 pt-28 pb-2">
          <Link
            to="/"
            className="inline-flex items-center gap-3 text-[var(--nv-snow)]/70 hover:text-[var(--nv-snow)] transition-colors text-xs uppercase tracking-[0.15em] font-semibold"
          >
            <FiArrowLeft /> RS.
          </Link>
        </header>

        <main className="px-6 sm:px-10 pb-56">
          <div className="max-w-5xl mx-auto">
            {/* Hero: sleeve with record, title, player */}
            <section className="grid md:grid-cols-[auto_1fr] gap-10 md:gap-16 items-center py-10 md:py-16">
              <div className="relative mx-auto md:mx-0 w-[min(70vw,300px)] aspect-square">
                <div
                  className={`nv-record absolute top-[5%] left-[40%] w-[92%] aspect-square rounded-full shadow-2xl ${playing ? "is-playing" : ""}`}
                  aria-hidden="true"
                >
                  <div className="absolute inset-[32%] rounded-full bg-[var(--nv-gold)] flex items-center justify-center">
                    <div className="w-[14%] aspect-square rounded-full bg-[var(--nv-night)]" />
                  </div>
                </div>
                <div className="absolute inset-0 rounded-md bg-[var(--nv-cranberry)] shadow-[0_24px_60px_rgba(0,0,0,0.55)] p-5 flex flex-col justify-between border-[3px] border-[var(--nv-gold)]/80">
                  <span className="text-[0.65rem] uppercase tracking-[0.3em] text-[var(--nv-gold)] font-semibold">
                    Un disco de Navidad
                  </span>
                  <span className="nv-display text-[2.15rem] sm:text-5xl leading-[0.95] font-black italic text-[var(--nv-snow)]">
                    Feliz
                    <br />
                    Navidudu!
                  </span>
                  <span className="text-[0.65rem] uppercase tracking-[0.3em] text-[var(--nv-snow)]/80 font-semibold">
                    {TRACKS.length} canciones
                  </span>
                </div>
              </div>

              <div className="min-w-0">
                <p className="text-xs uppercase tracking-[0.3em] text-[var(--nv-gold)] font-semibold mb-4">
                  {hasAudio ? "Escucha el disco" : "Muy pronto"}
                </p>
                <h1 className="nv-display text-5xl sm:text-7xl font-black italic leading-[0.95] [text-wrap:balance]">
                  {ALBUM.title}
                </h1>
                <p className="mt-5 text-[var(--nv-snow)]/70 max-w-md leading-relaxed">
                  Nueve canciones para cerrar el año con los de siempre.
                </p>

                {/* Player */}
                <div className="mt-8 rounded-3xl border border-[var(--nv-snow)]/15 bg-black/25 backdrop-blur-sm p-5 sm:p-6 max-w-md">
                  <div className="min-h-[3.25rem]">
                    <p className="text-[0.7rem] uppercase tracking-[0.2em] text-[var(--nv-snow)]/50 font-semibold">
                      {hasAudio ? `${pad(currentNumber)} / ${pad(TRACKS.length)}` : "Las canciones llegan pronto"}
                    </p>
                    <p className="nv-display text-xl sm:text-2xl font-black mt-1 leading-tight">
                      {current ? current.title : ALBUM.title}
                    </p>
                  </div>

                  <div className="mt-4 flex items-center gap-3">
                    <span className="font-mono tabular-nums text-xs text-[var(--nv-snow)]/60 w-9 text-right">
                      {fmt(hasAudio ? time : 0)}
                    </span>
                    <input
                      id="navidudu-seek"
                      type="range"
                      min={0}
                      max={currentLength || 0}
                      step={0.1}
                      value={Math.min(time, currentLength || 0)}
                      disabled={!currentLength}
                      onChange={(e) => player.seek(Number(e.target.value))}
                      aria-label="Posición en esta canción"
                      className="flex-1 accent-[var(--nv-gold)] cursor-pointer disabled:opacity-40 disabled:cursor-default"
                    />
                    <span className="font-mono tabular-nums text-xs text-[var(--nv-snow)]/60 w-9">
                      {fmt(hasAudio ? currentLength : 0)}
                    </span>
                  </div>

                  <div className="mt-4 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <button onClick={player.previous} disabled={!hasAudio} aria-label="Anterior" className={ghostBtn}>
                        <FiSkipBack />
                      </button>
                      <button
                        onClick={player.toggle}
                        disabled={!hasAudio}
                        aria-label={playing ? "Pausar" : "Reproducir"}
                        className="w-14 h-14 rounded-full bg-[var(--nv-gold)] text-[var(--nv-night)] text-2xl flex items-center justify-center hover:bg-[var(--nv-snow)] transition-colors disabled:opacity-35 disabled:hover:bg-[var(--nv-gold)]"
                      >
                        {playing ? <FiPause /> : <FiPlay className="ml-1" />}
                      </button>
                      <button onClick={player.next} disabled={!hasAudio} aria-label="Siguiente" className={ghostBtn}>
                        <FiSkipForward />
                      </button>
                    </div>
                    <label className="hidden sm:flex items-center gap-2 text-[var(--nv-snow)]/60" htmlFor="navidudu-volume">
                      <FiVolume2 />
                      <input
                        id="navidudu-volume"
                        type="range"
                        min={0}
                        max={1}
                        step={0.01}
                        value={volume}
                        disabled={!hasAudio}
                        onChange={(e) => player.setVolume(Number(e.target.value))}
                        aria-label="Volumen"
                        className="w-24 accent-[var(--nv-gold)] cursor-pointer disabled:opacity-40"
                      />
                    </label>
                  </div>
                </div>
              </div>
            </section>

            {/* Tracklist */}
            <section className="mt-8" aria-label="Lista de canciones">
              <p className="text-xs uppercase tracking-[0.3em] text-[var(--nv-gold)] font-semibold mb-2">Canciones</p>
              <ol className="divide-y divide-[var(--nv-snow)]/15 border-y border-[var(--nv-snow)]/15">
                {tracks.map((track, i) => {
                  const playableIndex = playable.indexOf(track);
                  const active = hasAudio && playableIndex === index;
                  const length = playableIndex >= 0 ? durations[playableIndex] : null;
                  return (
                    <li key={track.title}>
                      <button
                        onClick={() => (active ? player.toggle() : player.goTo(playableIndex))}
                        disabled={!track.src}
                        aria-current={active ? "true" : undefined}
                        className="w-full flex items-baseline gap-4 sm:gap-8 py-4 text-left group disabled:cursor-default"
                      >
                        <span className="font-mono tabular-nums text-sm text-[var(--nv-snow)]/40 w-8 shrink-0">
                          {pad(i + 1)}
                        </span>
                        <span
                          className={`nv-display flex-1 min-w-0 flex items-center gap-3 text-lg sm:text-2xl font-black transition-colors ${
                            active
                              ? "text-[var(--nv-gold)]"
                              : "text-[var(--nv-snow)] group-enabled:group-hover:text-[var(--nv-gold)]"
                          }`}
                        >
                          {track.title}
                          {active && <Equalizer active={playing} />}
                        </span>
                        <span className="font-mono tabular-nums text-sm text-[var(--nv-snow)]/45 shrink-0 text-right">
                          {track.src ? fmt(length) : track.locked ? <FiLock className="inline" aria-label="Bloqueada" /> : hasAudio ? "Próximamente" : ""}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ol>
            </section>

            {/* Letter */}
            <section className="mt-24 flex justify-center" aria-label="Carta">
              <div className="relative max-w-xl w-full -rotate-1">
                <span className="absolute -top-3 left-8 w-20 h-6 bg-[var(--nv-gold)]/70 -rotate-6" aria-hidden="true" />
                <span className="absolute -top-3 right-10 w-20 h-6 bg-[var(--nv-gold)]/70 rotate-[5deg]" aria-hidden="true" />
                <div className="nv-paper rounded-sm px-7 sm:px-10 py-10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                  <p className="nv-hand text-[1.7rem] sm:text-[1.9rem] leading-[2.3rem] text-[var(--nv-ink)] font-medium">
                    {ALBUM.letter}
                  </p>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>

      <Pines />
    </div>
  );
}
