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

import { resizeRect, taskbarAction } from "../js/windows.mjs";

const r = { x: 100, y: 100, w: 500, h: 400 };

test("se grows width and height", () => assert.deepEqual(resizeRect(r, "se", 50, 30), { x: 100, y: 100, w: 550, h: 430 }));

test("w moves x and shrinks width", () => assert.deepEqual(resizeRect(r, "w", 40, 0), { x: 140, y: 100, w: 460, h: 400 }));

test("min size holds and the opposite edge stays put", () => {
  assert.deepEqual(resizeRect(r, "w", 400, 0), { x: 280, y: 100, w: 320, h: 400 });
  assert.deepEqual(resizeRect(r, "n", 0, 500), { x: 100, y: 280, w: 500, h: 220 });
});

test("taskbar decision", () => {
  assert.equal(taskbarAction({ open: false, minimized: false, focused: false }), "open");
  assert.equal(taskbarAction({ open: true, minimized: true, focused: false }), "restore");
  assert.equal(taskbarAction({ open: true, minimized: false, focused: true }), "minimize");
  assert.equal(taskbarAction({ open: true, minimized: false, focused: false }), "focus");
});
