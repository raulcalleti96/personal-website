import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getConsent, setConsent, loadAnalytics, isAnalyticsConfigured } from "../lib/analytics";

export default function CookieBanner() {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!isAnalyticsConfigured()) return;
    const consent = getConsent();
    if (consent === "granted") loadAnalytics();
    else if (!consent) setVisible(true);
  }, []);

  const choose = (value) => {
    setConsent(value);
    if (value === "granted") loadAnalytics();
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookies"
      className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 sm:max-w-sm z-50 bg-carbon text-papel rounded-2xl shadow-2xl border border-papel/15 p-5"
    >
      <p className="text-sm text-papel/80 leading-relaxed">{t("cookies.message")}</p>
      <div className="mt-4 flex gap-3">
        <button
          onClick={() => choose("granted")}
          className="flex-1 bg-papel hover:bg-tostado text-carbon hover:text-papel font-semibold text-sm py-2 rounded-full transition-colors"
        >
          {t("cookies.accept")}
        </button>
        <button
          onClick={() => choose("denied")}
          className="flex-1 border border-papel/30 hover:bg-papel/10 text-papel font-semibold text-sm py-2 rounded-full transition-colors"
        >
          {t("cookies.decline")}
        </button>
      </div>
    </div>
  );
}
