import { useEffect, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { supabase } from "../../supabaseClient";
import { formatMoney } from "../lib/money";

const Finances = () => {
  const { t, i18n } = useTranslation();
  const { session } = useOutletContext();
  const [accounts, setAccounts] = useState([]);
  const [members, setMembers] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const [balances, setBalances] = useState({});
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [shareWithPartner, setShareWithPartner] = useState(false);
  const [saving, setSaving] = useState(false);

  const partner = profiles.find((p) => p.id !== session.user.id);

  const load = async () => {
    const [{ data: accountsData }, { data: membersData }, { data: profilesData }, { data: txns }] =
      await Promise.all([
        supabase.from("accounts").select("*").order("created_at", { ascending: true }),
        supabase.from("account_members").select("*"),
        supabase.from("profiles").select("*"),
        supabase.from("transactions").select("account_id, type, amount"),
      ]);

    setAccounts(accountsData || []);
    setMembers(membersData || []);
    setProfiles(profilesData || []);

    const totals = {};
    (txns || []).forEach((tx) => {
      const delta = tx.type === "income" ? Number(tx.amount) : -Number(tx.amount);
      totals[tx.account_id] = (totals[tx.account_id] || 0) + delta;
    });
    setBalances(totals);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    setSaving(true);

    const { data: account, error } = await supabase
      .from("accounts")
      .insert({ name: name.trim(), created_by: session.user.id })
      .select()
      .single();

    if (!error && account) {
      await supabase.from("account_members").insert({ account_id: account.id, user_id: session.user.id });
      if (shareWithPartner && partner) {
        await supabase
          .from("account_members")
          .insert({ account_id: account.id, user_id: partner.id });
      }
      setName("");
      setShareWithPartner(false);
      load();
    }
    setSaving(false);
  };

  const membersFor = (accountId) =>
    members
      .filter((m) => m.account_id === accountId)
      .map((m) => profiles.find((p) => p.id === m.user_id))
      .filter(Boolean);

  return (
    <div>
      <h1 className="text-2xl md:text-3xl font-bold mb-6">{t("portal.nav.finances")}</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-gris-oscuro border border-white/10 rounded-2xl p-6 mb-8 flex flex-col md:flex-row gap-4 md:items-end"
      >
        <div className="flex-1">
          <label className="block text-sm mb-1">{t("portal.finances.form.nameLabel")}</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-[#0f0f10] border border-white/10 outline-none focus:border-naranja-vibrante"
            required
          />
        </div>
        {partner && (
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={shareWithPartner}
              onChange={(e) => setShareWithPartner(e.target.checked)}
              className="w-4 h-4 accent-naranja-vibrante"
            />
            {t("portal.finances.form.shareWith", {
              name: partner.full_name || partner.email,
            })}
          </label>
        )}
        <button
          type="submit"
          disabled={saving}
          className="px-5 py-2 rounded-lg bg-naranja-vibrante text-black font-semibold hover:brightness-110 transition disabled:opacity-60"
        >
          {t("portal.finances.form.add")}
        </button>
      </form>

      {!loading && accounts.length === 0 && (
        <p className="text-sm text-gray-400">{t("portal.finances.empty")}</p>
      )}

      {!loading && accounts.length > 0 && (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {accounts.map((account) => {
            const balance = balances[account.id] || 0;
            const accountMembers = membersFor(account.id);
            return (
              <li key={account.id}>
                <Link
                  to={`/clients/finances/${account.id}`}
                  className="block bg-gris-oscuro border border-white/10 rounded-2xl p-6 hover:border-naranja-vibrante transition"
                >
                  <p className="font-semibold text-lg truncate">{account.name}</p>
                  <p
                    className={`text-2xl font-bold mt-2 ${
                      balance < 0 ? "text-red-400" : "text-naranja-vibrante"
                    }`}
                  >
                    {formatMoney(balance, i18n.language)}
                  </p>
                  <div className="flex -space-x-2 mt-4">
                    {accountMembers.map((m) =>
                      m.avatar_url ? (
                        <img
                          key={m.id}
                          src={m.avatar_url}
                          alt={m.full_name}
                          title={m.full_name}
                          className="w-7 h-7 rounded-full border-2 border-gris-oscuro"
                        />
                      ) : (
                        <div
                          key={m.id}
                          title={m.full_name}
                          className="w-7 h-7 rounded-full border-2 border-gris-oscuro bg-neutral-700 flex items-center justify-center text-xs"
                        >
                          {(m.full_name || m.email)?.charAt(0)?.toUpperCase()}
                        </div>
                      )
                    )}
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Finances;
