import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { FiGlobe } from "react-icons/fi";
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebaseConfig";
import empireVideo from "../assets/Empire.mp4";

const AUTH_ERROR_KEYS = {
  "auth/invalid-email": "empire.form.errors.invalidCredentials",
  "auth/user-not-found": "empire.form.errors.invalidCredentials",
  "auth/wrong-password": "empire.form.errors.invalidCredentials",
  "auth/invalid-credential": "empire.form.errors.invalidCredentials",
  "auth/too-many-requests": "empire.form.errors.tooManyRequests",
};

const Empire = () => {
  const { t, i18n } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const formRef = useRef(null);

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === "en" ? "es" : "en");
  };

  useEffect(() => {
    formRef.current?.querySelector("input[type=email]")?.focus();
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => setUser(currentUser));
    return unsubscribe;
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError(t("empire.form.errors.missing"));
      return;
    }
    setLoading(true);
    try {
      const credential = await signInWithEmailAndPassword(auth, email, password);
      setUser(credential.user);
    } catch (err) {
      setError(t(AUTH_ERROR_KEYS[err.code] || "empire.form.errors.generic"));
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
    setEmail("");
    setPassword("");
  };

  return (
    <section
      id="clients"
      className="relative min-h-screen w-full overflow-hidden flex items-center justify-center"
    >
      <video
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        src={empireVideo}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-transparent" />

      <motion.button
        onClick={toggleLanguage}
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.35 }}
        className="absolute top-12 left-6 bg-neutral-700/80 text-white rounded-full px-6 py-3 shadow-lg
                   flex items-center justify-center w-[110px] h-[50px] hover:bg-neutral-600/80 transition z-20"
        aria-label="Toggle language"
      >
        <FiGlobe className="mr-2" />
        {i18n.language === "en" ? "EN" : "ES"}
      </motion.button>

      <div className="relative z-10 max-w-5xl mx-auto text-center text-white px-6">
        <motion.h1
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-4xl md:text-5xl font-bold mb-2"
        >
          {t("empire.title")}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05, duration: 0.35 }}
          className="text-base md:text-lg text-gray-200 mb-8"
        >
          "{t("empire.quote")}" — <span className="italic">{t("empire.quoteAuthor")}</span>
        </motion.p>

        {user ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto w-[92vw] max-w-md rounded-2xl bg-[#1a1a1a] border border-white/10 p-6 shadow-2xl text-left"
          >
            <p className="text-sm text-gray-300 mb-4">
              {t("empire.welcome", { email: user.email })}
            </p>
            <div className="flex gap-3">
              <button
                onClick={handleLogout}
                className="flex-1 px-4 py-2 rounded-lg bg-amber-500 text-black font-semibold hover:bg-amber-400 transition"
              >
                {t("empire.form.logout")}
              </button>
              <a
                href="/#home"
                className="flex-1 text-center px-4 py-2 rounded-lg bg-neutral-700/80 text-white font-semibold hover:bg-neutral-600/80 transition"
              >
                {t("empire.form.home")}
              </a>
            </div>
          </motion.div>
        ) : (
          <motion.form
            ref={formRef}
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto w-[92vw] max-w-md rounded-2xl bg-[#1a1a1a] border border-white/10 p-6 shadow-2xl text-left"
          >
            <label className="block text-sm mb-1">{t("empire.form.email")}</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mb-3 px-4 py-2 rounded-lg bg-[#0f0f10] border border-white/10 outline-none focus:border-amber-500"
              placeholder="you@example.com"
              required
            />

            <label className="block text-sm mb-1">{t("empire.form.password")}</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mb-4 px-4 py-2 rounded-lg bg-[#0f0f10] border border-white/10 outline-none focus:border-amber-500"
              placeholder="••••••••"
              required
            />

            {error && <div className="text-red-400 text-sm mb-3">{error}</div>}

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 px-4 py-2 rounded-lg bg-amber-500 text-black font-semibold hover:bg-amber-400 transition disabled:opacity-60"
              >
                {loading ? t("empire.form.loggingIn") : t("empire.form.login")}
              </button>
              <a
                href="/#home"
                className="flex-1 text-center px-4 py-2 rounded-lg bg-neutral-700/80 text-white font-semibold hover:bg-neutral-600/80 transition"
              >
                {t("empire.form.home")}
              </a>
            </div>
          </motion.form>
        )}
      </div>
    </section>
  );
};

export default Empire;
