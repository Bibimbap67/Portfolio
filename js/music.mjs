// Mark's public Spotify playlist "music" (snapshot 2026-10-21). Edit here when the playlist changes.
export const PLAYLIST_ID = "3QAwwmlzsDZjdNQOx1ldQH";

export const TRACKS = [
  { title: "Hot Mess", artist: "aespa", duration: "3:12", id: "1SaLI6o5GhfcaxPVAJoD3r" },
  { title: "Hold On Tight", artist: "aespa", duration: "2:29", id: "1o844wI52S3TjXGBwvGcc7" },
  { title: "Dark Arts", artist: "aespa", duration: "3:01", id: "2wRXvIGUTRWod4yp1k3bGN" },
  { title: "ICONIC HEART", artist: "Hearts2Hearts", duration: "3:09", id: "1OLAjffdDJibTrUGAwApVk" },
  { title: "STYLE", artist: "Hearts2Hearts", duration: "3:29", id: "5EoV2HmAlkqN1XvsIjOBZZ" },
  { title: "CRAZY", artist: "LE SSERAFIM", duration: "2:44", id: "3AoEQRuFf8zVXWqSLo2UOi" },
  { title: "ICY", artist: "ITZY", duration: "3:11", id: "2vdkN2NSQ5mxqNGg7sJUxs" },
  { title: "Toki Yo Tomare", artist: "ILLIT", duration: "3:08", id: "6VedlO2MtaEjAITax6vQyg" },
  { title: "Day 1", artist: "Red Velvet", duration: "3:26", id: "74muMkVdMYoR65lhmdzy13" },
  { title: "Panorama", artist: "IZ*ONE", duration: "3:42", id: "0CnpSTdL9l5vQM4YnzXtyo" },
  { title: "Still With You", artist: "Jung Kook", duration: "3:59", id: "0eFMbKCRw8KByXyWBw8WO7" },
  { title: "Ride", artist: "HYBS", duration: "3:01", id: "37HhnXqIRFSSJXWsysl6B7" },
  { title: "love.", artist: "wave to earth", duration: "5:07", id: "5mtTAScDytxMMqZj14NmlN" },
  { title: "the perfect pair", artist: "beabadoobee", duration: "2:57", id: "41P6Tnd8KIHqON0QIydx6a" },
  { title: "Leave The Door Open", artist: "Bruno Mars, Anderson .Paak, Silk Sonic", duration: "4:02", id: "4pryE6cN2gFL1FVF5fYINl" },
  { title: "Atmosphere", artist: "FISHER, Kita Alexander", duration: "3:02", id: "63HwAAXuSV2tzIUPoHOwZa" },
  { title: "Phonky Town", artist: "PlayaPhonk", duration: "2:21", id: "5mnpMkzp3Z2RCCbwIEZCbv" },
];

const fold = (s) => s.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase();

export function filterTracks(tracks, query) {
  const q = fold(query.trim());
  if (!q) return tracks;
  return tracks.filter((t) => fold(t.title).includes(q) || fold(t.artist).includes(q));
}
