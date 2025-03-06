export default function About() {
  return (
    <section className="relative min-h-screen bg-negro-mate text-blanco-suave flex items-center justify-center p-10">
      <div className="absolute flex items-center justify-center w-32 h-32 rounded-full bg-naranja-vibrante text-black font-bold text-xl cursor-pointer">
        {/* Contenido */}
      </div>
      <div className="absolute w-40 h-40 flex flex-col items-center justify-center rounded-xl bg-gris-medio text-center p-4 shadow-lg cursor-pointer">
        {/* Contenido */}
      </div>
      <div className="absolute w-80 h-60 bg-gris-medio p-6 rounded-xl shadow-2xl flex flex-col justify-center items-center">
        {/* Contenido */}
      </div>
      <button className="mt-4 px-4 py-2 bg-naranja-vibrante text-black rounded-full">
        {/* Botón */}
      </button>
    </section>
  );
}