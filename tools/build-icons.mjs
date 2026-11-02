// Uso (desde la raíz del repo):  node tools/build-icons.mjs
// Toma todos los SVG de icons/ (el nombre del archivo es el nombre del icono en la página)
// y los incrusta en index.html como `const ICONS = {...};`, con currentColor para que sigan el tema.
// Iconos: Tabler Icons, licencia MIT (icons/LICENSE).
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const html = join(root, "index.html");
const icons = {};
for (const f of readdirSync(join(root, "icons")).filter(f => f.endsWith(".svg")).sort()) {
  const src = readFileSync(join(root, "icons", f), "utf8");
  const m = src.match(/<svg[^>]*viewBox="([^"]+)"[^>]*>([\s\S]*)<\/svg>/);
  if (!m) throw new Error(`SVG ilegible: ${f}`);
  const filled = /<svg[^>]*fill="currentColor"/.test(src);
  const body = m[2].replace(/<path stroke="none" d="M0 0h24v24H0z" fill="none"\s*\/>/g, "").replace(/\s+/g, " ").trim();
  const attrs = filled ? `fill="currentColor"` : `fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"`;
  icons[f.slice(0, -4)] = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${m[1]}" ${attrs}>${body}</svg>`;
}
const line = `const ICONS = ${JSON.stringify(icons)};`;
let page = readFileSync(html, "utf8");
const MARK = "/*__ICONS__*/", OLD = /^const ICONS = .*;$/m;
if (page.includes(MARK)) page = page.replace(MARK, () => line);
else if (OLD.test(page)) page = page.replace(OLD, () => line);
else throw new Error("No encuentro dónde inyectar los iconos");
writeFileSync(html, page);
console.log(`${Object.keys(icons).length} iconos, ${line.length} bytes`);
