import { useState } from 'react';
import WipBanner from '../common/WipBanner.jsx';

const starterTopics = [
  {
    id: 1,
    title: 'Welkom bij het Bacco Perbacco forum',
    author: 'Roberta & Giuseppe',
    preview: 'Deel hier je ervaringen, vragen over de menukaart en tips voor een bezoek aan Den Haag of Leiden.',
  },
  {
    id: 2,
    title: 'Welke wijn past bij saltimbocca?',
    author: 'Gast',
    preview: 'Discussie volgt — deze sectie is nog in opbouw.',
  },
];

export default function Forum() {
  const [message, setMessage] = useState('');

  return (
    <main className="page">
      <section className="page__panel">
        <WipBanner
          title="Forum"
          text="Een plek voor gasten om te praten over gerechten, wijn en sfeer. Publiceren werkt nog niet — work in progress."
        />

        <div className="forum-list">
          {starterTopics.map((topic) => (
            <article key={topic.id} className="forum-topic">
              <h2>{topic.title}</h2>
              <p className="forum-topic__meta">door {topic.author}</p>
              <p>{topic.preview}</p>
            </article>
          ))}
        </div>

        <form
          className="form-ghost"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <label>
            Nieuw bericht (binnenkort)
            <textarea
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Schrijf iets voor de community…"
              disabled
            />
          </label>
          <button className="btn btn--primary" type="submit" disabled>
            Plaats bericht
          </button>
        </form>
      </section>
    </main>
  );
}
