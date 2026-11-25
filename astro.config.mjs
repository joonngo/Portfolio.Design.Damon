import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { SITE, BASE } from './src/lib/base.mjs';
export default defineConfig({ site: SITE, base: BASE, trailingSlash: 'always', integrations: [sitemap()], build: { inlineStylesheets: 'always' }, devToolbar: { enabled: false } });
