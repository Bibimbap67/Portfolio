import { test } from "node:test";
import assert from "node:assert/strict";
import { LINES, pickLine } from "../js/hamster.mjs";

test("six lines", () => assert.equal(LINES.length, 6));

test("never repeats the last line", () => {
  for (let i = 0; i < 50; i++) assert.notEqual(pickLine(LINES, LINES[0], () => 0), LINES[0]);
});

test("single line is allowed to repeat", () => assert.equal(pickLine(["a"], "a"), "a"));
