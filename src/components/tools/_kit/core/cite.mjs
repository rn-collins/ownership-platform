// Citation text for the "Copy citation" button. American style, no em dashes.
export function citation(s) {
  const parts = [];
  if (s.publisher) parts.push(`${s.publisher}.`);
  parts.push(`“${s.title}.”`);
  if (s.date) parts.push(`${s.date}.`);
  if (s.url) parts.push(`${s.url}.`);
  if (s.accessed) parts.push(`Accessed ${s.accessed}.`);
  return parts.join(' ');
}
