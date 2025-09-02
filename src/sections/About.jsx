import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";


const About = () => {
  const {t} = useTranslation();
  const [selectedTab, setSelectedTab] = useState("experience");
  const [selectedItem, setSelectedItem] = useState(null);

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
    setSelectedItem(null);
  };

  const technologies = [
      {name: "Java", logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/java/java-original.svg", level: 85},

    {
      name: "Python",
      logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg",
      level: 85
    },
    {
      name: "SQL",
      logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original.svg",
      level: 85
    },
    {
      name: "JavaScript",
      logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg",
      level: 70
    },

    {name: "Firebase", logo: "https://www.vectorlogo.zone/logos/firebase/firebase-icon.svg", level: 80},
    {name: "Tailwind CSS", logo: "https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg", level: 70}

    ,{ name: "React",
      logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg",
      level: 50
    },
    {
      name: "Node.js",
      logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg",
      level: 50
    }

  ];

  const countriesVisited = [
    {name: "United States", coordinates: [-100.0, 37.0]},
    {name: "United Kingdom", coordinates: [-3.435, 55.378]},
    {name: "Ireland", coordinates: [-8.0, 53.5]},
    {name: "Portugal", coordinates: [-8.224, 39.399]},
    {name: "Spain", coordinates: [-3.749, 40.463]},
    {name: "France", coordinates: [2.2137, 46.603]},
    {name: "Germany", coordinates: [10.4515, 51.1657]},
    {name: "Switzerland", coordinates: [8.2275, 46.8182]},
    {name: "Italy", coordinates: [12.5674, 41.8719]},
    {name: "Greece", coordinates: [21.8243, 39.0742]},
    {name: "Croatia", coordinates: [15.2, 45.1]},
    {name: "Monaco", coordinates: [7.4246, 43.7384]},
    {name: "Vatican City", coordinates: [12.4534, 41.9029]},
    {name: "Poland", coordinates: [19.1451, 51.9194]},
    {name: "Slovenia", coordinates: [14.9955, 46.1512]},
    {name: "Slovakia", coordinates: [19.699, 48.669]},
    {name: "Austria", coordinates: [14.5501, 47.5162]},
    {name: "Tunisia", coordinates: [9.5375, 33.8869]},
    {name: "Turkey", coordinates: [35.2433, 38.9637]},
    {name: "Russia", coordinates: [105.3188, 61.524]},
    {name: "Andorra", coordinates: [1.5218, 42.5078]},
    {name: "Czech Republic", coordinates: [15.4729, 49.8175]}
  ];

  const experiences = [
    {
      id: "elastic",
      logo: "https://firebasestorage.googleapis.com/v0/b/personal-website-89a20.firebasestorage.app/o/images%2Felatic.jpg?alt=media&token=ad1cb1e9-6ca2-41ae-9c9b-68065452c31e",
      company: t("about.experience.0.company"),
      years: t("about.experience.0.years"),
      description: t("about.experience.0.description"),
      skills: t("about.experience.0.skills", {returnObjects: true}),
    },
    {
      id: "santander",
      logo: "https://firebasestorage.googleapis.com/v0/b/personal-website-89a20.firebasestorage.app/o/images%2Fsantander.png?alt=media&token=abc97ad5-88b7-4e03-85e6-7122be90d0ab",
      company: t("about.experience.1.company"),
      years: t("about.experience.1.years"),
      description: t("about.experience.1.description"),
      skills: t("about.experience.1.skills", {returnObjects: true}),
    },
    {
      id: "nttdata",
      logo: "https://firebasestorage.googleapis.com/v0/b/personal-website-89a20.firebasestorage.app/o/images%2Fntt.svg?alt=media&token=ef48f348-9397-4226-8aac-d23c448a236b",
      company: t("about.experience.2.company"),
      years: t("about.experience.2.years"),
      description: t("about.experience.2.description"),
      skills: t("about.experience.2.skills", {returnObjects: true}),
    },
    {
      id: "rfef",
      logo: "https://firebasestorage.googleapis.com/v0/b/personal-website-89a20.firebasestorage.app/o/images%2Frfef.png?alt=media&token=4f2f644a-bda2-4324-94c4-97d0c2dbd78f",
      company: t("about.experience.3.company"),
      years: t("about.experience.3.years"),
      description: t("about.experience.3.description"),
      skills: t("about.experience.3.skills", {returnObjects: true}),
    }
  ];

  const studies = [
    {
      id: "iu",
      logo: "https://firebasestorage.googleapis.com/v0/b/personal-website-89a20.firebasestorage.app/o/images%2Fiu.png?alt=media&token=083fe052-37b6-4b4e-b9c7-3775bb2a6520",
      institution: t("about.education.0.institution"),
      years: t("about.education.0.years"),
      description: t("about.education.0.title")
    },
    {
      id: "claudio-moyano-advanced",
      logo: "https://firebasestorage.googleapis.com/v0/b/personal-website-89a20.firebasestorage.app/o/images%2Ffp.jpeg?alt=media&token=4e0b16be-05e4-4b90-af20-352b58757dba",
      institution: t("about.education.1.institution"),
      years: t("about.education.1.years"),
      description: t("about.education.1.title")
    },
    {
      id: "violin",
      logo: "https://firebasestorage.googleapis.com/v0/b/personal-website-89a20.firebasestorage.app/o/images%2Fconservatorio.jpeg?alt=media&token=97f592c8-59b8-4829-9974-5e4ff83a49fd",
      institution: t("about.education.2.institution"),
      years: t("about.education.2.years"),
      description: t("about.education.2.title")
    },
    {
      id: "claudio-moyano-basic",
      logo: "https://firebasestorage.googleapis.com/v0/b/personal-website-89a20.firebasestorage.app/o/images%2Ffp.jpeg?alt=media&token=4e0b16be-05e4-4b90-af20-352b58757dba",
      institution: t("about.education.3.institution"),
      years: t("about.education.3.years"),
      description: t("about.education.3.title")
    },
    {
      id: "inlingua",
      logo: "https://firebasestorage.googleapis.com/v0/b/personal-website-89a20.firebasestorage.app/o/images%2Finlingua.png?alt=media&token=86e9caa7-0275-41c8-a4f5-d5a32a5f5d86", // Reemplaza por el logo correcto si tienes
      institution: t("about.education.4.institution"),
      years: t("about.education.4.years"),
      description: t("about.education.4.title")
    },
    {
      id: "bedmar",
      logo: "https://firebasestorage.googleapis.com/v0/b/personal-website-89a20.firebasestorage.app/o/images%2Fbedmar.jpg?alt=media&token=c0fb12be-12f3-45b2-9627-12dc75aab0d8",
      institution: t("about.education.5.institution"),
      years: t("about.education.5.years"),
      description: t("about.education.5.title")
    }
  ];

  const certifications = [
    {
      id: "cert-0",
      logo: "https://firebasestorage.googleapis.com/v0/b/personal-website-89a20.firebasestorage.app/o/images%2Flinkedin.png?alt=media&token=2fa00f68-78c1-4b77-9e34-06b6de6d074a",
      title: t("about.certifications.0.title"),
      institution: t("about.certifications.0.issuer"),
      years: "2024"
    },
    {
      id: "cert-1",
      logo: "https://firebasestorage.googleapis.com/v0/b/personal-website-89a20.firebasestorage.app/o/images%2Flinkedin.png?alt=media&token=2fa00f68-78c1-4b77-9e34-06b6de6d074a",
      title: t("about.certifications.1.title"),
      institution: t("about.certifications.1.issuer"),
      years: "2024"
    },
    {
      id: "cert-2",
      logo: "https://firebasestorage.googleapis.com/v0/b/personal-website-89a20.firebasestorage.app/o/images%2Flinkedin.png?alt=media&token=2fa00f68-78c1-4b77-9e34-06b6de6d074a",
      title: t("about.certifications.2.title"),
      institution: t("about.certifications.2.issuer"),
      years: "2024"
    },
    {
      id: "cert-3",
      logo: "https://firebasestorage.googleapis.com/v0/b/personal-website-89a20.firebasestorage.app/o/images%2Flinkedin.png?alt=media&token=2fa00f68-78c1-4b77-9e34-06b6de6d074a",
      title: t("about.certifications.3.title"),
      institution: t("about.certifications.3.issuer"),
      years: "2024"

    },
    {
      id: "cert-4",
      logo: "https://firebasestorage.googleapis.com/v0/b/personal-website-89a20.firebasestorage.app/o/images%2Flinkedin.png?alt=media&token=2fa00f68-78c1-4b77-9e34-06b6de6d074a",
      title: t("about.certifications.4.title"),
      institution: t("about.certifications.4.issuer"),
      years: "2024"
    },
    {
      id: "cert-5",
      logo: "https://firebasestorage.googleapis.com/v0/b/personal-website-89a20.firebasestorage.app/o/images%2Flinkedin.png?alt=media&token=2fa00f68-78c1-4b77-9e34-06b6de6d074a",
      title: t("about.certifications.5.title"),
      institution: t("about.certifications.5.issuer"),
      years: "2024"
    },
    {
      id: "cert-6",
      logo: "https://firebasestorage.googleapis.com/v0/b/personal-website-89a20.firebasestorage.app/o/images%2Fopenwebinars.jpg?alt=media&token=2b3cebdc-c983-48b8-8d51-bb252558c4a7",
      title: t("about.certifications.6.title"),
      institution: t("about.certifications.6.issuer"),
      years: "2024"
    },
    {
      id: "cert-7",
      logo: "https://firebasestorage.googleapis.com/v0/b/personal-website-89a20.firebasestorage.app/o/images%2Fdgt.jpg?alt=media&token=81d489ff-0704-42f0-bca0-188ddf40c7c9",
      title: t("about.certifications.7.title"),
      institution: t("about.certifications.7.issuer"),
      years: "2024"
    }
  ];
  return (
      <section
          className="min-h-[120vh] flex flex-col items-center justify-center text-white p-10 bg-gradient-to-b from-black via-gray-900 to-black">
        {/* Foto y Descripción */}
<div className="flex flex-col items-center mb-8 px-4 text-center">
  <motion.img
    src="https://firebasestorage.googleapis.com/v0/b/personal-website-89a20.firebasestorage.app/o/images%2Fperfil.jpeg?alt=media&token=5c680bdf-6124-405f-bf66-63d808e81975"
    alt="Raul Santiago"
    className="w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 rounded-full shadow-lg mb-4 border-4 border-gray-700"
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 1 }}
  />
  <motion.p
    className="text-sm sm:text-base md:text-lg max-w-md text-gray-300"
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1.2 }}
  >
    {t("about.description")}
  </motion.p>
