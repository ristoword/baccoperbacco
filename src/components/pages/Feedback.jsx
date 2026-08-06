import { useState } from 'react';
import WipBanner from '../common/WipBanner.jsx';

export default function Feedback() {
  const [form, setForm] = useState({
    name: '',
    location: '',
    rating: '5',
    message: '',
  });

  function update(field) {
    return (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }));
  }

  return (
    <main className="page">
      <section className="page__panel">
        <WipBanner
          title="Feedback van gasten"
          text="Hier kun je straks je ervaring delen. Het formulier is al zichtbaar, maar verzenden volgt later — work in progress."
        />

        <form
          className="form-ghost"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <label>
            Naam
            <input
              type="text"
              value={form.name}
              onChange={update('name')}
              placeholder="Jouw naam"
              disabled
            />
          </label>
          <label>
            Vestiging
            <select value={form.location} onChange={update('location')} disabled>
              <option value="">Kies locatie…</option>
              <option value="den-haag">Den Haag</option>
              <option value="leiden">Leiden</option>
            </select>
          </label>
          <label>
            Beoordeling
            <select value={form.rating} onChange={update('rating')} disabled>
              <option value="5">5 — Uitstekend</option>
              <option value="4">4 — Zeer goed</option>
              <option value="3">3 — Goed</option>
              <option value="2">2 — Matig</option>
              <option value="1">1 — Slecht</option>
            </select>
          </label>
          <label>
            Jouw feedback
            <textarea
              rows={5}
              value={form.message}
              onChange={update('message')}
              placeholder="Vertel ons over je bezoek…"
              disabled
            />
          </label>
          <button className="btn btn--primary" type="submit" disabled>
            Verstuur feedback
          </button>
        </form>
      </section>
    </main>
  );
}
