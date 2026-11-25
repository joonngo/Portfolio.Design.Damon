import { expect, test } from 'vitest';
import { runs } from '../../src/lib/vi';
test('a short name is one Vietnamese run', () => expect(runs('Chạm kem bơ')).toEqual([{ t: 'Chạm kem bơ', vi: true }]));
test('decomposed input counts and is composed', () => expect(runs('Chạm kem bơ'.normalize('NFD'))).toEqual([{ t: 'Chạm kem bơ', vi: true }]));
test('english stays plain', () => expect(runs('Gong Cha')).toEqual([{ t: 'Gong Cha', vi: false }]));
test('prose marks only Vietnamese words', () => {
  const r = runs('This is a long English sentence about the Tết season and paper cups.');
  expect(r.filter((x) => x.vi).map((x) => x.t)).toEqual(['Tết']);
  expect(r.map((x) => x.t).join('')).toContain('the Tết season');
});
test('tilde vowels are Vietnamese', () => expect(runs('Vũ Mĩ')).toEqual([{ t: 'Vũ Mĩ', vi: true }]));
