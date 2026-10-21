import { test } from "node:test";
import assert from "node:assert/strict";
import { tiltAngles } from "../js/tilt.mjs";

test("centre of the card is flat", () => {
  assert.deepEqual(tiltAngles(0.5, 0.5), { rx: 0, ry: 0, sx: 0 });
});

test("pointer at the right edge turns the card toward it", () => {
  assert.deepEqual(tiltAngles(1, 0.5, 8), { rx: 0, ry: 8, sx: 0.5 });
});

test("pointer at the top edge tips the top away", () => {
  assert.equal(tiltAngles(0.5, 0, 8).rx, 8);
});

test("a pointer outside the card is clamped to its edge", () => {
  assert.deepEqual(tiltAngles(3, -2, 8), { rx: 8, ry: 8, sx: 0.5 });
});
