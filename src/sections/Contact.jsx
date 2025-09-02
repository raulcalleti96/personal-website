import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FaEnvelope, FaLinkedin, FaGithub, FaMedium } from "react-icons/fa";

export default function Contact() {
  const { t } = useTranslation();
  const [status, setStatus] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus("loading");

    const formData = new FormData(event.target);

    try {
      const response = await fetch("https://formspree.io/f/mvgkopor", {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        setStatus("success");
        event.target.reset();
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <section className="min-h-[120vh] flex flex-col items-center justify-center text-white p-10 bg-gradient-to-b from-black via-gray-900 to-black">
      <div className="max-w-xl w-full p-8 bg-gris-oscuro rounded-lg shadow-lg border border-gray-700">
        {/* Título */}
        <h2 className="text-white text-2xl font-bold text-center mb-4">
          {t("contact.title")}
        </h2>
        <p className="text-gray-400 text-center mb-6">
          {t("contact.description")}
        </p>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="name"
            placeholder={t("contact.name")}
            required
            className="w-full p-3 bg-gray-800 text-white rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            name="email"
            placeholder={t("contact.email")}
            required
            className="w-full p-3 bg-gray-800 text-white rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            name="message"
            placeholder={t("contact.message")}
            required
            rows="5"
            className="w-full p-3 bg-gray-800 text-white rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg shadow-md transition flex items-center justify-center gap-2"
            disabled={status === "loading"}
          >
            🚀 {status === "loading" ? t("contact.status.loading") : t("contact.send")}
          </button>
        </form>

        {/* Mensajes de estado */}
        {status === "success" && (
          <p className="text-green-500 text-center mt-4">{t("contact.status.success")}</p>
        )}
        {status === "error" && (
          <p className="text-red-500 text-center mt-4">{t("contact.status.error")}</p>
        )}

        {/* Redes sociales */}
        <div className="mt-6 flex justify-center gap-4">
          <a
            href="mailto:tuemail@example.com"
            className="flex items-center gap-2 bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
          >
            <FaEnvelope className="text-xl" /> {t("contact.social.email")}
          </a>
          <a
            href="https://www.linkedin.com/in/tu-perfil"
            className="flex items-center gap-2 bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
          >
            <FaLinkedin className="text-xl text-blue-400" /> {t("contact.social.linkedin")}
          </a>
          <a
            href="https://github.com/tu-usuario"
            className="flex items-center gap-2 bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
          >
            <FaGithub className="text-xl" /> {t("contact.social.github")}
          </a>
          <a
            href="https://medium.com/@tu-usuario"
            className="flex items-center gap-2 bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
          >
            <FaMedium className="text-xl text-green-400" /> {t("contact.social.medium")}
          </a>
        </div>
      </div>
    </section>
  );
}