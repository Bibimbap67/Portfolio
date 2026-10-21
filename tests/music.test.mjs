import { test } from "node:test";
import assert from "node:assert/strict";
import { TRACKS, PLAYLIST_ID, filterTracks, isPlaying, formatTime, stepTrack, artUrl } from "../js/music.mjs";

test("151 tracks from the playlist", () => {
  assert.equal(TRACKS.length, 151);
  assert.equal(TRACKS[0].id, "5ocSQW5sIUIOFojwXEz9Ki");
  assert.equal(PLAYLIST_ID, "1z4oKxaAqlMCZsyC4hWN0y");
  assert.ok(TRACKS.every((t) => t.id && t.title && t.artist && t.art));
});

test("empty query returns all", () => {
  assert.equal(filterTracks(TRACKS, "  ").length, TRACKS.length);
});

test("matches title or artist, any case", () => {
  assert.ok(filterTracks(TRACKS, "supernatural").some((t) => t.id === "5ocSQW5sIUIOFojwXEz9Ki"));
  assert.ok(filterTracks(TRACKS, "NEWJEANS").every((t) => /newjeans/i.test(t.title + t.artist)));
});

test("ignores accents both ways", () => {
  const t = [{ title: "Ê Café", artist: "Zé", duration: "1:00", id: "x" }];
  assert.equal(filterTracks(t, "cafe").length, 1);
  assert.equal(filterTracks(t, "ZE").length, 1);
});

test("no match returns empty", () => {
  assert.equal(filterTracks(TRACKS, "zzzz").length, 0);
});

test("a finished track is not playing, even if Spotify never says paused", () => {
  assert.equal(isPlaying({ isPaused: false, position: 5000, duration: 16000 }), true);
  assert.equal(isPlaying({ isPaused: true, position: 5000, duration: 16000 }), false);
  assert.equal(isPlaying({ isPaused: false, position: 15900, duration: 16000 }), false);
  assert.equal(isPlaying({ isPaused: false, position: 0, duration: 0 }), true);
});

test("formatTime turns milliseconds into m:ss", () => {
  assert.equal(formatTime(0), "0:00");
  assert.equal(formatTime(57000), "0:57");
  assert.equal(formatTime(168999), "2:48");
  assert.equal(formatTime(undefined), "0:00");
});

test("stepTrack moves through the list and wraps", () => {
  const l = [{ id: "a" }, { id: "b" }, { id: "c" }];
  assert.equal(stepTrack(l, "a", 1).id, "b");
  assert.equal(stepTrack(l, "c", 1).id, "a");
  assert.equal(stepTrack(l, "a", -1).id, "c");
});

test("shuffle never repeats the current track", () => {
  const l = [{ id: "a" }, { id: "b" }, { id: "c" }];
  assert.equal(stepTrack(l, "a", 1, true, () => 0).id, "b");
  assert.equal(stepTrack(l, "a", 1, true, () => 0.99).id, "c");
  assert.equal(stepTrack([{ id: "a" }], "a", 1, true).id, "a");
});

test("artUrl builds the small and large cover sizes", () => {
  assert.match(artUrl("abc"), /^https:\/\/i\.scdn\.co\/image\/ab67616d00004851abc$/);
  assert.match(artUrl("abc", 300), /ab67616d00001e02abc$/);
});
