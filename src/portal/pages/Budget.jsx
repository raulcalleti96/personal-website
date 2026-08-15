import { useEffect, useState } from "react";
import { Link, useOutletContext, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FiArrowLeft, FiChevronLeft, FiChevronRight, FiTrash2 } from "react-icons/fi";
import { supabase } from "../../supabaseClient";
import { formatMoney } from "../lib/money";
import { getPeriodStart, toDateStr } from "../lib/period";
import AccountTabs from "../components/AccountTabs";

const emptyForm = { categoryId: "", description: "", plannedAmount: "" };

const monthLabel = (date, locale) =>
  date.toLocaleDateString(locale === "es" ? "es-ES" : "en-US", { month: "long", year: "numeric" });

const lastDayOfMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0);

const Budget = () => {
  const { t, i18n } = useTranslation();
  const { accountId } = useParams();
  const { session } = useOutletContext();

  const [account, setAccount] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(() => new Date());
  const [budgetLines, setBudgetLines] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const monthStart = getPeriodStart("monthly", selectedMonth);
  const monthEnd = toDateStr(lastDayOfMonth(selectedMonth));

  const load = async () => {
    const [{ data: accountData }, { data: categoriesData }, { data: linesData }, { data: txData }] =
      await Promise.all([
        supabase.from("accounts").select("*").eq("id", accountId).single(),
        supabase.from("categories").select("*").order("name"),
        supabase.from("budget_lines").select("*").eq("account_id", accountId).eq("month", monthStart),
        supabase
          .from("transactions")
          .select("*")
          .eq("account_id", accountId)
          .eq("type", "expense")
          .gte("occurred_on", monthStart)
          .lte("occurred_on", monthEnd),
      ]);

    setAccount(accountData || null);
    setCategories(categoriesData || []);
    setBudgetLines(linesData || []);
    setTransactions(txData || []);
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accountId, monthStart]);

  const changeMonth = (delta) => {
    setSelectedMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() + delta, 1));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.plannedAmount || Number(form.plannedAmount) <= 0) return;
    setSaving(true);

    const { error } = await supabase.from("budget_lines").insert({
      account_id: accountId,
      created_by: session.user.id,
      month: monthStart,
      category_id: form.categoryId || null,
      description: form.description.trim() || null,
      planned_amount: Number(form.plannedAmount),
    });

    setSaving(false);
    if (!error) {
      setForm(emptyForm);
      load();
    }
  };

  const deleteLine = async (line) => {
    setBudgetLines((prev) => prev.filter((l) => l.id !== line.id));
    await supabase.from("budget_lines").delete().eq("id", line.id);
  };

  const categoryName = (id) => categories.find((c) => c.id === id)?.name || t("portal.finances.form.noCategory");
  const expenseCategories = categories.filter((c) => c.type === "expense");

  const categoryIds = Array.from(
    new Set([...budgetLines.map((l) => l.category_id), ...transactions.map((tx) => tx.category_id)])
  );

  const rows = categoryIds
    .map((categoryId) => {
      const planned = budgetLines
        .filter((l) => l.category_id === categoryId)
        .reduce((sum, l) => sum + Number(l.planned_amount), 0);
      const actual = transactions
        .filter((tx) => tx.category_id === categoryId)
        .reduce((sum, tx) => sum + Number(tx.amount), 0);
      return { categoryId, planned, actual, diff: planned - actual };
    })
    .sort((a, b) => categoryName(a.categoryId).localeCompare(categoryName(b.categoryId)));

  const totals = rows.reduce(
    (acc, r) => ({ planned: acc.planned + r.planned, actual: acc.actual + r.actual }),
    { planned: 0, actual: 0 }
  );

  if (loading) return null;

  return (
    <div>
      <Link
        to="/clients/finances"
        className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition mb-4"
      >
        <FiArrowLeft /> {t("portal.finances.back")}
      </Link>

      <AccountTabs accountId={accountId} />

      <h1 className="text-2xl md:text-3xl font-bold mb-6">
        {account?.name} — {t("portal.finances.tabs.budget")}
      </h1>

      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => changeMonth(-1)}
          className="p-2 rounded-lg bg-gris-oscuro border border-white/10 hover:border-naranja-vibrante transition"
          aria-label="Previous month"
        >
          <FiChevronLeft />
        </button>
        <p className="text-lg font-semibold capitalize w-48 text-center">
          {monthLabel(selectedMonth, i18n.language)}
        </p>
        <button
          onClick={() => changeMonth(1)}
          className="p-2 rounded-lg bg-gris-oscuro border border-white/10 hover:border-naranja-vibrante transition"
          aria-label="Next month"
        >
          <FiChevronRight />
        </button>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-gris-oscuro border border-white/10 rounded-2xl p-6 mb-8 grid grid-cols-1 md:grid-cols-4 gap-4 items-end"
      >
        <div>
          <label className="block text-sm mb-1">{t("portal.finances.form.categoryLabel")}</label>
          <select
            value={form.categoryId}
            onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
            className="w-full px-4 py-2 rounded-lg bg-[#0f0f10] border border-white/10 outline-none focus:border-naranja-vibrante"
          >
            <option value="">{t("portal.finances.form.noCategory")}</option>
            {expenseCategories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm mb-1">{t("portal.finances.form.descriptionLabel")}</label>
          <input
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full px-4 py-2 rounded-lg bg-[#0f0f10] border border-white/10 outline-none focus:border-naranja-vibrante"
          />
        </div>
        <div>
          <label className="block text-sm mb-1">{t("portal.finances.budget.plannedAmount")}</label>
          <input
            type="number"
            step="0.01"
            min="0.01"
            value={form.plannedAmount}
            onChange={(e) => setForm({ ...form, plannedAmount: e.target.value })}
            className="w-full px-4 py-2 rounded-lg bg-[#0f0f10] border border-white/10 outline-none focus:border-naranja-vibrante"
            required
          />
        </div>
        <button
          type="submit"
          disabled={saving}
          className="px-5 py-2 rounded-lg bg-naranja-vibrante text-black font-semibold hover:brightness-110 transition disabled:opacity-60"
        >
          {t("portal.finances.budget.addLine")}
        </button>
      </form>

      {rows.length === 0 ? (
        <p className="text-sm text-gray-400">{t("portal.finances.budget.empty")}</p>
      ) : (
        <div className="bg-gris-oscuro border border-white/10 rounded-2xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-400 border-b border-white/10">
                <th className="px-4 py-3">{t("portal.finances.form.categoryLabel")}</th>
                <th className="px-4 py-3 text-right">{t("portal.finances.budget.plannedAmount")}</th>
                <th className="px-4 py-3 text-right">{t("portal.finances.budget.actual")}</th>
                <th className="px-4 py-3 text-right">{t("portal.finances.budget.diff")}</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.categoryId ?? "none"} className="border-b border-white/5 last:border-0">
                  <td className="px-4 py-3">{categoryName(row.categoryId)}</td>
                  <td className="px-4 py-3 text-right">{formatMoney(row.planned, i18n.language)}</td>
                  <td className="px-4 py-3 text-right">{formatMoney(row.actual, i18n.language)}</td>
                  <td
                    className={`px-4 py-3 text-right font-semibold ${
                      row.diff < 0 ? "text-red-400" : "text-naranja-vibrante"
                    }`}
                  >
                    {formatMoney(row.diff, i18n.language)}
                  </td>
                  <td className="px-4 py-3 text-right">
                    {budgetLines
                      .filter((l) => l.category_id === row.categoryId)
                      .map((l) => (
                        <button
                          key={l.id}
                          onClick={() => deleteLine(l)}
                          aria-label={t("portal.tasks.delete")}
                          className="text-gray-500 hover:text-red-400 transition ml-2"
                        >
                          <FiTrash2 size={14} />
                        </button>
                      ))}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t border-white/10 font-semibold">
                <td className="px-4 py-3">{t("portal.finances.budget.total")}</td>
                <td className="px-4 py-3 text-right">{formatMoney(totals.planned, i18n.language)}</td>
                <td className="px-4 py-3 text-right">{formatMoney(totals.actual, i18n.language)}</td>
                <td
                  className={`px-4 py-3 text-right ${
                    totals.planned - totals.actual < 0 ? "text-red-400" : "text-naranja-vibrante"
                  }`}
                >
                  {formatMoney(totals.planned - totals.actual, i18n.language)}
                </td>
                <td></td>
              </tr>
            </tfoot>
          </table>
        </div>
      )}
    </div>
  );
};

export default Budget;