</div>

        {/* Botones de Navegación */}
        <div className="flex flex-wrap gap-4 mb-6">
          {[
            {id: "experience", label: t("about.nav.experience")},
            {id: "education", label: t("about.nav.education")},
            {id: "technologies", label: t("about.nav.technologies")},
            {id: "certifications", label: t("about.nav.certifications")},
            {id: "hobbies", label: t("about.nav.hobbies")},
            {id: "strengths-weaknesses", label: t("about.nav.strengths_weaknesses")},
            {id: "cv", label: t("about.nav.cv")}
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
        {/* Tarjeta de detalles que aparece al hacer clic en una tecnologia */}
        {selectedTab === "Technologies" && (
            <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-6xl">
              {technologies.map((tech, index) => (
                  <div
                      key={index}
                      className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col items-center border border-gray-700"
                  >
                    <img
                        src={tech.logo}
                        alt={tech.name}
                        className="w-12 h-12 mb-4"
                    />
                    <h3 className="text-lg font-semibold mb-2 text-center">
                      {tech.name}
                    </h3>
                    <p className="text-sm text-gray-400 mb-2">{tech.level}%</p>
                    <div className="w-full bg-gray-700 rounded-full h-3">
                      <div
                          className="bg-blue-500 h-3 rounded-full"
                          style={{width: `${tech.level}%`}}
                      ></div>
                    </div>
                  </div>
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

                </div>
              </div>
            </motion.div>
        )}

        {selectedTab === "technologies" && (
  <motion.div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-6xl">
    {technologies.map((tech, index) => (
      <div
        key={index}
        className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col items-center border border-gray-700"
      >
        <img
          src={tech.logo}
          alt={tech.name}
          className="w-12 h-12 mb-4"
        />
        <h3 className="text-lg font-semibold mb-2 text-center">
          {tech.name}
        </h3>
        <p className="text-sm text-gray-400 mb-2">{tech.level}%</p>
        <div className="w-full bg-gray-700 rounded-full h-3">
          <div
            className="bg-blue-500 h-3 rounded-full"
            style={{ width: `${tech.level}%` }}
          ></div>
        </div>
      </div>
    ))}
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
                <img src="https://firebasestorage.googleapis.com/v0/b/personal-website-89a20.firebasestorage.app/o/images%2Ftenis.jpg?alt=media&token=84a6d6c1-766c-44b1-a699-e16dc919ea7a" alt="ITF World Tour"
                     className="w-16 h-16 rounded-full shadow-md border-2 border-gray-600"/>
                <h3 className="text-lg font-semibold text-center">{t("about.hobbies.tennis.title")}</h3>
              </motion.div>

              {/* Música */}
              <motion.div
                  className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col items-center gap-4 cursor-pointer hover:bg-gray-700 transition border-2 border-gray-700"
                  onClick={() => setSelectedItem(selectedItem === "music" ? null : "music")}
              >
                <img src="https://firebasestorage.googleapis.com/v0/b/personal-website-89a20.firebasestorage.app/o/images%2Fviolin.jpg?alt=media&token=bd194700-827d-470d-a22d-30c4a477f6d8" alt="Music Icon"
                     className="w-16 h-16 rounded-full shadow-md border-2 border-gray-600"/>
                <h3 className="text-lg font-semibold text-center">{t("about.hobbies.violin.title")}</h3>
              </motion.div>

              {/* Viajes */}
              <motion.div
                  className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col items-center gap-4 cursor-pointer hover:bg-gray-700 transition border-2 border-gray-700"
                  onClick={() => setSelectedItem(selectedItem === "travels" ? null : "travels")}
              >
                <img src="https://firebasestorage.googleapis.com/v0/b/personal-website-89a20.firebasestorage.app/o/images%2Favion.jpg?alt=media&token=9ffa3f88-4eb8-403a-88e9-41fa8c3639e5" alt="Travel Icon"
                     className="w-16 h-16 rounded-full shadow-md border-2 border-gray-600"/>
                <h3 className="text-lg font-semibold text-center">{t("about.hobbies.travels.title")}</h3>
              </motion.div>

              {/* Lectura */}
              <motion.div
                  className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col items-center gap-4 cursor-pointer hover:bg-gray-700 transition border-2 border-gray-700"
                  onClick={() => setSelectedItem(selectedItem === "reading" ? null : "reading")}
              >
                <img src="https://firebasestorage.googleapis.com/v0/b/personal-website-89a20.firebasestorage.app/o/images%2Fgoodreads.png?alt=media&token=9214f12b-01fb-4b03-92cb-f5e85da97460" alt="Goodreads"
                     className="w-16 h-16 rounded-full shadow-md border-2 border-gray-600"/>
                <h3 className="text-lg font-semibold text-center">{t("about.hobbies.reading.title")}</h3>
              </motion.div>

            </motion.div>
        )}

        {selectedItem === "tennis" && selectedTab === "hobbies" && (
            <motion.div
                className="bg-gray-900/90 p-6 rounded-lg shadow-xl border border-blue-500/50 hover:border-blue-500 transition-all duration-300 backdrop-blur-lg mt-6"
                initial={{opacity: 0, y: 10}}
                animate={{opacity: 1, y: 0}}
                exit={{opacity: 0, y: -10}}
            >
              <div className="grid grid-cols-3 gap-6 items-center">
                <div className="flex justify-center">
                  <img src="https://firebasestorage.googleapis.com/v0/b/personal-website-89a20.firebasestorage.app/o/images%2Fworldtour.jpeg?alt=media&token=aca02602-e4db-4923-a71d-4435b371ee26" alt="ITF World Tour"
                       className="w-20 h-20 rounded-full shadow-md border-4 border-gray-600"/>
                </div>
                <div className="col-span-2">
                  <h3 className="text-2xl font-bold text-white">{t("about.hobbies.tennis.title")}</h3>
                  <p className="mt-2 text-gray-300 text-md leading-relaxed">
                    {t("about.hobbies.tennis.description")}
                  </p>

                  {/* Enlaces */}
                  <div className="mt-4 flex flex-col gap-3">
                    <a href="https://clubdetenisyzamorapadel.com/" target="_blank" rel="noopener noreferrer"
                       className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-all flex items-center gap-2">
                      <img src="https://firebasestorage.googleapis.com/v0/b/personal-website-89a20.firebasestorage.app/o/images%2Fteniszamora.jpg?alt=media&token=23500242-43fd-49ac-a1e7-c5d9ae208d90" alt="Club Logo" className="w-6 h-6 rounded-full"/>
                      🏆 Club de Tenis y Pádel de Zamora
                    </a>
                    <a href="https://worldtennistour.itftennis.com/en/" target="_blank" rel="noopener noreferrer"
                       className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-all flex items-center gap-2">
                      <img src="https://firebasestorage.googleapis.com/v0/b/personal-website-89a20.firebasestorage.app/o/images%2Fworldtour.jpeg?alt=media&token=aca02602-e4db-4923-a71d-4435b371ee26" alt="ITF Logo" className="w-6 h-6 rounded-full"/>
                      🌍 ITF World Tour
                    </a>
                    <a href="https://worldtennisnumber.com/eng/player-profile?id=63d8d2b44c36da67b061d26c"
                       target="_blank" rel="noopener noreferrer"
                       className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-all flex items-center gap-2">
                      <img src="https://firebasestorage.googleapis.com/v0/b/personal-website-89a20.firebasestorage.app/o/images%2Fworldnumber.jpg?alt=media&token=2008873a-3da0-4250-82e5-51d95f3b583b" alt="ITF Number Logo" className="w-6 h-6 rounded-full"/>
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
                initial={{opacity: 0, y: 10}}
                animate={{opacity: 1, y: 0}}
                exit={{opacity: 0, y: -10}}
            >
              <h3 className="text-2xl font-bold text-white text-center mb-4">{t("about.hobbies.music.title")}</h3>

              {/* Contenedor en dos columnas */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* 🎻 Violín */}
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h4 className="text-xl font-semibold text-white">{t("about.hobbies.violin.title")}</h4>

                  <p className="text-gray-300 text-sm font-semibold">🎓 {t("about.hobbies.violin.education")}:</p>
                  <div className="mt-2 flex flex-col gap-3">
                    <a href="https://conservatoriomiguelmanzano.com" target="_blank" rel="noopener noreferrer"
                       className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-all flex items-center gap-2">
                      <img src="https://firebasestorage.googleapis.com/v0/b/personal-website-89a20.firebasestorage.app/o/images%2Fconservatorio.jpeg?alt=media&token=97f592c8-59b8-4829-9974-5e4ff83a49fd" alt="Conservatorio Miguel Manzano" className="w-6 h-6 rounded-full"/>
                      {t("about.hobbies.violin.education")}
                    </a>
                  </div>

                  {/* Orquesta */}
                  <p className="text-gray-300 text-sm font-semibold mt-4">🎼 {t("about.hobbies.music.wherePlayed")}:</p>
                  <div className="mt-2 flex flex-col gap-3">
                    <a href="https://conservatoriomiguelmanzano.com" target="_blank" rel="noopener noreferrer"
                       className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-all flex items-center gap-2">
                      <img src="https://firebasestorage.googleapis.com/v0/b/personal-website-89a20.firebasestorage.app/o/images%2Fconservatorio.jpeg?alt=media&token=97f592c8-59b8-4829-9974-5e4ff83a49fd" alt="Orquesta Conservatorio" className="w-6 h-6 rounded-full"/>
                      {t("about.hobbies.violin.wherePlayed")}
                    </a>
                  </div>
                </div>

                {/* 🥁 Percusión */}
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h4 className="text-xl font-semibold text-white">{t("about.hobbies.percussion.title")}</h4>

                  {/* Orquestas */}
                  <p className="text-gray-300 text-sm font-semibold">🎼 {t("about.hobbies.music.wherePlayed")}:</p>
                  <div className="mt-2 flex flex-col gap-3">
                    <a href="https://www.josva.es/" target="_blank" rel="noopener noreferrer"
                       className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-all flex items-center gap-2">
                      <img src="https://firebasestorage.googleapis.com/v0/b/personal-website-89a20.firebasestorage.app/o/images%2Fjosva.jpg?alt=media&token=709470c6-4085-43e8-97a4-d0069e0b2908" alt="JOSVA" className="w-6 h-6 rounded-full"/>
                      {t("about.hobbies.percussion.wherePlayed.0")}
                    </a>
                    <a href="https://cofradianuestramadre.com/" target="_blank" rel="noopener noreferrer"
                       className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-all flex items-center gap-2">
                      <img src="https://firebasestorage.googleapis.com/v0/b/personal-website-89a20.firebasestorage.app/o/images%2Fnuestramadre.png?alt=media&token=c547c46b-99bc-4650-90b8-80bf06e0ce98" alt="Banda Cofradía" className="w-6 h-6 rounded-full"/>
                      {t("about.hobbies.percussion.wherePlayed.1")}
                    </a>
                  </div>
                </div>

                {/* 🎹 Piano */}
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h4 className="text-xl font-semibold text-white">{t("about.hobbies.piano.title")}</h4>

                  {/* Educación - Conservatorio Miguel Manzano */}

                  <p className="text-gray-300 text-sm font-semibold">🎓 {t("about.hobbies.piano.education")}:</p>
                  <div className="mt-2 flex flex-col gap-3">
                    <a href="https://conservatoriomiguelmanzano.com" target="_blank" rel="noopener noreferrer"
                       className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-all flex items-center gap-2">
                      <img src="https://firebasestorage.googleapis.com/v0/b/personal-website-89a20.firebasestorage.app/o/images%2Fconservatorio.jpeg?alt=media&token=97f592c8-59b8-4829-9974-5e4ff83a49fd" alt="Conservatorio Miguel Manzano" className="w-6 h-6 rounded-full"/>
                      {t("about.hobbies.piano.education")}
                    </a>
                  </div>
                </div>

              </div>

              {/* Efecto Glow Sutil */}
              <div className="absolute inset-0 rounded-lg border border-blue-400 opacity-10 animate-pulse"></div>
            </motion.div>
        )}
        {selectedItem === "travels" && selectedTab === "hobbies" && (
            <motion.div
                className="bg-gray-900/90 p-6 rounded-lg shadow-xl border border-blue-500/50 hover:border-blue-500 transition-all duration-300 backdrop-blur-lg mt-6"
                initial={{opacity: 0, y: 10}}
                animate={{opacity: 1, y: 0}}
                exit={{opacity: 0, y: -10}}
            >
              {/* Título traducido */}
              <h3 className="text-2xl font-bold text-white text-center mb-4">
                {t("about.hobbies.travels.title")}
              </h3>

              {/* Lista de Países */}
              <div className="w-full max-w-2xl bg-gray-800 p-6 rounded-lg shadow-md mb-6">
                <h4 className="text-lg font-semibold text-white mb-2">
                  {t("about.hobbies.travels.listTitle")}
                </h4>
                <ul className="grid grid-cols-2 md:grid-cols-3 gap-2 text-gray-300 text-sm">
                  {countriesVisited.map(({name}) => (
                      <li key={name} className="flex items-center gap-2">
                        🌍 {t(`about.hobbies.travels.countries.${name}`)}
                      </li>
                  ))}
                </ul>
              </div>

              {/* Mapa Interactivo */}
              <div className="w-full max-w-3xl">
                <ComposableMap
                    projection="geoEqualEarth"
                    projectionConfig={{scale: 200}}
                    className="border border-gray-700 rounded-lg shadow-lg"
                >
                  <Geographies geography="https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json">
                    {({geographies}) =>
                        geographies.map((geo) => (
                            <Geography key={geo.rsmKey} geography={geo} fill="#333" stroke="#666"/>
                        ))
                    }
                  </Geographies>
                  {countriesVisited.map(({name, coordinates}) => (
                      <Marker key={name} coordinates={coordinates}>
                        <circle r={5} fill="#00aaff" stroke="#fff" strokeWidth={1.5}/>
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
                initial={{opacity: 0, y: 10}}
                animate={{opacity: 1, y: 0}}
                exit={{opacity: 0, y: -10}}
            >
              <h3 className="text-2xl font-bold text-white text-center mb-4">
                {t("about.hobbies.reading.title")}
              </h3>

              {/* Contenedor de contenido en dos columnas */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Descripción de la afición por la lectura */}
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h4 className="text-xl font-semibold text-white">
                    {t("about.hobbies.reading.myPassionTitle")}
                  </h4>
                  <p className="text-gray-300 text-md leading-relaxed mt-2">
                    {t("about.hobbies.reading.description")}
                  </p>
                </div>

                {/* Goodreads Profile */}
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h4 className="text-xl font-semibold text-white">
                    {t("about.hobbies.reading.goodreadsTitle")}
                  </h4>
                  <p className="text-gray-300 text-md leading-relaxed mt-2">
                    {t("about.hobbies.reading.goodreadsDescription")}
                  </p>
                  <div className="mt-4">
                    <a
                        href="https://www.goodreads.com/user/show/TU_USER_ID"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-all flex items-center gap-2"
                    >
                      <img src="https://firebasestorage.googleapis.com/v0/b/personal-website-89a20.firebasestorage.app/o/images%2Fgoodreads.png?alt=media&token=9214f12b-01fb-4b03-92cb-f5e85da97460" alt="Goodreads Logo" className="w-6 h-6 rounded-full"/>
                      📚 {t("about.hobbies.reading.goodreadsButton")}
                    </a>
                  </div>
                </div>
              </div>

              {/* Lista de Géneros */}
              <div className="p-4 bg-gray-800 rounded-lg mt-6">
                <h4 className="text-xl font-semibold text-white">{t("about.hobbies.reading.genresTitle")}</h4>
                <ul className="list-none flex flex-wrap gap-3 mt-2">
                  {t("about.hobbies.reading.genres", {returnObjects: true}).map((genre, index) => (
                      <li key={index} className="px-3 py-1 bg-blue-600/30 text-white text-sm rounded-lg shadow-md">
                        {genre}
                      </li>
                  ))}
                </ul>
              </div>

              {/* Efecto Glow Sutil */}
              <div className="absolute inset-0 rounded-lg border border-blue-400 opacity-10 animate-pulse"></div>
            </motion.div>
        )}
        {selectedTab === "strengths-weaknesses" && (
            <motion.div
                className="bg-gray-900/90 p-6 rounded-lg shadow-xl border border-blue-500/50 hover:border-blue-500 transition-all duration-300 backdrop-blur-lg mt-6"
                initial={{opacity: 0, y: 10}}
                animate={{opacity: 1, y: 0}}
                exit={{opacity: 0, y: -10}}
            >
              <h3 className="text-2xl font-bold text-white text-center mb-4">⚖️ Strengths & Weaknesses</h3>

              {/* Contenedor de dos columnas */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* 🟢 Strengths */}
              <div className="p-4 bg-gray-800 rounded-lg">
                <h4 className="text-xl font-semibold text-green-400">{t("about.strengthsWeaknesses.strengths.title")}</h4>
                <ul className="list-disc pl-6 text-gray-300 text-md leading-relaxed mt-2">
                  {t("about.strengthsWeaknesses.strengths.items", { returnObjects: true }).map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>

              {/* 🔴 Weaknesses */}
              <div className="p-4 bg-gray-800 rounded-lg">
                <h4 className="text-xl font-semibold text-red-400">{t("about.strengthsWeaknesses.weaknesses.title")}</h4>
                <ul className="list-disc pl-6 text-gray-300 text-md leading-relaxed mt-2">
                  {t("about.strengthsWeaknesses.weaknesses.items", { returnObjects: true }).map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
              </div>

              {/* Efecto Glow Sutil */}
              <div className="absolute inset-0 rounded-lg border border-blue-400 opacity-10 animate-pulse"></div>
            </motion.div>
        )}
        {selectedTab === "cv" && (
  <motion.div
    className="bg-gray-900/90 p-6 rounded-lg shadow-xl border border-blue-500/50 hover:border-blue-500 transition-all duration-300 backdrop-blur-lg mt-6 text-center"
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
  >
    <h3 className="text-2xl font-bold text-white mb-4">📄 {t("about.cv.title")}</h3>
    <p className="text-gray-300 mb-6">
      {t("about.cv.description")}
    </p>
    <a
      href="https://firebasestorage.googleapis.com/v0/b/personal-website-89a20.firebasestorage.app/o/documents%2Fraulsantiagocv.pdf?alt=media&token=0b20685e-b007-46f8-a9a5-c76c01f3fb76"
      target="_blank"
      rel="noopener noreferrer"
      className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition"
    >
      📥 {t("about.cv.download")}
    </a>
  </motion.div>
)}
      </section>

  );

};

export default About;