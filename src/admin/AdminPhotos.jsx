import { useCallback, useEffect, useState } from 'react';
import { adminApi, uploadFile } from './adminApi.js';

function moveItem(list, index, dir) {
  const next = [...list];
  const target = index + dir;
  if (target < 0 || target >= next.length) return list;
  [next[index], next[target]] = [next[target], next[index]];
  return next.map((item, i) => ({ ...item, order: i }));
}

export default function AdminPhotos() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [msg, setMsg] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await adminApi.getGallery();
      setItems(data.items || []);
    } catch {
      setMsg('Impossibile caricare la galleria.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function persist(next) {
    setSaving(true);
    setMsg('');
    try {
      const data = await adminApi.saveGallery(next);
      setItems(data.items);
      setMsg('Galleria salvata.');
    } catch {
      setMsg('Errore durante il salvataggio.');
    } finally {
      setSaving(false);
    }
  }

  async function onUpload(e) {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    setUploading(true);
    setMsg('');
    try {
      const { url } = await uploadFile('gallery', file);
      const next = [
        ...items,
        {
          id: `tmp-${Date.now()}`,
          order: items.length,
          imageUrl: url,
          caption: { nl: '', en: '', it: '' },
        },
      ];
      await persist(next);
    } catch {
      setMsg('Upload non riuscito.');
    } finally {
      setUploading(false);
    }
  }

  function updateCaption(index, lang, value) {
    setItems((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, caption: { ...item.caption, [lang]: value } } : item
      )
    );
  }

  async function saveCaptions() {
    await persist(items);
  }

  async function remove(id) {
    const next = items.filter((i) => i.id !== id).map((item, i) => ({ ...item, order: i }));
    await persist(next);
  }

  function reorder(index, dir) {
    const next = moveItem(items, index, dir);
    setItems(next);
    persist(next);
  }

  return (
    <div className="admin-panel">
      <div className="admin-panel__head">
        <div>
          <h2>Sezione Foto</h2>
          <p className="admin-lead">Le immagini compaiono in ordine sulla pagina /foto del sito.</p>
        </div>
        <label className="admin-btn admin-btn--primary admin-upload">
          {uploading ? 'Caricamento…' : 'Carica foto'}
          <input type="file" accept="image/*" hidden onChange={onUpload} disabled={uploading} />
        </label>
      </div>

      {msg ? <p className="admin-msg">{msg}</p> : null}
      {loading ? <p>Caricamento…</p> : null}

      {!loading && items.length === 0 ? (
        <p className="admin-muted">Nessuna foto in galleria. Carica la prima immagine.</p>
      ) : null}

      <div className="admin-photo-grid">
        {items.map((item, index) => (
          <article key={item.id} className="admin-photo-card">
            <img src={item.imageUrl} alt="" />
            <div className="admin-photo-card__actions">
              <button type="button" onClick={() => reorder(index, -1)} disabled={index === 0 || saving}>
                ↑
              </button>
              <button
                type="button"
                onClick={() => reorder(index, 1)}
                disabled={index === items.length - 1 || saving}
              >
                ↓
              </button>
              <button type="button" className="danger" onClick={() => remove(item.id)}>
                Elimina
              </button>
            </div>
            <div className="admin-lang-fields">
              {['it', 'nl', 'en'].map((lang) => (
                <label key={lang}>
                  Didascalia ({lang.toUpperCase()})
                  <input
                    value={item.caption?.[lang] || ''}
                    onChange={(e) => updateCaption(index, lang, e.target.value)}
                  />
                </label>
              ))}
            </div>
          </article>
        ))}
      </div>

      {items.length > 0 ? (
        <button type="button" className="admin-btn admin-btn--primary" onClick={saveCaptions} disabled={saving}>
          {saving ? 'Salvataggio…' : 'Salva didascalie'}
        </button>
      ) : null}
    </div>
  );
}
