import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// Configuración de Firebase
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
const analytics = getAnalytics(app);
const db = getFirestore(app);


export { app, analytics, db };