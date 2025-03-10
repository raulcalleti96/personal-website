import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
import profilePic from "../assets/perfil.jpeg";
import santanderLogo from "../assets/santander.png";
import elasticLogo from "../assets/elastic-logo.png";
import claudioMoyanoLogo from "../assets/fp.jpeg";
import iuLogo from "../assets/iu.png";
import scrumMasterLogo from "../assets/scrumpo.png";
import scrumProductOwnerLogo from "../assets/scrumpo.png";
import salesforceLogo from "../assets/salesforce.png";
import conservatorio from "../assets/conservatorio.jpeg";
import josva from "../assets/josva.jpg";
import nuestramadre from "../assets/nuestramadre.png";
import itfworldtour from "../assets/worldtour.jpeg";
import itfworldnumber from "../assets/worldnumber.jpg";
import goodreadsLogo from "../assets/goodreads.png";
import libros from "../assets/libros.jpg.avif";
import avion from "../assets/avion.jpg";
import tenis from "../assets/tenis.jpg";
import violin from "../assets/violin.jpg";
import teniszamora from "../assets/teniszamora.jpg";




const About = () => {
  const [selectedTab, setSelectedTab] = useState("experience");
  const [selectedItem, setSelectedItem] = useState(null);

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
    setSelectedItem(null);
  };

  const imageMap = {
  santander: santanderLogo,
  elastic: elasticLogo,
  "claudio-moyano": claudioMoyanoLogo,
  iu: iuLogo,
  "scrum-master": scrumMasterLogo,
  "scrum-product-owner": scrumProductOwnerLogo,
  "salesforce-business-analyst": salesforceLogo,
  conservatorio: conservatorio,
  josva: josva,
  nuestramadre: nuestramadre,
  itfworldtour: itfworldtour,
  itfworldnumber: itfworldnumber,
  goodreads: goodreadsLogo,
    libros: libros,
    tenis: tenis,
    avion: avion,
    violin: violin,
    teniszamora: teniszamora

};
const countriesVisited = [
  { name: "United States", coordinates: [-100.0, 37.0] },
  { name: "United Kingdom", coordinates: [-3.435, 55.378] },
  { name: "Ireland", coordinates: [-8.0, 53.5] },
  { name: "Portugal", coordinates: [-8.224, 39.399] },
  { name: "Spain", coordinates: [-3.749, 40.463] },
  { name: "France", coordinates: [2.2137, 46.603] },
  { name: "Germany", coordinates: [10.4515, 51.1657] },
  { name: "Switzerland", coordinates: [8.2275, 46.8182] },
  { name: "Italy", coordinates: [12.5674, 41.8719] },
  { name: "Greece", coordinates: [21.8243, 39.0742] },
  { name: "Croatia", coordinates: [15.2, 45.1] },
  { name: "Monaco", coordinates: [7.4246, 43.7384] },
  { name: "Vatican City", coordinates: [12.4534, 41.9029] },
  { name: "Poland", coordinates: [19.1451, 51.9194] },
  { name: "Slovenia", coordinates: [14.9955, 46.1512] },
  { name: "Slovakia", coordinates: [19.699, 48.669] },
  { name: "Austria", coordinates: [14.5501, 47.5162] },
  { name: "Tunisia", coordinates: [9.5375, 33.8869] },
  { name: "Turkey", coordinates: [35.2433, 38.9637] },
  { name: "Russia", coordinates: [105.3188, 61.524] },
  { name: "Andorra", coordinates: [1.5218, 42.5078] },
  { name: "Czech Republic", coordinates: [15.4729, 49.8175] }
];

  const experiences = [
    {
      id: "santander",
      logo: santanderLogo,
      company: "Banco Santander",
      years: "2020 - 2023",
      description: "Worked in Data Analysis, Business Intelligence, and process automation.",
      skills: ["SQL", "BI Tools", "Automation"]
    },
    {
      id: "elastic",
      logo: elasticLogo,
      company: "Elastic",
      years: "2023 - 2024",
      description: "Focused on data analytics, business intelligence, and product insights.",
      skills: ["Data Analysis", "Business Intelligence", "Kibana"]
    }
  ];

  const studies = [
    {
      id: "claudio-moyano",
      logo: claudioMoyanoLogo,
      institution: "Claudio Moyano",
      years: "2014 - 2016",
      description: "Advanced Degree in Multiplatform Application Development.",
      skills: ["Java", "SQL", "Mobile Development"]
    },
    {
      id: "iu",
      logo: iuLogo,
      institution: "IU University",
      years: "2024 - Present",
      description: "Bachelor in Data Science.",
      skills: ["Data Analysis", "Machine Learning", "Statistics"]
    }
  ];

  const certifications = [
    {
      id: "scrum-master",
      logo: scrumMasterLogo,
      title: "Scrum Master (PSM I)",
      institution: "Scrum.org",
      years: "2024",
      description: "Professional Scrum Master certification, demonstrating agile project management skills.",
      skills: ["Agile Methodologies", "Scrum Framework", "Team Leadership"]
    },
    {
      id: "scrum-product-owner",
      logo: scrumProductOwnerLogo,
      title: "Scrum Product Owner (CSPO)",
      institution: "Scrum.org",
      years: "2024",
      description: "Certified Scrum Product Owner, focusing on product development and team coordination.",
      skills: ["Product Ownership", "Backlog Prioritization", "Stakeholder Communication"]
    },
    {
      id: "salesforce-business-analyst",
      logo: salesforceLogo,
      title: "Salesforce Business Analyst",
      institution: "Salesforce",
      years: "2024",
      description: "Salesforce Business Analyst certification focused on CRM, data insights, and process automation.",
      skills: ["CRM", "Data Analysis", "Process Automation"]
    }
  ];
