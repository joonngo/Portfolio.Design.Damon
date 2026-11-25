import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { HEX } from './lib/projects';
/* The CMS writes '' for fields left blank; treat blank as absent. */
const blank = (v: unknown) => (v === '' || v === null ? undefined : v);
const text = z.preprocess((v) => (typeof v === 'number' ? String(v) : blank(v)), z.string().optional());
const hasSrc = (v: any) => (v && v.src ? v : undefined);
const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: process.env.CONTENT_DIR ?? './src/content/projects' }),
  schema: ({ image }) => {
    const img = z.object({ src: image(), alt: z.preprocess((v) => v ?? '', z.string()), caption: text });
    return z.object({
      title: z.string(),
      slug: z.string().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/),
      client: z.string(),
      scope: z.string(),
      industry: z.string(),
      code: z.string(),
      featured: z.boolean().default(false),
      order: z.number(),
      draft: z.boolean().default(false),
      year: text,
      role: text,
      cover: z.preprocess(hasSrc, img.optional()),
      gallery: z.preprocess((v) => (Array.isArray(v) ? v.filter(hasSrc) : []), z.array(img)),
      swatches: z.preprocess((v) => v ?? [], z.array(z.object({ name: z.string(), hex: z.string().regex(HEX) }))),
      credits: z.preprocess((v) => v ?? [], z.array(z.object({ name: z.string(), role: z.string() }))),
      brief: text,
      approach: text,
      result: text,
      link: z.preprocess((v) => { const s = blank(v); return typeof s === 'string' && !/^[a-z]+:/i.test(s) ? 'https://' + s : s; }, z.url({ protocol: /^https?$/ }).optional().catch(undefined)),
    });
  },
});
export const collections = { projects };
