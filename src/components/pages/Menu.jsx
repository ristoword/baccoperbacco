import WipBanner from '../common/WipBanner.jsx';

const dishes = [
  {
    course: 'Antipasti',
    items: ['Antipasto misto', 'Bruschetta al pomodoro', 'Carpaccio di manzo'],
  },
  {
    course: 'Pasta & risotto',
    items: ['Tagliatelle al ragù', 'Risotto ai funghi', 'Spaghetti alle vongole'],
  },
  {
    course: 'Secondi',
    items: ['Saltimbocca alla romana', 'Branzino al forno', 'Scaloppine al limone'],
  },
  {
    course: 'Dolci',
    items: ['Tiramisù della casa', 'Panna cotta', 'Cannoli siciliani'],
  },
];

export default function Menu() {
  return (
    <main className="page">
      <section className="page__panel">
        <WipBanner
          title="Onze gerechten"
          text="De volledige menukaart met seizoensgerechten volgt hier. Dit is een eerste opzet — work in progress."
        />

        <div className="menu-grid">
          {dishes.map((group) => (
            <article key={group.course} className="menu-group">
              <h2>{group.course}</h2>
              <ul>
                {group.items.map((item) => (
                  <li key={item}>
                    <span>{item}</span>
                    <em>binnenkort</em>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
