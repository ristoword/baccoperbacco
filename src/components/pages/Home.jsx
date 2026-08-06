import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo-bacco-perbacco.png';
import owners from '../../assets/images/proprietari-roberta-giuseppe.png';

const FALLBACK = {
  name: 'Bacco Perbacco',
  tagline: 'Trattoria Italiana',
  headline: 'Authentieke Italiaanse keuken',
  description:
    'Authentieke Italiaanse keuken in een warme familiesfeer, waar traditie, gastvrijheid en de smaken van thuis samenkomen in Den Haag en Leiden.',
  cta: {
    primary: {
      label: 'Reserveren voor Den Haag',
      href: 'https://baccoperbacco.nl/Italiaans-restaurant-den-haag',
    },
    secondary: {
      label: 'Reserveren voor Leiden',
      href: 'https://baccoperbacco.nl/italiaans-restaurant-leiden',
    },
  },
  story: {
    eyebrow: 'Ons verhaal',
    title: 'Een Italiaans familieverhaal met hart',
    owners: 'Roberta & Giuseppe',
    paragraphs: [
      'Wij zijn Roberta en Giuseppe, een Italiaans koppel verbonden door onze passie voor traditioneel koken en de authentieke smaken van thuis.',
      'In 2025 kregen wij de kans om Bacco Perbacco over te nemen, een Italiaans restaurant dat in 2009 is opgericht. Wij kozen ervoor om de identiteit van het restaurant voort te zetten en die te verrijken met een persoonlijkere touch.',
      'Bij ons draait alles om oprechte gastvrijheid, huiselijke gerechten en de warmte van familie. Bacco Perbacco is een plek waar gasten zich welkom voelen, waar samen eten centraal staat en waar iedere maaltijd met liefde wordt bereid.',
    ],
  },
  hospitality: {
    eyebrow: 'Familie restaurant',
    title: 'Italiaanse gastvrijheid met karakter',
    paragraphs: [
      'Bacco Perbacco is meer dan een restaurant. Het is een familieplek waar de tafel centraal staat, waar gerechten met aandacht worden bereid en waar iedere gast de warmte van Italië voelt.',
      'De sfeer is stijlvol, warm en tijdloos. Geen afstandelijke luxe, maar een persoonlijke beleving waarin familie, smaak en gastvrijheid samenkomen.',
      'Roberta en Giuseppe brengen met liefde een keuken die geworteld is in traditie. Eerlijk, puur en gemaakt om samen van te genieten.',
    ],
    tags: ['Italiaanse beleving', 'Warm & huiselijk'],
  },
  philosophy: {
    eyebrow: 'Onze filosofie',
    quote:
      'Echte Italiaanse keuken is eenvoudig, oprecht en vol herinneringen aan thuis.',
    text: 'Op onze menukaart vind je gerechten die geïnspireerd zijn op de regionale keukens van Italië: pure ingrediënten, huiselijke smaken en recepten die verhalen vertellen. Dat is de ziel van Bacco Perbacco.',
  },
  locations: {
    eyebrow: 'Onze vestigingen',
    title: 'Twee locaties, één Italiaanse familie',
    intro:
      'Beide vestigingen delen dezelfde warme signatuur, maar hebben ieder een eigen ritme en beleving. Overal staat dezelfde gastvrijheid centraal: eten, delen en samen genieten.',
    items: [
      {
        id: 'den-haag',
        number: '01',
        name: 'Den Haag',
        summary:
          'In Den Haag beleef je Bacco Perbacco in een warme en elegante setting die perfect is voor lunch in het weekend en sfeervol dineren in de avond.',
        detail:
          'Deze vestiging voelt klassiek en uitnodigend aan. Ideaal voor gasten die willen genieten van authentieke Italiaanse gerechten, goede wijn en een rustige, persoonlijke ambiance.',
        hours: 'Ma - do: 17:00 - 22:00 · Vr - zo: 12:00 - 15:00 & 17:00 - 22:00',
        points: [
          'Weekendlunch en diner in een warme setting',
          'Authentieke Italiaanse keuken met klassieke flair',
          'Een locatie met rust, karakter en persoonlijke service',
        ],
        reserveHref: 'https://baccoperbacco.nl/Italiaans-restaurant-den-haag',
        reserveLabel: 'Reserveer Den Haag',
      },
      {
        id: 'leiden',
        number: '02',
        name: 'Leiden',
        summary:
          'In Leiden staat de avond centraal: intiem, warm en gastvrij. Een plek voor diners waar de tijd even vertraagt en Italië voelbaar dichtbij komt.',
        detail:
          'De vestiging in Leiden heeft dezelfde ziel als Den Haag, maar met een meer avondgerichte dynamiek. Hier draait alles om een sfeervolle, authentieke dinerervaring.',
        hours: 'Ma: gesloten · Di - zo: 17:00 - 22:00',
        points: [
          'Gericht op sfeervol dineren in de avond',
          'Zelfde kwaliteit en warmte, met eigen karakter',
          'Een rustige Italiaanse setting voor lange tafelmomenten',
        ],
        reserveHref: 'https://baccoperbacco.nl/italiaans-restaurant-leiden',
        reserveLabel: 'Reserveer Leiden',
      },
    ],
  },
  reserve: {
    eyebrow: 'Reserveer jouw tafel',
    title: 'Kies je vestiging',
    text: 'Reserveer direct bij de juiste locatie voor een warme Italiaanse lunch of een sfeervol diner met de gastvrijheid van Roberta en Giuseppe.',
  },
};

