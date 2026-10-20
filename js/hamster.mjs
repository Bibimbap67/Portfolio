export const LINES = [
  "hi! i'm the markOS hamster",
  "psst, open Projects",
  "i run on sunflower seeds",
  "Mark made this, lol",
  "try the Music app",
  "dark mode? yes please",
];

export function pickLine(lines, last, rand = Math.random) {
  const pool = lines.length > 1 ? lines.filter((l) => l !== last) : lines;
  return pool[Math.floor(rand() * pool.length)];
}
