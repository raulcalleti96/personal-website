import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronDown } from "react-icons/fi";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [specialMessage, setSpecialMessage] = useState("");
  const [greeting, setGreeting] = useState("");
  const [currentMessage, setCurrentMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  const menuItems = ["Home", "About", "Projects", "Articles", "Contact"];
  const currentPage = "Home";

  useEffect(() => {
    const getMessages = () => {
      const now = new Date();
      const currentHour = now.getHours();
      const currentMonth = now.getMonth();
      const currentDate = now.getDate();

      let special = "";
      if (currentMonth === 11 && currentDate >= 20) {
        special = "Merry Christmas! 🎄";
      } else if (currentMonth === 0 && currentDate <= 7) {
        special = "Happy New Year! 🎉";
      } else if (currentMonth === 10 && currentDate >= 20 && currentDate <= 30) {
        special = "Happy Thanksgiving! 🦃";
      } else if (currentMonth === 3 && currentDate >= 1 && currentDate <= 10) {
        special = "Holly Week! ✨";
      }

      setSpecialMessage(special);

      let generalGreeting = "";
      if (currentHour < 12) {
        generalGreeting = "A wonderful good morning";
      } else if (currentHour < 18) {
        generalGreeting = "A wonderful good afternoon";
      } else {
        generalGreeting = "A wonderful good evening";
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
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full z-50 flex items-start p-6 bg-negro-mate">
      {/* Globo del nombre */}
      <div className="bg-gris-oscuro/80 text-white rounded-full px-10 py-4 shadow-lg flex items-center justify-center w-[150px] h-[60px] hover:bg-gris-medio/80 transition duration-300 backdrop-blur-md">
        <span className="text-xl font-semibold tracking-wide text-center">
          Raul
        </span>
      </div>

      {/* Globo del estado */}
      <div className="relative ml-6">
        <button
          className="bg-gris-oscuro/80 text-white rounded-full px-10 py-4 shadow-lg flex items-center justify-between w-[150px] h-[60px] hover:bg-gris-medio/80 transition duration-300 backdrop-blur-md"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span className="text-xl font-medium">{currentPage}</span>
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: isMenuOpen ? 180 : 0 }}
            className="text-xl"
          >
            <FiChevronDown />
          </motion.div>
        </button>

        {/* Menú desplegable */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-full mt-4 right-0 bg-negro-mate/95 text-white rounded-lg shadow-2xl p-8 w-80 backdrop-blur-xl"
            >
              <ul className="space-y-6">
                {menuItems.map((item) => (
                  <li key={item}>
                    <a
                      href={`/${item.toLowerCase()}`}
                      className="block text-xl font-medium hover:underline"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mensajes dinámicos */}
      <AnimatePresence>
        {showMessage && (
          <motion.div
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute top-6 right-6 bg-gris-oscuro/80 text-white rounded-full px-10 py-4 shadow-lg flex items-center backdrop-blur-md"
          >
            <span className="text-xl font-medium">{currentMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Navbar;