import { useCallback, useEffect, useState } from 'react';
import { adminApi, uploadFile } from './adminApi.js';

const LANGS = ['it', 'nl', 'en'];

function emptyDish(order) {
  return {
    id: `new-${Date.now()}`,
    order,
    name: { it: 'Nuovo piatto', nl: 'Nieuw gerecht', en: 'New dish' },
    course: { it: 'Antipasti', nl: 'Antipasti', en: 'Antipasti' },
    imageUrl: null,
  };
}

export default function AdminMenu() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await adminApi.getMenu();
      setItems(data.items || []);
    } catch {
      setMsg('Impossibile caricare il menu.');
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
      const data = await adminApi.saveMenu(items);
      setItems(data.items);
      setMsg('Menu aggiornato.');
    } catch {
      setMsg('Errore durante il salvataggio.');
    } finally {
      setSaving(false);
    }
  }

  async function uploadDishImage(index, file) {
    if (!file) return;
    try {
      const { url } = await uploadFile('menu', file);
      patch(index, (item) => ({ ...item, imageUrl: url }));
      setMsg('Foto piatto caricata. Ricorda di salvare il menu.');
    } catch {
      setMsg('Upload foto non riuscito.');
    }
  }

  function addDish() {
    setItems((prev) => [...prev, emptyDish(prev.length)]);
  }

  async function removeDish(id) {
    if (!window.confirm('Eliminare questo piatto?')) return;
    try {
      await adminApi.deleteMenuItem(id);
      setItems((prev) => prev.filter((i) => i.id !== id));
      setMsg('Piatto eliminato.');
    } catch {
      setMsg('Eliminazione non riuscita.');
    }
  }

  return (
    <div className="admin-panel">
      <div className="admin-panel__head">
        <div>
          <h2>Aggiorna menu</h2>
          <p className="admin-lead">Modifica nomi, categorie e immagini dei piatti (NL / EN / IT).</p>
        </div>
        <button type="button" className="admin-btn admin-btn--ghost" onClick={addDish}>
          + Nuovo piatto
        </button>
      </div>

      {msg ? <p className="admin-msg">{msg}</p> : null}
      {loading ? <p>Caricamento…</p> : null}

      <div className="admin-stack">
        {items.map((item, index) => (
          <article key={item.id} className="admin-card">
            <div className="admin-card__row">
              {item.imageUrl ? (
                <img className="admin-thumb" src={item.imageUrl} alt="" />
              ) : (
                <div className="admin-thumb admin-thumb--empty">No foto</div>
              )}
              <label className="admin-btn admin-btn--ghost admin-upload">
                Upload foto
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={(e) => uploadDishImage(index, e.target.files?.[0])}
                />
              </label>
              <button type="button" className="admin-btn danger" onClick={() => removeDish(item.id)}>
                Elimina
              </button>
            </div>

            {LANGS.map((lang) => (
              <div key={lang} className="admin-grid-2">
                <label>
                  Nome ({lang.toUpperCase()})
                  <input
                    value={item.name?.[lang] || ''}
                    onChange={(e) =>
                      patch(index, (d) => ({
                        ...d,
                        name: { ...d.name, [lang]: e.target.value },
                      }))
                    }
                  />
                </label>
                <label>
                  Categoria ({lang.toUpperCase()})
                  <input
                    value={item.course?.[lang] || ''}
                    onChange={(e) =>
                      patch(index, (d) => ({
                        ...d,
                        course: { ...d.course, [lang]: e.target.value },
                      }))
                    }
                  />
                </label>
              </div>
            ))}
          </article>
        ))}
      </div>

      <button type="button" className="admin-btn admin-btn--primary" onClick={saveAll} disabled={saving || loading}>
        {saving ? 'Salvataggio…' : 'Salva menu'}
      </button>
    </div>
  );
}
