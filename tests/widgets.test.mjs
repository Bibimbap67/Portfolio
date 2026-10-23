import { test } from "node:test";
import assert from "node:assert/strict";
import { clockAngles, calendarFace, timeLeft } from "../js/widgets.mjs";

test("clock hands sit where the time is, with the hour hand drifting by the minute", () => {
  assert.deepEqual(clockAngles(new Date(2026, 9, 23, 11, 37, 30)), { h: 348.75, m: 225, s: 180 });
});

test("midnight points every hand straight up", () => {
  assert.deepEqual(clockAngles(new Date(2026, 9, 23, 0, 0, 0)), { h: 0, m: 0, s: 0 });
});

test("calendar face names the weekday, the day and the month", () => {
  assert.deepEqual(calendarFace(new Date(2026, 9, 23)), { weekday: "Friday", day: 23, month: "October 2026" });
});

test("time left counts down from the song's end", () => {
  assert.equal(timeLeft(67000, 191000), "-2:04");
});

test("time left is zero before the length is known", () => {
  assert.equal(timeLeft(0, 0), "-0:00");
});
