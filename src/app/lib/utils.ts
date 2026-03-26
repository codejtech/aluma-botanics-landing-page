export function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function pad(value: number) {
  return String(value).padStart(2, '0');
}

export function formatLaunchDate(iso: string) {
  const date = new Date(iso);

  if (isNaN(date.getTime())) return '';

  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}