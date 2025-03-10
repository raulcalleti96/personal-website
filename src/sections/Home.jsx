import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { FiGlobe } from "react-icons/fi";
import bgImage from "../assets/maeva-vigier-nyc.jpg";

const Home = () => {
  const orbitRef = useRef();
  const { t, i18n } = useTranslation();
  const [currentMessage, setCurrentMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [showLanguageButton, setShowLanguageButton] = useState(true);

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === "en" ? "es" : "en");
  };

  useEffect(() => {
    const handleScroll = () => {
      const aboutSection = document.getElementById("about");
      if (aboutSection) {
        const aboutPosition = aboutSection.offsetTop - 100;
        setShowLanguageButton(window.scrollY < aboutPosition);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
      } else if (currentMonth === 3 && currentDate >= 1 && currentDate <= 10) {
        special = t("home.holiday.holyweek");
      }

      let generalGreeting = "";
      if (currentHour < 12) {
        generalGreeting = t("home.greeting.morning");
      } else if (currentHour < 18) {
        generalGreeting = t("home.greeting.afternoon");
      } else {
        generalGreeting = t("home.greeting.evening");
      }

      if (special) {
        setCurrentMessage(special);
        setShowMessage(true);
        setTimeout(() => {
          setShowMessage(false);
          setTimeout(() => {
            setCurrentMessage(generalGreeting);
            setShowMessage(true);
            setTimeout(() => {
              setShowMessage(false);
            }, 4000);
          }, 1000);
        }, 4000);
      } else {
        setCurrentMessage(generalGreeting);
        setShowMessage(true);
        setTimeout(() => {
          setShowMessage(false);
        }, 4000);
      }
    };

    getMessages();
  }, [t]);

  return (
    <div
      className="relative w-full h-screen overflow-hidden font-[Poppins]"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Canvas className="absolute inset-0 z-0 pointer-events-none">
        <ambientLight intensity={0.5} />
        <directionalLight position={[3, 3, 3]} intensity={1} />
        <OrbitControls ref={orbitRef} enableZoom={false} enableRotate={false} enablePan={false} />
      </Canvas>

      {showLanguageButton && (
        <motion.button
          onClick={toggleLanguage}
          className="absolute top-12 left-6 bg-neutral-700/80 text-white rounded-full px-6 py-3 shadow-lg flex items-center justify-center w-[100px] h-[50px] hover:bg-neutral-600/80 transition duration-300 z-20"
        >
          <FiGlobe className="mr-2" />
          {i18n.language === "en" ? "EN" : "ES"}
        </motion.button>
      )}

      <div className="absolute top-[20%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 text-center">
        <motion.h1
            className="text-5xl md:text-7xl font-bold"
            style={{ color: "#1B3B6F", textShadow: "2px 2px 4px rgba(0, 0, 0, 0.6)" }}>
          {t("home.title")}
        </motion.h1>
        <motion.p className="text-lg md:text-2xl text-black mt-4">{t("home.subtitle")}</motion.p>

        <div className="mt-6 flex flex-col md:flex-row gap-4 justify-center items-center">
          <motion.a
              href="#cv"
              className="px-6 py-3 font-semibold rounded-lg shadow-lg"
              style={{backgroundColor: "#E68A00", color: "black"}}
          >
            {t("home.buttons.cv")}
          </motion.a>
          <motion.a href="#blog"
                    className="px-6 py-3 bg-gris-medio text-blanco-suave font-semibold rounded-lg shadow-lg">{t("home.buttons.blog")}</motion.a>
          <motion.a href="#projects"
                    className="px-6 py-3 bg-gris-medio text-blanco-suave font-semibold rounded-lg shadow-lg">{t("home.buttons.projects")}</motion.a>
          <motion.a href="#contact"
                    className="px-6 py-3 bg-gris-medio text-blanco-suave font-semibold rounded-lg shadow-lg">{t("home.buttons.contact")}</motion.a>
        </div>
      </div>
    </div>
  );
};

export default Home;
