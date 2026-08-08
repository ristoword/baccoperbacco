import { useEffect } from 'react';

export default function JsonLd({ id, data }) {
  useEffect(() => {
    const scriptId = `jsonld-${id}`;
    let el = document.getElementById(scriptId);
    if (!el) {
      el = document.createElement('script');
      el.type = 'application/ld+json';
      el.id = scriptId;
      document.head.appendChild(el);
    }
    el.textContent = JSON.stringify(data);

    return () => {
      el?.remove();
    };
  }, [id, data]);

  return null;
}
