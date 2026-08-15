export const toDateStr = (date) => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
};

export const parseLocalDate = (dateStr) => {
  const [y, m, d] = dateStr.split("-").map(Number);
  return new Date(y, m - 1, d);
};

export const getPeriodStart = (frequency, date = new Date()) => {
  const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  if (frequency === "daily") return toDateStr(d);
  if (frequency === "weekly") {
    const day = d.getDay();
    const diff = day === 0 ? -6 : 1 - day;
    d.setDate(d.getDate() + diff);
    return toDateStr(d);
  }
  if (frequency === "monthly") {
    return toDateStr(new Date(d.getFullYear(), d.getMonth(), 1));
  }
  if (frequency === "yearly") {
    return toDateStr(new Date(d.getFullYear(), 0, 1));
  }
  throw new Error(`Unknown habit frequency: ${frequency}`);
};

export const getPreviousPeriodStart = (frequency, periodStartStr) => {
  const d = parseLocalDate(periodStartStr);
  if (frequency === "daily") d.setDate(d.getDate() - 1);
  else if (frequency === "weekly") d.setDate(d.getDate() - 7);
  else if (frequency === "monthly") d.setMonth(d.getMonth() - 1);
  else if (frequency === "yearly") d.setFullYear(d.getFullYear() - 1);
  else throw new Error(`Unknown habit frequency: ${frequency}`);
  return toDateStr(d);
};

export const isCurrentPeriodChecked = (frequency, periodStarts) =>
  periodStarts.includes(getPeriodStart(frequency));

export const computeStreak = (frequency, periodStarts) => {
  const set = new Set(periodStarts);
  const current = getPeriodStart(frequency);
  let cursor = set.has(current) ? current : getPreviousPeriodStart(frequency, current);
  let streak = 0;
  while (set.has(cursor)) {
    streak++;
    cursor = getPreviousPeriodStart(frequency, cursor);
  }
  return streak;
};
