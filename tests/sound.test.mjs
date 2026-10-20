import { test } from "node:test";
import assert from "node:assert/strict";
import { createSound } from "../js/sound.mjs";

function fakeCtx() {
  let made = 0;
  const param = () => ({ value: 0, setValueAtTime() {}, exponentialRampToValueAtTime() {}, linearRampToValueAtTime() {} });
  const node = () => ({ frequency: param(), gain: param(), type: "", connect(n) { return n; }, start() {}, stop() {} });
  class Ctx {
    constructor() { made++; }
    get currentTime() { return 0; }
    get destination() { return {}; }
    createOscillator() { return node(); }
    createGain() { return node(); }
  }
  return { Ctx, count: () => made };
}

test("disabled by default and never creates a context", () => {
  const f = fakeCtx();
  const s = createSound(f.Ctx);
  assert.equal(s.enabled, false);
  s.play("tick");
  assert.equal(f.count(), 0);
});

test("enabled: one context, reused", () => {
  const f = fakeCtx();
  const s = createSound(f.Ctx);
  s.setEnabled(true);
  s.play("tick"); s.play("open"); s.play("close");
  assert.equal(f.count(), 1);
});

test("unknown name or missing AudioContext never throws", () => {
  const s = createSound(undefined);
  s.setEnabled(true);
  assert.doesNotThrow(() => s.play("tick"));
  const f = fakeCtx();
  const t = createSound(f.Ctx);
  t.setEnabled(true);
  assert.doesNotThrow(() => t.play("boom"));
});
