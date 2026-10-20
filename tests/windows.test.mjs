import { test } from "node:test";
import assert from "node:assert/strict";
import { clampPosition } from "../js/windows.mjs";

const b = { width: 1200, height: 800, top: 30 };

test("inside stays put", () => {
  assert.deepEqual(clampPosition({ x: 100, y: 100, w: 400 }, b), { x: 100, y: 100 });
});

test("dragged off right/left keeps 80px visible", () => {
  assert.equal(clampPosition({ x: 1190, y: 100, w: 400 }, b).x, 1120);
  assert.equal(clampPosition({ x: -390, y: 100, w: 400 }, b).x, -320);
});

test("title bar stays below menubar and above bottom", () => {
  assert.equal(clampPosition({ x: 0, y: -50, w: 400 }, b).y, 30);
  assert.equal(clampPosition({ x: 0, y: 900, w: 400 }, b).y, 770);
});
