import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FiTrash2, FiCheck } from "react-icons/fi";
import { supabase } from "../../supabaseClient";
import { computeStreak, isCurrentPeriodChecked, getPeriodStart } from "../lib/period";

const FREQUENCIES = ["daily", "weekly", "monthly", "yearly"];

const emptyForm = { title: "", frequency: "daily", targetStreak: 7 };

const Habits = () => {
  const { t } = useTranslation();
  const { session } = useOutletContext();
  const [habits, setHabits] = useState([]);
  const [checkins, setCheckins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const loadData = async () => {
    const { data: habitsData } = await supabase
      .from("habits")
      .select("*")
      .eq("archived", false)
      .order("created_at", { ascending: true });
    const { data: checkinsData } = await supabase.from("habit_checkins").select("*");
    setHabits(habitsData || []);
    setCheckins(checkinsData || []);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    setSaving(true);
    const { error } = await supabase.from("habits").insert({
      user_id: session.user.id,
      title: form.title.trim(),
      frequency: form.frequency,
      target_streak: Number(form.targetStreak) || 1,
    });
    setSaving(false);
    if (!error) {
      setForm(emptyForm);
      loadData();
    }
  };

  const periodsFor = (habitId) =>
    checkins.filter((c) => c.habit_id === habitId).map((c) => c.period_start);

  const toggleCheck = async (habit) => {
    const periods = periodsFor(habit.id);
    const checked = isCurrentPeriodChecked(habit.frequency, periods);
    const currentPeriod = getPeriodStart(habit.frequency);

    if (checked) {
      setCheckins((prev) =>
        prev.filter((c) => !(c.habit_id === habit.id && c.period_start === currentPeriod))
      );
      await supabase
        .from("habit_checkins")
        .delete()
        .eq("habit_id", habit.id)
        .eq("period_start", currentPeriod);
    } else {
      const optimistic = {
        id: `temp-${habit.id}-${currentPeriod}`,
        habit_id: habit.id,
        user_id: session.user.id,
        period_start: currentPeriod,
      };
      setCheckins((prev) => [...prev, optimistic]);
      await supabase.from("habit_checkins").insert({
        habit_id: habit.id,
        user_id: session.user.id,
        period_start: currentPeriod,
      });
    }
  };

  const deleteHabit = async (habit) => {
    setHabits((prev) => prev.filter((h) => h.id !== habit.id));
    await supabase.from("habits").delete().eq("id", habit.id);
  };

  return (
    <div>
      <h1 className="text-2xl md:text-3xl font-bold mb-6">{t("portal.nav.habits")}</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-gris-oscuro border border-white/10 rounded-2xl p-6 mb-8 grid grid-cols-1 md:grid-cols-4 gap-4 items-end"
      >
        <div className="md:col-span-2">
          <label className="block text-sm mb-1">{t("portal.habits.form.titleLabel")}</label>
          <input
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full px-4 py-2 rounded-lg bg-[#0f0f10] border border-white/10 outline-none focus:border-naranja-vibrante"
            required
          />
        </div>
        <div>
          <label className="block text-sm mb-1">{t("portal.habits.form.frequencyLabel")}</label>
          <select
            value={form.frequency}
            onChange={(e) => setForm({ ...form, frequency: e.target.value })}
            className="w-full px-4 py-2 rounded-lg bg-[#0f0f10] border border-white/10 outline-none focus:border-naranja-vibrante"
          >
            {FREQUENCIES.map((f) => (
              <option key={f} value={f}>
                {t(`portal.habits.frequencies.${f}`)}
              </option>
            ))}
          </select>
        </div>
        <div className="flex gap-3 items-end">
          <div className="flex-1">
            <label className="block text-sm mb-1">{t("portal.habits.form.targetLabel")}</label>
            <input
              type="number"
              min={1}
              value={form.targetStreak}
              onChange={(e) => setForm({ ...form, targetStreak: e.target.value })}
              className="w-full px-4 py-2 rounded-lg bg-[#0f0f10] border border-white/10 outline-none focus:border-naranja-vibrante"
            />
          </div>
          <button
            type="submit"
            disabled={saving}
            className="px-5 py-2 rounded-lg bg-naranja-vibrante text-black font-semibold hover:brightness-110 transition disabled:opacity-60"
          >
            {t("portal.habits.form.add")}
          </button>
        </div>
      </form>

      {!loading && (
        <>
          {habits.length === 0 ? (
            <p className="text-sm text-gray-400">{t("portal.habits.empty")}</p>
          ) : (
            <ul className="space-y-3">
              {habits.map((habit) => {
                const periods = periodsFor(habit.id);
                const streak = computeStreak(habit.frequency, periods);
                const checked = isCurrentPeriodChecked(habit.frequency, periods);
                const progress = Math.min(100, (streak / habit.target_streak) * 100);

                return (
                  <li
                    key={habit.id}
                    className="bg-gris-oscuro border border-white/10 rounded-xl px-4 py-3"
                  >
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => toggleCheck(habit)}
                        className={`w-9 h-9 shrink-0 rounded-full flex items-center justify-center border transition ${
                          checked
                            ? "bg-naranja-vibrante border-naranja-vibrante text-black"
                            : "border-white/20 text-transparent hover:border-naranja-vibrante"
                        }`}
                      >
                        <FiCheck />
                      </button>
                      <div className="min-w-0 flex-1">
                        <p className="font-medium truncate">{habit.title}</p>
                        <p className="text-xs text-gray-400">
                          {t(`portal.habits.frequencies.${habit.frequency}`)} ·{" "}
                          {t("portal.habits.streak", { count: streak })} ·{" "}
                          {t("portal.habits.target", { count: habit.target_streak })}
                        </p>
                      </div>
                      <button
                        onClick={() => deleteHabit(habit)}
                        aria-label={t("portal.tasks.delete")}
                        className="text-gray-500 hover:text-red-400 transition shrink-0"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                    <div className="mt-3 h-2 rounded-full bg-white/10 overflow-hidden">
                      <div
                        className="h-full bg-naranja-vibrante transition-all"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </>
      )}
    </div>
  );
};

export default Habits;
