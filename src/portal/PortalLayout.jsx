import { NavLink, Outlet, useNavigate, useOutletContext } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  FiHome,
  FiLogOut,
  FiGlobe,
  FiBook,
  FiCheckSquare,
  FiRepeat,
  FiDollarSign,
  FiCalendar,
} from "react-icons/fi";
import { FaBrain } from "react-icons/fa";
import { supabase } from "../supabaseClient";
import DailyCheckin from "./components/DailyCheckin";

const navItems = [
  { to: "/clients/home", labelKey: "portal.nav.home", icon: FiHome },
  { to: "/clients/tasks", labelKey: "portal.nav.tasks", icon: FiCheckSquare },
  { to: "/clients/habits", labelKey: "portal.nav.habits", icon: FiRepeat },
  { to: "/clients/finances", labelKey: "portal.nav.finances", icon: FiDollarSign },
  { to: "/clients/calendar", labelKey: "portal.nav.calendar", icon: FiCalendar },
  { to: "/clients/brain", labelKey: "portal.nav.brain", icon: FaBrain },
  { to: "/clients/diario", labelKey: "portal.nav.diario", icon: FiBook },
];

const PortalLayout = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { session } = useOutletContext();
  const user = session?.user;
  const name = user?.user_metadata?.full_name || user?.email;
  const avatarUrl = user?.user_metadata?.avatar_url;

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === "en" ? "es" : "en");
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/clients", { replace: true });
  };

  return (
    <div className="min-h-screen w-full flex bg-negro-mate text-blanco-suave">
      <aside className="w-64 shrink-0 bg-gris-oscuro border-r border-white/10 flex flex-col p-6">
        <div className="flex items-center gap-3 mb-8">
          {avatarUrl ? (
            <img src={avatarUrl} alt={name} className="w-10 h-10 rounded-full" />
          ) : (
            <div className="w-10 h-10 rounded-full bg-neutral-700 flex items-center justify-center text-sm font-semibold">
              {name?.charAt(0)?.toUpperCase()}
            </div>
          )}
          <div className="min-w-0">
            <p className="text-sm font-semibold truncate">{name}</p>
            <p className="text-xs text-gray-400 truncate">{user?.email}</p>
          </div>
        </div>

        <nav className="flex-1 space-y-2">
          {navItems.map(({ to, labelKey, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition ${
                  isActive
                    ? "bg-naranja-vibrante text-black"
                    : "text-blanco-suave hover:bg-neutral-700/60"
                }`
              }
            >
              <Icon />
              {t(labelKey)}
            </NavLink>
          ))}
        </nav>

        <div className="space-y-2 pt-4 border-t border-white/10">
          <button
            onClick={toggleLanguage}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-blanco-suave hover:bg-neutral-700/60 transition"
          >
            <FiGlobe />
            {i18n.language === "en" ? "EN" : "ES"}
          </button>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-400 hover:bg-neutral-700/60 transition"
          >
            <FiLogOut />
            {t("portal.nav.logout")}
          </button>
        </div>
      </aside>

      <main className="flex-1 p-8 overflow-y-auto">
        <Outlet context={{ session }} />
      </main>

      <DailyCheckin session={session} />
    </div>
  );
};

export default PortalLayout;
