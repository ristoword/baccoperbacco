import { useEffect, useState } from 'react';
import { useLanguage } from '../../i18n/LanguageContext.jsx';

const emptyForm = {
  name: '',
  location: '',
  rating: '5',
  message: '',
};

export default function Feedback() {
  const { t, lang } = useLanguage();
  const [form, setForm] = useState(emptyForm);
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState({ type: '', text: '' });
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  async function loadItems() {
    try {
      const res = await fetch('/api/feedback');
      const json = await res.json();
      if (json?.success) setItems(json.data || []);
    } catch {
      setStatus({ type: 'error', text: t('common.errorGeneric') });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadItems();
  }, []);

  function update(field) {
    return (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    setStatus({ type: '', text: '' });

    if (!form.name.trim() || !form.location || !form.message.trim()) {
      setStatus({ type: 'error', text: t('common.required') });
      return;
    }

    setSending(true);
    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          rating: Number(form.rating),
          language: lang,
        }),
      });
      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.message || 'error');
      }
      setItems((prev) => [json.data, ...prev]);
      setForm(emptyForm);
      setStatus({ type: 'success', text: t('feedback.success') });
    } catch {
      setStatus({ type: 'error', text: t('common.errorGeneric') });
    } finally {
      setSending(false);
    }
  }

  function locationLabel(id) {
    return id === 'leiden' ? t('common.leiden') : t('common.denHaag');
  }

  return (
    <main className="page">
      <section className="page__panel">
        <div className="page-hero">
          <h1 className="wip__title">{t('feedback.title')}</h1>
          <p className="wip__text">{t('feedback.text')}</p>
        </div>

        <form className="form-live" onSubmit={onSubmit}>
          <label>
            {t('feedback.name')}
            <input
              type="text"
              value={form.name}
              onChange={update('name')}
              placeholder={t('feedback.placeholderName')}
              required
              maxLength={80}
            />
          </label>
          <label>
            {t('feedback.location')}
            <select value={form.location} onChange={update('location')} required>
              <option value="">{t('common.chooseLocation')}</option>
              <option value="den-haag">{t('common.denHaag')}</option>
              <option value="leiden">{t('common.leiden')}</option>
            </select>
          </label>
          <label>
            {t('feedback.rating')}
            <select value={form.rating} onChange={update('rating')}>
              {[5, 4, 3, 2, 1].map((n) => (
                <option key={n} value={n}>
                  {t(`feedback.stars.${n}`)}
                </option>
              ))}
            </select>
          </label>
          <label>
            {t('feedback.message')}
            <textarea
              rows={5}
              value={form.message}
              onChange={update('message')}
              placeholder={t('feedback.placeholderMessage')}
              required
              maxLength={2000}
            />
          </label>
          {status.text ? (
            <p className={status.type === 'success' ? 'form-msg ok' : 'form-msg err'}>
              {status.text}
            </p>
          ) : null}
          <button className="btn btn--primary" type="submit" disabled={sending}>
            {sending ? t('feedback.sending') : t('feedback.submit')}
          </button>
        </form>

        <div className="feedback-list">
          <h2 className="section-title">{t('feedback.recent')}</h2>
          {loading && <p className="muted">{t('common.loading')}</p>}
          {!loading && items.length === 0 && (
            <p className="muted">{t('feedback.empty')}</p>
          )}
          {items.map((item) => (
            <article key={item.id} className="feedback-item">
              <div className="feedback-item__head">
                <strong>{item.name}</strong>
                <span>
                  {locationLabel(item.location)} · {item.rating}/5
                </span>
              </div>
              <p>{item.message}</p>
              {item.reply ? (
                <div className="feedback-item__reply">
                  <strong>{t('feedback.ownerReply')}</strong>
                  <p>{item.reply}</p>
                </div>
              ) : null}
              <time dateTime={item.createdAt}>
                {new Date(item.createdAt).toLocaleString(lang)}
              </time>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
