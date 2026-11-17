import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const localFormatter = new Intl.DateTimeFormat(undefined, { hour: "2-digit", minute: "2-digit", hour12: false });
const nyFormatter = new Intl.DateTimeFormat("en-US", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
  timeZone: "America/New_York",
});
const dateFormatter = new Intl.DateTimeFormat(undefined, { weekday: "long", day: "numeric", month: "long" });

export default function FocusClock() {
  const { t } = useTranslation();
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="text-center">
      <p className="text-papel/70 text-sm sm:text-base uppercase tracking-[0.25em] mb-2 capitalize">
        {dateFormatter.format(now)}
      </p>
      <h1 className="font-display font-black text-papel leading-none text-[5rem] sm:text-[8rem] md:text-[10rem] tabular-nums">
        {localFormatter.format(now)}
      </h1>
      <div className="mt-4 inline-flex items-center gap-2 text-papel/80 bg-carbon/30 backdrop-blur-sm border border-papel/15 rounded-full px-5 py-2">
        <span className="text-xs uppercase tracking-[0.2em] text-papel/60">{t("portal.focus.newYork")}</span>
        <span className="font-display font-bold text-lg tabular-nums">{nyFormatter.format(now)}</span>
      </div>
    </div>
  );
}
