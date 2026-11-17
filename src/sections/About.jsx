import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import Marquee from "../components/editorial/Marquee";
import Timeline from "../components/editorial/Timeline";
import VitalsSheet from "../components/editorial/VitalsSheet";
import RomanExperienceList from "../components/editorial/RomanExperienceList";
import NYCScene from "../components/editorial/NYCScene";
import ToolkitGrid from "../components/editorial/ToolkitGrid";
import adrienBruneauNyc from "../assets/adrien-bruneau-nyc.jpg";
import profilePhoto from "../assets/profile/perfil.jpeg";
import tennisPhoto from "../assets/profile/tenis.jpg";
import violinPhoto from "../assets/profile/violin.webp";
import basketballPhoto from "../assets/hobbies/basketball.jpg";

const card = "bg-superficie border border-tinta/10 rounded-2xl shadow-sm";
const linkPill =
  "bg-tinta hover:bg-tostado text-crema font-semibold py-2 px-4 rounded-full shadow-sm transition-colors flex items-center gap-2 text-sm";

const SectionLabel = ({ children }) => (
  <p className="text-xs uppercase tracking-[0.3em] text-tostado font-semibold mb-4">{children}</p>
);

const GOOGLE_LOGO = "https://www.vectorlogo.zone/logos/google/google-icon.svg";

const CERTIFICATIONS = [
  {
    id: "cert-gemini-deploy",
    logo: GOOGLE_LOGO,
    title: "Certified Partner Specialist: Gemini Enterprise Deployment",
    issuer: "Google",
    year: "2026",
    credentialUrl: "https://www.credly.com/badges/9e2fbeec-171d-4ef1-b1d9-fbdd6439bb87/linked_in_profile",
  },
  {
    id: "cert-gemini-agent",
    logo: GOOGLE_LOGO,
    title: "Certified Partner Specialist: Gemini Enterprise Agent Development",
    issuer: "Google",
    year: "2026",
    credentialUrl: "https://www.credly.com/badges/a96d1478-2a26-4643-bbfb-3a4681f5a392/linked_in_profile",
  },
  {
    id: "cert-devoteam-ai",
    logo: null,
    initial: "D",
    title: "Devoteam AI Level 2 — Data Engineer",
    issuer: "Devoteam",
    year: "2025",
    credentialUrl: "https://badges.parchment.eu/public/assertions/VLGgaYfjT8mt6DxFVxKFdg",
  },
];

const TOOLKIT = [
  { title: "Data Engineering", items: ["GCP", "BigQuery", "SQL", "Python", "ETL", "DBT", "Elasticsearch", "Looker Studio"] },
  { title: "AI-Assisted Engineering", items: ["Claude Code", "Gemini", "Prompt Engineering", "AI-Assisted Workflows"] },
  { title: "Automation & RPA", items: ["RPA", "Blue Prism", "UiPath"] },
  { title: "Languages", items: ["Python", "Java", "SQL", "JavaScript", "C#"] },
  { title: "Front-End & Web", items: ["React", "JavaScript", "HTML", "CSS", "Tailwind CSS", "Firebase"] },
  { title: "Practice", items: ["Incident Analysis", "Decision-Making Under Pressure", "Communication", "Leadership"] },
];

