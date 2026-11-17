import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { fetchPomodoroSessions, summarizePomodoroSessions } from "../lib/pomodoroLog";

const PomodoroHistory = ({ userId, refreshKey }) => {
  const { t } = useTranslation();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    if (!userId) return;
    fetchPomodoroSessions(userId).then((sessions) => {
      setStats(summarizePomodoroSessions(sessions));
    });
  }, [userId, refreshKey]);

  if (!stats || stats.total.count === 0) return null;

  const rows = [
    { key: "today", label: t("portal.focus.history.today"), data: stats.today },
    { key: "week", label: t("portal.focus.history.week"), data: stats.week },
    { key: "total", label: t("portal.focus.history.total"), data: stats.total },
  ];

  return (
    <div className="bg-carbon/30 backdrop-blur-sm border border-papel/15 rounded-3xl px-8 py-6 w-full max-w-xs sm:max-w-none sm:w-auto flex flex-col sm:flex-row gap-6 sm:gap-10 mt-2">
      <p className="text-xs uppercase tracking-[0.25em] text-papel/60 sm:hidden">
        {t("portal.focus.history.title")}
      </p>
      {rows.map(({ key, label, data }) => (
        <div key={key} className="text-center">
          <p className="hidden sm:block text-[10px] uppercase tracking-[0.2em] text-papel/50 mb-1">
            {label}
          </p>
          <p className="font-display font-bold text-papel text-lg tabular-nums">
            {t("portal.focus.history.sessions", { count: data.count })}
          </p>
          <p className="text-xs text-papel/50">{t("portal.focus.history.minutes", { minutes: data.minutes })}</p>
          <p className="sm:hidden text-[10px] uppercase tracking-[0.2em] text-papel/50 mt-1">{label}</p>
        </div>
      ))}
    </div>
  );
};

export default PomodoroHistory;
