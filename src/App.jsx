import { ParallaxProvider } from "react-scroll-parallax";
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
    <ParallaxProvider>
      <div
        className="App min-h-screen text-luxury-white"
        style={{
          background: "linear-gradient(to bottom, #111, #222, #333)", // Gradiente general
          backgroundAttachment: "fixed", // Fondo fijo para scroll
        }}
      >
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
  );
}

export default App;