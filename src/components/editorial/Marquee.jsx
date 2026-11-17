export default function Marquee({ items, className = "" }) {
  const track = [...items, ...items];

  return (
    <div className={`relative overflow-hidden border-y border-tinta/15 py-4 ${className}`}>
      <div className="flex w-max animate-marquee gap-10 whitespace-nowrap">
        {track.map((label, index) => (
          <span
            key={`${label}-${index}`}
            className="text-sm sm:text-base uppercase tracking-[0.2em] text-tinta/60 font-medium"
          >
            {label}
            <span className="ml-10 text-tostado">&bull;</span>
          </span>
        ))}
      </div>
    </div>
  );
}
