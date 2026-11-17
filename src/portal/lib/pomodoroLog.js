import { supabase } from "../../supabaseClient";
import { toDateStr, getPeriodStart } from "./period";

export async function logPomodoroSession({ userId, startedAt, completedAt, durationMinutes }) {
  const { error } = await supabase.from("pomodoro_sessions").insert({
    user_id: userId,
    started_at: startedAt,
    completed_at: completedAt,
    duration_minutes: durationMinutes,
  });
  if (error) console.error("No se pudo guardar la sesión de pomodoro:", error);
  return !error;
}

export async function fetchPomodoroSessions(userId) {
  const { data, error } = await supabase
    .from("pomodoro_sessions")
    .select("id, started_at, completed_at, duration_minutes")
    .eq("user_id", userId)
    .order("completed_at", { ascending: false });
  if (error) {
    console.error("No se pudieron cargar las sesiones de pomodoro:", error);
    return [];
  }
  return data || [];
}

export function summarizePomodoroSessions(sessions) {
  const todayStart = getPeriodStart("daily");
  const weekStart = getPeriodStart("weekly");

  const summarize = (list) => ({
    count: list.length,
    minutes: list.reduce((sum, s) => sum + (s.duration_minutes || 0), 0),
  });

  const today = sessions.filter((s) => toDateStr(new Date(s.completed_at)) === todayStart);
  const week = sessions.filter((s) => toDateStr(new Date(s.completed_at)) >= weekStart);

  return {
    today: summarize(today),
    week: summarize(week),
    total: summarize(sessions),
  };
}
