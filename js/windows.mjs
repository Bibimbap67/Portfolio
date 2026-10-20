const MIN_VISIBLE = 80; // px of a window that must stay on screen horizontally
const BAR_H = 30; // px of title bar that must stay above the bottom edge

export function clampPosition({ x, y, w }, { width, height, top }) {
  return {
    x: Math.min(Math.max(x, MIN_VISIBLE - w), width - MIN_VISIBLE),
    y: Math.min(Math.max(y, top), height - BAR_H),
  };
}

export function resizeRect({ x, y, w, h }, edge, dx, dy, min = { w: 320, h: 220 }) {
  if (edge.includes("e")) w = Math.max(min.w, w + dx);
  if (edge.includes("s")) h = Math.max(min.h, h + dy);
  if (edge.includes("w")) { const nw = Math.max(min.w, w - dx); x += w - nw; w = nw; }
  if (edge.includes("n")) { const nh = Math.max(min.h, h - dy); y += h - nh; h = nh; }
  return { x, y, w, h };
}

// What a taskbar click does, like Windows: open, bring back, or tuck away the window in front.
export function taskbarAction({ open, minimized, focused }) {
  if (!open) return "open";
  if (minimized) return "restore";
  return focused ? "minimize" : "focus";
}

const reducedMotion = () => matchMedia("(prefers-reduced-motion: reduce)").matches;

// The window grows out of whatever opened it (icon, track, button) and shrinks back into it.
function animateWindow(el, from, entering) {
  if (!el.animate) return Promise.resolve();
  el.getAnimations().forEach((a) => a.cancel());
  const reduce = reducedMotion();
  const box = el.getBoundingClientRect();
  if (from?.isConnected && !reduce) {
    const o = from.getBoundingClientRect();
    el.style.transformOrigin = `${o.left + o.width / 2 - box.left}px ${o.top + o.height / 2 - box.top}px`;
  } else {
    el.style.transformOrigin = "50% 30%";
  }
  const shown = reduce ? { opacity: 1 } : { opacity: 1, transform: "scale(1)", filter: "blur(0px)" };
  const hidden = reduce ? { opacity: 0 } : { opacity: 0, transform: "scale(0.55)", filter: "blur(8px)" };
  const duration = entering ? (reduce ? 120 : 300) : reduce ? 100 : 170;
  const anim = el.animate(entering ? [hidden, shown] : [shown, hidden], {
    duration,
    easing: entering ? "cubic-bezier(0.16, 1, 0.3, 1)" : "cubic-bezier(0.5, 0, 0.75, 0)",
  });
  // Background tabs pause animations; never let a stalled one hold a window half-closed.
  const timeout = new Promise((done) => setTimeout(done, duration + 150));
  return Promise.race([anim.finished.catch(() => {}), timeout]).then(() => anim.cancel());
}

const EDGES = ["n", "s", "e", "w", "ne", "nw", "se", "sw"];

