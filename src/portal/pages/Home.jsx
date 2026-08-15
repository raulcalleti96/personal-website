import { useOutletContext } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FiDollarSign, FiCalendar, FiTarget } from "react-icons/fi";
import TasksWidget from "../components/TasksWidget";
import HabitsWidget from "../components/HabitsWidget";

const placeholderSections = [
  { key: "finances", icon: FiDollarSign },
  { key: "calendar", icon: FiCalendar },
  { key: "goals", icon: FiTarget },
];

const PlaceholderCard = ({ icon: Icon, title, comingSoon }) => (
  <div className="bg-gris-oscuro border border-white/10 rounded-2xl p-6 flex flex-col gap-3">
    <Icon size={22} className="text-naranja-vibrante" />
    <h3 className="text-lg font-semibold">{title}</h3>
    <p className="text-sm text-gray-400">{comingSoon}</p>
  </div>
);

const getGreetingKey = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "home.greeting.morning";
  if (hour < 18) return "home.greeting.afternoon";
  return "home.greeting.evening";
};

const Home = () => {
  const { t, i18n } = useTranslation();
  const { session } = useOutletContext();
  const user = session?.user;
  const name = user?.user_metadata?.full_name?.split(" ")[0] || user?.email;

  const today = new Date().toLocaleDateString(i18n.language === "es" ? "es-ES" : "en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return (
    <div>
      <header className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold">
          {t(getGreetingKey())}, {name}
        </h1>
        <p className="text-gray-400 capitalize mt-1">{today}</p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <TasksWidget />
        <HabitsWidget />
        {placeholderSections.map(({ key, icon }) => (
          <PlaceholderCard
            key={key}
            icon={icon}
            title={t(`portal.home.sections.${key}`)}
            comingSoon={t("portal.home.comingSoon")}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
