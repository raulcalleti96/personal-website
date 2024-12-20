import { getFirestore, collection, getDocs, setDoc, doc } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import fetch from "node-fetch";

const firebaseConfig = {
  apiKey: "AIzaSyAIrWlHK-FtPhaBaOIePjep3OJC51PVoNc",
  authDomain: "personal-website-89a20.firebaseapp.com",
  projectId: "personal-website-89a20",
  storageBucket: "personal-website-89a20.firebasestorage.app",
  messagingSenderId: "553075463941",
  appId: "1:553075463941:web:a5183d42dca0329299496c",
  measurementId: "G-78HF7D6LT4",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const GITHUB_USERNAME = "raulcalleti96";
const GITHUB_API_URL = `https://api.github.com/users/${GITHUB_USERNAME}/repos`;

// Función para obtener lenguajes
const fetchRepoLanguages = async (repoName) => {
  const apiUrl = `https://api.github.com/repos/${GITHUB_USERNAME}/${repoName}/languages`;
  try {
    const response = await fetch(apiUrl);
    const languages = await response.json();

    const total = Object.values(languages).reduce((sum, value) => sum + value, 0);
    return Object.entries(languages).reduce((acc, [key, value]) => {
      acc[key] = ((value / total) * 100).toFixed(2);
      return acc;
    }, {});
  } catch (error) {
    console.error(`Error fetching languages for repo: ${repoName}`, error);
    return {};
  }
};

// Función para obtener el README
const fetchRepoReadme = async (repoName) => {
  const apiUrl = `https://api.github.com/repos/${GITHUB_USERNAME}/${repoName}/readme`;
  try {
    const response = await fetch(apiUrl, {
      headers: { Accept: "application/vnd.github.v3.raw" },
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch README for ${repoName}`);
    }
    return await response.text();
  } catch (error) {
    console.error(`Error fetching README for repo: ${repoName}`, error);
    return "README not available.";
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

        const technologies = await fetchRepoLanguages(githubProject.name);
        const readmeContent = await fetchRepoReadme(githubProject.name);

        const newProject = {
          name: githubProject.name,
          description: githubProject.description || "No description provided.",
          repoUrl: githubProject.html_url,
          createdAt: githubProject.created_at,
          updatedAt: githubProject.updated_at,
          technologies,
          readmeContent, // Guardar el contenido del README
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

syncGithubProjects();