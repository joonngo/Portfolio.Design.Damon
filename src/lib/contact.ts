export type Answers = { project: string; budget: string; timeline: string; message: string; name: string; email: string };
export function validate(a: Answers): Partial<Record<keyof Answers, string>> {
  const e: Partial<Record<keyof Answers, string>> = {};
  if (!a.project) e.project = 'Pick a project type.';
  if (!a.budget) e.budget = 'Pick a budget.';
  if (!a.timeline) e.timeline = 'Pick a timeline.';
  if (!a.message.trim()) e.message = 'Write a line or two about the project.';
  if (!a.name.trim()) e.name = 'Add your name.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(a.email.trim())) e.email = 'Add an email like name@domain.com.';
  return e;
}
/** Guess the form's first answer from a project's scope. */
export function projectType(scope: string): string {
  if (/campaign|\bkv\b|key visual/i.test(scope)) return 'Campaign';
  if (/packag|\bcups?\b|\bly\b|label/i.test(scope)) return 'Packaging';
  if (/brand|logo|identity|guideline/i.test(scope)) return 'Brand';
  return '';
}
export function mailto(a: Answers, to: string): string {
  const body = plain(a).replace(/\r?\n/g, '\r\n');
  return `mailto:${to}?subject=${encodeURIComponent(`${a.project} project, ${a.name}`)}&body=${encodeURIComponent(body)}`;
}
export const plain = (a: Answers) => [`Project: ${a.project}`, `Budget: ${a.budget}`, `Timeline: ${a.timeline}`, '', a.message, '', a.name, a.email].join('\n');
