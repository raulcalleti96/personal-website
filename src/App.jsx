//import { useState, useEffect } from "react";
import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ParallaxProvider } from "react-scroll-parallax";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n"; // Importar la configuración de idiomas
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CookieBanner from "./components/CookieBanner";
import ScrollProgressBar from "./components/ScrollProgressBar";
import ProgressIndicator from "./components/ProgressIndicator";
import Home from "./sections/Home";
import About from "./sections/About";
import Projects from "./sections/Projects";
import Articles from "./sections/Articles";
import Contact from "./sections/Contact";
import Empire from "./sections/Empire";
import Radio from "./radio/Radio";
import ProtectedRoute from "./portal/ProtectedRoute";
import PortalLayout from "./portal/PortalLayout";
import AppSelect from "./portal/pages/AppSelect";
import Focus from "./portal/pages/Focus";
const EmpireTest = lazy(() => import("./portal/pages/EmpireTest"));
import PortalHome from "./portal/pages/Home";
import Tasks from "./portal/pages/Tasks";
import Habits from "./portal/pages/Habits";
import Finances from "./portal/pages/Finances";
import AccountDetail from "./portal/pages/AccountDetail";
import RecurringPayments from "./portal/pages/RecurringPayments";
import Budget from "./portal/pages/Budget";
import Calendar from "./portal/pages/Calendar";
import Brain from "./portal/pages/Brain";
import Diario from "./portal/pages/Diario";

function MainPage() {
  return (
    <>
      <ScrollProgressBar />
      <ProgressIndicator />
      <main>
        <section id="home">
          <Home />
        </section>
        <section id="about">
          <About />
        </section>
        <section id="projects">
          <Projects />
        </section>
        <section id="articles">
          <Articles />
        </section>
        <section id="contact">
          <Contact />
        </section>
      </main>
    </>
  );
}

function App() {
  /*const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");

  const PASSWORD = "Employer";

  useEffect(() => {
    document.body.style.overflow = isAuthenticated ? "auto" : "hidden";
  }, [isAuthenticated]);

  const handleAuth = () => {
    if (passwordInput === PASSWORD) {
      setIsAuthenticated(true);
    } else {
      alert("Incorrect password");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-white w-[90%] max-w-sm">
          <h2 className="text-xl mb-4 font-semibold">🔐 Private Access</h2>
          <input
            type="password"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            placeholder="Enter the password"
            className="w-full p-3 rounded bg-gray-700 text-white mb-4 outline-none"
          />
          <button
            onClick={handleAuth}
            className="w-full bg-blue-500 hover:bg-blue-600 py-2 rounded font-bold transition"
          >
            Enter
          </button>
        </div>
      </div>
    );
  }*/

  return (
    <I18nextProvider i18n={i18n}>
      <ParallaxProvider>
        <div className="App min-h-screen text-luxury-white">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Navbar />
                  <MainPage />
                  <Footer />
                  <CookieBanner />
                </>
              }
            />
            {/* The album page lives inside Empire; the old public URLs only lead to the login. */}
            <Route path="/radio" element={<Navigate to="/clients/radio" replace />} />
            <Route path="/navidudu" element={<Navigate to="/clients/radio" replace />} />
            <Route path="/clients" element={<Empire />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/clients/select" element={<AppSelect />} />
              <Route path="/clients/focus" element={<Focus />} />
              <Route path="/clients/radio" element={<Radio />} />
              <Route
                path="/clients/test"
                element={
                  <Suspense fallback={null}>
                    <EmpireTest />
                  </Suspense>
                }
              />
              <Route element={<PortalLayout />}>
                <Route path="/clients/home" element={<PortalHome />} />
                <Route path="/clients/tasks" element={<Tasks />} />
                <Route path="/clients/habits" element={<Habits />} />
                <Route path="/clients/finances" element={<Finances />} />
                <Route path="/clients/finances/:accountId" element={<AccountDetail />} />
                <Route path="/clients/finances/:accountId/recurring" element={<RecurringPayments />} />
                <Route path="/clients/finances/:accountId/budget" element={<Budget />} />
                <Route path="/clients/calendar" element={<Calendar />} />
                <Route path="/clients/brain" element={<Brain />} />
                <Route path="/clients/diario" element={<Diario />} />
              </Route>
            </Route>
          </Routes>
        </div>
      </ParallaxProvider>
    </I18nextProvider>
  );
}

export default App;