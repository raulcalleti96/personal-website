// Thin wrapper around the Spotify "currently playing" endpoint.

export async function getCurrentlyPlaying(accessToken) {
  const res = await fetch("https://api.spotify.com/v1/me/player/currently-playing", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (res.status === 204) return { playing: false };
  if (res.status === 401) return { unauthorized: true };
  if (!res.ok) return { playing: false };

  const data = await res.json();
  if (!data?.item) return { playing: false };

  return {
    playing: true,
    isPlaying: data.is_playing,
    trackName: data.item.name,
    artistName: data.item.artists?.map((a) => a.name).join(", ") || "",
    albumArt: data.item.album?.images?.[0]?.url || null,
  };
}
