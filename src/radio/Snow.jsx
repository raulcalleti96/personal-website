import { useEffect, useRef } from "react";

// Falling snow on a fixed canvas behind the page. Still frame when the
// visitor prefers reduced motion.
export default function Snow({ count = 110 }) {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0;
    let h = 0;
    let raf = 0;
    let flakes = [];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const make = () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: 0.8 + Math.random() * 2.6,
      speed: 0.25 + Math.random() * 0.9,
      drift: Math.random() * Math.PI * 2,
    });

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const f of flakes) {
        ctx.beginPath();
        ctx.fillStyle = `rgba(247, 243, 233, ${0.35 + f.r * 0.17})`;
        ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const tick = () => {
      for (const f of flakes) {
        f.y += f.speed;
        f.drift += 0.012;
        f.x += Math.sin(f.drift) * 0.35;
        if (f.y > h + 4) {
          f.y = -4;
          f.x = Math.random() * w;
        }
        if (f.x > w + 4) f.x = -4;
        if (f.x < -4) f.x = w + 4;
      }
      draw();
      raf = requestAnimationFrame(tick);
    };

    resize();
    flakes = Array.from({ length: count }, make);
    if (reduced) draw();
    else raf = requestAnimationFrame(tick);
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [count]);

  return <canvas ref={ref} className="fixed inset-0 w-full h-full pointer-events-none z-0" aria-hidden="true" />;
}
