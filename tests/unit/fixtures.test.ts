import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { beforeAll, expect, test } from 'vitest';
const out = '.superpowers/fx';
beforeAll(() => { execFileSync('node_modules/.bin/astro', ['build', '--outDir', out], { env: { ...process.env, CONTENT_DIR: './tests/fixtures/content' }, stdio: 'pipe' }); }, 90000);
test('small gallery lands in Deliverables with captions, SVG included', () => {
  const h = readFileSync(`${out}/work/vu-mi/index.html`, 'utf8').split('id="deliverables"')[1].split('id="result"')[0];
  expect(h).toContain('Caption one'); expect(h).toContain('Caption two'); expect(h).toMatch(/\.svg|data:image\/svg/);
});
test('bare archive link gets a scheme', () => expect(readFileSync(`${out}/index.html`, 'utf8').includes('href="https://behance.net/x"')).toBe(true));
test('cover size label is the real one', () => expect(readFileSync(`${out}/index.html`, 'utf8').includes('1200 × 1800')).toBe(true));
test('a new project puts its own images on the wall', () => { const w = readFileSync(`${out}/index.html`, 'utf8').split('id="wall"')[1].split('class="ticker')[0]; expect((w.match(/Vũ Mĩ, /g) ?? []).length).toBeGreaterThanOrEqual(2); expect(w.includes('1B+ VND')).toBe(false); });
