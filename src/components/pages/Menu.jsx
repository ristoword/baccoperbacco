import WipBanner from '../common/WipBanner.jsx';
import { useLanguage } from '../../i18n/LanguageContext.jsx';

const dishes = [
  {
    course: { nl: 'Antipasti', en: 'Antipasti', it: 'Antipasti' },
    items: ['Antipasto misto', 'Bruschetta al pomodoro', 'Carpaccio di manzo'],
  },
  {
    course: { nl: 'Pasta & risotto', en: 'Pasta & risotto', it: 'Pasta & risotto' },
    items: ['Tagliatelle al ragù', 'Risotto ai funghi', 'Spaghetti alle vongole'],
  },
  {
    course: { nl: 'Secondi', en: 'Mains', it: 'Secondi' },
    items: ['Saltimbocca alla romana', 'Branzino al forno', 'Scaloppine al limone'],
  },
  {
    course: { nl: 'Dolci', en: 'Desserts', it: 'Dolci' },
    items: ['Tiramisù della casa', 'Panna cotta', 'Cannoli siciliani'],
  },
];

export default function Menu() {
  const { t, lang } = useLanguage();

  return (
    <main className="page">
      <section className="page__panel">
        <WipBanner
          title={t('menu.title')}
          text={t('menu.text')}
          badge={t('menu.wip')}
        />

        <div className="menu-grid">
          {dishes.map((group) => (
            <article key={group.course.en} className="menu-group">
              <h2>{group.course[lang] || group.course.en}</h2>
              <ul>
                {group.items.map((item) => (
                  <li key={item}>
                    <span>{item}</span>
                    <em>{t('menu.soon')}</em>
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
