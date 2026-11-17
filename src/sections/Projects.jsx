import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { FiArrowUpRight, FiGithub } from "react-icons/fi";
import Carousel from "../components/editorial/Carousel";
import rsnHome from "../assets/projects/rsnextech-1-home.jpg";
import rsnAbout from "../assets/projects/rsnextech-2-about.jpg";
import rsnTimeline from "../assets/projects/rsnextech-3-timeline.jpg";
import rsnCerts from "../assets/projects/rsnextech-4-certs.jpg";
import empireLogin from "../assets/projects/empire-1-login.jpg";
import empireSelect from "../assets/projects/empire-2-select.jpg";
import empireGestion from "../assets/projects/empire-3-gestion.jpg";
import empireFocus from "../assets/projects/empire-4-focus.jpg";
import s7GestionInicio from "../assets/projects/s7-gestion-1-inicio.jpg";
import s7GestionTesoreria from "../assets/projects/s7-gestion-2-tesoreria.jpg";
import s7GestionLogin from "../assets/projects/s7-gestion-3-login.jpg";
import eszWebInicio from "../assets/projects/esz-web-1-inicio.jpg";
import eszWebHistoria from "../assets/projects/esz-web-4-historia.jpg";
import eszWebNoticias from "../assets/projects/esz-web-2-noticias.jpg";
import eszWebCalendario from "../assets/projects/esz-web-3-calendario.jpg";
import eszGestionInicio from "../assets/projects/esz-gestion-2-inicio.jpg";
import eszGestionSecretaria from "../assets/projects/esz-gestion-3-secretaria.jpg";
import eszGestionCalendario from "../assets/projects/esz-gestion-4-calendario.jpg";
import eszGestionLogin from "../assets/projects/esz-gestion-1-login.jpg";

const ROMAN = ["I", "II", "III", "IV", "V", "VI"];

// Image URLs per project, keyed by plate code. Populate as real screenshots become available.
const PROJECT_IMAGES = {
  "B.01": [rsnHome, rsnAbout, rsnTimeline, rsnCerts],
  "B.02": [empireLogin, empireSelect, empireGestion, empireFocus],
  "B.03": [eszWebInicio, eszWebHistoria, eszWebNoticias, eszWebCalendario],
  "B.04": [eszGestionInicio, eszGestionSecretaria, eszGestionCalendario, eszGestionLogin],
  "B.05": [],
  "B.06": [s7GestionInicio, s7GestionTesoreria, s7GestionLogin],
};

const PROJECT_TONE = {
  "B.01": "beta",
  "B.02": "beta",
  "B.03": "live",
  "B.04": "live",
  "B.05": "dev",
  "B.06": "dev",
};

const chip = "px-3 py-1 border border-tinta/20 text-tinta/60 text-xs uppercase tracking-wide rounded-full";

export default function Projects() {
  const { t } = useTranslation();
  const items = t("projects.items", { returnObjects: true });

  return (
    <section className="bg-crema text-tinta px-6 sm:px-10 py-24">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs uppercase tracking-[0.3em] text-tostado font-semibold mb-4">{t("projects.sectionLabel")}</p>
          <h2 className="text-4xl sm:text-5xl font-display font-black mb-4 max-w-2xl">{t("projects.headline")}</h2>
          <p className="text-tinta/60 max-w-xl mb-14">{t("projects.intro")}</p>
        </motion.div>

        {/* Contents index */}
        <p className="text-xs uppercase tracking-[0.3em] text-tostado font-semibold mb-2">{t("projects.contentsLabel")}</p>
        <div className="divide-y divide-tinta/15 border-y border-tinta/15 mb-20">
          {items.map((item, index) => (
            <a
              key={item.plate}
              href={`#plate-${item.plate}`}
              className="flex items-baseline gap-4 sm:gap-8 py-4 group"
            >
              <span className="font-serif italic text-tostado text-lg w-8 shrink-0">{ROMAN[index]}</span>
              <span className="flex-1 min-w-0">
                <span className="block text-lg sm:text-xl font-display font-bold text-tinta group-hover:text-tostado transition-colors">
                  {item.title}
                </span>
                <span className="hidden sm:block text-xs uppercase tracking-[0.15em] text-tinta/40 mt-1">
                  {item.contentsTagline}
                </span>
              </span>
              <span className="text-xs text-tinta/40 shrink-0">{item.plate}</span>
            </a>
          ))}
        </div>

        {/* Plates */}
        <div className="space-y-24">
          {items.map((item, index) => (
            <motion.div
              key={item.plate}
              id={`plate-${item.plate}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6 }}
              className="scroll-mt-24"
            >
              <p className="text-xs uppercase tracking-[0.2em] text-tostado font-semibold mb-3">
                {item.plate} · {t("projects.plateLabel")} {ROMAN[index]}
              </p>

              <Carousel
                images={PROJECT_IMAGES[item.plate]}
                alt={item.title}
                wordmark={item.title}
                plateLabel={`${item.plate} · ${t("projects.plateLabel")} ${ROMAN[index]}`}
                status={item.status}
                tone={PROJECT_TONE[item.plate]}
                comingSoonLabel={t("projects.comingSoon")}
              />

              <div className="mt-8 grid md:grid-cols-[1fr_1.4fr] gap-10 items-start">
                <div>
                  <span className={chip}>{item.category}</span>
                  <h3 className="text-3xl font-display font-black mt-4">{item.title}</h3>

                  <div className="grid grid-cols-3 gap-3 my-6 text-sm">
                    <div>
                      <p className="text-xs uppercase tracking-[0.15em] text-tinta/40 mb-1">{t("projects.roleLabel")}</p>
                      <p className="text-tinta/80">{item.role}</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.15em] text-tinta/40 mb-1">{t("projects.periodLabel")}</p>
                      <p className="text-tinta/80">{item.period}</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.15em] text-tinta/40 mb-1">{t("projects.statusLabel")}</p>
                      <p className="text-tinta/80">{item.status}</p>
                    </div>
                  </div>

                  {item.linkUrl ? (
                    <a
                      href={item.linkUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm font-semibold text-tinta hover:text-tostado transition-colors"
                    >
                      {item.linkLabel} <FiArrowUpRight />
                    </a>
                  ) : (
                    <p className="text-sm text-tinta/40">
                      {item.linkLabel} {item.linkNote && `— ${item.linkNote}`}
                    </p>
                  )}
                  {item.linkUrl && item.linkNote && (
                    <p className="text-xs text-tinta/40 mt-1">{item.linkNote}</p>
                  )}

                  {item.github && (
                    <a
                      href={item.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-6 inline-flex items-center gap-2 bg-tinta hover:bg-tostado text-crema text-xs uppercase tracking-[0.15em] font-semibold py-2.5 px-4 rounded-full transition-colors"
                    >
                      <FiGithub /> {t("projects.viewGithub")}
                    </a>
                  )}
                </div>

                <div>
                  <p className="font-serif italic text-2xl sm:text-3xl leading-snug text-tinta">
                    “{item.quote}”
                  </p>
                  {item.quoteAuthor && <p className="text-sm text-tinta/50 mt-2">— {item.quoteAuthor}</p>}

                  <p className="text-tinta/70 leading-relaxed mt-5">{item.description}</p>

                  <div className="flex flex-wrap gap-2 mt-6">
                    {item.tech.map((tech) => (
                      <span key={tech} className={chip}>
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
