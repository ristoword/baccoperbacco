import WipBanner from '../common/WipBanner.jsx';

export default function Reserve() {
  return (
    <main className="page">
      <section className="page__panel">
        <WipBanner
          title="Reserveren"
          text="Deze pagina wordt binnenkort voltooid. Je kunt straks hier een tafel reserveren voor Den Haag of Leiden. Voor nu: work in progress."
        />

        <div className="page__preview" aria-hidden="true">
          <div className="form-ghost">
            <label>
              Vestiging
              <select disabled defaultValue="">
                <option value="">Kies locatie…</option>
                <option>Den Haag</option>
                <option>Leiden</option>
              </select>
            </label>
            <label>
              Datum
              <input type="date" disabled />
            </label>
            <label>
              Personen
              <input type="number" disabled placeholder="2" />
            </label>
            <button className="btn btn--primary" type="button" disabled>
              Reserveer (binnenkort)
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
