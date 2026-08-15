import { parseLocalDate } from "./period";

export const isTaskDueNow = (task) => {
  if (task.completed || !task.due_type || !task.due_date) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return parseLocalDate(task.due_date) <= today;
};

export const isTaskOverdue = (task) => {
  if (task.completed || !task.due_type || !task.due_date) return false;
  const today = new Date();
  const due = parseLocalDate(task.due_date);
  if (task.due_type === "day") {
    today.setHours(0, 0, 0, 0);
    return due < today;
  }
  if (task.due_type === "month") {
    return due.getFullYear() < today.getFullYear() || due.getMonth() < today.getMonth();
  }
  if (task.due_type === "year") {
    return due.getFullYear() < today.getFullYear();
  }
  return false;
};

export const formatTaskDue = (task, locale) => {
  if (!task.due_type || !task.due_date) return null;
  const due = parseLocalDate(task.due_date);
  const overdue = isTaskOverdue(task);

  if (task.due_type === "day") {
    const label = due.toLocaleDateString(locale === "es" ? "es-ES" : "en-US", {
      day: "numeric",
      month: "short",
    });
    return overdue ? `${label} (${locale === "es" ? "vencida" : "overdue"})` : label;
  }

  if (task.due_type === "month") {
    const label = due.toLocaleDateString(locale === "es" ? "es-ES" : "en-US", {
      month: "long",
      year: "numeric",
    });
    return overdue ? `${label} (${locale === "es" ? "vencida" : "overdue"})` : label;
  }

  const label = String(due.getFullYear());
  return overdue ? `${label} (${locale === "es" ? "vencida" : "overdue"})` : label;
};
