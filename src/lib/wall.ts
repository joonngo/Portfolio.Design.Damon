export type Rect = { x: number; y: number; w: number; h: number };
type Size = { w: number; h: number };
export function rng(seed: number): () => number {
  let a = seed >>> 0;
  return () => { a = (a + 0x6d2b79f5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
}
/** Axis-aligned bounds of a rect rotated `deg` around its centre. */
export function rotated(r: Rect, deg: number): Rect {
  const a = Math.abs(deg * Math.PI / 180), w = r.w * Math.cos(a) + r.h * Math.sin(a), h = r.w * Math.sin(a) + r.h * Math.cos(a);
  return { x: r.x + r.w / 2 - w / 2, y: r.y + r.h / 2 - h / 2, w, h };
}
const overlap = (a: Rect, b: Rect) => Math.max(0, Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x)) * Math.max(0, Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y));
/** Place pieces in free zones; big ones first, each where it covers its neighbours least. */
export function scatter(sizes: Size[], area: Rect, reserved: Rect[], cols: number, rows: number, seed: number) {
  const R = rng(seed), zw = area.w / cols, zh = area.h / rows;
  const zones: { x: number; y: number; used: number }[] = [];
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) zones.push({ x: area.x + (c + 0.5) * zw, y: area.y + (r + 0.5) * zh, used: 0 });
  const placed: Rect[] = [], out: { x: number; y: number; rot: number }[] = new Array(sizes.length);
  const order = sizes.map((_, i) => i).sort((a, b) => sizes[b].w * sizes[b].h - sizes[a].w * sizes[a].h);
  for (const i of order) {
    const s = sizes[i], rot = (R() - 0.5) * 14;
    const b = rotated({ x: 0, y: 0, ...s }, rot);
    let best: { cost: number; box: Rect } | null = null;
    const attempt = (cx: number, cy: number, extra: number) => {
      const box = { x: Math.max(area.x, Math.min(area.x + area.w - b.w, cx - b.w / 2)), y: Math.max(area.y, Math.min(area.y + area.h - b.h, cy - b.h / 2)), w: b.w, h: b.h };
      if (reserved.some((q) => overlap(box, q) > 0)) return;
      const pad = { x: box.x - 10, y: box.y - 10, w: box.w + 20, h: box.h + 20 };
      const cost = placed.reduce((t, q) => t + overlap(pad, q), 0) / (pad.w * pad.h) + extra;
      if (!best || cost < best.cost) best = { cost, box };
    };
    for (const z of zones) for (let k = 0; k < 3; k++) attempt(z.x + (R() - 0.5) * zw * 0.8, z.y + (R() - 0.5) * zh * 0.8, R() * 0.12);
    if (!best) for (let y = area.y; y <= area.y + area.h - b.h; y += 8) for (let x = area.x; x <= area.x + area.w - b.w; x += 8) attempt(x + b.w / 2, y + b.h / 2, 0);
    const box = (best as { box: Rect } | null)?.box ?? { x: area.x, y: area.y, ...b };
    placed.push(box);
    out[i] = { x: box.x + b.w / 2 - s.w / 2, y: box.y + b.h / 2 - s.h / 2, rot };
  }
  return out;
}
/** Contact sheet: label on top of each cell, piece centred under it. */
export function sheet(sizes: Size[], area: Rect, cols: number) {
  const rows = Math.ceil(sizes.length / cols), cw = area.w / cols, ch = Math.min(cw * 1.02, area.h / rows);
  return sizes.map((s, i) => {
    const c = i % cols, r = Math.floor(i / cols), cell = { x: area.x + cw * c, y: area.y + ch * r, w: cw, h: ch };
    const scale = Math.max(0.1, Math.min(1.3, cw * 0.7 / s.w, (ch - 30) * 0.84 / s.h));
    return { cell, label: `${String.fromCharCode(65 + r)}${c + 1}`, x: cell.x + cw / 2 - s.w / 2, y: cell.y + 20 + (ch - 26) / 2 - s.h / 2, scale };
  });
}
