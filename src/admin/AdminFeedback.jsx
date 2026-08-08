import { useCallback, useEffect, useState } from 'react';
import { adminApi } from './adminApi.js';

export default function AdminFeedback() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [drafts, setDrafts] = useState({});
  const [msg, setMsg] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await adminApi.getFeedback();
      setItems(data || []);
    } catch {
      setMsg('Impossibile caricare i feedback.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function sendReply(id) {
    const reply = (drafts[id] || '').trim();
    if (reply.length < 2) {
      setMsg('Scrivi una risposta prima di inviare.');
      return;
    }
    setMsg('');
    try {
      const updated = await adminApi.replyFeedback(id, reply);
      setItems((prev) => prev.map((i) => (i.id === id ? updated : i)));
      setDrafts((prev) => ({ ...prev, [id]: '' }));
      setMsg('Risposta pubblicata.');
    } catch {
      setMsg('Invio risposta non riuscito.');
    }
  }

  return (
    <div className="admin-panel">
      <h2>Rispondi ai feedback</h2>
      <p className="admin-lead">Le risposte sono visibili sul sito nella pagina Feedback.</p>
      {msg ? <p className="admin-msg">{msg}</p> : null}
      {loading ? <p>Caricamento…</p> : null}

      <div className="admin-stack">
        {items.map((item) => (
          <article key={item.id} className="admin-card">
            <div className="admin-feedback-head">
              <strong>{item.name}</strong>
              <span>
                {item.location} · {item.rating}/5
              </span>
            </div>
            <p>{item.message}</p>
            <time dateTime={item.createdAt}>{new Date(item.createdAt).toLocaleString('it-IT')}</time>

            {item.reply ? (
              <div className="admin-reply-box">
                <strong>Risposta inviata</strong>
                <p>{item.reply}</p>
                <time dateTime={item.repliedAt}>{new Date(item.repliedAt).toLocaleString('it-IT')}</time>
              </div>
            ) : (
              <>
                <label>
                  La tua risposta
                  <textarea
                    rows={4}
                    value={drafts[item.id] || ''}
                    onChange={(e) => setDrafts((prev) => ({ ...prev, [item.id]: e.target.value }))}
                    placeholder="Grazie per il tuo messaggio…"
                  />
                </label>
                <button type="button" className="admin-btn admin-btn--primary" onClick={() => sendReply(item.id)}>
                  Pubblica risposta
                </button>
              </>
            )}
          </article>
        ))}
      </div>

      {!loading && items.length === 0 ? <p className="admin-muted">Nessun feedback ancora.</p> : null}
    </div>
  );
}
