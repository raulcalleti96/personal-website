import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaSpotify } from "react-icons/fa";
import {
  isSpotifyConfigured,
  startSpotifyLogin,
  exchangeCodeForToken,
  getTokens,
  getValidAccessToken,
  disconnectSpotify,
} from "../lib/spotifyAuth";
import { getCurrentlyPlaying } from "../lib/spotifyApi";

const POLL_MS = 5000;

export default function SpotifyVinyl() {
  const { t } = useTranslation();
  const [connected, setConnected] = useState(() => Boolean(getTokens()));
  const [track, setTrack] = useState(null);
  const intervalRef = useRef(null);

  // Complete the PKCE redirect back from Spotify, if we just came from one.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    if (!code) return;

    window.history.replaceState(null, "", window.location.pathname);
    exchangeCodeForToken(code)
      .then(() => setConnected(true))
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (!connected) return;

    const poll = async () => {
      const token = await getValidAccessToken();
      if (!token) {
        setConnected(false);
        return;
      }
      const result = await getCurrentlyPlaying(token);
      if (result.unauthorized) {
        disconnectSpotify();
        setConnected(false);
        return;
      }
      setTrack(result.playing ? result : null);
    };

    poll();
    intervalRef.current = setInterval(poll, POLL_MS);
    return () => clearInterval(intervalRef.current);
  }, [connected]);

  const handleDisconnect = () => {
    disconnectSpotify();
    setConnected(false);
    setTrack(null);
  };

  if (!isSpotifyConfigured()) return null;

  if (!connected) {
    return (
      <button
        onClick={startSpotifyLogin}
        className="flex items-center gap-2 bg-carbon/30 backdrop-blur-sm border border-papel/15 hover:border-tostado/60 text-papel/80 hover:text-papel rounded-full px-5 py-2.5 text-sm font-semibold transition-colors"
      >
        <FaSpotify className="text-[#1DB954]" />
        {t("portal.focus.spotify.connect")}
      </button>
    );
  }

  const isPlaying = track?.isPlaying;

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative w-32 h-32 sm:w-36 sm:h-36">
        <div
          className="absolute inset-0 rounded-full shadow-xl"
          style={{
            background:
              "repeating-radial-gradient(circle, #111 0px, #111 2px, #1c1c1c 3px, #111 4px)",
            animation: "spin 3.5s linear infinite",
            animationPlayState: isPlaying ? "running" : "paused",
          }}
        >
          <div className="absolute inset-[30%] rounded-full overflow-hidden border-2 border-black/40 bg-carbon">
            {track?.albumArt ? (
              <img src={track.albumArt} alt="" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-tostado" />
            )}
          </div>
          <div className="absolute inset-[46%] rounded-full bg-papel/90" />
        </div>
      </div>

      <div className="text-center max-w-[220px]">
        {track ? (
          <>
            <p className="text-papel font-semibold text-sm truncate">{track.trackName}</p>
            <p className="text-papel/60 text-xs truncate">{track.artistName}</p>
          </>
        ) : (
          <p className="text-papel/50 text-xs uppercase tracking-[0.15em]">{t("portal.focus.spotify.nothingPlaying")}</p>
        )}
      </div>

      <button onClick={handleDisconnect} className="text-papel/40 hover:text-papel/70 text-xs underline transition-colors">
        {t("portal.focus.spotify.disconnect")}
      </button>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
