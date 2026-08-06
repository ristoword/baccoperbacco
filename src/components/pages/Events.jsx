import { Link } from 'react-router-dom';
import flyerTango from '../../assets/images/event-salotto-tango.png';
import flyerSarda from '../../assets/images/event-serata-sarda.png';
import flyerStellato from '../../assets/images/event-menu-stellato.png';
import { useLanguage } from '../../i18n/LanguageContext.jsx';

const EVENT_CARDS = [
  {
    key: 'tango',
    flyer: flyerTango,
    sede: 'leiden',
    loading: 'eager',
  },
  {
    key: 'sarda',
    flyer: flyerSarda,
    sede: 'leiden',
    loading: 'lazy',
  },
  {
    key: 'stellato',
    flyer: flyerStellato,
    sede: 'den-haag',
    loading: 'lazy',
  },
];

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

        <div className="events-stack">
          {EVENT_CARDS.map((event) => {
            const base = `events.${event.key}`;
            return (
              <article key={event.key} className="event-featured" id={event.key}>
                <div className="event-featured__media">
                  <img
                    src={event.flyer}
                    alt={t(`${base}.alt`)}
                    width={900}
                    height={1200}
                    loading={event.loading}
                    decoding="async"
                  />
                </div>

                <div className="event-featured__copy">
                  <p className="event-featured__kicker">{t(`${base}.kicker`)}</p>
                  <p className="event-featured__date">{t(`${base}.dateLine`)}</p>
                  <h2>{t(`${base}.title`)}</h2>
                  <p className="event-featured__slogan">{t(`${base}.slogan`)}</p>
                  <p className="event-featured__lead">{t(`${base}.lead`)}</p>
                  <p>{t(`${base}.body`)}</p>

                  <ul className="event-featured__meta">
                    <li>
                      <span>{t(`${base}.whenLabel`)}</span>
                      {t(`${base}.when`)}
                    </li>
                    <li>
                      <span>{t(`${base}.whereLabel`)}</span>
                      {t(`${base}.where`)}
                    </li>
                    <li>
                      <span>{t(`${base}.priceLabel`)}</span>
                      {t(`${base}.price`)}
                    </li>
                  </ul>

                  <p className="event-featured__tags">{t(`${base}.tags`)}</p>
                  <Link className="btn btn--primary" to={`/reserveren?sede=${event.sede}`}>
                    {t(`${base}.cta`)}
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}
