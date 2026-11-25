import { readFileSync } from 'node:fs';
import satori from 'satori';
import sharp from 'sharp';
import { load } from '../../lib/load';
import { selected } from '../../lib/projects';
export async function getStaticPaths() {
  return [{ params: { slug: 'home' }, props: { t: 'Damon Ngo', s: 'Art direction for brand, packaging and campaigns', c: undefined } }, ...selected(await load()).map((p) => ({ params: { slug: p.slug }, props: { t: p.client, s: p.scope, c: p.cover?.src } }))];
}
const f = (s: string) => readFileSync(`node_modules/@fontsource/hanken-grotesk/files/hanken-grotesk-${s}-800-normal.woff`);
export async function GET({ props }: any) {
  const path = props.c?.fsPath;
  if (path) return png(await sharp(path).resize(1200, 630, { fit: 'cover' }).png().toBuffer());
  const svg = await satori({ type: 'div', props: { style: { width: '100%', height: '100%', background: '#FFFFFF', color: '#111112', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 64, fontFamily: 'HK, HKV' }, children: [
    { type: 'div', props: { style: { fontSize: 26, display: 'flex', justifyContent: 'space-between' }, children: [{ type: 'span', props: { children: 'Damon Ngo' } }, { type: 'div', props: { style: { width: 26, height: 26, background: '#1F3BFF' } } }] } },
    { type: 'div', props: { style: { display: 'flex', flexDirection: 'column' }, children: [{ type: 'div', props: { style: { fontSize: 108, lineHeight: 1.15, letterSpacing: -2 }, children: props.t } }, { type: 'div', props: { style: { fontSize: 32, marginTop: 16 }, children: props.s } }] } } ] } } as any,
    { width: 1200, height: 630, fonts: [{ name: 'HK', data: f('latin'), weight: 800 }, { name: 'HKV', data: f('vietnamese'), weight: 800 }] });
  return png(await sharp(Buffer.from(svg)).png().toBuffer());
}
const png = (b: Buffer) => new Response(new Uint8Array(b), { headers: { 'Content-Type': 'image/png' } });
