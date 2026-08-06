import { Link, useSearchParams } from 'react-router-dom';
import WipBanner from '../common/WipBanner.jsx';

const sedi = [
  {
    id: 'den-haag',
    name: 'Den Haag',
    number: '01',
    text: 'Warme, elegante setting — ideaal voor weekendlunch en sfeervol dineren.',
    hours: 'Ma - do: 17:00 - 22:00 · Vr - zo: 12:00 - 15:00 & 17:00 - 22:00',
  },
  {
    id: 'leiden',
    name: 'Leiden',
    number: '02',
    text: 'Intieme avondbeleving — rustig, gastvrij en authentiek Italiaans.',
    hours: 'Ma: gesloten · Di - zo: 17:00 - 22:00',
  },
];

export default function Reserve() {
  const [params, setParams] = useSearchParams();
  const selected = params.get('sede') || '';

  function chooseSede(id) {
    setParams({ sede: id });
  }

  return (
    <main className="page">
      <section className="page__panel page__panel--wide">
        <WipBanner
          title="Reserveren"
          text="Kies eerst je vestiging: Den Haag of Leiden. Het complete reserveringssysteem volgt binnenkort — work in progress."
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
                  <span>Openingstijden</span>
                  {sede.hours}
                </p>
                <span className="sede-card__cta">
                  {active ? 'Geselecteerd' : `Kies ${sede.name}`}
                </span>
              </button>
            );
          })}
        </div>

        <div className="page__preview">
          <p className="sede-selected">
            {selected
              ? `Vestiging: ${sedi.find((s) => s.id === selected)?.name}`
              : 'Selecteer Den Haag of Leiden om verder te gaan.'}
          </p>

          <div className="form-ghost">
            <label>
              Datum
              <input type="date" disabled />
            </label>
            <label>
              Tijd
              <input type="time" disabled />
            </label>
            <label>
              Personen
              <input type="number" disabled placeholder="2" />
            </label>
            <label>
              Naam
              <input type="text" disabled placeholder="Jouw naam" />
            </label>
            <button className="btn btn--primary" type="button" disabled>
              Reserveer {selected ? sedi.find((s) => s.id === selected)?.name : ''}{' '}
              (binnenkort)
            </button>
          </div>

          <p className="page__back">
            <Link to="/#vestigingen">Bekijk de vestigingen op de homepage</Link>
          </p>
        </div>
      </section>
    </main>
  );
}
