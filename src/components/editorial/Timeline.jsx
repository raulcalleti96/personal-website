export default function Timeline({ items }) {
  return (
    <ol className="relative border-l border-tinta/20 ml-3">
      {items.map((entry, index) => (
        <li key={index} className="mb-10 ml-8 last:mb-0">
          <span className="absolute -left-[7px] flex h-3.5 w-3.5 items-center justify-center rounded-full bg-tostado ring-4 ring-crema" />
          <p className="text-xs uppercase tracking-[0.2em] text-tostado font-semibold mb-1">{entry.years}</p>
          <h4 className="text-lg sm:text-xl font-display font-bold text-tinta">{entry.title}</h4>
          <p className="text-sm text-tinta/60 mt-1">{entry.subtitle}</p>
        </li>
      ))}
    </ol>
  );
}
