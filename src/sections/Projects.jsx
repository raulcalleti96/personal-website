import { useState, useEffect } from "react";

const GITHUB_USERNAME = "raulcalleti96"; // Reemplázalo con tu usuario real

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [languages, setLanguages] = useState({});
  const [selectedLanguage, setSelectedLanguage] = useState("All");
  const [readmes, setReadmes] = useState({});
  const [expandedReadmes, setExpandedReadmes] = useState({});
  const [loading, setLoading] = useState(true);
  const [availableLanguages, setAvailableLanguages] = useState(new Set());

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos`);

      if (!response.ok) {
        throw new Error(`GitHub API Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      if (!Array.isArray(data)) {
        throw new Error("GitHub API did not return an array of repositories.");
      }

      const sortedProjects = data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      setProjects(sortedProjects);
      setFilteredProjects(sortedProjects);
      fetchLanguages(sortedProjects);
      fetchReadmes(sortedProjects);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching GitHub repos:", error);
      setLoading(false);
    }
  };

  const fetchLanguages = async (repos) => {
    let langData = {};
    let langSet = new Set();

    for (let repo of repos) {
      try {
        const res = await fetch(repo.languages_url);
        if (!res.ok) throw new Error(`Failed to fetch languages for ${repo.name}`);

        const data = await res.json();
        langData[repo.name] = data || {}; // Evita que sea undefined

        Object.keys(data).forEach((lang) => langSet.add(lang));
      } catch (error) {
        console.error(`Error fetching languages for ${repo.name}:`, error);
        langData[repo.name] = {};
      }
    }

    setLanguages(langData);
    setAvailableLanguages(langSet);
  };

  const fetchReadmes = async (repos) => {
    let readmeData = {};
    for (let repo of repos) {
      try {
        const res = await fetch(`https://raw.githubusercontent.com/${GITHUB_USERNAME}/${repo.name}/main/README.md`);
        if (!res.ok) throw new Error(`No README found for ${repo.name}`);

        const text = await res.text();
        readmeData[repo.name] = text;
      } catch (error) {
        console.warn(`No README for ${repo.name}`);
        readmeData[repo.name] = "No README available.";
      }
    }
    setReadmes(readmeData);
  };

  const filterByLanguage = (language) => {
    setSelectedLanguage(language);
    if (language === "All") {
      setFilteredProjects(projects);
    } else {
      const filtered = projects.filter((project) =>
        Object.keys(languages[project.name] || {}).includes(language)
      );
      setFilteredProjects(filtered);
    }
  };

  return (
    <section className="min-h-screen bg-black text-white p-10">
      <h2 className="text-3xl font-bold text-center mb-6">🚀 My Projects</h2>

      {/* Filtros dinámicos */}
      <div className="flex flex-wrap justify-center space-x-3 mb-6">
        <button
          className={`px-4 py-2 rounded-lg transition ${
            selectedLanguage === "All" ? "bg-blue-500" : "bg-gray-700 hover:bg-gray-600"
          }`}
          onClick={() => filterByLanguage("All")}
        >
          All
        </button>
        {[...availableLanguages].map((lang) => (
          <button
            key={lang}
            className={`px-4 py-2 rounded-lg transition ${
              selectedLanguage === lang ? "bg-blue-500" : "bg-gray-700 hover:bg-gray-600"
            }`}
            onClick={() => filterByLanguage(lang)}
          >
            {lang}
          </button>
        ))}
      </div>

      {/* Grid de Proyectos */}
      {loading ? (
        <p className="text-center text-gray-400">Loading projects...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div key={project.id} className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
              <h3 className="text-xl font-semibold">{project.name}</h3>
              <p className="text-gray-400">{project.description || "No description provided."}</p>

              {/* Lenguajes */}
              {languages[project.name] && (
                <div className="mt-3">
                  <h4 className="text-gray-300 text-sm">Languages:</h4>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {Object.keys(languages[project.name]).map((lang) => (
                      <span
                        key={lang}
                        className="bg-blue-600/30 text-white text-xs px-3 py-1 rounded-lg shadow-md"
                      >
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Botones */}
              <div className="mt-4 flex justify-between">
                <a
                  href={project.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md"
                >
                  🔗 GitHub
                </a>
                <button
                  onClick={() =>
                    setExpandedReadmes((prev) => ({
                      ...prev,
                      [project.name]: !prev[project.name]
                    }))
                  }
                  className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md"
                >
                  📖 README
                </button>
              </div>

              {/* Mostrar README debajo (cerrado por defecto) */}
              {expandedReadmes[project.name] && readmes[project.name] && (
                <div className="mt-4 p-4 bg-gray-900 text-gray-300 rounded-lg max-h-60 overflow-y-auto">
                  <pre className="text-sm whitespace-pre-wrap">{readmes[project.name]}</pre>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Projects;