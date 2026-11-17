// Spotify Authorization Code + PKCE flow — no client secret needed, safe
// for a fully client-side SPA. Tokens live in localStorage (per device).

const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const SCOPES = "user-read-currently-playing user-read-playback-state";
const TOKEN_KEY = "spotify_tokens";
const VERIFIER_KEY = "spotify_code_verifier";

function base64url(buffer) {
  return btoa(String.fromCharCode(...new Uint8Array(buffer)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function randomString(length = 64) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const values = crypto.getRandomValues(new Uint8Array(length));
  return Array.from(values, (v) => chars[v % chars.length]).join("");
}

async function challengeFromVerifier(verifier) {
  const data = new TextEncoder().encode(verifier);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return base64url(digest);
}

export function isSpotifyConfigured() {
  return Boolean(CLIENT_ID);
}

export function getRedirectUri() {
  return `${window.location.origin}/clients/focus`;
}

export async function startSpotifyLogin() {
  const verifier = randomString();
  sessionStorage.setItem(VERIFIER_KEY, verifier);
  const challenge = await challengeFromVerifier(verifier);

  const params = new URLSearchParams({
    client_id: CLIENT_ID,
    response_type: "code",
    redirect_uri: getRedirectUri(),
    scope: SCOPES,
    code_challenge_method: "S256",
    code_challenge: challenge,
  });

  window.location.href = `https://accounts.spotify.com/authorize?${params.toString()}`;
}

function saveTokens(data) {
  const tokens = {
    access_token: data.access_token,
    refresh_token: data.refresh_token || getTokens()?.refresh_token,
    expires_at: Date.now() + data.expires_in * 1000,
  };
  localStorage.setItem(TOKEN_KEY, JSON.stringify(tokens));
  return tokens;
}

export function getTokens() {
  const raw = localStorage.getItem(TOKEN_KEY);
  return raw ? JSON.parse(raw) : null;
}

export function disconnectSpotify() {
  localStorage.removeItem(TOKEN_KEY);
}

export async function exchangeCodeForToken(code) {
  const verifier = sessionStorage.getItem(VERIFIER_KEY);
  sessionStorage.removeItem(VERIFIER_KEY);

  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: CLIENT_ID,
      grant_type: "authorization_code",
      code,
      redirect_uri: getRedirectUri(),
      code_verifier: verifier,
    }),
  });

  if (!res.ok) throw new Error("Spotify token exchange failed");
  const data = await res.json();
  return saveTokens(data);
}

async function refreshAccessToken() {
  const tokens = getTokens();
  if (!tokens?.refresh_token) return null;

  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: CLIENT_ID,
      grant_type: "refresh_token",
      refresh_token: tokens.refresh_token,
    }),
  });

  if (!res.ok) {
    disconnectSpotify();
    return null;
  }
  const data = await res.json();
  return saveTokens(data);
}

// Returns a valid access token, refreshing first if it's expired (or about
// to expire within 30s). Returns null if not connected or refresh failed.
export async function getValidAccessToken() {
  const tokens = getTokens();
  if (!tokens) return null;
  if (tokens.expires_at - 30_000 > Date.now()) return tokens.access_token;
  const refreshed = await refreshAccessToken();
  return refreshed?.access_token || null;
}
