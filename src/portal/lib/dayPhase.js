import dawnPhoto from "../../assets/maeva-vigier-nyc.jpg";
import dayPhoto from "../../assets/zoshua-colah-nyc.jpg";
import sunsetPhoto from "../../assets/hen-kaznelson-nyc.jpg";
import nightPhoto from "../../assets/adrien-bruneau-nyc.jpg";

// Time-of-day phase for Empire-Focus's background. Ranges are local-time
// hours (24h, fractional allowed) and are deliberately generous/adjustable.
// `photoSrc`/`filter` are placeholders using the site's existing NYC photos,
// tinted with CSS to approximate each phase — swap `photoSrc` for real
// dawn/day/sunset/night shots whenever they're available, no other changes
// needed.
const PHASES = [
  {
    id: "dawn",
    from: 5.5,
    to: 9,
    gradient: "linear-gradient(160deg, #F7C59F 0%, #F2A65A 35%, #6B7FA3 75%, #2E3A59 100%)",
    photoSrc: dawnPhoto,
    filter: "saturate(1.15) brightness(1.02)",
  },
  {
    id: "day",
    from: 9,
    to: 19,
    gradient: "linear-gradient(160deg, #8EC5FC 0%, #5B9BD5 45%, #3A6EA5 100%)",
    photoSrc: dayPhoto,
    filter: "sepia(0.35) hue-rotate(170deg) saturate(1.3) brightness(1.05)",
  },
  {
    id: "sunset",
    from: 19,
    to: 21.5,
    gradient: "linear-gradient(160deg, #FFB25B 0%, #F0654A 40%, #7A3B5E 75%, #2B1E3D 100%)",
    photoSrc: sunsetPhoto,
    filter: "saturate(1.25) brightness(0.95)",
  },
  {
    id: "night",
    from: 21.5,
    to: 29.5, // wraps past midnight (24 + 5.5)
    gradient: "linear-gradient(160deg, #1B2338 0%, #0E1424 60%, #05070D 100%)",
    photoSrc: nightPhoto,
    filter: "sepia(0.4) hue-rotate(190deg) saturate(1.4) brightness(0.35) contrast(1.15)",
  },
];

export function getDayPhase(date = new Date()) {
  const hour = date.getHours() + date.getMinutes() / 60;
  const h = hour < PHASES[0].from ? hour + 24 : hour;
  const phase = PHASES.find((p) => h >= p.from && h < p.to) || PHASES[PHASES.length - 1];
  return { id: phase.id, gradient: phase.gradient, photoSrc: phase.photoSrc, filter: phase.filter };
}

export const DAY_PHASE_IDS = PHASES.map((p) => p.id);
