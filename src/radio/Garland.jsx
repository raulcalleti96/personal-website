// String of Christmas lights hanging across the top of the page.
const COLORS = ["#c1272d", "#f0c869", "#3f9a6b", "#f7f3e9"];
const BULBS = 26;

// Bulb position along a sagging wire: 5 loops across the width.
const LOOPS = 5;
const SAG = 26;
const bulbY = (t) => {
  const local = (t * LOOPS) % 1;
  return 6 + SAG * 4 * local * (1 - local);
};

export default function Garland() {
  const bulbs = Array.from({ length: BULBS }, (_, i) => {
    const t = (i + 0.5) / BULBS;
    return { left: t * 100, top: bulbY(t), color: COLORS[i % COLORS.length], delay: (i * 0.37) % 2.4 };
  });

  const wire = Array.from({ length: 101 }, (_, i) => `${i === 0 ? "M" : "L"}${i} ${bulbY(i / 100) / 0.96}`).join(" ");

  return (
    <div className="absolute inset-x-0 top-0 h-24 pointer-events-none z-10 overflow-hidden" aria-hidden="true">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <path d={wire} fill="none" stroke="#050f0d" strokeWidth="2" vectorEffect="non-scaling-stroke" />
      </svg>
      {bulbs.map((b, i) => (
        <span
          key={i}
          className="nv-bulb"
          style={{ left: `${b.left}%`, top: `${b.top}px`, "--bulb": b.color, animationDelay: `${b.delay}s` }}
        />
      ))}
    </div>
  );
}
