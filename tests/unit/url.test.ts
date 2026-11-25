import { expect, test } from 'vitest';
import { href } from '../../src/lib/url';
test('pages get base and trailing slash', () => {
  expect(href('/work/move')).toBe('/Portfolio.Design.Damon/work/move/');
  expect(href('/')).toBe('/Portfolio.Design.Damon/');
});
test('files keep their name', () => expect(href('/rss.xml')).toBe('/Portfolio.Design.Damon/rss.xml'));
test('hash survives', () => expect(href('/#work')).toBe('/Portfolio.Design.Damon/#work'));
