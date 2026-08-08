/** Canonical site origin (no trailing slash). Override with VITE_SITE_URL in production. */
export function getSiteOrigin() {
  const fromEnv = import.meta.env.VITE_SITE_URL;
  if (fromEnv && typeof fromEnv === 'string') {
    return fromEnv.replace(/\/$/, '');
  }
  if (typeof window !== 'undefined' && window.location?.origin) {
    return window.location.origin;
  }
  return 'https://baccoperbacco.nl';
}

export function absoluteUrl(pathname) {
  const path = pathname.startsWith('/') ? pathname : `/${pathname}`;
  return `${getSiteOrigin()}${path}`;
}
