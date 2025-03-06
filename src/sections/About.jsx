import { motion } from "framer-motion";
import { useState } from "react";

function AboutMe() {
  const [selectedNode, setSelectedNode] = useState(null);

  const nodes = [
    {
      id: "laboral",
      title: "Lo Laboral",
      description:
        "Data Analyst en Elastic. Especialista en modelos de datos, AI y estrategias de negocio.",
      position: { x: "-40%", y: "-30%" },
    },
    {
      id: "personalidad",
      title: "Personalidad",
      description:
        "Analítico, detallista y siempre buscando mejorar. Puntos fuertes: liderazgo, resolución de problemas. Áreas a mejorar: delegar más.",
      position: { x: "40%", y: "-30%" },
    },
    {
      id: "hobbies",
      title: "Hobbies",
      description:
        "Me apasiona el tenis, la música (percusión y violín) y la aviación.",
      position: { x: "-40%", y: "30%" },
    },
    {
      id: "foto",
      title: "Sobre Mí",
      description: "Raúl Santiago Prieto, Data Analyst, con pasión por los datos y la tecnología.",
      position: { x: "40%", y: "30%" },
      isImage: true,
      image: "/path-to-your-photo.jpg", // Ruta de tu imagen
    },
  ];

  return (
    <section className="relative min-h-screen bg-[#1A1A1A] text-white flex items-center justify-center p-10">
      {/* Nodo Central */}
      <motion.div
        className="absolute flex items-center justify-center w-32 h-32 rounded-full bg-[#00FF99] text-black font-bold text-xl cursor-pointer"
        whileHover={{ scale: 1.1 }}
      >
        Raúl
      </motion.div>

      {/* Nodos Conectados */}
      {nodes.map((node) => (
        <motion.div
          key={node.id}
          className="absolute w-40 h-40 flex flex-col items-center justify-center rounded-xl bg-[#222] text-center p-4 shadow-lg cursor-pointer"
          style={{
            transform: `translate(${node.position.x}, ${node.position.y})`,
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.1 }}
          onClick={() => setSelectedNode(node)}
        >
          {node.isImage ? (
            <img
              src={node.image}
              alt="Raúl"
              className="w-full h-full object-cover rounded-lg"
            />
          ) : (
            <>
              <h3 className="text-lg font-semibold">{node.title}</h3>
              <p className="text-sm opacity-80 mt-2">{node.description}</p>
            </>
          )}
        </motion.div>
      ))}

      {/* Modal Expandible al Clic */}
      {selectedNode && (
        <motion.div
          className="absolute w-80 h-60 bg-[#333] p-6 rounded-xl shadow-2xl flex flex-col justify-center items-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
        >
          <h3 className="text-xl font-bold mb-2">{selectedNode.title}</h3>
          <p className="text-sm">{selectedNode.description}</p>
          <button
            onClick={() => setSelectedNode(null)}
            className="mt-4 px-4 py-2 bg-[#00FF99] text-black rounded-full"
          >
            Cerrar
          </button>
        </motion.div>
      )}
    </section>
  );
}

export default AboutMe;