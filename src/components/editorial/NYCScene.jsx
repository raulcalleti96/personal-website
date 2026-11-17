import { useEffect, useRef, useState } from "react";

const RESET_TILT = { rx: 0, ry: 0 };

function useScrollProgress(ref, mode, maxScroll) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = null;

    const compute = () => {
      raf = null;
      if (mode === "window") {
        setProgress(Math.min(1, Math.max(0, window.scrollY / maxScroll)));
        return;
      }
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const raw = (vh - rect.top) / (vh * 0.7 + rect.height * 0.3);
      setProgress(Math.min(1, Math.max(0, raw)));
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
  }, [ref, mode, maxScroll]);

  return progress;
}

/**
 * A layered, scroll- and cursor-reactive 3D photo scene: real photos stacked
 * with CSS perspective/translateZ so they separate in depth as the page
 * scrolls, plus a mouse-tilt on top for interactivity at rest.
 */
export default function NYCScene({
  photoSrc,
  photoAlt,
  layers = [],
  badges = [],
  variant = "hero",
  scrollMode = "window",
  maxScroll = 700,
}) {
  const containerRef = useRef(null);
  const [tilt, setTilt] = useState(RESET_TILT);
  const progress = useScrollProgress(containerRef, scrollMode, maxScroll);

  const handleMouseMove = (e) => {
    const rect = containerRef.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ rx: py * -14, ry: px * 14 });
  };

  const handleMouseLeave = () => setTilt(RESET_TILT);

  const sizeClass = variant === "hero" ? "w-full max-w-sm aspect-[4/5]" : "w-60 aspect-[4/5]";

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: variant === "hero" ? 1600 : 1200 }}
      className={`relative mx-auto ${variant === "hero" ? "lg:mx-0" : ""} ${sizeClass}`}
    >
      <div style={{ transformStyle: "preserve-3d" }} className="absolute inset-0">
        {layers.map((layer, i) => {
          const z = layer.zFrom + (layer.zTo - layer.zFrom) * progress;
          const rot = layer.rotFrom + (layer.rotTo - layer.rotFrom) * progress;
          const dx = layer.xFrom + (layer.xTo - layer.xFrom) * progress;
          const dy = layer.yFrom + (layer.yTo - layer.yFrom) * progress;
          const op = layer.opFrom + (layer.opTo - layer.opFrom) * progress;
          const tf = layer.tiltFactor ?? 0.35;
          return (
            <div
              key={i}
              style={{
                transform: `translateZ(${z}px) translate(${dx}px, ${dy}px) rotate(${rot}deg) rotateX(${tilt.rx * tf}deg) rotateY(${tilt.ry * tf}deg)`,
                opacity: op,
                transition: "transform 0.2s ease-out, opacity 0.2s ease-out",
              }}
              className="absolute inset-0 rounded-[2rem] overflow-hidden shadow-xl"
            >
              <img src={layer.src} alt="" className="w-full h-full object-cover" aria-hidden="true" />
              <div className="absolute inset-0 bg-crema/25" />
            </div>
          );
        })}

        <div
          style={{
            transform: `translateZ(50px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
            transition: "transform 0.25s ease-out",
          }}
          className="absolute inset-0 rounded-[2rem] overflow-hidden shadow-2xl"
        >
          <img src={photoSrc} alt={photoAlt} className="w-full h-full object-cover" />
        </div>
      </div>

      {badges.map((badge, i) => (
        <div key={i} className={badge.className}>
          <p className="text-2xl font-display font-black">{badge.value}</p>
          <p className="text-[0.65rem] uppercase tracking-[0.15em] opacity-70 font-semibold">{badge.label}</p>
        </div>
      ))}
    </div>
  );
}
