import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiChevronDown, FiGlobe } from "react-icons/fi";
import { useTranslation } from "react-i18next";

function Navbar() {
  const { i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(false);
  const [showLanguageButton, setShowLanguageButton] = useState(false);

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === "en" ? "es" : "en");
  };

  useEffect(() => {
    const handleScroll = () => {
      const aboutSection = document.getElementById("about");

      if (aboutSection) {
        const aboutPosition = aboutSection.offsetTop - 100;
        setShowNavbar(window.scrollY > aboutPosition);
        setShowLanguageButton(window.scrollY > aboutPosition);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: showNavbar ? 1 : 0, y: showNavbar ? 0 : -50 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 w-full z-50 flex items-start p-6 bg-[#1A1A1A] shadow-lg"
    >
      {/* Globo del nombre */}
      <div className="bg-neutral-700/80 text-white rounded-full px-10 py-4 shadow-lg flex items-center justify-center w-[150px] h-[60px]">
        <span className="text-xl font-semibold tracking-wide">Raul</span>
      </div>

      {/* Menú desplegable */}
      <div className="relative ml-6">
        <button
          className="bg-neutral-700/80 text-white rounded-full px-10 py-4 shadow-lg flex items-center justify-between w-[150px] h-[60px]"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span className="text-xl font-medium">Menu</span>
          <motion.div animate={{ rotate: isMenuOpen ? 180 : 0 }} className="text-xl">
            <FiChevronDown />
          </motion.div>
        </button>

        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full mt-4 right-0 bg-neutral-900/95 text-white rounded-lg shadow-2xl p-8 w-80"
          >
            <ul className="space-y-6">
              <li><a href="#home" className="block text-xl font-medium hover:underline">Home</a></li>
              <li><a href="#about" className="block text-xl font-medium hover:underline">About</a></li>
              <li><a href="#projects" className="block text-xl font-medium hover:underline">Projects</a></li>
              <li><a href="#contact" className="block text-xl font-medium hover:underline">Contact</a></li>
            </ul>
          </motion.div>
        )}
      </div>

      {/* Botón de cambio de idioma (solo visible cuando se llega a About) */}
      {showLanguageButton && (
        <motion.button
          onClick={toggleLanguage}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="ml-auto bg-neutral-700/80 text-white rounded-full px-6 py-3 shadow-lg flex items-center hover:bg-neutral-600/80 transition duration-300"
        >
          <FiGlobe className="mr-2" />
          {i18n.language === "en" ? "EN" : "ES"}
        </motion.button>
      )}
    </motion.header>
  );
}

export default Navbar;