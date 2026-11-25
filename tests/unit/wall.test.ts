import { expect, test, describe } from 'vitest';
import { scatter, sheet, rotated, type Rect } from '../../src/lib/wall';
const pieces = [[72,96],[104,65],[66,66],[96,64],[68,85],[110,55],[96,64],[58,58],[70,88],[56,66],[56,66],[56,66],[56,66],[56,66],[118,72],[110,52],[20,20],[20,20],[80,44],[108,44],[62,38],[108,60],[62,38]].map(([w,h]) => ({ w, h }));
const hit = (a: Rect, b: Rect) => a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
const cases = [
  { name: 'desktop', area: { x: 43, y: 72, w: 1354, h: 778 }, reserved: [{ x: 525, y: 240, w: 448, h: 370 }, { x: 33, y: 740, w: 320, h: 120 }], cols: 9, rows: 5, n: 23 },
  { name: 'mobile', area: { x: 14, y: 72, w: 362, h: 720 }, reserved: [{ x: 4, y: 90, w: 255, h: 220 }, { x: 4, y: 660, w: 372, h: 130 }], cols: 4, rows: 9, n: 14 },
];
describe.each(cases)('scatter $name', (c) => {
  const s = pieces.slice(0, c.n);
  const out = scatter(s, c.area, c.reserved, c.cols, c.rows, 13);
  test('same seed, same layout', () => expect(scatter(s, c.area, c.reserved, c.cols, c.rows, 13)).toEqual(out));
  test('inside area and off reserved zones, rotation included', () => out.forEach((p, i) => {
    const r = rotated({ ...p, ...s[i] }, p.rot);
    expect(r.x).toBeGreaterThanOrEqual(c.area.x - 0.01); expect(r.y).toBeGreaterThanOrEqual(c.area.y - 0.01);
    expect(r.x + r.w).toBeLessThanOrEqual(c.area.x + c.area.w + 0.01); expect(r.y + r.h).toBeLessThanOrEqual(c.area.y + c.area.h + 0.01);
    c.reserved.forEach((z) => expect(hit(r, z)).toBe(false));
  }));
});
test('sheet labels by row and fits pieces in cells', () => {
  const all = [{ w: 400, h: 360 }, ...pieces];
  const out = sheet(all, { x: 576, y: 92, w: 821, h: 700 }, 8);
  expect(out.slice(0, 2).map((o) => o.label)).toEqual(['A1', 'A2']);
  expect(out[8].label).toBe('B1');
  out.forEach((o, i) => { const w = all[i].w * o.scale, h = all[i].h * o.scale, cx = o.x + all[i].w / 2, cy = o.y + all[i].h / 2;
    expect(cx - w / 2).toBeGreaterThanOrEqual(o.cell.x); expect(cx + w / 2).toBeLessThanOrEqual(o.cell.x + o.cell.w);
    expect(cy - h / 2).toBeGreaterThanOrEqual(o.cell.y); expect(cy + h / 2).toBeLessThanOrEqual(o.cell.y + o.cell.h); });
});
