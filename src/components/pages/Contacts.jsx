import { Link } from 'react-router-dom';
import { useLanguage } from '../../i18n/LanguageContext.jsx';

export default function Contacts() {
  const { t } = useLanguage();

  return (
    <main className="page">
      <section className="page__panel">
        <div className="page-hero">
          <p className="wip__badge">{t('contacts.wip')}</p>
          <h1 className="wip__title">{t('contacts.title')}</h1>
          <p className="wip__text">{t('contacts.text')}</p>
        </div>

        <div className="contacts-grid">
          <article className="contact-card">
            <p className="contact-card__label">{t('common.leiden')}</p>
            <h2>Bacco Perbacco Leiden</h2>
            <p>{t('contacts.leidenAddress')}</p>
            <p className="contact-card__note">{t('contacts.hoursNote')}</p>
          </article>

          <article className="contact-card">
            <p className="contact-card__label">{t('common.denHaag')}</p>
            <h2>Bacco Perbacco Den Haag</h2>
            <p>{t('contacts.denHaagAddress')}</p>
            <p className="contact-card__note">{t('contacts.hoursNote')}</p>
          </article>
        </div>

        <div className="contacts-wip">
          <h2>{t('contacts.directTitle')}</h2>
          <ul>
            <li>
              <span>{t('contacts.email')}</span>
              <em>{t('contacts.comingSoon')}</em>
            </li>
            <li>
              <span>{t('contacts.phone')}</span>
              <em>{t('contacts.comingSoon')}</em>
            </li>
          </ul>
          <p>{t('contacts.wipNote')}</p>
          <Link className="btn btn--ghost" to="/reserveren">
            {t('nav.reserve')}
          </Link>
        </div>
      </section>
    </main>
  );
}
