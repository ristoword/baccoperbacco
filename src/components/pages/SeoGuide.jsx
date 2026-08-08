import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../i18n/LanguageContext.jsx';
import PageMeta from '../common/PageMeta.jsx';
import JsonLd from '../common/JsonLd.jsx';
import { SEO_GUIDE_PATH, getSeoGuideContent } from '../../data/seoGuideContent.js';
import { absoluteUrl } from '../../utils/siteUrl.js';

const RESERVE_DEN_HAAG = 'https://baccoperbacco.nl/Italiaans-restaurant-den-haag';
const RESERVE_LEIDEN = 'https://baccoperbacco.nl/italiaans-restaurant-leiden';

export default function SeoGuide() {
  const { lang } = useLanguage();
  const c = getSeoGuideContent(lang);

  const faqSchema = useMemo(() => ({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: c.faqs.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  }), [c.faqs, c.h1, c.metaDescription, lang]);

  const articleSchema = useMemo(() => ({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: c.h1,
    description: c.metaDescription,
    inLanguage: lang === 'nl' ? 'nl-NL' : lang === 'it' ? 'it-IT' : 'en-GB',
    dateModified: '2026-08-09',
    author: {
      '@type': 'Organization',
      name: 'Bacco Perbacco',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Bacco Perbacco',
    },
    mainEntityOfPage: absoluteUrl(SEO_GUIDE_PATH),
  }), [c.h1, c.metaDescription, lang]);

  const restaurantSchema = useMemo(() => ({
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name: 'Bacco Perbacco',
    servesCuisine: 'Italian',
    priceRange: '€€',
    url: absoluteUrl('/'),
    sameAs: ['https://baccoperbacco.nl/'],
    description: c.metaDescription,
    founder: [{ '@type': 'Person', name: 'Roberta' }, { '@type': 'Person', name: 'Giuseppe' }],
    location: [
      {
        '@type': 'Place',
        name: 'Bacco Perbacco Den Haag',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Den Haag',
          addressCountry: 'NL',
        },
      },
      {
        '@type': 'Place',
        name: 'Bacco Perbacco Leiden',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Morstraat 6-8',
          postalCode: '2312',
          addressLocality: 'Leiden',
          addressCountry: 'NL',
        },
      },
    ],
  }), [c.metaDescription]);

  return (
    <main className="page">
      <PageMeta title={c.metaTitle} description={c.metaDescription} pathname={SEO_GUIDE_PATH} />
      <JsonLd id="seo-faq" data={faqSchema} />
      <JsonLd id="seo-article" data={articleSchema} />
      <JsonLd id="seo-restaurant" data={restaurantSchema} />

      <article className="page__panel page__panel--wide seo-guide">
        <header className="page-hero seo-guide__hero">
          <p className="wip__badge">{c.eyebrow}</p>
          <h1 className="wip__title">{c.h1}</h1>
          {c.intro.map((p) => (
            <p key={p.slice(0, 40)} className="seo-guide__lead">
              {p}
            </p>
          ))}
        </header>

        <section className="seo-guide__section" aria-labelledby="seo-types">
          <h2 id="seo-types">{c.typesTitle}</h2>
          <p className="seo-guide__muted">{c.typesIntro}</p>
          <ul className="seo-guide__cards">
            {c.restaurantTypes.map((item) => (
              <li key={item.name} className="seo-guide__card">
                <h3>{item.name}</h3>
                <p>{item.text}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="seo-guide__section" aria-labelledby="seo-tips">
          <h2 id="seo-tips">{c.tipsTitle}</h2>
          <ul className="seo-guide__list">
            {c.tips.map((tip) => (
              <li key={tip}>{tip}</li>
            ))}
          </ul>
        </section>

        <section className="seo-guide__section" aria-labelledby="seo-denhaag">
          <h2 id="seo-denhaag">{c.denHaagTitle}</h2>
          {c.denHaagBlocks.map((p) => (
            <p key={p.slice(0, 36)}>{p}</p>
          ))}
        </section>

        <section className="seo-guide__section" aria-labelledby="seo-leiden">
          <h2 id="seo-leiden">{c.leidenTitle}</h2>
          {c.leidenBlocks.map((p) => (
            <p key={p.slice(0, 36)}>{p}</p>
          ))}
        </section>

        <section className="seo-guide__section seo-guide__highlight" aria-labelledby="seo-bacco">
          <h2 id="seo-bacco">{c.baccoTitle}</h2>
          <ul className="seo-guide__list">
            {c.baccoPoints.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </section>

        <section className="seo-guide__section" aria-labelledby="seo-faq">
          <h2 id="seo-faq">{c.faqTitle}</h2>
          <dl className="seo-guide__faq">
            {c.faqs.map((item) => (
              <div key={item.q} className="seo-guide__faq-item">
                <dt>{item.q}</dt>
                <dd>{item.a}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="seo-guide__cta">
          <h2>{c.ctaTitle}</h2>
          <p>{c.ctaText}</p>
          <div className="seo-guide__cta-actions">
            <a className="btn btn--primary" href={RESERVE_DEN_HAAG} rel="noopener noreferrer">
              {c.ctaDenHaag}
            </a>
            <a className="btn btn--ghost" href={RESERVE_LEIDEN} rel="noopener noreferrer">
              {c.ctaLeiden}
            </a>
            <Link className="btn btn--ghost" to="/menu">
              {c.ctaMenu}
            </Link>
          </div>
          <p className="seo-guide__updated">{c.updated}</p>
        </section>

        <p className="page__back">
          <Link to="/">← Home</Link>
        </p>
      </article>
    </main>
  );
}
