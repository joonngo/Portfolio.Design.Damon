import { cpSync, rmSync, mkdirSync } from 'node:fs';
rmSync('public/admin/sveltia', { recursive: true, force: true });
mkdirSync('public/admin/sveltia', { recursive: true });
cpSync('node_modules/@sveltia/cms/dist/sveltia-cms.js', 'public/admin/sveltia/sveltia-cms.js');
