import { expect, test } from 'vitest';
import { mailto, projectType, validate } from '../../src/lib/contact';
const a = { project: 'Brand', budget: 'Not sure yet', timeline: 'Flexible', message: 'Chào & hi?\nLine 2 100%', name: 'Ly Trần', email: 'a@b.co' };
test('valid answers pass', () => expect(validate(a)).toEqual({}));
test('bad email', () => expect(validate({ ...a, email: 'a@b' }).email).toBeTruthy());
test('blank message and name', () => { const e = validate({ ...a, message: '  ', name: '' }); expect(e.message).toBeTruthy(); expect(e.name).toBeTruthy(); });
test('mailto round-trips', () => {
  const u = new URL(mailto(a, 'x@y.co')); const body = u.searchParams.get('body')!;
  expect(u.pathname).toBe('x@y.co'); expect(body).toContain(a.message.replace('\n', '\r\n')); expect(body).toContain('Ly Trần'); expect(u.searchParams.get('subject')).toContain('Brand');
});
test('scope picks the project type', () => { expect(projectType('Brand guideline')).toBe('Brand'); expect(projectType('Campaign')).toBe('Campaign'); expect(projectType('Ly Noel 2025 · Tết 2026')).toBe('Packaging'); expect(projectType('Photography')).toBe(''); });
