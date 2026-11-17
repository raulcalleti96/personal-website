import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { FiGlobe } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { supabase } from "../supabaseClient";
import empireVideo from "../assets/Empire.mp4";

const Empire = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkingSession, setCheckingSession] = useState(true);

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === "en" ? "es" : "en");
  };

  useEffect(() => {
    const params = new URLSearchParams(
      window.location.hash ? window.location.hash.slice(1) : window.location.search
    );
    const oauthError = params.get("error_description") || params.get("error");
    if (oauthError) {
      setError(oauthError);
      window.history.replaceState(null, "", window.location.pathname);
    }
  }, []);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        navigate("/clients/select", { replace: true });
      } else {
        setCheckingSession(false);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        navigate("/clients/select", { replace: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleGoogleLogin = async () => {
    setError("");
    setLoading(true);
    const { error: signInError } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/clients/select` },
    });
    if (signInError) {
      setError(signInError.message);
      setLoading(false);
    }
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const { error: signInError } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
    if (signInError) {
      setError(signInError.status === 400 ? t("empire.form.invalid") : signInError.message);
      setLoading(false);
    }
    // On success onAuthStateChange redirects to /clients/select.
  };

  const inputClass =
    "w-full px-4 py-3 rounded-lg bg-[#0f0f10] border border-white/10 text-white placeholder:text-gray-500 outline-none focus:border-naranja-vibrante transition";

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

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto w-[92vw] max-w-md rounded-2xl bg-[#1a1a1a] border border-white/10 p-6 shadow-2xl"
        >
          {error && <div className="text-red-400 text-sm mb-4">{error}</div>}

          <button
            onClick={handleGoogleLogin}
            disabled={loading || checkingSession}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-lg bg-white text-black font-semibold hover:bg-gray-100 transition disabled:opacity-60"
          >
            <FcGoogle size={20} />
            {loading ? t("empire.form.loggingIn") : t("empire.form.googleLogin")}
          </button>

          <div className="flex items-center gap-3 my-5 text-xs uppercase tracking-[0.2em] text-gray-500">
            <span className="flex-1 h-px bg-white/10" />
            {t("empire.form.or")}
            <span className="flex-1 h-px bg-white/10" />
          </div>

          <form onSubmit={handleEmailLogin} className="flex flex-col gap-3 text-left">
            <input
              id="empire-email"
              type="email"
              autoComplete="username"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t("empire.form.email")}
              aria-label={t("empire.form.email")}
              className={inputClass}
            />
            <input
              id="empire-password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t("empire.form.password")}
              aria-label={t("empire.form.password")}
              className={inputClass}
            />
            <button
              type="submit"
              disabled={loading || checkingSession}
              className="w-full px-4 py-3 rounded-lg bg-naranja-vibrante text-black font-semibold hover:brightness-110 transition disabled:opacity-60"
            >
              {loading ? t("empire.form.loggingIn") : t("empire.form.emailLogin")}
            </button>
          </form>

          <a
            href="/#home"
            className="mt-3 block text-center px-4 py-2 rounded-lg bg-neutral-700/80 text-white font-semibold hover:bg-neutral-600/80 transition"
          >
            {t("empire.form.home")}
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Empire;
