import { ParallaxProvider } from "react-scroll-parallax";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n"; // Importar la configuración de idiomas
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollProgressBar from "./components/ScrollProgressBar";
import ProgressIndicator from "./components/ProgressIndicator";
import Home from "./sections/Home";
import About from "./sections/About";
import Projects from "./sections/Projects";
import Articles from "./sections/Articles";
import Contact from "./sections/Contact";

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <ParallaxProvider>
        <div className="App min-h-screen text-luxury-white">
          <Navbar />
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
          <Footer />
        </div>
      </ParallaxProvider>
    </I18nextProvider>
  );
}

export default App;