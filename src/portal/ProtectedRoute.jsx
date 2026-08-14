import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { supabase } from "../supabaseClient";

const ProtectedRoute = () => {
  const { t } = useTranslation();
  const [session, setSession] = useState(undefined);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, newSession) => setSession(newSession));

    return () => subscription.unsubscribe();
  }, []);

  if (session === undefined) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-negro-mate text-blanco-suave">
        <p className="text-sm text-gray-400">{t("portal.loading")}</p>
      </div>
    );
  }

  if (!session) {
    return <Navigate to="/clients" replace />;
  }

  return <Outlet context={{ session }} />;
};

export default ProtectedRoute;
