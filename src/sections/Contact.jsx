import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { FiMail, FiLinkedin, FiGithub } from "react-icons/fi";
import { supabase } from "../supabaseClient";

export default function Contact() {
  const { t } = useTranslation();
  const [status, setStatus] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus("loading");

    const form = event.target;
    const formData = new FormData(form);

    try {
      const { error } = await supabase.functions.invoke("contact-form", {
        body: {
          name: formData.get("name"),
          email: formData.get("email"),
          message: formData.get("message"),
          website: formData.get("website"),
        },
      });

      if (error) {
        setStatus("error");
      } else {
        setStatus("success");
        form.reset();
      }
    } catch (error) {
      setStatus("error");
    }
  };

  const inputClass =
    "w-full p-3 bg-superficie border border-tinta/15 text-tinta placeholder:text-tinta/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-tostado focus:border-tostado transition";

  return (
    <section className="min-h-[80vh] flex flex-col items-center justify-center bg-crema text-tinta px-6 sm:px-10 py-24">
      <motion.div
        className="max-w-xl w-full"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7 }}
      >
        <p className="text-xs uppercase tracking-[0.3em] text-tostado font-semibold mb-4 text-center">{t("contact.sectionLabel")}</p>
        <h2 className="text-3xl sm:text-4xl font-display font-black text-center mb-4">{t("contact.title")}</h2>
        <p className="text-tinta/60 text-center mb-8">{t("contact.description")}</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Honeypot: hidden from people, bots tend to fill it in */}
          <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
          <input type="text" name="name" placeholder={t("contact.name")} required className={inputClass} />
          <input type="email" name="email" placeholder={t("contact.email")} required className={inputClass} />
          <textarea name="message" placeholder={t("contact.message")} required rows="5" className={inputClass}></textarea>

          <button
            type="submit"
            className="w-full bg-tinta hover:bg-tostado text-crema font-semibold py-3 rounded-full shadow-sm transition-colors flex items-center justify-center gap-2 disabled:opacity-60 uppercase tracking-[0.15em] text-sm"
            disabled={status === "loading"}
          >
            {status === "loading" ? t("contact.status.loading") : t("contact.send")}
          </button>
        </form>

        {status === "success" && <p className="text-tostado text-center mt-4">{t("contact.status.success")}</p>}
        {status === "error" && <p className="text-red-500 text-center mt-4">{t("contact.status.error")}</p>}

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a
            href="mailto:raulcalleti96@icloud.com"
            className="flex items-center gap-2 border border-tinta/15 hover:border-tinta text-tinta px-4 py-2 rounded-full transition text-sm"
          >
            <FiMail /> {t("contact.social.email")}
          </a>
          <a
            href="https://www.linkedin.com/in/raul-santiago-prieto/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 border border-tinta/15 hover:border-tinta text-tinta px-4 py-2 rounded-full transition text-sm"
          >
            <FiLinkedin /> {t("contact.social.linkedin")}
          </a>
          <a
            href="https://github.com/raulcalleti96"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 border border-tinta/15 hover:border-tinta text-tinta px-4 py-2 rounded-full transition text-sm"
          >
            <FiGithub /> {t("contact.social.github")}
          </a>
        </div>
      </motion.div>
    </section>
  );
}