export default function Home() {
  const [content, setContent] = useState(FALLBACK);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await fetch('/api/restaurant');
        if (!res.ok) return;
        const json = await res.json();
        if (!cancelled && json?.data) {
          setContent({ ...FALLBACK, ...json.data });
        }
      } catch {
        // API offline: fallback locale
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const { story, hospitality, philosophy, locations, reserve } = content;

  return (
    <main>
      <section className="home" aria-label="Bacco Perbacco">
        <div className="home__atmosphere" aria-hidden="true">
          <div className="home__wash" />
          <div className="home__grain" />
          <div className="home__light" />
          <div className="home__vignette" />
        </div>

        <div className="home__stage">
          <div className="home__brand">
            <div className="home__brand-aura" aria-hidden="true" />
            <img
              src={logo}
              alt={`${content.name} — ${content.tagline}`}
              width={840}
              height={840}
              decoding="async"
              fetchPriority="high"
            />
          </div>

          <div className="home__copy">
            <h1 className="home__headline">
              Authentieke Italiaanse keuken in een <em>warme</em> familiesfeer
            </h1>
            <p className="home__lead">{content.description}</p>
            <div className="home__actions">
              <Link className="btn btn--primary" to="/reserveren">
                Reserveren
              </Link>
              <Link className="btn btn--ghost" to="/menu">
                Onze gerechten
              </Link>
            </div>
          </div>
        </div>

        <div className="home__scroll" aria-hidden="true">
          <span>Scroll</span>
          <div className="home__scroll-line" />
        </div>
      </section>

      <section className="story" id="ons-verhaal" aria-labelledby="story-title">
        <div className="story__media">
          <img
            src={owners}
            alt="Roberta en Giuseppe, eigenaren van Bacco Perbacco"
            width={900}
            height={1100}
            loading="lazy"
            decoding="async"
          />
        </div>
        <div className="story__copy">
          <p className="eyebrow">{story.eyebrow}</p>
          <h2 id="story-title" className="section-title">
            {story.title}
          </h2>
          <div className="story__body">
            {story.paragraphs.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
          <p className="story__owners">{story.owners}</p>
        </div>
      </section>

      <section className="hospitality" aria-labelledby="hospitality-title">
        <div className="hospitality__inner">
          <p className="eyebrow">{hospitality.eyebrow}</p>
          <h2 id="hospitality-title" className="section-title">
            {hospitality.title}
          </h2>
          <div className="hospitality__body">
            {hospitality.paragraphs.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
          <ul className="hospitality__tags">
            {hospitality.tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="philosophy" aria-labelledby="philosophy-title">
        <div className="philosophy__inner">
          <p className="eyebrow" id="philosophy-title">
            {philosophy.eyebrow}
          </p>
          <blockquote className="philosophy__quote">
            “{philosophy.quote}”
          </blockquote>
          <p className="philosophy__text">{philosophy.text}</p>
        </div>
      </section>

      <section className="locations" id="vestigingen" aria-labelledby="locations-title">
        <div className="locations__intro">
          <p className="eyebrow">{locations.eyebrow}</p>
          <h2 id="locations-title" className="section-title">
            {locations.title}
          </h2>
          <p className="locations__lead">{locations.intro}</p>
        </div>

        <div className="locations__list">
          {locations.items.map((loc) => (
            <article key={loc.id} className="location" id={loc.id}>
              <div className="location__head">
                <span className="location__number">{loc.number}</span>
                <h3 className="location__name">{loc.name}</h3>
              </div>
              <p className="location__summary">{loc.summary}</p>
              <p className="location__detail">{loc.detail}</p>
              <p className="location__hours">
                <span>Openingstijden</span>
                {loc.hours}
              </p>
              <ul className="location__points">
                {loc.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
              <Link className="btn btn--primary" to="/reserveren">
                {loc.reserveLabel}
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="reserve" id="reserveren" aria-labelledby="reserve-title">
        <div className="reserve__inner">
          <p className="eyebrow">{reserve.eyebrow}</p>
          <h2 id="reserve-title" className="section-title">
            {reserve.title}
          </h2>
          <p className="reserve__text">{reserve.text}</p>
          <div className="home__actions">
            <Link className="btn btn--primary" to="/reserveren">
              Reserveren
            </Link>
            <Link className="btn btn--ghost" to="/feedback">
              Feedback
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
