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

// Spotify keeps isPaused false when a track (or 30s preview) runs out, so the end counts as stopped.
export function isPlaying({ isPaused, position, duration }) {
  return !isPaused && !(duration > 0 && position >= duration - 250);
}

const IFRAME_API = "https://open.spotify.com/embed/iframe-api/v1";

// Spotify's own embed controller, created the first time Music opens so nothing loads before that.
export function initMusic(root, { onPlayingChange } = {}) {
  const search = root.querySelector(".music__search");
  const empty = root.querySelector(".music__empty");
  const host = root.querySelector("[data-player]");
  const links = [...root.querySelectorAll("a[data-track-id]")];
  let controller = null;
  let ready = false; // script loaded; until then track links just open Spotify
  let wanted = null; // a track asked for before the controller existed
  let playOnLoad = false;

  search.addEventListener("input", () => {
    const keep = new Set(filterTracks(TRACKS, search.value).map((t) => t.id));
    links.forEach((a) => { a.parentElement.hidden = !keep.has(a.dataset.trackId); });
    empty.hidden = keep.size > 0;
    empty.textContent = keep.size ? "" : `No songs match "${search.value.trim()}"`;
  });

  function play(uri) {
    if (!controller) { wanted = uri; return; }
    playOnLoad = true;
    controller.loadUri(uri);
  }

  root.addEventListener("click", (e) => {
    const a = e.target.closest("a[data-track-id]");
    if (!a || !ready || e.ctrlKey || e.metaKey || e.shiftKey) return;
    e.preventDefault();
    links.forEach((l) => l.removeAttribute("aria-current"));
    a.setAttribute("aria-current", "true");
    play(`spotify:track:${a.dataset.trackId}`);
  });

  function mount() {
    if (ready || host.dataset.mounting) return;
    host.dataset.mounting = "1";
    window.onSpotifyIframeApiReady = (api) => {
      if (controller || host.querySelector("iframe")) return; // a retried load must not add a second player
      const el = document.createElement("div");
      host.append(el);
      api.createController(el, { uri: `spotify:playlist:${PLAYLIST_ID}`, width: "100%", height: 152 }, (c) => {
        controller = c;
        c.addListener("ready", () => { if (playOnLoad) { playOnLoad = false; c.play(); } });
        let quiet = 0; // updates arrive about once a second while playing; silence means it stopped
        c.addListener("playback_update", (ev) => {
          const playing = isPlaying(ev.data);
          onPlayingChange?.(playing);
          clearTimeout(quiet);
          if (playing) quiet = setTimeout(() => onPlayingChange?.(false), 3000);
        });
        if (wanted) { play(wanted); wanted = null; }
      });
    };
    const script = document.createElement("script");
    script.src = IFRAME_API;
    script.async = true;
    script.onload = () => { ready = true; };
    script.onerror = () => { delete host.dataset.mounting; }; // offline or blocked: links keep opening Spotify
    document.head.append(script);
  }

  function pause() {
    wanted = null; // a song asked for just before closing must not start unseen later
    playOnLoad = false;
    controller?.pause();
  }

  return { mount, pause };
}
