import { test } from "node:test";
import assert from "node:assert/strict";
import { sectionFromHash, SECTIONS } from "../js/router.mjs";

test("known sections route", () => {
  for (const s of SECTIONS) assert.equal(sectionFromHash("#" + s), s);
});

test("unknown, empty and non-section hashes don't route", () => {
  for (const h of ["", "#", "#hello", "#music", "#Projects", "#projects/x", "projects"]) assert.equal(sectionFromHash(h), null);
});
