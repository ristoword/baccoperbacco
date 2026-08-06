import { dishesByCourse } from '../../data/dishes.js';
import { useLanguage } from '../../i18n/LanguageContext.jsx';
import { Link } from 'react-router-dom';

export default function Menu() {
  const { t, lang } = useLanguage();
  const groups = dishesByCourse(lang);

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
          {groups.map((group) => (
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
