import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { FiGlobe } from "react-icons/fi";
import bgImage from "../assets/nycfondo.jpg";

const Home = () => {
  const orbitRef = useRef();
  const { t, i18n } = useTranslation();
  const [specialMessage, setSpecialMessage] = useState("");
  const [greeting, setGreeting] = useState("");
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
      setSpecialMessage(special);

      let generalGreeting = "";
      if (currentHour < 12) {
        generalGreeting = t("home.greeting.morning");
      } else if (currentHour < 18) {
        generalGreeting = t("home.greeting.afternoon");
      } else {
        generalGreeting = t("home.greeting.evening");
      }
      setGreeting(generalGreeting);

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

      {/* Botón de cambio de idioma en Home */}
      {showLanguageButton && (
        <motion.button
          onClick={toggleLanguage}
          className="absolute top-12 left-6 bg-neutral-700/80 text-white rounded-full px-6 py-3 shadow-lg flex items-center justify-center w-[100px] h-[50px] hover:bg-neutral-600/80 transition duration-300 z-20"
        >
          <FiGlobe className="mr-2" />
          {i18n.language === "en" ? "EN" : "ES"}
        </motion.button>
      )}

      {/* Globo con el saludo dinámico */}
      <AnimatePresence>
        {showMessage && (
          <motion.div
            initial={{ x: 200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 200, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute top-6 right-6 bg-neutral-700/80 text-white rounded-full px-10 py-4 shadow-lg flex items-center backdrop-blur-md"
          >
            <span className="text-xl font-medium">{currentMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Contenido principal */}
      <div className="absolute top-[70%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl md:text-7xl font-bold text-naranja-vibrante drop-shadow-lg"
        >
          {t("home.title")}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="text-lg md:text-2xl text-blanco-suave mt-4"
        >
          {t("home.subtitle")}
        </motion.p>
      </div>
    </div>
  );
};

export default Home;
