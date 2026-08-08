export default function AdminDashboardHome() {
  return (
    <div className="admin-panel">
      <h2>Benvenuto</h2>
      <p className="admin-lead">
        Da qui puoi aggiornare il sito in autonomia: carica le foto della galleria, modifica il menu,
        pubblica eventi con locandine e rispondere ai feedback dei clienti.
      </p>
      <ul className="admin-checklist">
        <li>
          <strong>Foto</strong> — upload immagini; ordine automatico e layout come sul sito.
        </li>
        <li>
          <strong>Menu</strong> — piatti, categorie e foto per ogni voce.
        </li>
        <li>
          <strong>Eventi</strong> — locandine, testi e date per Leiden / Den Haag.
        </li>
        <li>
          <strong>Rispondi</strong> — risposte visibili nella sezione feedback.
        </li>
      </ul>
    </div>
  );
}
