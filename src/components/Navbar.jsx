import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX, FiGlobe } from "react-icons/fi";
import { useTranslation } from "react-i18next";
import ThemeToggle from "./editorial/ThemeToggle";

function Navbar() {
  const { t, i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === "en" ? "es" : "en");
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { href: "#home", label: t("nav.home") },
    { href: "#about", label: t("nav.about") },
    { href: "#projects", label: t("nav.projects") },
    { href: "#articles", label: t("nav.articles") },
    { href: "#contact", label: t("nav.contact") },
  ];

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 sm:px-10 transition-all duration-300 ${
          scrolled ? "py-3 bg-crema/90 backdrop-blur-md border-b border-tinta/10" : "py-6 bg-transparent"
        }`}
      >
        <a href="#home" className="font-display font-black text-lg tracking-tight text-tinta">
          RS<span className="text-tostado">.</span>
        </a>

        <nav className="hidden lg:flex items-center gap-6">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="whitespace-nowrap text-xs uppercase tracking-[0.15em] font-semibold text-tinta/70 hover:text-tinta transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle className="hidden lg:flex" />
          <button
            onClick={toggleLanguage}
            className="hidden lg:flex items-center gap-1.5 text-xs uppercase tracking-[0.15em] font-semibold text-tinta/70 hover:text-tinta transition-colors"
          >
            <FiGlobe />
            {i18n.language === "en" ? "EN" : "ES"}
          </button>
          <Link
            to="/clients"
            className="hidden lg:inline-flex items-center px-5 py-2 rounded-full bg-tinta text-crema text-xs uppercase tracking-[0.15em] font-semibold hover:bg-tostado transition-colors whitespace-nowrap"
          >
            Empire
          </Link>
          <button
            onClick={() => setIsMenuOpen(true)}
            className="lg:hidden text-tinta text-2xl"
            aria-label="Open menu"
          >
            <FiMenu />
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-crema flex flex-col p-8 lg:hidden"
          >
            <div className="flex justify-between items-center mb-16">
              <span className="font-display font-black text-lg text-tinta">RS.</span>
              <button onClick={() => setIsMenuOpen(false)} className="text-tinta text-3xl" aria-label="Close menu">
                <FiX />
              </button>
            </div>
            <nav className="flex flex-col gap-6">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-4xl font-display font-bold text-tinta"
                >
                  {link.label}
                </a>
              ))}
              <Link
                to="/clients"
                onClick={() => setIsMenuOpen(false)}
                className="text-4xl font-display font-bold text-tostado"
              >
                Empire
              </Link>
            </nav>
            <div className="mt-auto flex items-center justify-between">
              <button
                onClick={toggleLanguage}
                className="flex items-center gap-2 text-sm uppercase tracking-[0.2em] font-semibold text-tinta/70"
              >
                <FiGlobe />
                {i18n.language === "en" ? "English" : "Español"}
              </button>
              <ThemeToggle className="text-sm" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;
