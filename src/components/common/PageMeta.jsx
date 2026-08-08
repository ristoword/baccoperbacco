import { useEffect } from 'react';

function upsertMeta(attr, key, content) {
  if (!content) return;
  let el = document.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertLink(rel, href) {
  if (!href) return;
  let el = document.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

export default function PageMeta({ title, description, pathname, noIndex = false }) {
  useEffect(() => {
    if (title) document.title = title;
    upsertMeta('name', 'description', description);
    upsertMeta('property', 'og:title', title);
    upsertMeta('property', 'og:description', description);
    upsertMeta('property', 'og:type', 'website');
    if (pathname) {
      const origin =
        import.meta.env.VITE_SITE_URL?.replace(/\/$/, '') || window.location.origin;
      const url = `${origin}${pathname.startsWith('/') ? pathname : `/${pathname}`}`;
      upsertLink('canonical', url);
      upsertMeta('property', 'og:url', url);
    }
    upsertMeta('name', 'robots', noIndex ? 'noindex, nofollow' : 'index, follow');

    return () => {
      document.title = 'Bacco Perbacco — Trattoria Italiana';
    };
  }, [title, description, pathname, noIndex]);

  return null;
}
