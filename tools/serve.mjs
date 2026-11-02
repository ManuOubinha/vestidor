// Servidor local para probar:  node tools/serve.mjs   ->  http://localhost:8080
// (localhost cuenta como sitio seguro, así que funcionan el service worker y la ubicación).
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { join, extname, normalize, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const TYPES = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".webmanifest": "application/manifest+json", ".png": "image/png", ".svg": "image/svg+xml", ".json": "application/json" };
const port = +process.env.PORT || 8080;

createServer(async (req, res) => {
  let p = decodeURIComponent(new URL(req.url, "http://x").pathname);
  if (p.endsWith("/")) p += "index.html";
  const file = normalize(join(root, p));
  if (!file.startsWith(root)) { res.writeHead(403).end(); return; }
  try {
    const body = await readFile(file);
    res.writeHead(200, { "Content-Type": TYPES[extname(file)] || "application/octet-stream", "Cache-Control": "no-cache" }).end(body);
  } catch { res.writeHead(404).end("No encontrado"); }
}).listen(port, () => console.log(`Vestidor en http://localhost:${port}`));
