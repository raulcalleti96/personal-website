import { useEffect, useRef, useState } from "react";
import { FiArrowDown } from "react-icons/fi";

function useSectionProgress(ref) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = null;

    const compute = () => {
      raf = null;
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      if (total <= 0) {
        setProgress(0);
        return;
      }
      const p = -rect.top / total;
      setProgress(Math.min(1, Math.max(0, p)));
    };

    const onScroll = () => {
      if (raf == null) raf = requestAnimationFrame(compute);
    };

    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [ref]);

  return progress;
}

/**
 * A scroll-pinned, full-bleed photo hero: as the user scrolls through the
 * section, the background photo slowly zooms in and crossfades to a second
 * photo while the overlaid content cross-dissolves from an intro panel into
 * a "proof" stats panel.
 */
export default function HeroScene({ photos, intro, proof, badge }) {
  const wrapRef = useRef(null);
  const progress = useSectionProgress(wrapRef);

  const introOpacity = Math.max(0, 1 - progress / 0.55);
  const proofOpacity = Math.max(0, Math.min(1, (progress - 0.45) / 0.55));
  const scale = 1 + progress * 0.18;
  const panY = progress * -30;
  const photoCrossfade = Math.max(0, Math.min(1, (progress - 0.35) / 0.4));

  return (
    <div ref={wrapRef} className="relative h-[220vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <img
          src={photos[0]}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ transform: `scale(${scale}) translateY(${panY}px)` }}
        />
        {photos[1] && (
          <img
            src={photos[1]}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ transform: `scale(${scale}) translateY(${panY}px)`, opacity: photoCrossfade }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-carbon/85 via-carbon/45 to-carbon/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-carbon/60 via-transparent to-carbon/10" />

        {badge && (
          <div style={{ opacity: introOpacity }} className="absolute top-24 right-6 sm:right-10 z-20">
            {badge}
          </div>
        )}

        {/* Panel 1 — intro */}
        <div
          style={{ opacity: introOpacity, pointerEvents: progress < 0.5 ? "auto" : "none" }}
          className="absolute inset-0 flex flex-col justify-center px-6 sm:px-10 lg:px-20"
        >
          <div className="max-w-2xl">
            <p className="text-xs sm:text-sm uppercase tracking-[0.3em] text-tostado font-semibold mb-6">{intro.role}</p>
            <h1 className="font-display font-black text-papel leading-[0.95] text-4xl sm:text-6xl md:text-7xl">
              {intro.name}
            </h1>
            <p className="text-base sm:text-lg text-papel/80 mt-6 max-w-lg">{intro.tagline}</p>
            <a
              href="#contact"
              className="inline-block mt-8 px-6 py-3 text-sm font-semibold uppercase tracking-[0.12em] rounded-full bg-papel text-carbon hover:bg-tostado hover:text-papel transition-colors"
            >
              {intro.cta}
            </a>
          </div>
        </div>

        {/* Panel 2 — proof */}
        <div
          style={{ opacity: proofOpacity, pointerEvents: progress >= 0.5 ? "auto" : "none" }}
          className="absolute inset-0 flex flex-col justify-center px-6 sm:px-10 lg:px-20"
        >
          <div className="max-w-2xl">
            <p className="text-xs sm:text-sm uppercase tracking-[0.3em] text-tostado font-semibold mb-6">{proof.label}</p>
            <div className="grid grid-cols-3 gap-6 mb-8">
              {proof.stats.map((s) => (
                <div key={s.label}>
                  <p className="font-display font-black text-papel text-2xl sm:text-4xl">{s.value}</p>
                  <p className="text-[0.6rem] sm:text-xs uppercase tracking-[0.15em] text-papel/60 font-semibold mt-1">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
            <p className="text-base text-papel/80 max-w-lg">{proof.blurb}</p>
            <a
              href="#contact"
              className="inline-block mt-8 px-6 py-3 text-sm font-semibold uppercase tracking-[0.12em] rounded-full bg-papel text-carbon hover:bg-tostado hover:text-papel transition-colors"
            >
              {proof.cta}
            </a>
          </div>
        </div>

        <div
          style={{ opacity: Math.min(introOpacity, 1) }}
          className="hidden sm:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-papel/60 text-xs uppercase tracking-[0.2em]"
        >
          {intro.scroll}
          <FiArrowDown className="animate-bounce" />
        </div>
      </div>
    </div>
  );
}
