const restaurant = {
  name: 'Bacco Perbacco',
  tagline: 'Trattoria Italiana',
  website: 'https://baccoperbacco.nl/',
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
        city: 'Den Haag',
        summary:
          'In Den Haag beleef je Bacco Perbacco in een warme en elegante setting die perfect is voor lunch in het weekend en sfeervol dineren in de avond.',
        detail:
          'Deze vestiging voelt klassiek en uitnodigend aan. Ideaal voor gasten die willen genieten van authentieke Italiaanse gerechten, goede wijn en een rustige, persoonlijke ambiance.',
        hours: 'Ma - do: 17:00 - 22:00 · Vr - zo: 12:00 - 15:00 & 17:00 - 22:00',
        highlight: 'Lunch in het weekend · elegant dineren',
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
        city: 'Leiden',
        summary:
          'In Leiden staat de avond centraal: intiem, warm en gastvrij. Een plek voor diners waar de tijd even vertraagt en Italië voelbaar dichtbij komt.',
        detail:
          'De vestiging in Leiden heeft dezelfde ziel als Den Haag, maar met een meer avondgerichte dynamiek. Hier draait alles om een sfeervolle, authentieke dinerervaring.',
        hours: 'Ma: gesloten · Di - zo: 17:00 - 22:00',
        highlight: 'Intieme avondbeleving · warme sfeer',
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

export default restaurant;
