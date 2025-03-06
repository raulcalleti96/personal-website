import { useState, useEffect } from "react";
import { Link } from "react-scroll";

function ProgressIndicator() {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section");
      let currentSection = "";

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (
          rect.top <= window.innerHeight / 2 &&
          rect.bottom >= window.innerHeight / 2
        ) {
          currentSection = section.id;
        }
      });

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const sections = ["home", "about", "projects", "articles", "contact"];

  return (
    <div className="fixed top-1/2 -translate-y-1/2 right-8 flex flex-col space-y-4 z-50">
      {sections.map((section) => (
        <Link
          key={section}
          to={section}
          smooth={true}
          duration={500}
          className={`w-4 h-4 rounded-full cursor-pointer transition-colors duration-300 ${
            activeSection === section
              ? "bg-naranja-vibrante"
              : "bg-gris-medio"
          }`}
        />
      ))}
    </div>
  );
}

export default ProgressIndicator;