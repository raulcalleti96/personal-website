import { useState } from "react";
import { FaEnvelope, FaLinkedin, FaGithub, FaMedium } from "react-icons/fa"; // Importamos iconos de React Icons

export default function Contact() {
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
        event.target.reset(); // Limpia el formulario
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-negro-mate flex items-center justify-center">
        <div className="max-w-xl w-full p-8 bg-gris-oscuro rounded-lg shadow-lg border border-gray-700">
            {/* Título */}
            <h2 className="text-white text-2xl font-bold text-center mb-4">📩 Get in Touch</h2>
            <p className="text-gray-400 text-center mb-6">
                Whether you have a question, a project idea, or just want to say hi, feel free to reach out!
            </p>

            {/* Formulario */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    required
                    className="w-full p-3 bg-gray-800 text-white rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    required
                    className="w-full p-3 bg-gray-800 text-white rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <textarea
                    name="message"
                    placeholder="Your Message"
                    required
                    rows="5"
                    className="w-full p-3 bg-gray-800 text-white rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>

                <button
                    type="submit"
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg shadow-md transition flex items-center justify-center gap-2"
                    disabled={status === "loading"}
                >
                    🚀 {status === "loading" ? "Sending..." : "Send Message"}
                </button>
            </form>

            {/* Mensajes de estado */}
            {status === "success" && (
                <p className="text-green-500 text-center mt-4">✅ Message sent successfully!</p>
            )}
            {status === "error" && (
                <p className="text-red-500 text-center mt-4">❌ Error sending message. Try again.</p>
            )}

            {/* Redes sociales con logos */}
            <div className="mt-6 flex justify-center gap-4">
                <a href="mailto:tuemail@example.com"
                   className="flex items-center gap-2 bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition">
                    <FaEnvelope className="text-xl"/> Email
                </a>
                <a href="https://www.linkedin.com/in/tu-perfil"
                   className="flex items-center gap-2 bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition">
                    <FaLinkedin className="text-xl text-blue-400"/> LinkedIn
                </a>
                <a href="https://github.com/tu-usuario"
                   className="flex items-center gap-2 bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition">
                    <FaGithub className="text-xl"/> GitHub
                </a>
                <a href="https://medium.com/@tu-usuario"
                   className="flex items-center gap-2 bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition">
                    <FaMedium className="text-xl text-green-400"/> Medium
                </a>
            </div>
        </div>
    </div>
  );
}