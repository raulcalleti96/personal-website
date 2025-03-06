import { useEffect, useState } from "react";

function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const getScrollEffect = () => ({
    transform: `translateY(${scrollY * 0.1}px)`,
    transition: "transform 0.5s ease-out",
  });

  const getMouseEffect = () => ({
    background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(0, 255, 153, 0.3), transparent 80%)`,
    transition: "background 0.1s ease-out",
  });

  return (
    <div className="relative min-h-screen bg-[#1A1A1A] text-white overflow-hidden">
      {/* Luz dinámica que sigue el cursor */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={getMouseEffect()}
      ></div>

      {/* Fondo con Mapa Mundi Geométrico */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-30">
        <svg
          className="w-full h-full"
          viewBox="0 0 1000 600"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Continentes estilizados */}
          <path
            d="M50,150 L200,100 L350,200 L500,100 L650,200 L800,100"
            stroke="#FFFFFF"
            strokeWidth="1"
            fill="none"
          />
          <path
            d="M100,300 L300,250 L400,350 L600,250 L700,350 L900,250"
            stroke="#00FF99"
            strokeWidth="1"
            fill="none"
          />
          {/* Puntos de conexión */}
          <circle cx="200" cy="100" r="5" fill="#FFFFFF" className="animate-pulse" />
          <circle cx="500" cy="100" r="5" fill="#00FF99" className="animate-pulse" />
          <circle cx="700" cy="350" r="5" fill="#FFFFFF" className="animate-pulse" />
          <circle cx="400" cy="350" r="5" fill="#00FF99" className="animate-pulse" />
          <circle cx="900" cy="250" r="5" fill="#FFFFFF" className="animate-pulse" />
        </svg>
      </div>

      {/* Capa Trasera con Luz Difusa */}
      <div className="absolute inset-0 z-0">
        <div className="absolute w-full h-full bg-gradient-to-br from-[#0E0E0E] via-[#1A1A1A] to-[#0E0E0E] opacity-70 animate-pulse"></div>
      </div>

      {/* Texto Principal */}
      <div
        className="absolute top-[40%] left-[10%] text-6xl md:text-8xl font-bold z-10"
        style={getScrollEffect()}
      >
        <span
          style={{
            background: "linear-gradient(to right, #FFFFFF, #004D32)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Transforming Insights into Innovation
        </span>
      </div>

      {/* Halo de Luz Difusa */}
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] rounded-full bg-[#00FF99] opacity-20 blur-[150px] z-0"></div>
    </div>
  );
}

export default Home;