import { useTranslation } from "react-i18next";
import { FaBrain } from "react-icons/fa";

const Brain = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h1 className="text-2xl md:text-3xl font-bold mb-6">{t("portal.nav.brain")}</h1>
      <div className="bg-gris-oscuro border border-white/10 rounded-2xl p-10 flex flex-col items-center text-center gap-3">
        <FaBrain size={32} className="text-naranja-vibrante" />
        <p className="text-gray-300 max-w-md">{t("portal.brain.comingSoon")}</p>
      </div>
    </div>
  );
};

export default Brain;
