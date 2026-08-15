import { useEffect, useState } from "react";
import { Link, useNavigate, useOutletContext, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FiArrowLeft, FiTrash2 } from "react-icons/fi";
import { supabase } from "../../supabaseClient";
import { formatMoney } from "../lib/money";

const emptyForm = {
  type: "expense",
  amount: "",
  categoryId: "",
  description: "",
  occurredOn: new Date().toISOString().slice(0, 10),
};

const AccountDetail = () => {
  const { t, i18n } = useTranslation();
  const { accountId } = useParams();
  const { session } = useOutletContext();
  const navigate = useNavigate();

  const [account, setAccount] = useState(null);
  const [members, setMembers] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(emptyForm);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [saving, setSaving] = useState(false);

  const partner = profiles.find((p) => p.id !== session.user.id);
  const isCreator = account?.created_by === session.user.id;
  const isShared = members.some((m) => partner && m.user_id === partner.id);

  const load = async () => {
    const [
      { data: accountData },
      { data: membersData },
      { data: profilesData },
      { data: categoriesData },
      { data: txData },
    ] = await Promise.all([
      supabase.from("accounts").select("*").eq("id", accountId).single(),
      supabase.from("account_members").select("*").eq("account_id", accountId),
      supabase.from("profiles").select("*"),
      supabase.from("categories").select("*").order("name"),
      supabase
        .from("transactions")
        .select("*")
        .eq("account_id", accountId)
        .order("occurred_on", { ascending: false }),
    ]);

    setAccount(accountData || null);
    setMembers(membersData || []);
    setProfiles(profilesData || []);
    setCategories(categoriesData || []);
    setTransactions(txData || []);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, [accountId]);

  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) return;
    const { data, error } = await supabase
      .from("categories")
      .insert({ name: newCategoryName.trim(), type: form.type, created_by: session.user.id })
      .select()
      .single();
    if (!error && data) {
      setCategories((prev) => [...prev, data].sort((a, b) => a.name.localeCompare(b.name)));
      setForm((f) => ({ ...f, categoryId: data.id }));
      setNewCategoryName("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.amount || Number(form.amount) <= 0) return;
    setSaving(true);

    const { error } = await supabase.from("transactions").insert({
      account_id: accountId,
      created_by: session.user.id,
      type: form.type,
      amount: Number(form.amount),
      category_id: form.categoryId || null,
      description: form.description.trim() || null,
      occurred_on: form.occurredOn,
    });

    setSaving(false);
    if (!error) {
      setForm({ ...emptyForm, occurredOn: form.occurredOn });
      load();
    }
  };

  const deleteTransaction = async (tx) => {
    setTransactions((prev) => prev.filter((t2) => t2.id !== tx.id));
    await supabase.from("transactions").delete().eq("id", tx.id);
  };

  const toggleShare = async () => {
    if (!partner) return;
    if (isShared) {
      setMembers((prev) => prev.filter((m) => m.user_id !== partner.id));
      await supabase
        .from("account_members")
        .delete()
        .eq("account_id", accountId)
        .eq("user_id", partner.id);
    } else {
      setMembers((prev) => [...prev, { account_id: accountId, user_id: partner.id }]);
      await supabase.from("account_members").insert({ account_id: accountId, user_id: partner.id });
    }
  };

  if (loading) return null;
  if (!account) return <p className="text-sm text-gray-400">{t("portal.finances.notFound")}</p>;

  const balance = transactions.reduce(
    (sum, tx) => sum + (tx.type === "income" ? Number(tx.amount) : -Number(tx.amount)),
    0
  );
  const categoryName = (id) => categories.find((c) => c.id === id)?.name;
  const filteredCategories = categories.filter((c) => c.type === form.type);

  return (
    <div>
      <Link
        to="/clients/finances"
        className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition mb-4"
      >
        <FiArrowLeft /> {t("portal.finances.back")}
      </Link>

      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">{account.name}</h1>
          <p className={`text-xl font-semibold mt-1 ${balance < 0 ? "text-red-400" : "text-naranja-vibrante"}`}>
            {formatMoney(balance, i18n.language)}
          </p>
        </div>
        {isCreator && partner && (
          <button
            onClick={toggleShare}
            className="px-4 py-2 rounded-lg bg-neutral-700/80 text-white text-sm font-semibold hover:bg-neutral-600/80 transition"
          >
            {isShared
              ? t("portal.finances.form.unshare")
              : t("portal.finances.form.shareWith", { name: partner.full_name || partner.email })}
          </button>
        )}
      </div>

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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
            <label className="block text-sm mb-1">{t("portal.finances.form.dateLabel")}</label>
            <input
              type="date"
              value={form.occurredOn}
              onChange={(e) => setForm({ ...form, occurredOn: e.target.value })}
              className="w-full px-4 py-2 rounded-lg bg-[#0f0f10] border border-white/10 outline-none focus:border-naranja-vibrante"
              required
            />
          </div>
        </div>

        <div className="flex gap-2">
          <input
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            placeholder={t("portal.finances.form.newCategoryPlaceholder")}
            className="flex-1 px-4 py-2 rounded-lg bg-[#0f0f10] border border-white/10 outline-none focus:border-naranja-vibrante text-sm"
          />
          <button
            type="button"
            onClick={handleAddCategory}
            className="px-4 py-2 rounded-lg bg-neutral-700/80 text-white text-sm font-semibold hover:bg-neutral-600/80 transition"
          >
            {t("portal.finances.form.addCategory")}
          </button>
        </div>

        <div>
          <label className="block text-sm mb-1">{t("portal.finances.form.descriptionLabel")}</label>
          <input
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full px-4 py-2 rounded-lg bg-[#0f0f10] border border-white/10 outline-none focus:border-naranja-vibrante"
          />
        </div>

        <button
          type="submit"
          disabled={saving}
          className="px-5 py-2 rounded-lg bg-naranja-vibrante text-black font-semibold hover:brightness-110 transition disabled:opacity-60"
        >
          {t("portal.finances.form.addTransaction")}
        </button>
      </form>

      {transactions.length === 0 ? (
        <p className="text-sm text-gray-400">{t("portal.finances.noTransactions")}</p>
      ) : (
        <ul className="space-y-2">
          {transactions.map((tx) => (
            <li
              key={tx.id}
              className="flex items-center gap-3 bg-gris-oscuro border border-white/10 rounded-xl px-4 py-3"
            >
              <div className="min-w-0 flex-1">
                <p className="font-medium truncate">
                  {tx.description || categoryName(tx.category_id) || t(`portal.finances.types.${tx.type}`)}
                </p>
                <p className="text-xs text-gray-400">
                  {categoryName(tx.category_id) && `${categoryName(tx.category_id)} · `}
                  {new Date(tx.occurred_on).toLocaleDateString(i18n.language === "es" ? "es-ES" : "en-US")}
                </p>
              </div>
              <span
                className={`font-semibold shrink-0 ${
                  tx.type === "income" ? "text-naranja-vibrante" : "text-red-400"
                }`}
              >
                {tx.type === "income" ? "+" : "-"}
                {formatMoney(tx.amount, i18n.language)}
              </span>
              <button
                onClick={() => deleteTransaction(tx)}
                aria-label={t("portal.tasks.delete")}
                className="text-gray-500 hover:text-red-400 transition shrink-0"
              >
                <FiTrash2 />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AccountDetail;
