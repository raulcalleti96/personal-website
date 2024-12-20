import {
  FaHtml5,
  FaCss3Alt,
  FaJsSquare,
  FaReact,
  FaNodeJs,
  FaJava,
  FaPython,
  FaGitAlt,
  FaAndroid,
  FaFileAlt,
} from "react-icons/fa";
import {
  SiTailwindcss,
  SiSass,
  SiMysql,
  SiPostgresql,
  SiDocker,
  SiDart,
  SiCplusplus,
  SiDotnet, // Usaremos este para C#
} from "react-icons/si";
import { DiMongodb } from "react-icons/di";

export const getLanguageIcon = (language) => {
  switch (language) {
    case "HTML":
      return <FaHtml5 className="text-red-600 text-3xl" />;
    case "CSS":
      return <FaCss3Alt className="text-blue-500 text-3xl" />;
    case "JavaScript":
      return <FaJsSquare className="text-yellow-500 text-3xl" />;
    case "React":
      return <FaReact className="text-blue-400 text-3xl" />;
    case "Node.js":
      return <FaNodeJs className="text-green-500 text-3xl" />;
    case "Java":
      return <FaJava className="text-red-600 text-3xl" />;
    case "Python":
      return <FaPython className="text-blue-400 text-3xl" />;
    case "Git":
      return <FaGitAlt className="text-gray-700 text-3xl" />;
    case "Android":
      return <FaAndroid className="text-green-600 text-3xl" />;
    case "TailwindCSS":
      return <SiTailwindcss className="text-teal-400 text-3xl" />;
    case "Sass":
      return <SiSass className="text-pink-400 text-3xl" />;
    case "MySQL":
      return <SiMysql className="text-blue-600 text-3xl" />;
    case "PostgreSQL":
      return <SiPostgresql className="text-blue-700 text-3xl" />;
    case "MongoDB":
      return <DiMongodb className="text-green-600 text-3xl" />;
    case "Docker":
      return <SiDocker className="text-blue-500 text-3xl" />;
    case "Dart":
      return <SiDart className="text-blue-400 text-3xl" />;
    case "Objective-C":
      return <SiCplusplus className="text-gray-700 text-3xl" />;
    case "RTF":
      return <FaFileAlt className="text-gray-600 text-3xl" />;
    case "SCSS":
      return <FaCss3Alt className="text-pink-400 text-3xl" />;
    case "C#":
      return <SiDotnet className="text-purple-500 text-3xl" />; // Usamos SiDotnet para C#
    default:
      return <span className="text-gray-500"></span>;
  }
};