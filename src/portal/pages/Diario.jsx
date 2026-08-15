import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FiBook } from "react-icons/fi";
import { supabase } from "../../supabaseClient";
import { parseLocalDate } from "../lib/period";
import { MOOD_EMOJIS } from "../lib/mood";

const Diario = () => {
  const { t, i18n } = useTranslation();
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("journal_entries")
      .select("*")
      .order("entry_date", { ascending: false })
      .then(({ data }) => {
        setEntries(data || []);
        setLoading(false);
      });
  }, []);

  const formatDate = (dateStr) =>
    parseLocalDate(dateStr).toLocaleDateString(i18n.language === "es" ? "es-ES" : "en-US", {
      weekday: "long",
      day: "numeric",
      month: "long",
    });

  return (
    <div>
      <h1 className="text-2xl md:text-3xl font-bold mb-6">{t("portal.nav.diario")}</h1>

      {!loading && entries.length === 0 && (
        <div className="bg-gris-oscuro border border-white/10 rounded-2xl p-10 flex flex-col items-center text-center gap-3">
          <FiBook size={32} className="text-naranja-vibrante" />
          <p className="text-gray-300 max-w-md">{t("portal.diario.entries.empty")}</p>
        </div>
      )}

      {entries.length > 0 && (
        <ul className="space-y-3">
          {entries.map((entry) => (
            <li key={entry.id} className="bg-gris-oscuro border border-white/10 rounded-2xl p-5">
              <div className="flex items-center justify-between mb-3">
                <p className="font-semibold capitalize">{formatDate(entry.entry_date)}</p>
                <span className="text-2xl">{MOOD_EMOJIS[entry.mood]}</span>
              </div>

              {(entry.yesterday_best || entry.yesterday_improve) && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  {entry.yesterday_best && (
                    <div>
                      <p className="text-gray-400 mb-1">{t("portal.diario.checkin.bestLabel")}</p>
                      <p className="text-gray-200">{entry.yesterday_best}</p>
                    </div>
                  )}
                  {entry.yesterday_improve && (
                    <div>
                      <p className="text-gray-400 mb-1">{t("portal.diario.checkin.improveLabel")}</p>
                      <p className="text-gray-200">{entry.yesterday_improve}</p>
                    </div>
                  )}
                </div>
              )}

              {entry.yesterday_rating && (
                <p className="text-xs text-gray-500 mt-3">
                  {t("portal.diario.entries.yesterdayRating", { rating: entry.yesterday_rating })}
                </p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Diario;
