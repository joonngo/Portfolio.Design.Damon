import { BASE } from './base.mjs';
export function href(path: string): string {
  const [, p, tail] = path.match(/^\/?([^?#]*)(.*)$/)!;
  const last = p.split('/').pop()!;
  const slash = p === '' || p.endsWith('/') || last.includes('.') ? '' : '/';
  return BASE + p + slash + tail;
}
