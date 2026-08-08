import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../i18n/LanguageContext.jsx';
import { fetchPublicContent } from '../../admin/adminApi.js';
import { menuItemsByCourse, staticDishesForLang } from '../../utils/siteContent.js';

export default function Menu() {
  const { t, lang } = useLanguage();
  const [groups, setGroups] = useState(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const data = await fetchPublicContent('menu');
        if (!cancelled && data?.items?.length) {
          setGroups(menuItemsByCourse(data.items, lang));
        }
      } catch {
        if (!cancelled) setGroups(null);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [lang]);

  const fallbackGroups = (() => {
    const map = new Map();
    for (const item of staticDishesForLang(lang)) {
      if (!map.has(item.course)) map.set(item.course, []);
      map.get(item.course).push({ id: item.id, name: item.name });
    }
    return [...map.entries()].map(([course, items]) => ({ course, items }));
  })();

  const displayGroups = groups?.length ? groups : fallbackGroups;

  return (
    <main className="page">
      <section className="page__panel">
        <div className="page-hero">
          <h1 className="wip__title">{t('menu.title')}</h1>
          <p className="wip__text">{t('menu.text')}</p>
          <Link className="btn btn--ghost" to="/foto">
            {t('menu.seePhotos')}
          </Link>
        </div>

        <div className="menu-grid">
          {displayGroups.map((group) => (
            <article key={group.course} className="menu-group">
              <h2>{group.course}</h2>
              <ul>
                {group.items.map((item) => (
                  <li key={item.id}>
                    <span>{item.name}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
