import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FiArrowLeft } from "react-icons/fi";
import { getDayPhase } from "../lib/dayPhase";
import FocusClock from "../components/FocusClock";
import PomodoroTimer from "../components/PomodoroTimer";
import SpotifyVinyl from "../components/SpotifyVinyl";
import PomodoroHistory from "../components/PomodoroHistory";

const Focus = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { session } = useOutletContext();
  const userId = session?.user?.id;
  const [phase, setPhase] = useState(() => getDayPhase());
  const [historyVersion, setHistoryVersion] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setPhase(getDayPhase()), 60 * 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      className="relative min-h-screen w-full overflow-hidden flex flex-col items-center justify-center px-6 py-16 transition-[background] duration-[3000ms]"
      style={{ background: phase.gradient }}
    >
      {phase.photoSrc && (
        <img
          src={phase.photoSrc}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover transition-[filter] duration-[3000ms]"
          style={{ filter: phase.filter }}
        />
      )}
      {/* Uniform tint plus a stronger vignette behind the clock/timer so text
          stays legible over bright sky regardless of which photo is active. */}
      <div className="absolute inset-0 bg-carbon/35" />
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(ellipse 60% 55% at 50% 38%, rgba(28,25,23,0.55), transparent 70%)" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-carbon/30 via-transparent to-carbon/40" />

      <button
        onClick={() => navigate("/clients/select")}
        className="absolute top-8 left-6 sm:left-10 flex items-center gap-2 text-papel/70 hover:text-papel text-sm font-semibold transition-colors z-20"
      >
        <FiArrowLeft /> {t("portal.focus.back")}
      </button>

      <div className="relative z-10 flex flex-col items-center gap-12">
        <FocusClock />
        <div className="flex flex-col sm:flex-row items-center gap-8 sm:gap-10">
          <SpotifyVinyl />
          <PomodoroTimer
            userId={userId}
            onSessionLogged={() => setHistoryVersion((v) => v + 1)}
          />
        </div>
        <PomodoroHistory userId={userId} refreshKey={historyVersion} />
      </div>
    </section>
  );
};

export default Focus;
