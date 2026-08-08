import { useCallback, useEffect, useState } from 'react';
import { adminApi, uploadFile } from './adminApi.js';

const LANGS = ['it', 'nl', 'en'];
const TEXT_FIELDS = [
  'title',
  'kicker',
  'dateLine',
  'slogan',
  'lead',
  'body',
  'when',
  'where',
  'price',
  'tags',
];

function emptyEvent(order) {
  const blank = { it: '', nl: '', en: '' };
  const event = {
    id: `new-${Date.now()}`,
    order,
    sede: 'leiden',
    legacyKey: null,
    flyerUrl: null,
  };
  for (const f of TEXT_FIELDS) event[f] = { ...blank };
  return event;
}

export default function AdminEvents() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await adminApi.getEvents();
      setItems(data.items || []);
    } catch {
      setMsg('Impossibile caricare gli eventi.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  function patch(index, updater) {
    setItems((prev) => prev.map((item, i) => (i === index ? updater(item) : item)));
  }

  async function saveAll() {
    setSaving(true);
    setMsg('');
    try {
      const data = await adminApi.saveEvents(items);
      setItems(data.items);
      setMsg('Eventi aggiornati.');
    } catch {
      setMsg('Errore durante il salvataggio.');
    } finally {
      setSaving(false);
    }
  }

  async function uploadFlyer(index, file) {
    if (!file) return;
    try {
      const { url } = await uploadFile('events', file);
      patch(index, (item) => ({ ...item, flyerUrl: url }));
      setMsg('Locandina caricata. Salva per pubblicare.');
    } catch {
      setMsg('Upload locandina non riuscito.');
    }
  }

  function addEvent() {
    setItems((prev) => [...prev, emptyEvent(prev.length)]);
  }

  async function removeEvent(id) {
    if (!window.confirm('Eliminare questo evento?')) return;
    try {
      await adminApi.deleteEvent(id);
      setItems((prev) => prev.filter((i) => i.id !== id));
      setMsg('Evento eliminato.');
    } catch {
      setMsg('Eliminazione non riuscita.');
    }
  }

  return (
    <div className="admin-panel">
      <div className="admin-panel__head">
        <div>
          <h2>Eventi</h2>
          <p className="admin-lead">Locandine, testi e sede per ogni evento.</p>
        </div>
        <button type="button" className="admin-btn admin-btn--ghost" onClick={addEvent}>
          + Nuovo evento
        </button>
      </div>

      {msg ? <p className="admin-msg">{msg}</p> : null}
      {loading ? <p>Caricamento…</p> : null}

      <div className="admin-stack">
        {items.map((item, index) => (
          <article key={item.id} className="admin-card">
            <div className="admin-card__row">
              {item.flyerUrl ? (
                <img className="admin-flyer" src={item.flyerUrl} alt="" />
              ) : (
                <div className="admin-flyer admin-flyer--empty">Nessuna locandina</div>
              )}
              <div className="admin-card__col">
                <label>
                  Sede
                  <select
                    value={item.sede}
                    onChange={(e) => patch(index, (ev) => ({ ...ev, sede: e.target.value }))}
                  >
                    <option value="leiden">Leiden</option>
                    <option value="den-haag">Den Haag</option>
                  </select>
                </label>
                <label className="admin-btn admin-btn--ghost admin-upload">
                  Upload locandina
                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={(e) => uploadFlyer(index, e.target.files?.[0])}
                  />
                </label>
                <button type="button" className="admin-btn danger" onClick={() => removeEvent(item.id)}>
                  Elimina
                </button>
              </div>
            </div>

            {TEXT_FIELDS.map((field) => (
              <fieldset key={field} className="admin-fieldset">
                <legend>{field}</legend>
                <div className="admin-lang-fields">
                  {LANGS.map((lang) => (
                    <label key={lang}>
                      {lang.toUpperCase()}
                      {field === 'body' ? (
                        <textarea
                          rows={3}
                          value={item[field]?.[lang] || ''}
                          onChange={(e) =>
                            patch(index, (ev) => ({
                              ...ev,
                              [field]: { ...ev[field], [lang]: e.target.value },
                            }))
                          }
                        />
                      ) : (
                        <input
                          value={item[field]?.[lang] || ''}
                          onChange={(e) =>
                            patch(index, (ev) => ({
                              ...ev,
                              [field]: { ...ev[field], [lang]: e.target.value },
                            }))
                          }
                        />
                      )}
                    </label>
                  ))}
                </div>
              </fieldset>
            ))}
          </article>
        ))}
      </div>

      <button type="button" className="admin-btn admin-btn--primary" onClick={saveAll} disabled={saving || loading}>
        {saving ? 'Salvataggio…' : 'Salva eventi'}
      </button>
    </div>
  );
}
