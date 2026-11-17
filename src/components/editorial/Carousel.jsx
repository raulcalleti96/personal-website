import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiChevronLeft, FiChevronRight, FiImage } from "react-icons/fi";

const DOT_TONE = {
  live: "bg-emerald-500",
  beta: "bg-tostado",
  dev: "bg-tinta/40",
};

export default function Carousel({ images = [], alt = "", wordmark, plateLabel, status, tone = "dev", comingSoonLabel = "Coming soon" }) {
  const [index, setIndex] = useState(0);
  const hasImages = images.length > 0;
  const dotClass = DOT_TONE[tone] || DOT_TONE.dev;

  const goTo = (next) => setIndex((next + images.length) % images.length);

  return (
    <div
      className={`relative aspect-[21/9] sm:aspect-[2.4/1] rounded-2xl overflow-hidden border border-tinta/10 ${
        hasImages ? "bg-tinta" : "bg-crema-oscuro"
      }`}
    >
      {hasImages ? (
        <AnimatePresence mode="wait">
          <motion.img
            key={images[index]}
            src={images[index]}
            alt={alt}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </AnimatePresence>
      ) : (
        <div className="absolute inset-0 flex items-center justify-center text-tinta/25">
          <FiImage className="text-4xl" />
        </div>
      )}

      {hasImages && <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-tinta/85 via-tinta/20 to-transparent" />}

      {/* Wordmark + plate/status overlay */}
      <div className={`absolute inset-0 flex flex-col justify-between p-4 sm:p-6 ${hasImages ? "text-crema" : "text-tinta"}`}>
        <div className="flex items-center justify-between text-[0.65rem] sm:text-xs uppercase tracking-[0.2em]">
          <span className={`flex items-center gap-2 ${hasImages ? "opacity-80" : "opacity-50"}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${dotClass}`} />
            {plateLabel}
          </span>
          {!hasImages && <span className="opacity-40">{comingSoonLabel}</span>}
        </div>

        <div className="flex items-end justify-between gap-4">
          <span className="font-display font-black text-2xl sm:text-4xl leading-none">{wordmark}</span>
          <span className={`text-[0.65rem] sm:text-xs uppercase tracking-[0.15em] text-right shrink-0 ${hasImages ? "opacity-80" : "opacity-50"}`}>
            {status}
          </span>
        </div>
      </div>

      {images.length > 1 && (
        <>
          <button
            onClick={() => goTo(index - 1)}
            aria-label="Previous image"
            className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-crema/90 text-tinta flex items-center justify-center shadow-md hover:bg-crema transition"
          >
            <FiChevronLeft />
          </button>
          <button
            onClick={() => goTo(index + 1)}
            aria-label="Next image"
            className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-crema/90 text-tinta flex items-center justify-center shadow-md hover:bg-crema transition"
          >
            <FiChevronRight />
          </button>
        </>
      )}
    </div>
  );
}
