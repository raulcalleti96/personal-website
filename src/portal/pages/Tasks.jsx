import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FiTrash2 } from "react-icons/fi";
import { supabase } from "../../supabaseClient";
import { formatTaskDue } from "../lib/taskDue";

const CATEGORIES = ["personal", "deporte", "casa", "finanzas", "violin", "trabajo"];
const DUE_TYPES = ["none", "day", "month", "year"];

const emptyForm = {
  title: "",
  description: "",
  category: "personal",
  dueType: "none",
  dueDay: "",
  dueMonth: "",
  dueYear: String(new Date().getFullYear()),
};

const toDueDate = (dueType, form) => {
  if (dueType === "day") return form.dueDay || null;
  if (dueType === "month") return form.dueMonth ? `${form.dueMonth}-01` : null;
  if (dueType === "year") return form.dueYear ? `${form.dueYear}-01-01` : null;
  return null;
};

const Tasks = () => {
  const { t, i18n } = useTranslation();
  const { session } = useOutletContext();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const loadTasks = async () => {
    const { data } = await supabase
      .from("tasks")
      .select("*")
      .order("due_date", { ascending: true, nullsFirst: false });
    setTasks(data || []);
    setLoading(false);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    setSaving(true);

    const dueType = form.dueType === "none" ? null : form.dueType;
    const { error } = await supabase.from("tasks").insert({
      user_id: session.user.id,
      title: form.title.trim(),
      description: form.description.trim() || null,
      category: form.category,
      due_type: dueType,
      due_date: dueType ? toDueDate(dueType, form) : null,
    });

    setSaving(false);
    if (!error) {
      setForm(emptyForm);
      loadTasks();
    }
  };

  const toggleComplete = async (task) => {
    setTasks((prev) =>
      prev.map((t2) => (t2.id === task.id ? { ...t2, completed: !task.completed } : t2))
    );
    await supabase
      .from("tasks")
      .update({
        completed: !task.completed,
        completed_at: !task.completed ? new Date().toISOString() : null,
      })
      .eq("id", task.id);
  };

  const deleteTask = async (task) => {
    setTasks((prev) => prev.filter((t2) => t2.id !== task.id));
    await supabase.from("tasks").delete().eq("id", task.id);
  };

  const pending = tasks.filter((t2) => !t2.completed);
  const completed = tasks.filter((t2) => t2.completed);

  return (
    <div>
      <h1 className="text-2xl md:text-3xl font-bold mb-6">{t("portal.nav.tasks")}</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-gris-oscuro border border-white/10 rounded-2xl p-6 mb-8 space-y-4"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-1">{t("portal.tasks.form.titleLabel")}</label>
            <input
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full px-4 py-2 rounded-lg bg-[#0f0f10] border border-white/10 outline-none focus:border-naranja-vibrante"
              required
            />
          </div>
          <div>
            <label className="block text-sm mb-1">{t("portal.tasks.form.categoryLabel")}</label>
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-full px-4 py-2 rounded-lg bg-[#0f0f10] border border-white/10 outline-none focus:border-naranja-vibrante"
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {t(`portal.tasks.categories.${c}`)}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm mb-1">{t("portal.tasks.form.descriptionLabel")}</label>
          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            rows={2}
            className="w-full px-4 py-2 rounded-lg bg-[#0f0f10] border border-white/10 outline-none focus:border-naranja-vibrante"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-1">{t("portal.tasks.form.dueTypeLabel")}</label>
            <select
              value={form.dueType}
              onChange={(e) => setForm({ ...form, dueType: e.target.value })}
              className="w-full px-4 py-2 rounded-lg bg-[#0f0f10] border border-white/10 outline-none focus:border-naranja-vibrante"
            >
              {DUE_TYPES.map((d) => (
                <option key={d} value={d}>
                  {t(`portal.tasks.dueTypes.${d}`)}
                </option>
              ))}
            </select>
          </div>

          {form.dueType === "day" && (
            <div>
              <label className="block text-sm mb-1">{t("portal.tasks.dueTypes.day")}</label>
              <input
                type="date"
                value={form.dueDay}
                onChange={(e) => setForm({ ...form, dueDay: e.target.value })}
                className="w-full px-4 py-2 rounded-lg bg-[#0f0f10] border border-white/10 outline-none focus:border-naranja-vibrante"
                required
              />
            </div>
          )}
          {form.dueType === "month" && (
            <div>
              <label className="block text-sm mb-1">{t("portal.tasks.dueTypes.month")}</label>
              <input
                type="month"
                value={form.dueMonth}
                onChange={(e) => setForm({ ...form, dueMonth: e.target.value })}
                className="w-full px-4 py-2 rounded-lg bg-[#0f0f10] border border-white/10 outline-none focus:border-naranja-vibrante"
                required
              />
            </div>
          )}
          {form.dueType === "year" && (
            <div>
              <label className="block text-sm mb-1">{t("portal.tasks.dueTypes.year")}</label>
              <input
                type="number"
                value={form.dueYear}
                onChange={(e) => setForm({ ...form, dueYear: e.target.value })}
                className="w-full px-4 py-2 rounded-lg bg-[#0f0f10] border border-white/10 outline-none focus:border-naranja-vibrante"
                required
              />
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={saving}
          className="px-5 py-2 rounded-lg bg-naranja-vibrante text-black font-semibold hover:brightness-110 transition disabled:opacity-60"
        >
          {t("portal.tasks.form.add")}
        </button>
      </form>

      {!loading && (
        <>
          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-3">{t("portal.tasks.pending")}</h2>
            {pending.length === 0 ? (
              <p className="text-sm text-gray-400">{t("portal.tasks.empty")}</p>
            ) : (
              <ul className="space-y-2">
                {pending.map((task) => (
                  <li
                    key={task.id}
                    className="flex items-center gap-3 bg-gris-oscuro border border-white/10 rounded-xl px-4 py-3"
                  >
                    <input
                      type="checkbox"
                      checked={false}
                      onChange={() => toggleComplete(task)}
                      className="w-5 h-5 accent-naranja-vibrante shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="font-medium truncate">{task.title}</p>
                      <p className="text-xs text-gray-400">
                        {t(`portal.tasks.categories.${task.category}`)}
                        {formatTaskDue(task, i18n.language) && (
                          <> · {formatTaskDue(task, i18n.language)}</>
                        )}
                      </p>
                    </div>
                    <button
                      onClick={() => deleteTask(task)}
                      aria-label={t("portal.tasks.delete")}
                      className="text-gray-500 hover:text-red-400 transition shrink-0"
                    >
                      <FiTrash2 />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </section>

          {completed.length > 0 && (
            <section>
              <h2 className="text-lg font-semibold mb-3 text-gray-400">
                {t("portal.tasks.completed")}
              </h2>
              <ul className="space-y-2">
                {completed.map((task) => (
                  <li
                    key={task.id}
                    className="flex items-center gap-3 bg-gris-oscuro/60 border border-white/5 rounded-xl px-4 py-3"
                  >
                    <input
                      type="checkbox"
                      checked
                      onChange={() => toggleComplete(task)}
                      className="w-5 h-5 accent-naranja-vibrante shrink-0"
                    />
                    <p className="flex-1 line-through text-gray-500 truncate">{task.title}</p>
                    <button
                      onClick={() => deleteTask(task)}
                      aria-label={t("portal.tasks.delete")}
                      className="text-gray-600 hover:text-red-400 transition shrink-0"
                    >
                      <FiTrash2 />
                    </button>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </>
      )}
    </div>
  );
};

export default Tasks;
