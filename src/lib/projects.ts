export const HEX = /^#[0-9A-F]{6}$/i;
export interface Img { src: any; alt: string; caption?: string }
export interface Project {
  title: string; slug: string; client: string; scope: string; industry: string;
  year?: string; role?: string; code: string; featured: boolean; order: number;
  cover?: Img; gallery: Img[]; swatches: { name: string; hex: string }[];
  credits?: { name: string; role: string }[];
  brief?: string; approach?: string; result?: string; link?: string; draft: boolean;
}
const live = (p: Project[]) => p.filter((x) => !x.draft).sort((a, b) => a.order - b.order);
export const selected = (p: Project[]) => live(p).filter((x) => x.featured);
export const archive = (p: Project[]) => live(p).filter((x) => !x.featured);
export function next(p: Project[], slug: string): Project {
  const s = selected(p);
  return s[(s.findIndex((x) => x.slug === slug) + 1) % s.length];
}
export const no = (i: number) => `A${i + 1}`;
