import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

const AccountTabs = ({ accountId }) => {
  const { t } = useTranslation();

  const tabs = [
    { to: `/clients/finances/${accountId}`, end: true, labelKey: "portal.finances.tabs.transactions" },
    { to: `/clients/finances/${accountId}/recurring`, end: false, labelKey: "portal.finances.tabs.recurring" },
    { to: `/clients/finances/${accountId}/budget`, end: false, labelKey: "portal.finances.tabs.budget" },
  ];

  return (
    <div className="flex gap-2 mb-6">
      {tabs.map(({ to, end, labelKey }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          className={({ isActive }) =>
            `px-4 py-2 rounded-lg text-sm font-semibold transition ${
              isActive
                ? "bg-naranja-vibrante text-black"
                : "bg-gris-oscuro text-gray-300 border border-white/10 hover:border-naranja-vibrante"
            }`
          }
        >
          {t(labelKey)}
        </NavLink>
      ))}
    </div>
  );
};

export default AccountTabs;
