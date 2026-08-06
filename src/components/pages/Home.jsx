import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo-bacco-perbacco.png';
import owners from '../../assets/images/proprietari-roberta-giuseppe.png';
import heroCoast from '../../assets/images/hero-costa-italiana.jpg';
import { useLanguage } from '../../i18n/LanguageContext.jsx';

export default function Home() {
  const { t } = useLanguage();

  const locations = [
    {
      id: 'den-haag',
      number: '01',
      name: t('common.denHaag'),
      highlight: t('home.denHaagHighlight'),
      summary: t('home.denHaagSummary'),
      detail: t('home.denHaagDetail'),
      hours: t('home.denHaagHours'),
      reserveLabel: t('home.reserveDenHaag'),
    },
    {
      id: 'leiden',
      number: '02',
      name: t('common.leiden'),
      highlight: t('home.leidenHighlight'),
      summary: t('home.leidenSummary'),
      detail: t('home.leidenDetail'),
      hours: t('home.leidenHours'),
      reserveLabel: t('home.reserveLeiden'),
    },
  ];

  return (
    <main>
      <section className="home" aria-label="Bacco Perbacco">
        <div className="home__atmosphere" aria-hidden="true">
          <div
            className="home__photo"
            style={{ backgroundImage: `url(${heroCoast})` }}
          />
          <div className="home__wash" />
          <div className="home__grain" />
          <div className="home__light" />
          <div className="home__vignette" />
        </div>

        <div className="home__stage">
          <div className="home__brand">
            <div className="home__brand-aura" aria-hidden="true" />
            <img
              src={logo}
              alt="Bacco Perbacco — Trattoria Italiana"
              width={840}
              height={840}
              decoding="async"
              fetchPriority="high"
            />
          </div>

          <div className="home__copy">
            <h1 className="home__headline">
              {t('home.headlineBefore')} <em>{t('home.headlineEm')}</em>{' '}
              {t('home.headlineAfter')}
            </h1>
            <p className="home__lead">{t('home.description')}</p>
            <p className="home__sedi">
              <a href="#vestigingen">{t('common.denHaag')}</a>
              <span aria-hidden="true">·</span>
              <a href="#vestigingen">{t('common.leiden')}</a>
            </p>
            <div className="home__actions">
              <Link className="btn btn--primary" to="/reserveren">
                {t('home.ctaReserve')}
              </Link>
              <Link className="btn btn--ghost" to="/menu">
                {t('home.ctaMenu')}
              </Link>
            </div>
          </div>
        </div>

        <div className="home__scroll" aria-hidden="true">
          <span>{t('home.scroll')}</span>
          <div className="home__scroll-line" />
        </div>
      </section>

      <section className="story" id="ons-verhaal" aria-labelledby="story-title">
        <div className="story__media">
          <img
            src={owners}
            alt="Roberta & Giuseppe"
            width={900}
            height={1100}
            loading="lazy"
            decoding="async"
          />
        </div>
        <div className="story__copy">
          <p className="eyebrow">{t('home.storyEyebrow')}</p>
          <h2 id="story-title" className="section-title">
            {t('home.storyTitle')}
          </h2>
          <div className="story__body">
            <p>{t('home.storyP1')}</p>
            <p>{t('home.storyP2')}</p>
            <p>{t('home.storyP3')}</p>
          </div>
          <p className="story__owners">Roberta & Giuseppe</p>
        </div>
      </section>

      <section className="hospitality" aria-labelledby="hospitality-title">
        <div className="hospitality__inner">
          <p className="eyebrow">{t('home.hospitalityEyebrow')}</p>
          <h2 id="hospitality-title" className="section-title">
            {t('home.hospitalityTitle')}
          </h2>
          <div className="hospitality__body">
            <p>{t('home.hospitalityP1')}</p>
            <p>{t('home.hospitalityP2')}</p>
            <p>{t('home.hospitalityP3')}</p>
          </div>
          <ul className="hospitality__tags">
            <li>{t('home.tag1')}</li>
            <li>{t('home.tag2')}</li>
          </ul>
        </div>
      </section>

      <section className="philosophy" aria-labelledby="philosophy-title">
        <div className="philosophy__inner">
          <p className="eyebrow" id="philosophy-title">
            {t('home.philosophyEyebrow')}
          </p>
          <blockquote className="philosophy__quote">
            “{t('home.philosophyQuote')}”
          </blockquote>
          <p className="philosophy__text">{t('home.philosophyText')}</p>
        </div>
      </section>

      <section className="locations" id="vestigingen" aria-labelledby="locations-title">
        <div className="locations__intro">
          <p className="eyebrow">{t('home.locationsEyebrow')}</p>
          <h2 id="locations-title" className="section-title">
            {t('home.locationsTitle')}
          </h2>
          <p className="locations__lead">{t('home.locationsIntro')}</p>
        </div>

        <div className="locations__list">
          {locations.map((loc) => (
            <article key={loc.id} className="location" id={loc.id}>
              <div className="location__head">
                <span className="location__number">{loc.number}</span>
                <h3 className="location__name">{loc.name}</h3>
              </div>
              <p className="location__highlight">{loc.highlight}</p>
              <p className="location__summary">{loc.summary}</p>
              <p className="location__detail">{loc.detail}</p>
              <p className="location__hours">
                <span>{t('common.openingHours')}</span>
                {loc.hours}
              </p>
              <Link className="btn btn--primary" to={`/reserveren?sede=${loc.id}`}>
                {loc.reserveLabel}
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="reserve" id="reserveren" aria-labelledby="reserve-title">
        <div className="reserve__inner">
          <p className="eyebrow">{t('home.reserveEyebrow')}</p>
          <h2 id="reserve-title" className="section-title">
            {t('home.reserveTitle')}
          </h2>
          <p className="reserve__text">{t('home.reserveText')}</p>
          <div className="home__actions">
            <Link className="btn btn--primary" to="/reserveren?sede=den-haag">
              {t('home.reserveDenHaag')}
            </Link>
            <Link className="btn btn--ghost" to="/reserveren?sede=leiden">
              {t('home.reserveLeiden')}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
