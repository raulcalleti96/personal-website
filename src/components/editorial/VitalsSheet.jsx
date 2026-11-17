export default function VitalsSheet({ rows }) {
  return (
    <dl className="divide-y divide-tinta/15 border-y border-tinta/15">
      {rows.map((row) => (
        <div key={row.label} className="grid grid-cols-3 gap-4 py-4">
          <dt className="text-xs uppercase tracking-[0.2em] text-tinta/50 font-semibold col-span-1">{row.label}</dt>
          <dd className="text-base sm:text-lg text-tinta font-medium col-span-2">{row.value}</dd>
        </div>
      ))}
    </dl>
  );
}
