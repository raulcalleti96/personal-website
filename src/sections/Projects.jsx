import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { getLanguageIcon } from "../utils/getLanguageIcon";
import { FaGithub } from "react-icons/fa";
import ReactMarkdown from "react-markdown";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeReadme, setActiveReadme] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "projects"));
        const projectList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Ordenar los proyectos por fecha de actualización (descendente)
        const sortedProjects = projectList.sort((a, b) => {
          const dateA = new Date(a.updatedAt);
          const dateB = new Date(b.updatedAt);
          return dateB - dateA;
        });

        setProjects(sortedProjects);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleReadmeClick = async (project) => {
    if (activeReadme?.id === project.id) {
      setActiveReadme(null);
    } else {
      try {
        const response = await fetch(
          `https://raw.githubusercontent.com/${project.repoUrl.split("github.com/")[1]}/main/README.md`
        );
        const readmeText = await response.text();
        setActiveReadme({ id: project.id, content: readmeText });
      } catch (error) {
        console.error("Error fetching README:", error);
        setActiveReadme({ id: project.id, content: "README not available." });
      }
    }
  };

  if (loading) {
    return <div className="text-center text-xl text-white">Loading projects...</div>;
  }

  return (
    <div className="min-h-screen bg-[#1A1A1A] p-6">
      <h1 className="text-4xl font-bold text-center mb-8 text-white">
        My Projects
      </h1>
      <div className="flex flex-col gap-12">
        {projects.map((project, index) => (
          <div
            key={project.id}
            className={`flex flex-col lg:flex-row ${
              index % 2 === 0 ? "" : "lg:flex-row-reverse"
            } items-center gap-6`}
          >
            {/* Tarjeta del proyecto */}
            <div className="bg-[#121212] shadow-md rounded-lg p-6 w-full lg:w-1/2 text-white border border-gray-700">
              <h2 className="text-2xl font-semibold mb-2 text-white">
                {project.name}
              </h2>
              <p className="text-gray-400 mb-4">{project.description}</p>
              <div className="mb-4">
                <h3 className="text-lg font-medium text-white">Technologies:</h3>
                {project.technologies &&
                  Object.entries(project.technologies).map(
                    ([technology, percentage]) => (
                      <div key={technology} className="mb-2 flex items-center">
                        <div className="mr-2">{getLanguageIcon(technology)}</div>
                        <div className="flex-grow">
                          <div className="flex justify-between text-sm text-gray-300">
                            <span>{technology}</span>
                            <span>{percentage}%</span>
                          </div>
                          <div className="w-full bg-gray-700 h-2 rounded">
                            <div
                              className="bg-green-500 h-2 rounded"
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    )
                  )}
              </div>
              <div className="flex justify-between">
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-700 text-white font-semibold px-4 py-2 rounded shadow-lg hover:bg-gray-600 transition flex items-center"
                >
                  <FaGithub className="mr-2" /> GitHub
                </a>
                <button
                  className={`font-semibold px-4 py-2 rounded shadow-lg transition ${
                    activeReadme?.id === project.id
                      ? "bg-red-500 text-white hover:bg-red-400"
                      : "bg-gray-700 text-white hover:bg-gray-600"
                  }`}
                  onClick={() => handleReadmeClick(project)}
                >
                  {activeReadme?.id === project.id ? "Hide README" : "Show README"}
                </button>
              </div>
            </div>

            {/* Visualizador del README */}
            {activeReadme?.id === project.id && (
              <div className="bg-gray-800 border border-gray-600 rounded-lg p-6 w-full lg:w-1/2 max-h-96 overflow-auto shadow-md text-white">
                <h3 className="text-xl font-bold mb-4">{project.name} - README</h3>
                <ReactMarkdown className="prose prose-invert">{activeReadme.content}</ReactMarkdown>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Projects;