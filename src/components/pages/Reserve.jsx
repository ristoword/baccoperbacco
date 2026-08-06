import { Link, useSearchParams } from 'react-router-dom';
import WipBanner from '../common/WipBanner.jsx';
import { useLanguage } from '../../i18n/LanguageContext.jsx';

export default function Reserve() {
  const { t } = useLanguage();
  const [params, setParams] = useSearchParams();
  const selected = params.get('sede') || '';

  const sedi = [
    {
      id: 'den-haag',
      name: t('common.denHaag'),
      number: '01',
      text: t('reserve.denHaagText'),
      hours: t('home.denHaagHours'),
    },
    {
      id: 'leiden',
      name: t('common.leiden'),
      number: '02',
      text: t('reserve.leidenText'),
      hours: t('home.leidenHours'),
    },
  ];

  function chooseSede(id) {
    setParams({ sede: id });
  }

  const selectedName = sedi.find((s) => s.id === selected)?.name;

  return (
    <main className="page">
      <section className="page__panel page__panel--wide">
        <WipBanner
          title={t('reserve.title')}
          text={t('reserve.text')}
          badge={t('reserve.wip')}
        />

        <div className="sedi-grid">
          {sedi.map((sede) => {
            const active = selected === sede.id;
            return (
              <button
                key={sede.id}
                type="button"
                className={active ? 'sede-card is-active' : 'sede-card'}
                onClick={() => chooseSede(sede.id)}
              >
                <span className="sede-card__number">{sede.number}</span>
                <h2>{sede.name}</h2>
                <p>{sede.text}</p>
                <p className="sede-card__hours">
                  <span>{t('common.openingHours')}</span>
                  {sede.hours}
                </p>
                <span className="sede-card__cta">
                  {active ? t('reserve.selected') : `${t('reserve.choose')} ${sede.name}`}
                </span>
              </button>
            );
          })}
        </div>

        <div className="page__preview">
          <p className="sede-selected">
            {selected
              ? `${t('reserve.venue')}: ${selectedName}`
              : t('reserve.pickFirst')}
          </p>

          <div className="form-ghost">
            <label>
              {t('reserve.date')}
              <input type="date" disabled />
            </label>
            <label>
              {t('reserve.time')}
              <input type="time" disabled />
            </label>
            <label>
              {t('reserve.people')}
              <input type="number" disabled placeholder="2" />
            </label>
            <label>
              {t('reserve.name')}
              <input type="text" disabled />
            </label>
            <button className="btn btn--primary" type="button" disabled>
              {t('reserve.title')} {selectedName || ''} ({t('reserve.soon')})
            </button>
          </div>

          <p className="page__back">
            <Link to="/#vestigingen">{t('reserve.seeHome')}</Link>
          </p>
        </div>
      </section>
    </main>
  );
}
