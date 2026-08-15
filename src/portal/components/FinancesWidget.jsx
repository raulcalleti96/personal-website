import { useEffect, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FiDollarSign } from "react-icons/fi";
import { supabase } from "../../supabaseClient";
import { formatMoney } from "../lib/money";
import { toDateStr } from "../lib/period";

const monthKey = (date) => `${date.getFullYear()}-${date.getMonth()}`;

const buildLastSixMonths = () => {
  const now = new Date();
  return Array.from({ length: 6 }, (_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() - (5 - i), 1);
    return d;
  });
};

const FinancesWidget = () => {
  const { t, i18n } = useTranslation();
  const { session } = useOutletContext();
  const [totalsByMonth, setTotalsByMonth] = useState({});
  const [loading, setLoading] = useState(true);

  const months = buildLastSixMonths();
  const rangeStart = toDateStr(months[0]);

  const load = async () => {
    const { data: memberships } = await supabase
      .from("account_members")
      .select("account_id")
      .eq("user_id", session.user.id);
    const accountIds = (memberships || []).map((m) => m.account_id);

    if (accountIds.length === 0) {
      setTotalsByMonth({});
      setLoading(false);
      return;
    }

    const { data: txData } = await supabase
      .from("transactions")
      .select("amount, occurred_on")
      .in("account_id", accountIds)
      .eq("type", "expense")
      .gte("occurred_on", rangeStart);

    const totals = {};
    (txData || []).forEach((tx) => {
      const d = new Date(tx.occurred_on);
      const key = monthKey(d);
      totals[key] = (totals[key] || 0) + Number(tx.amount);
    });
    setTotalsByMonth(totals);
    setLoading(false);
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const currentMonthTotal = totalsByMonth[monthKey(months[5])] || 0;
  const maxValue = Math.max(1, ...months.map((m) => totalsByMonth[monthKey(m)] || 0));

  return (
    <div className="bg-gris-oscuro border border-white/10 rounded-2xl p-6 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FiDollarSign className="text-naranja-vibrante" />
          <h3 className="text-lg font-semibold">{t("portal.home.sections.finances")}</h3>
        </div>
        <Link to="/clients/finances" className="text-xs text-naranja-vibrante hover:underline">
          {t("portal.home.viewAll")}
        </Link>
      </div>

      {!loading && (
        <>
          <p className="text-2xl font-bold text-naranja-vibrante">
            {formatMoney(currentMonthTotal, i18n.language)}
          </p>
          <p className="text-xs text-gray-400 -mt-2">{t("portal.home.financesWidget.thisMonth")}</p>

          <div className="flex items-end gap-2 h-16 mt-2">
            {months.map((m) => {
              const value = totalsByMonth[monthKey(m)] || 0;
              const height = Math.max(4, (value / maxValue) * 100);
              const isCurrent = monthKey(m) === monthKey(months[5]);
              return (
                <div key={monthKey(m)} className="flex-1 flex flex-col items-center gap-1">
                  <div
                    className={`w-full rounded-t ${isCurrent ? "bg-naranja-vibrante" : "bg-neutral-600"}`}
                    style={{ height: `${height}%` }}
                    title={formatMoney(value, i18n.language)}
                  />
                  <span className="text-[10px] text-gray-500 capitalize">
                    {m.toLocaleDateString(i18n.language === "es" ? "es-ES" : "en-US", { month: "short" })}
                  </span>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default FinancesWidget;
