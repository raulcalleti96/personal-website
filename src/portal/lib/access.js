// Accounts that only get the Radio from the app selector. The list comes from
// VITE_RADIO_ONLY_EMAILS (comma-separated) so no addresses live in the repo.
// This only hides the other apps; each account's data is still protected by
// Supabase row-level security.
const RADIO_ONLY = (import.meta.env.VITE_RADIO_ONLY_EMAILS || "")
  .split(",")
  .map((e) => e.trim().toLowerCase())
  .filter(Boolean);

export const isRadioOnly = (session) => {
  const email = session?.user?.email?.toLowerCase();
  return Boolean(email) && RADIO_ONLY.includes(email);
};
