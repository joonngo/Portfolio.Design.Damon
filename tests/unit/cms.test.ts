import { readFileSync } from 'node:fs';
import { expect, test } from 'vitest';
const yml = readFileSync('public/admin/config.yml', 'utf8'), schema = readFileSync('src/content.config.ts', 'utf8');
test('backend', () => { for (const s of ['name: github', 'repo: joonngo/Portfolio.Design.Damon', 'branch: main', 'auth_methods: [token]', 'max_file_size: 5242880']) expect(yml).toContain(s); });
test('every schema field is editable', () => { for (const f of ['title','slug','client','scope','industry','year','role','code','featured','order','cover','gallery','swatches','brief','approach','result','link','draft','credits','tags']) { expect(schema).toContain(f + ':'); if (f !== 'slug') expect(yml).toMatch(new RegExp(`name: ${f}\\b`)); } });
