const MIN_VISIBLE = 80; // px of a window that must stay on screen horizontally
const BAR_H = 30; // px of title bar that must stay above the bottom edge

export function clampPosition({ x, y, w }, { width, height, top }) {
  return {
    x: Math.min(Math.max(x, MIN_VISIBLE - w), width - MIN_VISIBLE),
    y: Math.min(Math.max(y, top), height - BAR_H),
  };
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

export function initWindows(root, { onOpen, onClose, isPhone = () => false } = {}) {
  const wins = new Map([...root.querySelectorAll(".win")].map((el) => [el.id, el]));
  const openers = new Map();
  const closing = new Set(); // windows mid close-animation; reopening one cancels its close
  let z = 10;

  function focus(id) {
    const el = wins.get(id);
    if (!el) return;
    wins.forEach((w) => w.classList.toggle("is-focused", w === el));
    el.style.zIndex = ++z;
  }

  function open(id, opener = null) {
    const el = wins.get(id);
    if (!el) return;
    focus(id);
    const wasClosing = closing.delete(id);
    if (el.classList.contains("is-open") && !wasClosing) return;
    el.classList.add("is-open");
    openers.set(id, opener ?? document.activeElement);
    el.tabIndex = -1;
    el.focus({ preventScroll: true });
    animateWindow(el, opener, true);
    onOpen?.(id);
  }

  async function close(id) {
    const el = wins.get(id);
    if (!el?.classList.contains("is-open") || closing.has(id)) return;
    const back = openers.get(id);
    closing.add(id);
    onClose?.(id);
    await animateWindow(el, back, false);
    if (!closing.delete(id)) return; // reopened while closing
    el.classList.remove("is-open", "is-focused");
    if (back?.isConnected && back.offsetParent !== null) back.focus({ preventScroll: true });
  }

  const openIds = () => [...wins.values()].filter((w) => w.classList.contains("is-open")).map((w) => w.id);

  root.addEventListener("pointerdown", (e) => {
    const el = e.target.closest(".win");
    if (el) focus(el.id);
  });

  // Dragging by the title bar (desktop only). Keyboard users never need it.
  root.addEventListener("pointerdown", (e) => {
    const bar = e.target.closest(".win__bar");
    if (!bar || isPhone() || e.button !== 0 || e.target.closest("a, button")) return;
    const el = bar.closest(".win");
    const startX = e.clientX - el.offsetLeft;
    const startY = e.clientY - el.offsetTop;
    bar.setPointerCapture(e.pointerId);
    el.classList.add("is-dragging");
    const move = (ev) => {
      const { x, y } = clampPosition(
        { x: ev.clientX - startX, y: ev.clientY - startY, w: el.offsetWidth },
        { width: root.clientWidth, height: root.clientHeight, top: 0 },
      );
      el.style.left = `${x}px`;
      el.style.top = `${y}px`;
    };
    const up = () => {
      el.classList.remove("is-dragging");
      bar.removeEventListener("pointermove", move);
      bar.removeEventListener("pointerup", up);
      bar.removeEventListener("pointercancel", up);
    };
    bar.addEventListener("pointermove", move);
    bar.addEventListener("pointerup", up);
    bar.addEventListener("pointercancel", up);
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
        el.style.left = el.style.top = "";
        return;
      }
      const { x, y } = clampPosition(
        { x: el.offsetLeft, y: el.offsetTop, w: el.offsetWidth },
        { width: root.clientWidth, height: root.clientHeight, top: 0 },
      );
      el.style.left = `${x}px`;
      el.style.top = `${y}px`;
    });
  });

  return { open, close, focus, openIds };
}
