import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { FiArrowUpRight, FiLinkedin, FiCalendar } from "react-icons/fi";

const ARTICLE_LINKS = [
  "https://www.linkedin.com/pulse/empire-workspace-digital-hub-dataanalysis-raul-santiago-prieto-8qnjf/",
  "https://www.linkedin.com/pulse/development-power-trio-integrating-gemini-ai-git-jira-raul-yvdxe/",
];

export default function Articles() {
  const { t } = useTranslation();
  const articles = t("articles.items", { returnObjects: true });

  return (
    <section className="bg-crema text-tinta px-6 sm:px-10 py-24">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs uppercase tracking-[0.3em] text-tostado font-semibold mb-4">{t("articles.sectionLabel")}</p>
          <h2 className="text-4xl sm:text-5xl font-display font-black mb-10">{t("articles.title")}</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {articles.map((article, index) => (
            <motion.a
              key={article.title}
              href={ARTICLE_LINKS[index]}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="bg-superficie border border-tinta/10 hover:border-tostado/50 hover:shadow-md rounded-2xl p-8 shadow-sm flex flex-col justify-between transition"
            >
              <div>
                <h3 className="text-xl sm:text-2xl font-display font-bold mb-3">{article.title}</h3>
                <p className="text-tinta/60 leading-relaxed mb-4">{article.summary}</p>
                <div className="flex items-center gap-1.5 text-xs text-tinta/40">
                  <FiCalendar />
                  <span>{article.date}</span>
                </div>
              </div>

              <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-tinta group-hover:text-tostado">
                <FiLinkedin /> {t("articles.readOn")} <FiArrowUpRight />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
