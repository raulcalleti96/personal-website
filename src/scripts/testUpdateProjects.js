import { getFirestore, collection, getDocs, setDoc, doc } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import fetch from "node-fetch"; // Asegúrate de instalarlo con `npm install node-fetch`

const firebaseConfig = {
  apiKey: "AIzaSyAIrWlHK-FtPhaBaOIePjep3OJC51PVoNc",
  authDomain: "personal-website-89a20.firebaseapp.com",
  projectId: "personal-website-89a20",
  storageBucket: "personal-website-89a20.firebasestorage.app",
  messagingSenderId: "553075463941",
  appId: "1:553075463941:web:a5183d42dca0329299496c",
  measurementId: "G-78HF7D6LT4",
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Configuración para la API de GitHub
const GITHUB_USERNAME = "raulcalleti96"; // Cambia por tu usuario de GitHub
const GITHUB_API_URL = `https://api.github.com/users/${GITHUB_USERNAME}/repos`;

// Función para obtener lenguajes del repositorio
const fetchRepoLanguages = async (repoName) => {
  const apiUrl = `https://api.github.com/repos/${GITHUB_USERNAME}/${repoName}/languages`;
  try {
    const response = await fetch(apiUrl);
    const languages = await response.json();

    const total = Object.values(languages).reduce((sum, value) => sum + value, 0);
    return Object.entries(languages).reduce((acc, [key, value]) => {
      acc[key] = ((value / total) * 100).toFixed(2); // Calcular porcentajes
      return acc;
    }, {});
  } catch (error) {
    console.error(`Error fetching languages for repo: ${repoName}`, error);
    return {};
  }
};

// Función principal
const syncGithubProjects = async () => {
  try {
    console.log("Fetching projects from Firestore...");
    const firestoreProjectsSnapshot = await getDocs(collection(db, "projects"));
    const firestoreProjects = firestoreProjectsSnapshot.docs.map((doc) => doc.data());

    console.log("Fetching projects from GitHub...");
    const response = await fetch(GITHUB_API_URL);
    const githubProjects = await response.json();

    if (!Array.isArray(githubProjects)) {
      throw new Error("GitHub API response is not an array.");
    }

    console.log(`Found ${githubProjects.length} projects on GitHub.`);

    for (const githubProject of githubProjects) {
      const existsInFirestore = firestoreProjects.some(
        (project) => project.repoUrl === githubProject.html_url
      );

      if (!existsInFirestore) {
        console.log(`Adding new project: ${githubProject.name}`);

        // Obtener lenguajes y porcentajes
        const technologies = await fetchRepoLanguages(githubProject.name);

        const newProject = {
          name: githubProject.name,
          description: githubProject.description || "No description provided.",
          repoUrl: githubProject.html_url,
          createdAt: githubProject.created_at,
          updatedAt: githubProject.updated_at,
          technologies, // Guardar tecnologías
        };

        await setDoc(doc(db, "projects", githubProject.name), newProject);
        console.log(`Project added: ${githubProject.name}`);
      } else {
        console.log(`Project already exists: ${githubProject.name}`);
      }
    }

    console.log("Sync complete!");
  } catch (error) {
    console.error("Error syncing projects:", error);
  }
};

// Llama a la función
syncGithubProjects();