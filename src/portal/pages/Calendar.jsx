import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FiTrash2, FiSettings } from "react-icons/fi";

const STORAGE_KEY = "portal_calendar_extra_ids";

const loadExtraIds = () => {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    return Array.isArray(stored) ? stored : [];
  } catch {
    return [];
  }
};

const extractCalendarId = (value) => {
  try {
    const url = new URL(value);
    return url.searchParams.get("src") || value;
  } catch {
    return value;
  }
};

const Calendar = () => {
  const { t } = useTranslation();
  const { session } = useOutletContext();
  const email = session?.user?.email;
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const [extraIds, setExtraIds] = useState(loadExtraIds);
  const [newId, setNewId] = useState("");
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(extraIds));
  }, [extraIds]);

  const addId = (e) => {
    e.preventDefault();
    const value = extractCalendarId(newId.trim());
    if (!value || extraIds.includes(value)) return;
    setExtraIds([...extraIds, value]);
    setNewId("");
  };

  const removeId = (id) => setExtraIds(extraIds.filter((x) => x !== id));

  const allIds = [email, ...extraIds].filter(Boolean);
  const srcParams = allIds.map((id) => `src=${encodeURIComponent(id)}`).join("&");
  const src = `https://calendar.google.com/calendar/embed?${srcParams}&ctz=${encodeURIComponent(
    timezone
  )}&mode=WEEK&showTitle=0&showTabs=1&showCalendars=1&showTz=0&showPrint=0`;

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-2xl md:text-3xl font-bold">{t("portal.nav.calendar")}</h1>
        <button
          onClick={() => setShowSettings((v) => !v)}
          className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition px-3 py-2 rounded-lg border border-white/10 hover:border-naranja-vibrante"
        >
          <FiSettings /> {t("portal.calendar.manageCalendars")}
        </button>
      </div>
      <p className="text-sm text-gray-400 mb-6">{t("portal.calendar.note")}</p>

      {showSettings && (
        <div className="bg-gris-oscuro border border-white/10 rounded-2xl p-6 mb-6 space-y-4">
          <p className="text-sm text-gray-400">{t("portal.calendar.howToFindId")}</p>

          <form onSubmit={addId} className="flex gap-2">
            <input
              value={newId}
              onChange={(e) => setNewId(e.target.value)}
              placeholder={t("portal.calendar.idPlaceholder")}
              className="flex-1 px-4 py-2 rounded-lg bg-[#0f0f10] border border-white/10 outline-none focus:border-naranja-vibrante"
            />
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-naranja-vibrante text-black font-semibold hover:brightness-110 transition"
            >
              {t("portal.calendar.addCalendar")}
            </button>
          </form>

          <ul className="space-y-2">
            <li className="flex items-center justify-between text-sm text-gray-400 px-3 py-2">
              <span>{email}</span>
              <span className="text-xs uppercase">{t("portal.calendar.primary")}</span>
            </li>
            {extraIds.map((id) => (
              <li
                key={id}
                className="flex items-center justify-between text-sm bg-[#0f0f10] rounded-lg px-3 py-2"
              >
                <span className="truncate">{id}</span>
                <button
                  onClick={() => removeId(id)}
                  className="text-gray-500 hover:text-red-400 transition shrink-0 ml-2"
                  aria-label={t("portal.tasks.delete")}
                >
                  <FiTrash2 size={14} />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="bg-gris-oscuro border border-white/10 rounded-2xl overflow-hidden h-[75vh]">
        <iframe
          title="Google Calendar"
          src={src}
          style={{ border: 0 }}
          width="100%"
          height="100%"
        />
      </div>
    </div>
  );
};

export default Calendar;
