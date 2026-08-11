/** Set the real URL in .env (copy from .env.example) — never hardcode it here, so it can change
 *  without touching code. */
export const INSURADESK_URL = import.meta.env.VITE_INSURADESK_URL ?? 'https://insuradesk.in';
