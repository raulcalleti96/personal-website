import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];

export default function RomanExperienceList({ items }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="divide-y divide-tinta/15 border-y border-tinta/15">
      {items.map((entry, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={entry.company}>
            <button
              onClick={() => setOpenIndex(isOpen ? -1 : index)}
              className="w-full flex items-baseline gap-4 sm:gap-8 py-6 text-left group"
            >
              <span className="font-serif italic text-tostado text-lg sm:text-xl w-10 shrink-0">{ROMAN[index] || index + 1}</span>
              <span className="flex-1 min-w-0">
                <span className="block text-xl sm:text-3xl font-display font-bold text-tinta group-hover:text-tostado transition-colors">
                  {entry.company}
                </span>
                <span className="block text-sm sm:text-base text-tinta/50 mt-1">{entry.position}</span>
              </span>
              <span className="hidden sm:block text-sm text-tinta/40 shrink-0">{entry.years}</span>
              <span className="text-tinta/40 text-2xl shrink-0">{isOpen ? "−" : "+"}</span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="pb-8 pl-14 sm:pl-24 pr-4 sm:pr-16 grid gap-4 sm:grid-cols-3">
                    <p className="sm:hidden text-sm text-tinta/40">{entry.years}</p>
                    <p className="sm:col-span-2 text-tinta/70 leading-relaxed">{entry.description}</p>
                    <ul className="flex flex-wrap gap-2 content-start">
                      {entry.skills.map((skill) => (
                        <li
                          key={skill}
                          className="text-xs uppercase tracking-wide px-3 py-1 rounded-full border border-tinta/20 text-tinta/60"
                        >
                          {skill}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