const hobbies = [
  {
    id: "tennis",
    logo: itfworldtour, // Añadir logo
    title: "🎾 ITF World Tour",
    description: "Compito en el ITF World Tour como tenista profesional. Consulta mi perfil en la web oficial."
  },
  {
    id: "violin",
    logo: violin, // Añadir logo
    title: "🎻 Violin",
    description: "Toco el violín y he sido concertino en la orquesta del conservatorio."
  },
  {
    id: "percussion",
    logo: josva, // Añadir logo
    title: "🥁 Percussion",
    description: "He tocado en la JOSVA como percusionista y en la Banda de la Real Cofradía de Nuestra Madre de Zamora, siendo jefe de sección."
  },
  {
    id: "piano",
    logo: conservatorio, // Añadir logo
    title: "🎹 Piano",
    description: "Disfruto tocando el piano y explorando diferentes estilos musicales."
  }
];
  return (
      <section
          className="min-h-[120vh] flex flex-col items-center justify-center text-white p-10 bg-gradient-to-b from-black via-gray-900 to-black">
        {/* Foto y Descripción */}
        <div className="flex flex-col items-center mb-8">
          <motion.img
              src={profilePic}
              alt="Raul Santiago"
              className="w-40 h-40 rounded-full shadow-lg mb-4 border-4 border-gray-700"
              initial={{opacity: 0, scale: 0.8}}
              animate={{opacity: 1, scale: 1}}
              transition={{duration: 1}}
          />
          <motion.p
              className="text-lg text-center max-w-2xl text-gray-300"
              initial={{opacity: 0, y: 10}}
              animate={{opacity: 1, y: 0}}
              transition={{duration: 1.2}}
          >
            Passionate about data analysis, AI, and business intelligence. Experienced in transforming data into
            actionable insights.
          </motion.p>
        </div>

        {/* Botones de Navegación */}
        <div className="flex flex-wrap gap-4 mb-6">
          {[
            {id: "experience", label: "💼 Experience"},
            {id: "education", label: "📚 Education"},
            {id: "certifications", label: "🎓 Certifications"},
            {id: "hobbies", label: "🎻 Hobbies"},
            { id: "strengths-weaknesses", label: "⚖️ Strengths & Weaknesses" },
            { id: "cv", label: "📄 CV " }
          ].map((tab) => (
              <button
                  key={tab.id}
                  className={`px-6 py-3 rounded-lg font-semibold transition ${
                      selectedTab === tab.id ? "bg-blue-500 text-white" : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  }`}
                  onClick={() => handleTabChange(tab.id)}
              >
                {tab.label}
              </button>
          ))}
        </div>

        {/* Contenido de las Pestañas */}
        <div className="w-full max-w-3xl">
          <AnimatePresence>
            {selectedTab === "experience" && (
                <motion.div className="grid grid-cols-2 gap-6">
                  {experiences.map((exp) => (
                      <motion.div
                          key={exp.id}
                          className="bg-gray-800 p-6 rounded-lg shadow-lg flex items-center gap-4 cursor-pointer hover:bg-gray-700 transition border-2 border-gray-700"
                          onClick={() => setSelectedItem(exp.id === selectedItem ? null : exp.id)}
                      >
                        <img src={exp.logo} alt={exp.company}
                             className="w-16 h-16 rounded-full shadow-md border-2 border-gray-600"/>
                        <div>
                          <h3 className="text-lg font-semibold">{exp.company}</h3>
                          <p className="text-gray-400">{exp.years}</p>
                        </div>
                      </motion.div>
                  ))}
                </motion.div>
            )}

            {/* Tarjeta de detalles que aparece al hacer clic en una empresa */}
            {selectedItem && selectedTab === "experience" && (
                <motion.div
                    className="bg-gray-900/90 p-6 rounded-lg shadow-xl border border-blue-500/50 hover:border-blue-500 transition-all duration-300 backdrop-blur-lg mt-6"
                    initial={{opacity: 0, y: 10}}
                    animate={{opacity: 1, y: 0}}
                    exit={{opacity: 0, y: -10}}
                >
                  <div className="grid grid-cols-3 gap-6 items-center">
                    <div className="flex justify-center">
                      <img
                          src={experiences.find((exp) => exp.id === selectedItem)?.logo}
                          alt="Company Logo"
                          className="w-20 h-20 rounded-full shadow-md border-4 border-gray-600"
                      />
                    </div>
                    <div className="col-span-2">
                      <h3 className="text-2xl font-bold text-white">
                        {experiences.find((exp) => exp.id === selectedItem)?.company}
                      </h3>
                      <p className="text-gray-400 text-sm italic">
                        {experiences.find((exp) => exp.id === selectedItem)?.years}
                      </p>
                      <p className="mt-2 text-gray-300 text-md leading-relaxed">
                        {experiences.find((exp) => exp.id === selectedItem)?.description}
                      </p>

                      {/* Skills con iconos */}
                      <h4 className="mt-4 font-semibold text-white flex items-center">
                        <span className="mr-2">🚀 Skills:</span>
                      </h4>
                      <ul className="list-none flex flex-wrap gap-3 mt-2">
                        {experiences.find((exp) => exp.id === selectedItem)?.skills.map((skill, index) => (
                            <li key={index}
                                className="px-3 py-1 bg-blue-600/30 text-white text-sm rounded-lg shadow-md">
                              {skill}
                            </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
            )}
          </AnimatePresence>
        </div>
        {/* Contenido de Educación */}
        {selectedTab === "education" && (
            <motion.div className="grid grid-cols-2 gap-6">
              {studies.map((study) => (
                  <motion.div
                      key={study.id}
                      className="bg-gray-800 p-6 rounded-lg shadow-lg flex items-center gap-4 cursor-pointer hover:bg-gray-700 transition border-2 border-gray-700"
                      onClick={() => setSelectedItem(study.id === selectedItem ? null : study.id)}
                  >
                    <img src={study.logo} alt={study.institution}
                         className="w-16 h-16 rounded-full shadow-md border-2 border-gray-600"/>
                    <div>
                      <h3 className="text-lg font-semibold">{study.institution}</h3>
                      <p className="text-gray-400">{study.years}</p>
                    </div>
                  </motion.div>
              ))}
            </motion.div>
        )}

        {/* Tarjeta de detalles que aparece al hacer clic en una institución educativa */}
        {selectedItem && selectedTab === "education" && (
            <motion.div
                className="bg-gray-900/90 p-6 rounded-lg shadow-xl border border-blue-500/50 hover:border-blue-500 transition-all duration-300 backdrop-blur-lg mt-6"
                initial={{opacity: 0, y: 10}}
                animate={{opacity: 1, y: 0}}
                exit={{opacity: 0, y: -10}}
            >
              <div className="grid grid-cols-3 gap-6 items-center">
                <div className="flex justify-center">
                  <img
                      src={studies.find((study) => study.id === selectedItem)?.logo}
                      alt="Institution Logo"
                      className="w-20 h-20 rounded-full shadow-md border-4 border-gray-600"
                  />
                </div>
                <div className="col-span-2">
                  <h3 className="text-2xl font-bold text-white">
                    {studies.find((study) => study.id === selectedItem)?.institution}
                  </h3>
                  <p className="text-gray-400 text-sm italic">
                    {studies.find((study) => study.id === selectedItem)?.years}
                  </p>
                  <p className="mt-2 text-gray-300 text-md leading-relaxed">
                    {studies.find((study) => study.id === selectedItem)?.description}
                  </p>

                  {/* Skills con iconos */}
                  <h4 className="mt-4 font-semibold text-white flex items-center">
                    <span className="mr-2">📚 Subjects:</span>
                  </h4>
                  <ul className="list-none flex flex-wrap gap-3 mt-2">
                    {studies.find((study) => study.id === selectedItem)?.skills.map((skill, index) => (
                        <li key={index} className="px-3 py-1 bg-blue-600/30 text-white text-sm rounded-lg shadow-md">
                          {skill}
                        </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
        )}
        {/* Contenido de Certificaciones */}
        {selectedTab === "certifications" && (
            <motion.div className="grid grid-cols-2 gap-6">
              {certifications.map((cert) => (
                  <motion.div
                      key={cert.id}
                      className="bg-gray-800 p-6 rounded-lg shadow-lg flex items-center gap-4 cursor-pointer hover:bg-gray-700 transition border-2 border-gray-700"
                      onClick={() => setSelectedItem(cert.id === selectedItem ? null : cert.id)}
                  >
                    <img src={cert.logo} alt={cert.title}
                         className="w-16 h-16 rounded-full shadow-md border-2 border-gray-600"/>
                    <div>
                      <h3 className="text-lg font-semibold">{cert.title}</h3>
                      <p className="text-gray-400">{cert.institution}</p>
                      <p className="text-gray-400 text-sm">{cert.years}</p>
                    </div>
                  </motion.div>
              ))}
            </motion.div>
        )}

        {/* Tarjeta de detalles que aparece al hacer clic en una certificación */}
        {selectedItem && selectedTab === "certifications" && (
            <motion.div
                className="bg-gray-900/90 p-6 rounded-lg shadow-xl border border-blue-500/50 hover:border-blue-500 transition-all duration-300 backdrop-blur-lg mt-6"
                initial={{opacity: 0, y: 10}}
                animate={{opacity: 1, y: 0}}
                exit={{opacity: 0, y: -10}}
            >
              <div className="grid grid-cols-3 gap-6 items-center">
                {/* Logo de la certificación */}
                <div className="flex justify-center">
                  <img
                      src={certifications.find((cert) => cert.id === selectedItem)?.logo}
                      alt="Certification Logo"
                      className="w-20 h-20 rounded-full shadow-md border-4 border-gray-600"
                  />
                </div>

                {/* Texto principal */}
                <div className="col-span-2">
                  <h3 className="text-2xl font-bold text-white">
                    {certifications.find((cert) => cert.id === selectedItem)?.title}
                  </h3>
                  <p className="text-gray-400 text-sm italic">
                    {certifications.find((cert) => cert.id === selectedItem)?.institution}
                  </p>
                  <p className="text-gray-400 text-sm italic">
                    {certifications.find((cert) => cert.id === selectedItem)?.years}
                  </p>
                  <p className="mt-2 text-gray-300 text-md leading-relaxed">
                    {certifications.find((cert) => cert.id === selectedItem)?.description}
                  </p>

                  {/* Skills con iconos */}
                  <h4 className="mt-4 font-semibold text-white flex items-center">
                    <span className="mr-2">📜 Skills:</span>
                  </h4>
                  <ul className="list-none flex flex-wrap gap-3 mt-2">
                    {certifications.find((cert) => cert.id === selectedItem)?.skills.map((skill, index) => (
                        <li key={index} className="px-3 py-1 bg-blue-600/30 text-white text-sm rounded-lg shadow-md">
                          {skill}
                        </li>
                    ))}
                  </ul>

                  {/* Botón de Descarga */}
                  <div className="mt-6">
                    <button
                        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-all"
                    >
                      📥 Download Certificate
                    </button>
                  </div>
                </div>
              </div>

              {/* Efecto Glow Sutil */}
              <div className="absolute inset-0 rounded-lg border border-blue-400 opacity-10 animate-pulse"></div>
            </motion.div>
        )}
   {/* Botón de Hobbies */}
{/* Contenedor de Hobbies en una fila */}
{selectedTab === "hobbies" && (
  <motion.div className="grid grid-cols-4 gap-6 justify-center">

    {/* Tenis */}
    <motion.div
      className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col items-center gap-4 cursor-pointer hover:bg-gray-700 transition border-2 border-gray-700"
      onClick={() => setSelectedItem(selectedItem === "tennis" ? null : "tennis")}
    >
      <img src={tenis} alt="ITF World Tour" className="w-16 h-16 rounded-full shadow-md border-2 border-gray-600" />
      <h3 className="text-lg font-semibold text-center">🎾 Tennis</h3>
    </motion.div>

    {/* Música */}
    <motion.div
      className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col items-center gap-4 cursor-pointer hover:bg-gray-700 transition border-2 border-gray-700"
      onClick={() => setSelectedItem(selectedItem === "music" ? null : "music")}
    >
      <img src={violin} alt="Music Icon" className="w-16 h-16 rounded-full shadow-md border-2 border-gray-600" />
      <h3 className="text-lg font-semibold text-center">🎼 Music</h3>
    </motion.div>

    {/* Viajes */}
    <motion.div
      className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col items-center gap-4 cursor-pointer hover:bg-gray-700 transition border-2 border-gray-700"
      onClick={() => setSelectedItem(selectedItem === "travels" ? null : "travels")}
    >
      <img src={avion} alt="Travel Icon" className="w-16 h-16 rounded-full shadow-md border-2 border-gray-600" />
      <h3 className="text-lg font-semibold text-center">✈️ Travels</h3>
    </motion.div>

    {/* Lectura */}
    <motion.div
      className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col items-center gap-4 cursor-pointer hover:bg-gray-700 transition border-2 border-gray-700"
      onClick={() => setSelectedItem(selectedItem === "reading" ? null : "reading")}
    >
      <img src={goodreadsLogo} alt="Goodreads" className="w-16 h-16 rounded-full shadow-md border-2 border-gray-600" />
      <h3 className="text-lg font-semibold text-center">📚 Reading</h3>
    </motion.div>

  </motion.div>
)}

{/* Detalles de Tenis */}
{selectedItem === "tennis" && selectedTab === "hobbies" && (
  <motion.div
    className="bg-gray-900/90 p-6 rounded-lg shadow-xl border border-blue-500/50 hover:border-blue-500 transition-all duration-300 backdrop-blur-lg mt-6"
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}

  >
    <div className="grid grid-cols-3 gap-6 items-center">
      <div className="flex justify-center">
        <img src={itfworldtour} alt="ITF World Tour" className="w-20 h-20 rounded-full shadow-md border-4 border-gray-600" />
      </div>
      <div className="col-span-2">
        <h3 className="text-2xl font-bold text-white">🎾 Tennis</h3>
        <p className="mt-2 text-gray-300 text-md leading-relaxed">
          I compete in the ITF World Tour. Check out my profile below.
        </p>

        {/* Enlaces */}
        <div className="mt-4 flex flex-col gap-3">
          <a href="https://clubdetenisyzamorapadel.com/" target="_blank" rel="noopener noreferrer"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-all flex items-center gap-2">
            <img src={teniszamora} alt="Club Logo" className="w-6 h-6 rounded-full" />
            🏆 Club de Tenis y Pádel de Zamora
          </a>
          <a href="https://worldtennistour.itftennis.com/en/" target="_blank" rel="noopener noreferrer"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-all flex items-center gap-2">
            <img src={itfworldtour} alt="ITF Logo" className="w-6 h-6 rounded-full" />
            🌍 ITF World Tour
          </a>
          <a href="https://worldtennisnumber.com/eng/player-profile?id=63d8d2b44c36da67b061d26c" target="_blank" rel="noopener noreferrer"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-all flex items-center gap-2">
            <img src={itfworldnumber} alt="ITF Number Logo" className="w-6 h-6 rounded-full" />
            🎾 ITF World Number
          </a>
        </div>
      </div>
    </div>
  </motion.div>
)}

{/* Detalles de Música en 2 Columnas */}
{selectedItem === "music" && selectedTab === "hobbies" && (
  <motion.div
    className="bg-gray-900/90 p-6 rounded-lg shadow-xl border border-blue-500/50 hover:border-blue-500 transition-all duration-300 backdrop-blur-lg mt-6"
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
  >
    <h3 className="text-2xl font-bold text-white text-center mb-4">🎼 Music</h3>

    {/* Contenedor en dos columnas */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

      {/* 🎻 Violín */}
      <div className="p-4 bg-gray-800 rounded-lg">
        <h4 className="text-xl font-semibold text-white">🎻 Violin</h4>

        {/* Educación - Conservatorio Miguel Manzano */}
        <p className="text-gray-300 text-sm font-semibold">🎓 Education:</p>
        <div className="mt-2 flex flex-col gap-3">
          <a href="https://conservatoriomiguelmanzano.com" target="_blank" rel="noopener noreferrer"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-all flex items-center gap-2">
            <img src={conservatorio} alt="Conservatorio Miguel Manzano" className="w-6 h-6 rounded-full" />
            🎼 Conservatorio Miguel Manzano (Zamora)
          </a>
        </div>

        {/* Orquesta */}
        <p className="text-gray-300 text-sm font-semibold mt-4">🎼 Where I've played:</p>
        <div className="mt-2 flex flex-col gap-3">
          <a href="https://conservatoriomiguelmanzano.com" target="_blank" rel="noopener noreferrer"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-all flex items-center gap-2">
            <img src={conservatorio} alt="Orquesta Conservatorio" className="w-6 h-6 rounded-full" />
            🎻 Orquesta del Conservatorio (Concertino) (2021 - Present)
          </a>
        </div>
      </div>

      {/* 🥁 Percusión */}
      <div className="p-4 bg-gray-800 rounded-lg">
        <h4 className="text-xl font-semibold text-white">🥁 Percussion</h4>

        {/* Orquestas */}
        <p className="text-gray-300 text-sm font-semibold">🎼 Where I've played:</p>
        <div className="mt-2 flex flex-col gap-3">
          <a href="https://www.josva.es/" target="_blank" rel="noopener noreferrer"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-all flex items-center gap-2">
            <img src={josva} alt="JOSVA" className="w-6 h-6 rounded-full" />
            🎼 Joven Orquesta Sinfónica de Valladolid (2022)
          </a>
          <a href="https://cofradianuestramadre.com/" target="_blank" rel="noopener noreferrer"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-all flex items-center gap-2">
            <img src={nuestramadre} alt="Banda Cofradía" className="w-6 h-6 rounded-full" />
            🥁 Banda de la Cofradía de Nuestra Madre de Zamora (2022 - Present)
          </a>
        </div>
      </div>

      {/* 🎹 Piano */}
      <div className="p-4 bg-gray-800 rounded-lg">
        <h4 className="text-xl font-semibold text-white">🎹 Piano</h4>

        {/* Educación - Conservatorio Miguel Manzano */}
        <p className="text-gray-300 text-sm font-semibold">🎓 Education:</p>
        <div className="mt-2 flex flex-col gap-3">
          <a href="https://conservatoriomiguelmanzano.com" target="_blank" rel="noopener noreferrer"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-all flex items-center gap-2">
            <img src={conservatorio} alt="Conservatorio Miguel Manzano" className="w-6 h-6 rounded-full" />
            🎼 Conservatorio Miguel Manzano (2024 - Present)
          </a>
        </div>
      </div>

    </div>

    {/* Efecto Glow Sutil */}
    <div className="absolute inset-0 rounded-lg border border-blue-400 opacity-10 animate-pulse"></div>
  </motion.div>
)}
{/* Detalles de Viajes */}
{selectedItem === "travels" && selectedTab === "hobbies" && (
  <motion.div
    className="bg-gray-900/90 p-6 rounded-lg shadow-xl border border-blue-500/50 hover:border-blue-500 transition-all duration-300 backdrop-blur-lg mt-6"
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
  >
    <h3 className="text-2xl font-bold text-white text-center mb-4">✈️ Countries I've Visited</h3>

    {/* Lista de Países */}
    <div className="w-full max-w-2xl bg-gray-800 p-6 rounded-lg shadow-md mb-6">
      <h4 className="text-lg font-semibold text-white mb-2">🌍 List of Countries</h4>
      <ul className="grid grid-cols-2 md:grid-cols-3 gap-2 text-gray-300 text-sm">
        {countriesVisited.map(({ name }) => (
          <li key={name} className="flex items-center gap-2">
            🌍 {name}
          </li>
        ))}
      </ul>
    </div>

    {/* Mapa Interactivo */}
    <div className="w-full max-w-3xl">
      <ComposableMap
        projection="geoEqualEarth"
        projectionConfig={{ scale: 200 }}
        className="border border-gray-700 rounded-lg shadow-lg"
      >
        <Geographies geography="https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json">
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography key={geo.rsmKey} geography={geo} fill="#333" stroke="#666" />
            ))
          }
        </Geographies>
        {countriesVisited.map(({ name, coordinates }) => (
          <Marker key={name} coordinates={coordinates}>
            <circle r={5} fill="#00aaff" stroke="#fff" strokeWidth={1.5} />
          </Marker>
        ))}
      </ComposableMap>
    </div>
  </motion.div>
)}
        {/* Detalles de Lectura */}
{selectedItem === "reading" && selectedTab === "hobbies" && (
  <motion.div
    className="bg-gray-900/90 p-6 rounded-lg shadow-xl border border-blue-500/50 hover:border-blue-500 transition-all duration-300 backdrop-blur-lg mt-6"
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
  >
    <h3 className="text-2xl font-bold text-white text-center mb-4">📚 Reading</h3>

    {/* Contenedor de contenido en dos columnas */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

      {/* Descripción de la afición por la lectura */}
      <div className="p-4 bg-gray-800 rounded-lg">
        <h4 className="text-xl font-semibold text-white">📖 My Passion for Books</h4>
        <p className="text-gray-300 text-md leading-relaxed mt-2">
          I love reading books that challenge my thinking and help me grow.
          From technology and data science to history and philosophy, I enjoy
          discovering new perspectives and ideas.
        </p>
      </div>

      {/* Goodreads Profile */}
      <div className="p-4 bg-gray-800 rounded-lg">
        <h4 className="text-xl font-semibold text-white">🌍 My Goodreads</h4>
        <p className="text-gray-300 text-md leading-relaxed mt-2">
          Explore my reading history, current reads, and favorite books.
        </p>
        <div className="mt-4">
          <a
            href="https://www.goodreads.com/user/show/TU_USER_ID"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-all flex items-center gap-2"
          >
            <img src={goodreadsLogo} alt="Goodreads Logo" className="w-6 h-6 rounded-full" />
            📚 Visit My Goodreads Profile
          </a>
        </div>
      </div>

      {/* Lista de Géneros */}
      <div className="p-4 bg-gray-800 rounded-lg col-span-2">
        <h4 className="text-xl font-semibold text-white">📖 Favorite Genres</h4>
        <ul className="list-none flex flex-wrap gap-3 mt-2">
          {["Data Science", "Technology", "History", "Philosophy", "Science Fiction", "Personal Growth"].map((genre, index) => (
            <li key={index} className="px-3 py-1 bg-blue-600/30 text-white text-sm rounded-lg shadow-md">
              {genre}
            </li>
          ))}
        </ul>
      </div>
    </div>

    {/* Efecto Glow Sutil */}
    <div className="absolute inset-0 rounded-lg border border-blue-400 opacity-10 animate-pulse"></div>
  </motion.div>
)}{selectedTab === "strengths-weaknesses" && (
  <motion.div
    className="bg-gray-900/90 p-6 rounded-lg shadow-xl border border-blue-500/50 hover:border-blue-500 transition-all duration-300 backdrop-blur-lg mt-6"
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
  >
    <h3 className="text-2xl font-bold text-white text-center mb-4">⚖️ Strengths & Weaknesses</h3>

    {/* Contenedor de dos columnas */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

      {/* 🟢 Strengths */}
      <div className="p-4 bg-gray-800 rounded-lg">
        <h4 className="text-xl font-semibold text-green-400">💪 Strengths</h4>
        <ul className="list-disc pl-6 text-gray-300 text-md leading-relaxed mt-2">
          <li>Analytical Thinking</li>
          <li>Problem-Solving</li>
          <li>Leadership</li>
          <li>Fast Learning</li>
          <li>Adaptability</li>
          <li>Attention to Detail</li>
        </ul>
      </div>

      {/* 🔴 Weaknesses */}
      <div className="p-4 bg-gray-800 rounded-lg">
        <h4 className="text-xl font-semibold text-red-400">⚠️ Weaknesses</h4>
        <ul className="list-disc pl-6 text-gray-300 text-md leading-relaxed mt-2">
          <li>Perfectionism</li>
          <li>Sometimes Overthinking</li>
          <li>Impatience with Slow Processes</li>
          <li>Difficulty Delegating Tasks</li>
        </ul>
      </div>

    </div>

    {/* Efecto Glow Sutil */}
    <div className="absolute inset-0 rounded-lg border border-blue-400 opacity-10 animate-pulse"></div>
  </motion.div>
)}
      </section>

  );
};

export default About;