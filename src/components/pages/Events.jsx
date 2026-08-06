import { Link } from 'react-router-dom';
import flyer from '../../assets/images/event-salotto-tango.png';
import { useLanguage } from '../../i18n/LanguageContext.jsx';

export default function Events() {
  const { t } = useLanguage();

  return (
    <main className="page">
      <section className="page__panel page__panel--wide">
        <div className="page-hero">
          <p className="eyebrow">{t('events.eyebrow')}</p>
          <h1 className="wip__title">{t('events.title')}</h1>
          <p className="wip__text">{t('events.text')}</p>
        </div>

        <article className="event-featured">
          <div className="event-featured__media">
            <img
              src={flyer}
              alt={t('events.tango.alt')}
              width={900}
              height={1200}
              loading="eager"
              decoding="async"
            />
          </div>

          <div className="event-featured__copy">
            <p className="event-featured__kicker">{t('events.tango.kicker')}</p>
            <p className="event-featured__date">{t('events.tango.dateLine')}</p>
            <h2>{t('events.tango.title')}</h2>
            <p className="event-featured__slogan">{t('events.tango.slogan')}</p>
            <p className="event-featured__lead">{t('events.tango.lead')}</p>
            <p>{t('events.tango.body')}</p>

            <ul className="event-featured__meta">
              <li>
                <span>{t('events.tango.whenLabel')}</span>
                {t('events.tango.when')}
              </li>
              <li>
                <span>{t('events.tango.whereLabel')}</span>
                {t('events.tango.where')}
              </li>
              <li>
                <span>{t('events.tango.priceLabel')}</span>
                {t('events.tango.price')}
              </li>
            </ul>

            <p className="event-featured__tags">{t('events.tango.tags')}</p>
            <Link className="btn btn--primary" to="/reserveren?sede=leiden">
              {t('events.tango.cta')}
            </Link>
          </div>
        </article>
      </section>
    </main>
  );
}
