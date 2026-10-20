export const SECTIONS = ["about", "skills", "projects", "contact"];

export function sectionFromHash(hash) {
  const id = hash.startsWith("#") ? hash.slice(1) : null;
  return SECTIONS.includes(id) ? id : null;
}
