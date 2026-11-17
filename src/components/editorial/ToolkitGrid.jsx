const ROMAN_CODE = ["T.01", "T.02", "T.03", "T.04", "T.05", "T.06"];

export default function ToolkitGrid({ categories }) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {categories.map((cat, i) => (
        <div key={cat.title} className="bg-superficie border border-tinta/10 rounded-2xl shadow-sm p-6">
          <p className="text-xs uppercase tracking-[0.2em] text-tostado font-semibold mb-2">{ROMAN_CODE[i] || `T.0${i + 1}`}</p>
          <h4 className="font-display font-bold text-tinta text-lg mb-3">{cat.title}</h4>
          <ul className="flex flex-wrap gap-2">
            {cat.items.map((item) => (
              <li key={item} className="text-xs uppercase tracking-wide px-3 py-1 rounded-full border border-tinta/15 text-tinta/60">
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
