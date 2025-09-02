import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next"; // 🔁 Importar traducción

const mediumLogo = "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Medium_logo_Monogram.svg/768px-Medium_logo_Monogram.svg.png";
const substackLogo = "https://play-lh.googleusercontent.com/RoI_bifQ0eWgWqOg4cpbx7Bm8eFkBEml42htao3-_3aZb7xWFhZPbImflNT5bV3Kfnk";

export default function Articles() {
  const [articles, setArticles] = useState({ medium: [], substack: [] });
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation(); // ⚠️ hook de traducción

  useEffect(() => {
    async function fetchArticles() {
      try {
        const response = await fetch("https://raulcalleti96.github.io/medium-substack-sync/articles.json");
        if (!response.ok) throw new Error("Failed to fetch articles");
        const data = await response.json();
        setArticles(data);
      } catch (error) {
        console.error("Error fetching articles:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchArticles();
  }, []);

  if (loading) {
    return <p className="text-center text-gray-400">📡 {t("articles.loading")}</p>;
  }

  if (!articles.medium.length && !articles.substack.length) {
    return <p className="text-center text-gray-400">🚫 {t("articles.empty")}</p>;
  }

  const cleanDescription = (html) => {
    if (!html) return "";
    return html.replace(/<[^>]*>/g, "").split(". ").slice(0, 2).join(". ") + ".";
  };

  const extractImage = (html) => {
    if (!html) return null;
    const match = html.match(/<img.*?src=["'](.*?)["']/);
    return match ? match[1] : null;
  };

  const getCategoryEmoji = (title) => {
    if (/data science|ai|machine learning|big data/i.test(title)) return "📊";
    if (/business|management|product/i.test(title)) return "💼";
    if (/tennis|sports/i.test(title)) return "🎾";
    if (/travel|trip|explore/i.test(title)) return "✈️";
    return "📝";
  };

  return (
    <section className="min-h-[120vh] flex flex-col items-center justify-center text-white p-10 bg-gradient-to-b from-black via-gray-900 to-black">
      <h1 className="text-3xl font-bold text-center mb-6">{t("articles.title")}</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...(articles.medium || []), ...(articles.substack || [])].map((article, index) => {
          const platform = article.link.includes("medium") ? "Medium" : "Substack";
          const logo = platform === "Medium" ? mediumLogo : substackLogo;
          const imageUrl = extractImage(article.description);

          return (
            <div key={index} className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700 flex flex-col justify-between">
              <div>
                <h2 className="text-xl font-bold mb-2">
                  {article.title} {getCategoryEmoji(article.title)}
                </h2>

                {imageUrl && (
                  <img src={imageUrl} alt="Article" className="w-full h-40 object-cover rounded-lg mb-4 border border-gray-600 shadow-md" />
                )}

                <p className="text-gray-300 mb-3">{cleanDescription(article.description)}</p>

                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <img src={logo} alt={platform} className="w-5 h-5 rounded-full" />
                    <span>{platform}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <p>📅</p>
                    <span>{article.date ? new Date(article.date).toLocaleDateString() : t("articles.unknownDate")}</span>
                  </div>
                </div>
              </div>

              <a
                href={article.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition"
              >
                <img src={logo} alt={platform} className="w-5 h-5 rounded-full" />
                {platform === "Medium" ? t("articles.readMedium") : t("articles.readSubstack")}
              </a>
            </div>
          );
        })}
      </div>
    </section>
  );
}