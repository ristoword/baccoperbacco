import WipBanner from '../common/WipBanner.jsx';

const events = [
  {
    date: '2026-08-15',
    day: '15',
    month: 'Aug',
    title: 'Avond van de Italiaanse wijnen',
    place: 'Den Haag',
    note: 'Proeverij met gerechten van het huis — details volgen.',
  },
  {
    date: '2026-09-06',
    day: '06',
    month: 'Sep',
    title: 'Familiediner & live muziek',
    place: 'Leiden',
    note: 'Een avond met warme sfeer aan tafel. Work in progress.',
  },
  {
    date: '2026-09-20',
    day: '20',
    month: 'Sep',
    title: 'Pasta workshop',
    place: 'Den Haag',
    note: 'Leer verse pasta maken met Giuseppe. Reserveren volgt later.',
  },
];

export default function Events() {
  return (
    <main className="page">
      <section className="page__panel">
        <WipBanner
          title="Kalender events"
          text="Hier verschijnen binnenkort alle avonden, workshops en speciale diners van Bacco Perbacco. Deze pagina is work in progress."
        />

        <div className="events-list">
          {events.map((event) => (
            <article key={event.date + event.title} className="event-item">
              <time className="event-item__date" dateTime={event.date}>
                <span className="event-item__day">{event.day}</span>
                <span className="event-item__month">{event.month}</span>
              </time>
              <div className="event-item__body">
                <p className="event-item__place">{event.place}</p>
                <h2>{event.title}</h2>
                <p>{event.note}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