const About = () => {
  const { t } = useTranslation();
  const [selectedTab, setSelectedTab] = useState("certifications");

  const experiences = [0, 1, 2, 3, 4].map((i) => ({
    id: `exp-${i}`,
    company: t(`about.experience.${i}.company`),
    position: t(`about.experience.${i}.position`),
    years: t(`about.experience.${i}.years`),
    description: t(`about.experience.${i}.description`),
    skills: t(`about.experience.${i}.skills`, { returnObjects: true }),
  }));

  const violinWherePlayed = t("about.hobbies.violin.wherePlayed", { returnObjects: true });

  const tabs = [
    { id: "certifications", label: t("about.nav.certifications") },
    { id: "hobbies", label: t("about.nav.hobbies") },
    { id: "strengths-weaknesses", label: t("about.nav.strengths_weaknesses") },
    { id: "cv", label: t("about.nav.cv") },
  ];

  const vitalsRows = [
    { label: t("about.vitals.current"), value: `${t("about.experience.0.company")} — ${t("about.experience.0.position")}` },
    { label: t("about.vitals.previous"), value: t("about.experience.1.company") },
    { label: t("about.vitals.location"), value: t("about.vitals.locationValue") },
    { label: t("about.vitals.openTo"), value: t("about.vitals.openToValue") },
  ];

  const toolkitTags = TOOLKIT.flatMap((cat) => cat.items).filter((v, i, arr) => arr.indexOf(v) === i);

  return (
    <section className="min-h-screen bg-crema text-tinta px-6 sm:px-10 py-24">
      <div className="max-w-5xl mx-auto">
        {/* Mission */}
        <motion.div
          className="grid md:grid-cols-[auto_1fr] gap-8 md:gap-12 items-start"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
        >
          <div className="mx-auto md:mx-0">
            <NYCScene
              variant="compact"
              scrollMode="element"
              photoSrc={profilePhoto}
              photoAlt="Raul Santiago"
              layers={[
                {
                  src: adrienBruneauNyc,
                  zFrom: -10, zTo: -90,
                  rotFrom: 0, rotTo: 6,
                  xFrom: 0, xTo: 18,
                  yFrom: 0, yTo: -20,
                  opFrom: 0.25, opTo: 0.85,
                  tiltFactor: 0.3,
                },
              ]}
            />
          </div>
          <div>
            <SectionLabel>{t("about.sectionLabel")}</SectionLabel>
            <p className="text-tinta/80 leading-relaxed max-w-2xl">{t("about.mission.p1")}</p>
            <p className="text-tinta/80 leading-relaxed max-w-2xl mt-5">{t("about.mission.p2")}</p>
            <p className="text-tinta/80 leading-relaxed max-w-2xl mt-5">{t("about.mission.p3")}</p>
          </div>
        </motion.div>

        <div className="mt-14">
          <Marquee items={toolkitTags} />
        </div>

        {/* Vitals + Timeline */}
        <div className="grid md:grid-cols-2 gap-14 mt-20">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.7 }}>
            <SectionLabel>{t("about.vitals.label")}</SectionLabel>
            <VitalsSheet rows={vitalsRows} />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.7, delay: 0.1 }}>
            <SectionLabel>{t("about.timeline.label")}</SectionLabel>
            <Timeline
              items={experiences.map((exp) => ({ years: exp.years, title: exp.company, subtitle: exp.position }))}
            />
          </motion.div>
        </div>

        {/* Roman numeral experience list */}
        <motion.div
          className="mt-24"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
        >
          <SectionLabel>{t("about.nav.experience")}</SectionLabel>
          <RomanExperienceList items={experiences} />
        </motion.div>

        {/* Technical toolkit */}
        <motion.div
          className="mt-24"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
        >
          <SectionLabel>{t("about.toolkit.label")}</SectionLabel>
          <h3 className="text-2xl sm:text-3xl font-display font-black mb-8 max-w-lg">{t("about.toolkit.headline")}</h3>
          <ToolkitGrid categories={TOOLKIT} />
        </motion.div>

        {/* Tabs */}
        <motion.div
          className="mt-24 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
        >
          <SectionLabel>{t("about.moreLabel")}</SectionLabel>
        </motion.div>

        <div className="flex flex-wrap gap-3 mb-10 justify-center">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`px-5 py-2.5 rounded-full font-semibold text-xs uppercase tracking-[0.15em] transition ${
                selectedTab === tab.id
                  ? "bg-tinta text-crema shadow-md"
                  : "border border-tinta/15 text-tinta/60 hover:border-tinta"
              }`}
              onClick={() => setSelectedTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="w-full max-w-3xl mx-auto">
          {selectedTab === "certifications" && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="grid gap-4">
              {CERTIFICATIONS.map((cert) => (
                <a
                  key={cert.id}
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${card} hover:border-tostado/50 hover:shadow-md transition p-5 flex items-center gap-4`}
                >
                  {cert.logo ? (
                    <img src={cert.logo} alt={cert.issuer} className="w-14 h-14 rounded-full shadow-sm border border-tinta/10 bg-white object-contain p-2 shrink-0" />
                  ) : (
                    <div className="w-14 h-14 rounded-full bg-tinta text-crema flex items-center justify-center text-lg font-display font-bold shrink-0">
                      {cert.initial}
                    </div>
                  )}
                  <div className="min-w-0">
                    <h3 className="text-base font-semibold">{cert.title}</h3>
                    <p className="text-tinta/50 text-sm">{cert.issuer} · {cert.year}</p>
                  </div>
                </a>
              ))}
            </motion.div>
          )}

          {selectedTab === "hobbies" && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className={`${card} p-6`}>
                <img
                  src={tennisPhoto}
                  alt={t("about.hobbies.tennis.title")}
                  className="w-full aspect-[4/3] object-cover rounded-xl mb-5"
                />
                <h3 className="text-xl font-display font-bold text-tinta">{t("about.hobbies.tennis.title")}</h3>
                <p className="mt-2 text-tinta/70 leading-relaxed">{t("about.hobbies.tennis.description")}</p>
                <div className="mt-4 flex flex-col gap-3 items-start">
                  <a href="https://clubdetenisyzamorapadel.com/" target="_blank" rel="noopener noreferrer" className={linkPill}>
                    Club de Tenis y Pádel de Zamora
                  </a>
                  <a href="https://worldtennistour.itftennis.com/en/" target="_blank" rel="noopener noreferrer" className={linkPill}>
                    ITF World Tour
                  </a>
                  <a href="https://worldtennisnumber.com/eng/player-profile?id=63d8d2b44c36da67b061d26c" target="_blank" rel="noopener noreferrer" className={linkPill}>
                    ITF World Number
                  </a>
                </div>
              </div>

              <div className={`${card} p-6`}>
                <img
                  src={basketballPhoto}
                  alt={t("about.hobbies.basketball.title")}
                  className="w-full aspect-[4/3] object-cover object-[48%_30%] rounded-xl mb-5"
                />
                <h3 className="text-xl font-display font-bold text-tinta">{t("about.hobbies.basketball.title")}</h3>
                <p className="mt-2 text-tinta/70 leading-relaxed">{t("about.hobbies.basketball.description")}</p>
                <div className="mt-4 flex flex-col gap-3 items-start">
                  <a href="https://www.feb.es/" target="_blank" rel="noopener noreferrer" className={linkPill}>
                    {t("about.hobbies.basketball.linkLabel")}
                  </a>
                </div>
              </div>

              <div className={`${card} p-6`}>
                <img
                  src={violinPhoto}
                  alt={t("about.hobbies.violin.title")}
                  className="w-full aspect-[4/3] object-cover rounded-xl mb-5"
                />
                <h3 className="text-xl font-display font-bold text-tinta">{t("about.hobbies.violin.title")}</h3>
                <p className="mt-2 text-tinta/60 text-sm font-semibold">{t("about.hobbies.violin.education")}</p>
                <div className="mt-4 flex flex-col gap-3 items-start">
                  <a href="https://conservatoriomiguelmanzano.com" target="_blank" rel="noopener noreferrer" className={linkPill}>
                    {violinWherePlayed[0]}
                  </a>
                  <a href="https://www.josva.es/" target="_blank" rel="noopener noreferrer" className={linkPill}>
                    {violinWherePlayed[1]}
                  </a>
                </div>
              </div>
            </motion.div>
          )}

          {selectedTab === "strengths-weaknesses" && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="grid md:grid-cols-2 gap-6">
              <div className={`${card} p-6 text-left`}>
                <h4 className="text-xl font-display font-bold text-tostado">{t("about.strengthsWeaknesses.strengths.title")}</h4>
                <ul className="list-disc pl-6 text-tinta/70 leading-relaxed mt-3 space-y-1">
                  {t("about.strengthsWeaknesses.strengths.items", { returnObjects: true }).map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className={`${card} p-6 text-left`}>
                <h4 className="text-xl font-display font-bold text-tinta/60">{t("about.strengthsWeaknesses.weaknesses.title")}</h4>
                <ul className="list-disc pl-6 text-tinta/70 leading-relaxed mt-3 space-y-1">
                  {t("about.strengthsWeaknesses.weaknesses.items", { returnObjects: true }).map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}

          {selectedTab === "cv" && (
            <motion.div className={`${card} p-8 text-center`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <h3 className="text-2xl font-display font-bold text-tinta mb-4">{t("about.cv.title")}</h3>
              <p className="text-tinta/60 mb-6">{t("about.cv.description")}</p>
              <a
                href="https://firebasestorage.googleapis.com/v0/b/personal-website-89a20.firebasestorage.app/o/documents%2Fraulsantiagocv.pdf?alt=media&token=0b20685e-b007-46f8-a9a5-c76c01f3fb76"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-tinta hover:bg-tostado text-crema font-semibold py-3 px-6 rounded-full shadow-sm transition-colors"
              >
                {t("about.cv.download")}
              </a>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default About;
