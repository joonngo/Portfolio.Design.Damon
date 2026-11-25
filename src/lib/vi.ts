const VI = /[ăđĩơũưĂĐĨƠŨƯẠ-ỹ]/;
export type Run = { t: string; vi: boolean };
/** Short strings become one run; prose marks only the Vietnamese words. */
export function runs(text: string): Run[] {
  const s = text.normalize('NFC');
  if (!VI.test(s)) return [{ t: s, vi: false }];
  if (s.length <= 40) return [{ t: s, vi: true }];
  return s.split(/([^\s]*[ăđĩơũưĂĐĨƠŨƯẠ-ỹ][\p{L}]*)/u).filter(Boolean).map((t) => ({ t, vi: VI.test(t) }));
}
export const hasVi = (s: string) => VI.test(s.normalize('NFC'));
