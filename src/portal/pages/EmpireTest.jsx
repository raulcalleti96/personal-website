import { Navigate, useNavigate, useOutletContext } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FiArrowLeft } from "react-icons/fi";
import { canSeeTest } from "../lib/access";
import testHtml from "../test/repaso_y_tests.html?raw";

// The review app is a self-contained page; it runs in an iframe so its own
// styles and scripts stay isolated from the portal.
const EmpireTest = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { session } = useOutletContext();

  if (!canSeeTest(session)) return <Navigate to="/clients/select" replace />;

  return (
    <div className="h-screen w-full flex flex-col bg-negro-mate text-blanco-suave">
      <div className="shrink-0 flex items-center gap-4 px-4 py-2 border-b border-white/10">
        <button
          onClick={() => navigate("/clients/select")}
          className="flex items-center gap-2 text-sm font-semibold text-gray-300 hover:text-white transition-colors"
        >
          <FiArrowLeft /> {t("portal.nav.apps")}
        </button>
        <span className="text-xs uppercase tracking-[0.25em] text-tostado font-semibold">
          {t("portal.select.test.title")}
        </span>
      </div>
      <iframe title={t("portal.select.test.title")} srcDoc={testHtml} className="flex-1 w-full border-0" />
    </div>
  );
};

export default EmpireTest;
