import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import HeroScene from "../components/editorial/HeroScene";
import NowWidget from "../components/editorial/NowWidget";
import henKaznelsonNyc from "../assets/hen-kaznelson-nyc.jpg";
import maevaVigierNyc from "../assets/maeva-vigier-nyc.jpg";

const MONTH_ABBR = {
  en: ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"],
  es: ["ENE", "FEB", "MAR", "ABR", "MAY", "JUN", "JUL", "AGO", "SEP", "OCT", "NOV", "DIC"],
};

const Home = () => {
  const { t, i18n } = useTranslation();
  const [currentMessage, setCurrentMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  const now = new Date();
  const monthAbbr = MONTH_ABBR[i18n.language === "es" ? "es" : "en"][now.getMonth()];
  const nowDateLabel = `${t("home.now.label")} · ${monthAbbr} '${String(now.getFullYear()).slice(-2)}`;
  const nowItems = [
    { label: t("home.now.building.label"), title: t("home.now.building.title"), subtitle: t("home.now.building.subtitle") },
    { label: t("home.now.reading.label"), title: t("home.now.reading.title"), subtitle: t("home.now.reading.subtitle") },
    { label: t("home.now.listening.label"), title: t("home.now.listening.title"), subtitle: t("home.now.listening.subtitle") },
    { label: t("home.now.watching.label"), title: t("home.now.watching.title"), subtitle: t("home.now.watching.subtitle") },
  ];

  const heroIntro = {
    role: t("home.hero.role"),
    name: t("home.hero.name"),
    tagline: t("home.hero.tagline"),
    cta: t("home.hero.cta"),
    scroll: t("home.scroll"),
  };

  const heroProof = {
    label: t("home.proof.label"),
    stats: [
      { value: t("home.proof.stats.years.value"), label: t("home.proof.stats.years.label") },
      { value: t("home.proof.stats.projects.value"), label: t("home.proof.stats.projects.label") },
      { value: t("home.proof.stats.location.value"), label: t("home.proof.stats.location.label") },
    ],
    blurb: t("home.proof.blurb"),
    cta: t("home.proof.cta"),
  };

  useEffect(() => {
    const getMessages = () => {
      const now = new Date();
      const currentHour = now.getHours();
      const currentMonth = now.getMonth();
      const currentDate = now.getDate();

      let special = "";

      if (currentMonth === 6 && currentDate === 4) {
        special = t("home.holiday.july4");
      } else if (currentMonth === 9 && currentDate === 12) {
        special = t("home.holiday.oct12");
      } else if (currentMonth === 11 && currentDate >= 20) {
        special = t("home.holiday.christmas");
      } else if (currentMonth === 0 && currentDate <= 7) {
        special = t("home.holiday.newyear");
      } else if (currentMonth === 10 && currentDate >= 20 && currentDate <= 30) {
        special = t("home.holiday.thanksgiving");
      } else if (currentMonth === 3 && [13, 14, 15, 16, 17, 18, 19, 20].includes(currentDate)) {
        special = t("home.holiday.holyweek");
      } else if (currentMonth === 3 && currentDate === 21) {
        special = t("home.holiday.easter");
      }

      let generalGreeting = "";
      if (currentHour < 12) {
        generalGreeting = t("home.greeting.morning");
      } else if (currentHour < 18) {
        generalGreeting = t("home.greeting.afternoon");
      } else {
        generalGreeting = t("home.greeting.evening");
      }

      const message = special || generalGreeting;
      setCurrentMessage(message);
      setShowMessage(true);
      const hideAfter = special ? 4000 : 5000;
      const timer = setTimeout(() => setShowMessage(false), hideAfter);
      return () => clearTimeout(timer);
    };

    getMessages();
  }, [t]);

  return (
    <div className="relative w-full bg-crema">
      <HeroScene
        photos={[henKaznelsonNyc, maevaVigierNyc]}
        intro={heroIntro}
        proof={heroProof}
        badge={
          <AnimatePresence>
            {showMessage && currentMessage && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-crema text-tinta px-5 py-2.5 rounded-full shadow-lg text-sm"
              >
                {currentMessage}
              </motion.div>
            )}
          </AnimatePresence>
        }
      />

      <div className="max-w-6xl mx-auto px-6 sm:px-10 py-20 sm:py-24">
        <NowWidget dateLabel={nowDateLabel} items={nowItems} />
      </div>
    </div>
  );
};

export default Home;
