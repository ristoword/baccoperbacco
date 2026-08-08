import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import flyerTango from '../../assets/images/event-salotto-tango.png';
import flyerSarda from '../../assets/images/event-serata-sarda.png';
import flyerStellato from '../../assets/images/event-menu-stellato.png';
import { useLanguage } from '../../i18n/LanguageContext.jsx';
import { fetchPublicContent } from '../../admin/adminApi.js';

const LEGACY_FLYERS = {
  tango: flyerTango,
  sarda: flyerSarda,
  stellato: flyerStellato,
};

const EVENT_CARDS = [
  { key: 'tango', flyer: flyerTango, sede: 'leiden', loading: 'eager' },
  { key: 'sarda', flyer: flyerSarda, sede: 'leiden', loading: 'lazy' },
  { key: 'stellato', flyer: flyerStellato, sede: 'leiden', loading: 'lazy' },
];

function pickLang(obj, lang) {
  if (!obj || typeof obj !== 'object') return '';
  return obj[lang] || obj.it || obj.nl || obj.en || '';
}

export default function Events() {
  const { t, lang } = useLanguage();
  const [apiEvents, setApiEvents] = useState(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const data = await fetchPublicContent('events');
        if (!cancelled) setApiEvents(data?.items || []);
      } catch {
        if (!cancelled) setApiEvents([]);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const useApi = apiEvents && apiEvents.length > 0;

  return (
    <main className="page">
      <section className="page__panel page__panel--wide">
        <div className="page-hero">
          <p className="eyebrow">{t('events.eyebrow')}</p>
          <h1 className="wip__title">{t('events.title')}</h1>
          <p className="wip__text">{t('events.text')}</p>
        </div>

        <div className="events-stack">
          {useApi
            ? apiEvents.map((event, index) => {
                const flyer =
                  event.flyerUrl || (event.legacyKey && LEGACY_FLYERS[event.legacyKey]) || null;
                return (
                  <article key={event.id} className="event-featured" id={event.id}>
                    {flyer ? (
                      <div className="event-featured__media">
                        <img
                          src={flyer}
                          alt={pickLang(event.title, lang)}
                          width={900}
                          height={1200}
                          loading={index === 0 ? 'eager' : 'lazy'}
                          decoding="async"
                        />
                      </div>
                    ) : null}

                    <div className="event-featured__copy">
                      <p className="event-featured__kicker">{pickLang(event.kicker, lang)}</p>
                      <p className="event-featured__date">{pickLang(event.dateLine, lang)}</p>
                      <h2>{pickLang(event.title, lang)}</h2>
                      <p className="event-featured__slogan">{pickLang(event.slogan, lang)}</p>
                      <p className="event-featured__lead">{pickLang(event.lead, lang)}</p>
                      <p>{pickLang(event.body, lang)}</p>

                      <ul className="event-featured__meta">
                        <li>
                          <span>{t('events.meta.when')}</span>
                          {pickLang(event.when, lang)}
                        </li>
                        <li>
                          <span>{t('events.meta.where')}</span>
                          {pickLang(event.where, lang)}
                        </li>
                        <li>
                          <span>{t('events.meta.price')}</span>
                          {pickLang(event.price, lang)}
                        </li>
                      </ul>

                      <p className="event-featured__tags">{pickLang(event.tags, lang)}</p>
                      <Link className="btn btn--primary" to={`/reserveren?sede=${event.sede || 'leiden'}`}>
                        {t('nav.reserve')}
                      </Link>
                    </div>
                  </article>
                );
              })
            : EVENT_CARDS.map((event) => {
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
