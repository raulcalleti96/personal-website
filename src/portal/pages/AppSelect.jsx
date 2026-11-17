import { useNavigate, useOutletContext } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FiGrid, FiClock, FiRadio, FiLogOut } from "react-icons/fi";
import { supabase } from "../../supabaseClient";
import { isRadioOnly } from "../lib/access";
import empireVideo from "../../assets/Empire.mp4";

const AppSelect = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { session } = useOutletContext();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/clients", { replace: true });
  };

  const allApps = [
    {
      key: "management",
      to: "/clients/home",
      icon: FiGrid,
      title: t("portal.select.management.title"),
      description: t("portal.select.management.description"),
    },
    {
      key: "focus",
      to: "/clients/focus",
      icon: FiClock,
      title: t("portal.select.focus.title"),
      description: t("portal.select.focus.description"),
    },
    {
      key: "radio",
      to: "/radio",
      icon: FiRadio,
      title: t("portal.select.radio.title"),
      description: t("portal.select.radio.description"),
    },
  ];
  const apps = isRadioOnly(session) ? allApps.filter((app) => app.key === "radio") : allApps;

  return (
    <section className="relative min-h-screen w-full overflow-hidden flex items-center justify-center">
      <video
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        src={empireVideo}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-carbon/70 via-carbon/50 to-carbon/80" />

      <button
        onClick={handleLogout}
        className="absolute top-8 right-6 sm:right-10 flex items-center gap-2 text-papel/70 hover:text-papel text-sm font-semibold transition-colors z-20"
      >
        <FiLogOut /> {t("portal.nav.logout")}
      </button>

      <div className="relative z-10 max-w-5xl mx-auto text-center px-6">
        <p className="text-xs uppercase tracking-[0.3em] text-tostado font-semibold mb-3">
          {t("portal.select.greeting", { name: session?.user?.user_metadata?.full_name?.split(" ")[0] || "" })}
        </p>
        <h1 className="font-display font-black text-papel text-4xl sm:text-5xl mb-10">
          {t("portal.select.title")}
        </h1>

        <div className={`grid gap-6 ${apps.length > 1 ? "sm:grid-cols-3" : "max-w-sm mx-auto"}`}>
          {apps.map((app) => (
            <button
              key={app.key}
              onClick={() => navigate(app.to)}
              className="group text-left bg-carbon/40 hover:bg-carbon/60 border border-papel/15 hover:border-tostado/60 rounded-3xl p-7 transition-all"
            >
              <app.icon className="text-tostado text-3xl mb-4" />
              <h2 className="font-display font-bold text-papel text-2xl mb-2">{app.title}</h2>
              <p className="text-papel/60 text-sm leading-relaxed">{app.description}</p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AppSelect;
