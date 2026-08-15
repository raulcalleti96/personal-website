import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { supabase } from "../../supabaseClient";
import { toDateStr } from "../lib/period";
import { MOOD_EMOJIS } from "../lib/mood";

const MOODS = Object.entries(MOOD_EMOJIS).map(([value, emoji]) => ({
  value: Number(value),
  emoji,
}));

const RATINGS = [1, 2, 3, 4, 5];

const DailyCheckin = ({ session }) => {
  const { t } = useTranslation();
  const today = toDateStr(new Date());
  const skipKey = `diario_skipped_${today}`;

  const [show, setShow] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    mood: null,
    yesterdayBest: "",
    yesterdayImprove: "",
    yesterdayRating: null,
  });

  useEffect(() => {
    if (!session?.user || sessionStorage.getItem(skipKey)) return;

    supabase
      .from("journal_entries")
      .select("id")
      .eq("entry_date", today)
      .maybeSingle()
      .then(({ data }) => {
        if (!data) setShow(true);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session?.user?.id]);

  const handleSkip = () => {
    sessionStorage.setItem(skipKey, "1");
    setShow(false);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!form.mood) return;
    setSaving(true);

    const { error } = await supabase.from("journal_entries").insert({
      user_id: session.user.id,
      entry_date: today,
      mood: form.mood,
      yesterday_best: form.yesterdayBest.trim() || null,
      yesterday_improve: form.yesterdayImprove.trim() || null,
      yesterday_rating: form.yesterdayRating,
    });

    setSaving(false);
    if (!error) setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <form
        onSubmit={handleSave}
        className="bg-gris-oscuro border border-white/10 rounded-2xl p-6 w-full max-w-md space-y-5"
      >
        <div>
          <h2 className="text-lg font-bold mb-1">{t("portal.diario.checkin.title")}</h2>
          <p className="text-sm text-gray-400">{t("portal.diario.checkin.subtitle")}</p>
        </div>

        <div>
          <label className="block text-sm mb-2">{t("portal.diario.checkin.moodLabel")}</label>
          <div className="flex gap-2">
            {MOODS.map(({ value, emoji }) => (
              <button
                key={value}
                type="button"
                onClick={() => setForm({ ...form, mood: value })}
                className={`flex-1 text-2xl py-2 rounded-lg border transition ${
                  form.mood === value
                    ? "bg-naranja-vibrante border-naranja-vibrante"
                    : "bg-[#0f0f10] border-white/10 hover:border-naranja-vibrante"
                }`}
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm mb-1">{t("portal.diario.checkin.bestLabel")}</label>
          <textarea
            value={form.yesterdayBest}
            onChange={(e) => setForm({ ...form, yesterdayBest: e.target.value })}
            rows={2}
            className="w-full px-4 py-2 rounded-lg bg-[#0f0f10] border border-white/10 outline-none focus:border-naranja-vibrante"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">{t("portal.diario.checkin.improveLabel")}</label>
          <textarea
            value={form.yesterdayImprove}
            onChange={(e) => setForm({ ...form, yesterdayImprove: e.target.value })}
            rows={2}
            className="w-full px-4 py-2 rounded-lg bg-[#0f0f10] border border-white/10 outline-none focus:border-naranja-vibrante"
          />
        </div>

        <div>
          <label className="block text-sm mb-2">{t("portal.diario.checkin.ratingLabel")}</label>
          <div className="flex gap-2">
            {RATINGS.map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => setForm({ ...form, yesterdayRating: value })}
                className={`flex-1 py-2 rounded-lg border font-semibold transition ${
                  form.yesterdayRating === value
                    ? "bg-naranja-vibrante border-naranja-vibrante text-black"
                    : "bg-[#0f0f10] border-white/10 text-gray-300 hover:border-naranja-vibrante"
                }`}
              >
                {value}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={!form.mood || saving}
            className="flex-1 px-4 py-2 rounded-lg bg-naranja-vibrante text-black font-semibold hover:brightness-110 transition disabled:opacity-60"
          >
            {t("portal.diario.checkin.save")}
          </button>
          <button
            type="button"
            onClick={handleSkip}
            className="px-4 py-2 rounded-lg bg-neutral-700/80 text-white font-semibold hover:bg-neutral-600/80 transition"
          >
            {t("portal.diario.checkin.skip")}
          </button>
        </div>
      </form>
    </div>
  );
};

export default DailyCheckin;
