import { useEffect, useState } from 'react';
import { useLanguage } from '../../i18n/LanguageContext.jsx';
import { fetchPublicContent } from '../../admin/adminApi.js';
import { mergeGalleryWithMenuFallback, staticDishesForLang } from '../../utils/siteContent.js';

function staticSlides(lang) {
  return staticDishesForLang(lang).map((d) => ({
    id: d.id,
    image: d.image,
    label: d.name,
    sub: d.course,
  }));
}

export default function Photos() {
  const { t, lang } = useLanguage();
  const [slides, setSlides] = useState(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const [galleryData, menuData] = await Promise.all([
          fetchPublicContent('gallery'),
          fetchPublicContent('menu'),
        ]);
        if (!cancelled) {
          setSlides(
            mergeGalleryWithMenuFallback(galleryData?.items || [], menuData?.items || [], lang)
          );
        }
      } catch {
        if (!cancelled) setSlides(staticSlides(lang));
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [lang]);

  if (!slides) {
    return (
      <main className="page">
        <section className="page__panel page__panel--wide">
          <p className="muted">{t('common.loading')}</p>
        </section>
      </main>
    );
  }

  return (
    <main className="page">
      <section className="page__panel page__panel--wide">
        <div className="page-hero">
          <p className="eyebrow">{t('photos.eyebrow')}</p>
          <h1 className="wip__title">{t('photos.title')}</h1>
          <p className="wip__text">{t('photos.text')}</p>
        </div>

        <div className="photo-grid">
          {slides.map((slide) => (
            <figure key={slide.id} className="photo-card">
              <div className="photo-card__media">
                {slide.image ? (
                  <img
                    src={slide.image}
                    alt={slide.label}
                    width={1200}
                    height={900}
                    loading="lazy"
                    decoding="async"
                  />
                ) : (
                  <div className="photo-card__placeholder">{slide.label}</div>
                )}
              </div>
              <figcaption>
                {slide.sub ? <span>{slide.sub}</span> : null}
                <strong>{slide.label}</strong>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
    </main>
  );
}
