export default function NowWidget({ dateLabel, items }) {
  return (
    <div className="border-t border-tinta/15 pt-10">
      <p className="text-xs uppercase tracking-[0.3em] text-tostado font-semibold mb-6">{dateLabel}</p>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-8">
        {items.map((entry) => (
          <div key={entry.label}>
            <p className="text-xs uppercase tracking-[0.15em] text-tinta/40 font-semibold mb-2">{entry.label}</p>
            <p className="font-display font-bold text-tinta leading-snug">{entry.title}</p>
            <p className="text-sm text-tinta/50 mt-1">{entry.subtitle}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
