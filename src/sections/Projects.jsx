import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export default function Projects() {
  const { t } = useTranslation();
  const [projects, setProjects] = useState([]);
  const [readmeVisible, setReadmeVisible] = useState(null);
  const [languages, setLanguages] = useState([]);
  const [selectedLang, setSelectedLang] = useState("All");

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("https://api.github.com/users/raulcalleti96/repos?sort=created");
      const data = await res.json();

      const techSet = new Set();

      const projectsWithReadme = await Promise.all(
        data.map(async (repo) => {
          const readmeRes = await fetch(`https://raw.githubusercontent.com/raulcalleti96/${repo.name}/main/README.md`);
          const readmeText = await readmeRes.ok ? await readmeRes.text() : "README not found.";
          techSet.add(repo.language);
          return {
            ...repo,
            readme: readmeText,
          };
        })
      );

      setProjects(projectsWithReadme);
      setLanguages(["All", ...Array.from(techSet).filter(Boolean)]);
    };

    fetchData();
  }, []);

  const filteredProjects = selectedLang === "All"
    ? projects
    : projects.filter((p) => p.language === selectedLang);

  return (
    <section className="min-h-[120vh] flex flex-col items-center justify-center text-white p-10 bg-gradient-to-b from-black via-gray-900 to-black">
      <h2 className="text-3xl font-bold mb-6">{t("projects.title")}</h2>

      {/* Filtros */}
      <div className="flex flex-wrap gap-3 mb-6">
        {languages.map((lang) => (
          <button
            key={lang}
            onClick={() => setSelectedLang(lang)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition border border-blue-500 ${
              selectedLang === lang ? "bg-blue-500 text-white" : "text-blue-300 hover:bg-blue-700"
            }`}
          >
            {lang === "All" ? t("projects.all") : lang}
          </button>
        ))}
      </div>

      {/* Lista de Proyectos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-7xl">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700 flex flex-col"
          >
            <div>
              <h3 className="text-xl font-bold mb-2">📦 {project.name}</h3>
              <p className="text-gray-300 mb-3">{project.description}</p>
              <p className="text-sm text-gray-400 mb-4">🚀 {project.language || "Unknown"}</p>
            </div>

            {/* Botón para mostrar README */}
            <button
              onClick={() =>
                setReadmeVisible(readmeVisible === project.id ? null : project.id)
              }
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition self-start"
            >
              {readmeVisible === project.id ? t("projects.hideReadme") : t("projects.readme")}
            </button>

            {/* README */}
            {readmeVisible === project.id && (
              <pre className="mt-4 bg-black/60 p-4 rounded-lg overflow-auto text-sm whitespace-pre-wrap max-h-96">
                {project.readme}
              </pre>
            )}

            {/* GitHub Link */}
            <a
              href={project.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 text-blue-400 hover:underline self-start"
            >
              {t("projects.github")}
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}