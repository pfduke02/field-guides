// Checks every page in site/ at phone width: loads, no sideways scroll, no script errors, internal links resolve.
// Usage: node scripts/check.mjs [baseUrl]   (default: serves ./site on a local port)
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { join, extname } from 'node:path';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { chromium, devices } = require('playwright');

const root = new URL('../site/', import.meta.url).pathname;
const types = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.png': 'image/png' };
let base = process.argv[2], server;
if (!base) {
  server = createServer(async (req, res) => {
    let p = join(root, decodeURIComponent(new URL(req.url, 'http://x').pathname));
    try { if ((await stat(p)).isDirectory()) p = join(p, 'index.html'); res.writeHead(200, { 'content-type': types[extname(p)] || 'application/octet-stream' }); res.end(await readFile(p)); }
    catch { res.writeHead(404); res.end('not found'); }
  }).listen(0);
  base = `http://localhost:${server.address().port}`;
}
const pages = ['/', '/pickup-cards/', '/camera-cards/'];
const browser = await chromium.launch();
let failed = 0;
for (const scheme of ['light', 'dark']) {
  const ctx = await browser.newContext({ ...devices['iPhone 13'], colorScheme: scheme });
  for (const path of pages) {
    const page = await ctx.newPage();
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    const resp = await page.goto(base + path, { waitUntil: 'load' });
    const info = await page.evaluate(() => ({
      overflow: document.documentElement.scrollWidth > innerWidth + 1,
      title: document.title,
      links: [...document.querySelectorAll('a[href^="/"]')].map(a => a.getAttribute('href')),
    }));
    const bad = [];
    for (const l of new Set(info.links)) { const r = await ctx.request.get(base + l); if (!r.ok()) bad.push(l); }
    const ok = resp.ok() && !info.overflow && !errors.length && !bad.length;
    if (!ok) failed++;
    console.log(`${ok ? 'PASS' : 'FAIL'} ${scheme.padEnd(5)} ${path.padEnd(16)} "${info.title}"${info.overflow ? ' overflow' : ''}${errors.length ? ' errors=' + errors.join('|') : ''}${bad.length ? ' broken=' + bad.join(',') : ''}`);
    await page.close();
  }
  await ctx.close();
}
await browser.close();
server?.close();
process.exit(failed ? 1 : 0);
