import { test } from "node:test";
import assert from "node:assert/strict";
import { clockAngles } from "../js/widgets.mjs";

test("clock hands sit where the time is, with the hour hand drifting by the minute", () => {
  assert.deepEqual(clockAngles(new Date(2026, 9, 23, 11, 37, 30)), { h: 348.75, m: 225, s: 180 });
});

test("midnight points every hand straight up", () => {
  assert.deepEqual(clockAngles(new Date(2026, 9, 23, 0, 0, 0)), { h: 0, m: 0, s: 0 });
});
