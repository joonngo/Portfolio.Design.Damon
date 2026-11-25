/* Serves dist under the base path, like GitHub Pages (404.html included). */
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
import { BASE } from '../src/lib/base.mjs';
const T = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.avif': 'image/avif', '.woff2': 'font/woff2', '.woff': 'font/woff', '.xml': 'text/xml', '.yml': 'text/yaml' };
const port = Number(process.argv[2] || 4400), host = process.argv[3] || '127.0.0.1';
createServer(async (q, r) => {
  let p = normalize(decodeURIComponent(new URL(q.url, 'http://x').pathname));
  if (p === '/') return r.writeHead(302, { Location: BASE }).end();
  p = p.startsWith(BASE) ? p.slice(BASE.length) : 'outside-base';
  if (p === '' || p.endsWith('/')) p += 'index.html';
  try { const b = await readFile(join('dist', p)); r.writeHead(200, { 'Content-Type': T[extname(p)] || 'application/octet-stream' }).end(b); }
  catch { r.writeHead(404, { 'Content-Type': T['.html'] }).end(await readFile('dist/404.html')); }
}).listen(port, host, () => console.log(`http://localhost:${port}${BASE}`));
