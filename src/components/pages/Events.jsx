import WipBanner from '../common/WipBanner.jsx';
import { useLanguage } from '../../i18n/LanguageContext.jsx';

const events = [
  {
    date: '2026-08-15',
    day: '15',
    month: { nl: 'Aug', en: 'Aug', it: 'Ago' },
    title: {
      nl: 'Avond van de Italiaanse wijnen',
      en: 'Italian wine evening',
      it: 'Serata dei vini italiani',
    },
    placeKey: 'denHaag',
    note: {
      nl: 'Proeverij met gerechten van het huis — details volgen.',
      en: 'Tasting with house dishes — details coming soon.',
      it: 'Degustazione con piatti della casa — dettagli a breve.',
    },
  },
  {
    date: '2026-09-06',
    day: '06',
    month: { nl: 'Sep', en: 'Sep', it: 'Set' },
    title: {
      nl: 'Familiediner & live muziek',
      en: 'Family dinner & live music',
      it: 'Cena di famiglia & musica dal vivo',
    },
    placeKey: 'leiden',
    note: {
      nl: 'Een avond met warme sfeer aan tafel. Work in progress.',
      en: 'An evening with warm table atmosphere. Work in progress.',
      it: 'Una sera con atmosfera calda a tavola. Work in progress.',
    },
  },
  {
    date: '2026-09-20',
    day: '20',
    month: { nl: 'Sep', en: 'Sep', it: 'Set' },
    title: {
      nl: 'Pasta workshop',
      en: 'Pasta workshop',
      it: 'Workshop di pasta',
    },
    placeKey: 'denHaag',
    note: {
      nl: 'Leer verse pasta maken met Giuseppe. Reserveren volgt later.',
      en: 'Learn fresh pasta with Giuseppe. Booking comes later.',
      it: 'Impara la pasta fresca con Giuseppe. Prenotazioni più avanti.',
    },
  },
];

export default function Events() {
  const { t, lang } = useLanguage();

  return (
    <main className="page">
      <section className="page__panel">
        <WipBanner
          title={t('events.title')}
          text={t('events.text')}
          badge={t('events.wip')}
        />

        <div className="events-list">
          {events.map((event) => (
            <article key={event.date + event.title.en} className="event-item">
              <time className="event-item__date" dateTime={event.date}>
                <span className="event-item__day">{event.day}</span>
                <span className="event-item__month">
                  {event.month[lang] || event.month.en}
                </span>
              </time>
              <div className="event-item__body">
                <p className="event-item__place">
                  {t(`common.${event.placeKey === 'leiden' ? 'leiden' : 'denHaag'}`)}
                </p>
                <h2>{event.title[lang] || event.title.en}</h2>
                <p>{event.note[lang] || event.note.en}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
