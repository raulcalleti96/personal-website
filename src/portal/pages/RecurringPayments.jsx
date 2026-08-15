import { useEffect, useState } from "react";
import { Link, useOutletContext, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FiArrowLeft, FiTrash2, FiCheck } from "react-icons/fi";
import { supabase } from "../../supabaseClient";
import { formatMoney } from "../lib/money";
import { toDateStr } from "../lib/period";
import AccountTabs from "../components/AccountTabs";

const emptyForm = {
  type: "expense",
  amount: "",
  categoryId: "",
  description: "",
  dayOfMonth: "1",
};

const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();

const RecurringPayments = () => {
  const { t, i18n } = useTranslation();
  const { accountId } = useParams();
  const { session } = useOutletContext();

  const [account, setAccount] = useState(null);
  const [categories, setCategories] = useState([]);
  const [payments, setPayments] = useState([]);
  const [monthTransactions, setMonthTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const now = new Date();

  const load = async () => {
    const [{ data: accountData }, { data: categoriesData }, { data: paymentsData }, { data: txData }] =
      await Promise.all([
        supabase.from("accounts").select("*").eq("id", accountId).single(),
        supabase.from("categories").select("*").order("name"),
        supabase
          .from("recurring_payments")
          .select("*")
          .eq("account_id", accountId)
          .eq("active", true)
          .order("day_of_month"),
        supabase
          .from("transactions")
          .select("*")
          .eq("account_id", accountId)
          .not("recurring_payment_id", "is", null),
      ]);

    setAccount(accountData || null);
    setCategories(categoriesData || []);
    setPayments(paymentsData || []);
    setMonthTransactions(txData || []);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, [accountId]);

  const loggedThisMonth = (paymentId) =>
    monthTransactions.some((tx) => {
      if (tx.recurring_payment_id !== paymentId) return false;
      const d = new Date(tx.occurred_on);
      return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth();
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.amount || Number(form.amount) <= 0 || !form.description.trim()) return;
    setSaving(true);

    const { error } = await supabase.from("recurring_payments").insert({
      account_id: accountId,
      created_by: session.user.id,
      type: form.type,
      amount: Number(form.amount),
      description: form.description.trim(),
      category_id: form.categoryId || null,
      day_of_month: Number(form.dayOfMonth),
    });

    setSaving(false);
    if (!error) {
      setForm(emptyForm);
      load();
    }
  };

  const logThisMonth = async (payment) => {
    const day = Math.min(payment.day_of_month, daysInMonth(now.getFullYear(), now.getMonth()));
    const occurredOn = toDateStr(new Date(now.getFullYear(), now.getMonth(), day));

    const { data, error } = await supabase
      .from("transactions")
      .insert({
        account_id: accountId,
        created_by: session.user.id,
        category_id: payment.category_id,
        type: payment.type,
        amount: payment.amount,
        description: payment.description,
        occurred_on: occurredOn,
        recurring_payment_id: payment.id,
      })
      .select()
      .single();

    if (!error && data) {
      setMonthTransactions((prev) => [...prev, data]);
    }
  };

  const deletePayment = async (payment) => {
    setPayments((prev) => prev.filter((p) => p.id !== payment.id));
    await supabase.from("recurring_payments").delete().eq("id", payment.id);
  };

  const categoryName = (id) => categories.find((c) => c.id === id)?.name;
  const filteredCategories = categories.filter((c) => c.type === form.type);

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
        {account?.name} — {t("portal.finances.tabs.recurring")}
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-gris-oscuro border border-white/10 rounded-2xl p-6 mb-8 space-y-4"
      >
        <div className="flex gap-2">
          {["expense", "income"].map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setForm({ ...form, type, categoryId: "" })}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
                form.type === type
                  ? "bg-naranja-vibrante text-black"
                  : "bg-[#0f0f10] text-gray-300 border border-white/10"
              }`}
            >
              {t(`portal.finances.types.${type}`)}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm mb-1">{t("portal.finances.form.descriptionLabel")}</label>
            <input
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full px-4 py-2 rounded-lg bg-[#0f0f10] border border-white/10 outline-none focus:border-naranja-vibrante"
              required
            />
          </div>
          <div>
            <label className="block text-sm mb-1">{t("portal.finances.form.amountLabel")}</label>
            <input
              type="number"
              step="0.01"
              min="0.01"
              value={form.amount}
              onChange={(e) => setForm({ ...form, amount: e.target.value })}
              className="w-full px-4 py-2 rounded-lg bg-[#0f0f10] border border-white/10 outline-none focus:border-naranja-vibrante"
              required
            />
          </div>
          <div>
            <label className="block text-sm mb-1">{t("portal.finances.form.categoryLabel")}</label>
            <select
              value={form.categoryId}
              onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
              className="w-full px-4 py-2 rounded-lg bg-[#0f0f10] border border-white/10 outline-none focus:border-naranja-vibrante"
            >
              <option value="">{t("portal.finances.form.noCategory")}</option>
              {filteredCategories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm mb-1">{t("portal.finances.recurring.dayOfMonth")}</label>
            <input
              type="number"
              min="1"
              max="31"
              value={form.dayOfMonth}
              onChange={(e) => setForm({ ...form, dayOfMonth: e.target.value })}
              className="w-full px-4 py-2 rounded-lg bg-[#0f0f10] border border-white/10 outline-none focus:border-naranja-vibrante"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="px-5 py-2 rounded-lg bg-naranja-vibrante text-black font-semibold hover:brightness-110 transition disabled:opacity-60"
        >
          {t("portal.finances.recurring.add")}
        </button>
      </form>

      {payments.length === 0 ? (
        <p className="text-sm text-gray-400">{t("portal.finances.recurring.empty")}</p>
      ) : (
        <ul className="space-y-2">
          {payments.map((payment) => {
            const logged = loggedThisMonth(payment.id);
            return (
              <li
                key={payment.id}
                className="flex items-center gap-3 bg-gris-oscuro border border-white/10 rounded-xl px-4 py-3"
              >
                <div className="min-w-0 flex-1">
                  <p className="font-medium truncate">{payment.description}</p>
                  <p className="text-xs text-gray-400">
                    {t("portal.finances.recurring.everyMonthOn", { day: payment.day_of_month })}
                    {categoryName(payment.category_id) && ` · ${categoryName(payment.category_id)}`}
                  </p>
                </div>
                <span
                  className={`font-semibold shrink-0 ${
                    payment.type === "income" ? "text-naranja-vibrante" : "text-red-400"
                  }`}
                >
                  {payment.type === "income" ? "+" : "-"}
                  {formatMoney(payment.amount, i18n.language)}
                </span>
                {logged ? (
                  <span className="flex items-center gap-1 text-xs text-naranja-vibrante shrink-0 px-3 py-2">
                    <FiCheck /> {t("portal.finances.recurring.logged")}
                  </span>
                ) : (
                  <button
                    onClick={() => logThisMonth(payment)}
                    className="text-xs font-semibold bg-neutral-700/80 text-white rounded-lg px-3 py-2 hover:bg-neutral-600/80 transition shrink-0"
                  >
                    {t("portal.finances.recurring.logThisMonth")}
                  </button>
                )}
                <button
                  onClick={() => deletePayment(payment)}
                  aria-label={t("portal.tasks.delete")}
                  className="text-gray-500 hover:text-red-400 transition shrink-0"
                >
                  <FiTrash2 />
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default RecurringPayments;
