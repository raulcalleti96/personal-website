import { useEffect, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FiCheckSquare } from "react-icons/fi";
import { supabase } from "../../supabaseClient";
import { isTaskDueNow, formatTaskDue } from "../lib/taskDue";

const TasksWidget = () => {
  const { t, i18n } = useTranslation();
  const { session } = useOutletContext();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    const { data } = await supabase.from("tasks").select("*").eq("completed", false);
    setTasks((data || []).filter(isTaskDueNow));
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const toggleComplete = async (task) => {
    setTasks((prev) => prev.filter((t2) => t2.id !== task.id));
    await supabase
      .from("tasks")
      .update({ completed: true, completed_at: new Date().toISOString() })
      .eq("id", task.id);
  };

  return (
    <div className="bg-gris-oscuro border border-white/10 rounded-2xl p-6 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FiCheckSquare className="text-naranja-vibrante" />
          <h3 className="text-lg font-semibold">{t("portal.home.sections.tasks")}</h3>
        </div>
        <Link to="/clients/tasks" className="text-xs text-naranja-vibrante hover:underline">
          {t("portal.home.viewAll")}
        </Link>
      </div>

      {!loading && tasks.length === 0 && (
        <p className="text-sm text-gray-400">{t("portal.home.tasksEmpty")}</p>
      )}

      {!loading && tasks.length > 0 && (
        <ul className="space-y-2">
          {tasks.slice(0, 5).map((task) => (
            <li key={task.id} className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={false}
                onChange={() => toggleComplete(task)}
                className="w-4 h-4 accent-naranja-vibrante shrink-0"
              />
              <span className="text-sm truncate flex-1">{task.title}</span>
              {formatTaskDue(task, i18n.language) && (
                <span className="text-xs text-gray-500 shrink-0">
                  {formatTaskDue(task, i18n.language)}
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TasksWidget;