export function initWindows(root, { onOpen, onClose, onChange, isPhone = () => false, minimizeTarget = () => null } = {}) {
  const wins = new Map([...root.querySelectorAll(".win")].map((el) => [el.id, el]));
  const openers = new Map();
  const closing = new Set(); // windows mid close-animation; reopening one cancels its close
  const saved = new Map(); // inline geometry from before a maximize
  let z = 10;
  const changed = () => onChange?.();
  const bounds = () => ({ width: root.clientWidth, height: root.clientHeight, top: 0 });

  function focus(id) {
    const el = wins.get(id);
    if (!el) return;
    wins.forEach((w) => w.classList.toggle("is-focused", w === el));
    el.style.zIndex = ++z;
    changed();
  }

  function open(id, opener = null) {
    const el = wins.get(id);
    if (!el) return;
    if (el.classList.contains("is-minimized")) return restore(id);
    focus(id);
    const wasClosing = closing.delete(id);
    if (el.classList.contains("is-open") && !wasClosing) return;
    el.classList.add("is-open");
    openers.set(id, opener ?? document.activeElement);
    el.tabIndex = -1;
    el.focus({ preventScroll: true });
    animateWindow(el, opener, true);
    onOpen?.(id);
    changed();
  }

  async function close(id) {
    const el = wins.get(id);
    if (!el?.classList.contains("is-open") || closing.has(id)) return;
    const back = openers.get(id);
    const hadFocus = el.contains(document.activeElement);
    closing.add(id);
    onClose?.(id);
    await animateWindow(el, back, false);
    if (!closing.delete(id)) return; // reopened while closing
    el.classList.remove("is-open", "is-focused", "is-minimized");
    changed();
    // Only hand focus back if it was in this window; otherwise it has already moved on.
    if (hadFocus && back?.isConnected && back.offsetParent !== null) back.focus({ preventScroll: true });
  }

  async function minimize(id) {
    const el = wins.get(id);
    if (!el?.classList.contains("is-open") || el.classList.contains("is-minimized")) return;
    await animateWindow(el, minimizeTarget(id), false);
    el.classList.add("is-minimized");
    el.classList.remove("is-focused");
    changed();
  }

  function restore(id) {
    const el = wins.get(id);
    if (!el?.classList.contains("is-minimized")) return;
    el.classList.remove("is-minimized");
    focus(id);
    el.focus({ preventScroll: true });
    animateWindow(el, minimizeTarget(id), true);
  }

  function toggleMaximize(id) {
    const el = wins.get(id);
    if (!el || isPhone()) return;
    if (el.classList.toggle("is-maximized")) {
      saved.set(id, { left: el.style.left, top: el.style.top, width: el.style.width, height: el.style.height });
      Object.assign(el.style, { left: "", top: "", width: "", height: "" });
    } else {
      Object.assign(el.style, saved.get(id) ?? {});
    }
    focus(id);
  }

  const openIds = () => [...wins.values()].filter((w) => w.classList.contains("is-open")).map((w) => w.id);
  const isMinimized = (id) => !!wins.get(id)?.classList.contains("is-minimized");
  const isFocused = (id) => !!wins.get(id)?.classList.contains("is-focused");

  // Clicking or tabbing into a window brings it to the front, so keyboard focus is never hidden.
  const raise = (e) => {
    const el = e.target.closest(".win");
    if (el && !el.classList.contains("is-focused")) focus(el.id);
  };
  root.addEventListener("pointerdown", raise);
  root.addEventListener("focusin", raise);

  // Shared pointer-drag plumbing for moving and resizing.
  function track(handle, e, onMove) {
    handle.setPointerCapture(e.pointerId);
    const up = () => {
      handle.removeEventListener("pointermove", onMove);
      handle.removeEventListener("pointerup", up);
      handle.removeEventListener("pointercancel", up);
      handle.closest(".win").classList.remove("is-dragging");
    };
    handle.addEventListener("pointermove", onMove);
    handle.addEventListener("pointerup", up);
    handle.addEventListener("pointercancel", up);
  }

  // Dragging by the title bar (desktop only). Keyboard users never need it.
  root.addEventListener("pointerdown", (e) => {
    const bar = e.target.closest(".win__bar");
    const el = bar?.closest(".win");
    if (!bar || isPhone() || e.button !== 0 || e.target.closest("a, button") || el.classList.contains("is-maximized")) return;
    const startX = e.clientX - el.offsetLeft;
    const startY = e.clientY - el.offsetTop;
    el.classList.add("is-dragging");
    track(bar, e, (ev) => {
      const { x, y } = clampPosition({ x: ev.clientX - startX, y: ev.clientY - startY, w: el.offsetWidth }, bounds());
      el.style.left = `${x}px`;
      el.style.top = `${y}px`;
    });
  });

  root.addEventListener("dblclick", (e) => {
    const bar = e.target.closest(".win__bar");
    if (bar && !e.target.closest("a, button")) toggleMaximize(bar.closest(".win").id);
  });

  // Resizing from any edge or corner, like a real window.
  wins.forEach((el) => {
    for (const edge of EDGES) {
      const h = document.createElement("span");
      h.className = `win__resize win__resize--${edge}`;
      h.dataset.edge = edge;
      el.append(h);
    }
  });
  root.addEventListener("pointerdown", (e) => {
    const handle = e.target.closest(".win__resize");
    const el = handle?.closest(".win");
    if (!handle || isPhone() || e.button !== 0 || el.classList.contains("is-maximized")) return;
    e.preventDefault();
    const start = { x: el.offsetLeft, y: el.offsetTop, w: el.offsetWidth, h: el.offsetHeight };
    track(handle, e, (ev) => {
      const r = resizeRect(start, handle.dataset.edge, ev.clientX - e.clientX, ev.clientY - e.clientY);
      const { x, y } = clampPosition({ x: r.x, y: r.y, w: r.w }, bounds());
      Object.assign(el.style, { left: `${x}px`, top: `${y}px`, width: `${r.w}px`, height: `${Math.min(r.h, root.clientHeight)}px` });
    });
  });

  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    const el = root.querySelector(".win.is-open.is-focused");
    if (el?.querySelector("[data-close]")) close(el.id);
  });

  // Dragged positions must survive resizes: keep them on screen, and drop them in phone layout.
  addEventListener("resize", () => {
    wins.forEach((el) => {
      if (!el.style.left) return;
      if (isPhone()) {
        Object.assign(el.style, { left: "", top: "", width: "", height: "" });
        return;
      }
      const { x, y } = clampPosition({ x: el.offsetLeft, y: el.offsetTop, w: el.offsetWidth }, bounds());
      el.style.left = `${x}px`;
      el.style.top = `${y}px`;
    });
  });

  return { open, close, focus, minimize, restore, toggleMaximize, openIds, isMinimized, isFocused };
}
