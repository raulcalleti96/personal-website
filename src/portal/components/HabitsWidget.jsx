import { useEffect, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FiRepeat, FiCheck } from "react-icons/fi";
import { supabase } from "../../supabaseClient";
import { computeStreak, isCurrentPeriodChecked, getPeriodStart } from "../lib/period";

const HabitsWidget = () => {
  const { t } = useTranslation();
  const { session } = useOutletContext();
  const [habits, setHabits] = useState([]);
  const [checkins, setCheckins] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    const { data: habitsData } = await supabase
      .from("habits")
      .select("*")
      .eq("archived", false);
    const { data: checkinsData } = await supabase.from("habit_checkins").select("*");
    setHabits(habitsData || []);
    setCheckins(checkinsData || []);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

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
      setCheckins((prev) => [
        ...prev,
        { id: `temp-${habit.id}`, habit_id: habit.id, user_id: session.user.id, period_start: currentPeriod },
      ]);
      await supabase.from("habit_checkins").insert({
        habit_id: habit.id,
        user_id: session.user.id,
        period_start: currentPeriod,
      });
    }
  };

  return (
    <div className="bg-gris-oscuro border border-white/10 rounded-2xl p-6 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FiRepeat className="text-naranja-vibrante" />
          <h3 className="text-lg font-semibold">{t("portal.home.sections.habits")}</h3>
        </div>
        <Link to="/clients/habits" className="text-xs text-naranja-vibrante hover:underline">
          {t("portal.home.viewAll")}
        </Link>
      </div>

      {!loading && habits.length === 0 && (
        <p className="text-sm text-gray-400">{t("portal.home.habitsEmpty")}</p>
      )}

      {!loading && habits.length > 0 && (
        <ul className="space-y-2">
          {habits.map((habit) => {
            const periods = periodsFor(habit.id);
            const streak = computeStreak(habit.frequency, periods);
            const checked = isCurrentPeriodChecked(habit.frequency, periods);
            return (
              <li key={habit.id} className="flex items-center gap-3">
                <button
                  onClick={() => toggleCheck(habit)}
                  className={`w-7 h-7 shrink-0 rounded-full flex items-center justify-center border text-xs transition ${
                    checked
                      ? "bg-naranja-vibrante border-naranja-vibrante text-black"
                      : "border-white/20 text-transparent hover:border-naranja-vibrante"
                  }`}
                >
                  <FiCheck />
                </button>
                <span className="text-sm truncate flex-1">{habit.title}</span>
                <span className="text-xs text-gray-500 shrink-0">
                  {t("portal.habits.streak", { count: streak })}
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default HabitsWidget;
