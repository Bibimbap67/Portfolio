import { test } from "node:test";
import assert from "node:assert/strict";
import { readPref, writePref, resolveTheme } from "../js/prefs.mjs";

const throwing = { getItem() { throw new Error("blocked"); }, setItem() { throw new Error("blocked"); } };
const mem = () => { const m = new Map(); return { getItem: k => m.get(k) ?? null, setItem: (k, v) => m.set(k, v) }; };

test("readPref falls back when storage throws or is missing", () => {
  assert.equal(readPref(throwing, "markos-theme", "x"), "x");
  assert.equal(readPref(null, "markos-theme", "x"), "x");
  assert.equal(readPref(mem(), "markos-theme", "x"), "x");
});

test("writePref round-trips and reports failure", () => {
  const s = mem();
  assert.equal(writePref(s, "markos-sound", "on"), true);
  assert.equal(readPref(s, "markos-sound", "off"), "on");
  assert.equal(writePref(throwing, "markos-sound", "on"), false);
});

test("resolveTheme: stored choice wins, else system", () => {
  assert.equal(resolveTheme("dark", false), "dark");
  assert.equal(resolveTheme("light", true), "light");
  assert.equal(resolveTheme(null, true), "dark");
  assert.equal(resolveTheme("garbage", false), "light");
});
