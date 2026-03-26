export function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function pad(value: number) {
  return String(value).padStart(2, '0');
}