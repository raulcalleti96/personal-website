import { useEffect, useState } from "react";

function Home() {
  const [greeting, setGreeting] = useState("");
  const [showGreeting, setShowGreeting] = useState(false);

  useEffect(() => {
    const getGreeting = () => {
      const currentHour = new Date().getHours();
      if (currentHour < 12) {
        setGreeting("Good Morning");
      } else if (currentHour < 18) {
        setGreeting("Good Afternoon");
      } else {
        setGreeting("Good Evening");
      }
      setShowGreeting(true);
      setTimeout(() => {
        setShowGreeting(false);
      }, 4000); // Desaparece el saludo después de 4 segundos
    };

    getGreeting();

    const handleScroll = () => {
      setShowGreeting(false); // Ocultar saludo al hacer scroll
    };
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#1A1A1A] m-0 p-0 overflow-hidden">
      {/* Saludo dinámico */}
      {showGreeting && (
        <div className="absolute top-4 right-4 bg-gray-800 text-white p-4 rounded-full shadow-xl animate-slideIn">
          <p className="text-lg font-semibold inline">{greeting}</p>
          <p className="text-sm inline ml-2">from the studio</p>
        </div>
      )}

      {/* Título con sombra elegante */}
      <h1 className="text-6xl font-bold text-center relative text-gray-100 mt-40">
        <span
          className="relative inline-block text-white"
          style={{
            animation: "textShadowEffect 3s ease-in-out 1",
          }}
        >
          Welcome to my web
          <span
            className="absolute bottom-0 left-0 w-full h-[2px] bg-transparent animate-underline"
            style={{
              animation: "underlineEffect 2s ease-in-out forwards",
            }}
          ></span>
        </span>
      </h1>

      <style>
        {`
          @keyframes slideIn {
            0% {
              opacity: 0;
              transform: translateX(100%);
            }
            100% {
              opacity: 1;
              transform: translateX(0);
            }
          }

          @keyframes textShadowEffect {
            0% {
              opacity: 0;
              text-shadow: none;
            }
            50% {
              opacity: 1;
              text-shadow: 2px 0px 5px rgba(255, 255, 255, 0.3), 4px 0px 10px rgba(255, 255, 255, 0.5);
            }
            100% {
              opacity: 1;
              text-shadow: 2px 0px 5px rgba(255, 255, 255, 0.3), 4px 0px 10px rgba(255, 255, 255, 0.5);
            }
          }

          @keyframes underlineEffect {
            0% {
              width: 0;
              background-color: transparent;
            }
            100% {
              width: 100%;
              background-color: rgba(255, 255, 255, 1); 
            }
          }
        `}
      </style>
    </div>
  );
}

export default Home;