import { expect, test } from 'vitest';
import { archive, HEX, next, selected, type Project } from '../../src/lib/projects';
const p = (slug: string, order: number, o: Partial<Project> = {}) => ({ title: slug, slug, client: slug, scope: '', industry: '', code: 'X', featured: true, order, gallery: [], swatches: [], draft: false, ...o }) as Project;
const list = [p('b', 2), p('a', 1), p('d', 3, { draft: true }), p('z', 1, { featured: false })];
test('selected: featured, published, ordered', () => expect(selected(list).map((x) => x.slug)).toEqual(['a', 'b']));
test('archive: only unfeatured, published', () => expect(archive(list).map((x) => x.slug)).toEqual(['z']));
test('next wraps to first', () => { expect(next(list, 'a').slug).toBe('b'); expect(next(list, 'b').slug).toBe('a'); });
test('hex', () => { expect(HEX.test('#1F3BFF')).toBe(true); expect(HEX.test('blue')).toBe(false); expect(HEX.test('#FFF')).toBe(false); });
