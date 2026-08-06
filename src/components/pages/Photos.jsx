import { dishes } from '../../data/dishes.js';
import { useLanguage } from '../../i18n/LanguageContext.jsx';

export default function Photos() {
  const { t } = useLanguage();

  return (
    <main className="page">
      <section className="page__panel page__panel--wide">
        <div className="page-hero">
          <p className="eyebrow">{t('photos.eyebrow')}</p>
          <h1 className="wip__title">{t('photos.title')}</h1>
          <p className="wip__text">{t('photos.text')}</p>
        </div>

        <div className="photo-grid">
          {dishes.map((dish) => (
            <figure key={dish.id} className="photo-card">
              <div className="photo-card__media">
                <img
                  src={dish.image}
                  alt={dish.name}
                  width={1200}
                  height={900}
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <figcaption>
                <span>{dish.course.it}</span>
                <strong>{dish.name}</strong>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
    </main>
  );
}
