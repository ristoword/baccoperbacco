import { useEffect, useState } from 'react';
import { useLanguage } from '../../i18n/LanguageContext.jsx';

const emptyForm = {
  author: '',
  title: '',
  message: '',
};

export default function Forum() {
  const { t, lang } = useLanguage();
  const [posts, setPosts] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [status, setStatus] = useState({ type: '', text: '' });
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  async function loadPosts() {
    try {
      const res = await fetch('/api/forum/posts');
      const json = await res.json();
      if (json?.success) setPosts(json.data || []);
    } catch {
      setStatus({ type: 'error', text: t('common.errorGeneric') });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadPosts();
  }, []);

  function update(field) {
    return (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    setStatus({ type: '', text: '' });

    if (!form.author.trim() || !form.title.trim() || !form.message.trim()) {
      setStatus({ type: 'error', text: t('common.required') });
      return;
    }

    setSending(true);
    try {
      const res = await fetch('/api/forum/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, language: lang }),
      });
      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.message || 'error');
      }
      setPosts((prev) => [json.data, ...prev]);
      setForm(emptyForm);
      setStatus({ type: 'success', text: t('forum.success') });
    } catch {
      setStatus({ type: 'error', text: t('common.errorGeneric') });
    } finally {
      setSending(false);
    }
  }

  return (
    <main className="page">
      <section className="page__panel">
        <div className="page-hero">
          <h1 className="wip__title">{t('forum.title')}</h1>
          <p className="wip__text">{t('forum.text')}</p>
        </div>

        <div className="forum-list">
          {loading && <p className="muted">{t('common.loading')}</p>}
          {!loading && posts.length === 0 && (
            <p className="muted">{t('forum.empty')}</p>
          )}
          {posts.map((post) => (
            <article key={post.id} className="forum-topic">
              <h2>{post.title}</h2>
              <p className="forum-topic__meta">
                {t('forum.by')} {post.author} ·{' '}
                {new Date(post.createdAt).toLocaleString(lang)}
              </p>
              <p>{post.message}</p>
            </article>
          ))}
        </div>

        <form className="form-live" onSubmit={onSubmit}>
          <label>
            {t('forum.author')}
            <input
              type="text"
              value={form.author}
              onChange={update('author')}
              placeholder={t('forum.placeholderAuthor')}
              required
              maxLength={80}
            />
          </label>
          <label>
            {t('forum.postTitle')}
            <input
              type="text"
              value={form.title}
              onChange={update('title')}
              placeholder={t('forum.placeholderTitle')}
              required
              maxLength={140}
            />
          </label>
          <label>
            {t('forum.message')}
            <textarea
              rows={4}
              value={form.message}
              onChange={update('message')}
              placeholder={t('forum.placeholderMessage')}
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
            {sending ? t('forum.sending') : t('forum.submit')}
          </button>
        </form>
      </section>
    </main>
  );
}
