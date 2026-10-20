import { test } from "node:test";
import assert from "node:assert/strict";
import { TRACKS, PLAYLIST_ID, filterTracks } from "../js/music.mjs";

test("17 tracks from the playlist", () => {
  assert.equal(TRACKS.length, 17);
  assert.equal(TRACKS[0].id, "1SaLI6o5GhfcaxPVAJoD3r");
  assert.equal(PLAYLIST_ID, "3QAwwmlzsDZjdNQOx1ldQH");
});

test("empty query returns all", () => {
  assert.equal(filterTracks(TRACKS, "  ").length, 17);
});

test("matches title or artist, any case", () => {
  assert.deepEqual(filterTracks(TRACKS, "aespa").map((t) => t.title), ["Hot Mess", "Hold On Tight", "Dark Arts"]);
  assert.deepEqual(filterTracks(TRACKS, "icy").map((t) => t.title), ["ICY"]);
  assert.deepEqual(filterTracks(TRACKS, "silk").map((t) => t.title), ["Leave The Door Open"]);
});

test("ignores accents both ways", () => {
  const t = [{ title: "Ê Café", artist: "Zé", duration: "1:00", id: "x" }];
  assert.equal(filterTracks(t, "cafe").length, 1);
  assert.equal(filterTracks(t, "ZE").length, 1);
  assert.equal(filterTracks(TRACKS, "hearts2hearts").length, 2);
});

test("no match returns empty", () => {
  assert.equal(filterTracks(TRACKS, "zzzz").length, 0);
});
