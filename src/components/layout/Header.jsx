import { useEffect, useRef, useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import logo from '../../assets/images/logo-bacco-perbacco.png';
import ItalianFlag from '../common/ItalianFlag.jsx';
import { useLanguage } from '../../i18n/LanguageContext.jsx';

export default function Header() {
  const { t, lang, langs, setLang } = useLanguage();
  const location = useLocation();
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef(null);

  const links = [
    { to: '/', label: t('nav.home'), end: true },
    { to: '/menu', label: t('nav.menu') },
    { to: '/events', label: t('nav.events') },
    { to: '/reserveren', label: t('nav.reserve') },
    { to: '/forum', label: t('nav.forum') },
    { to: '/feedback', label: t('nav.feedback') },
  ];

  const currentLang = langs.find((item) => item.code === lang) || langs[0];

  useEffect(() => {
    setLangOpen(false);
  }, [location.pathname, lang]);

  useEffect(() => {
    function onPointerDown(e) {
      if (langRef.current && !langRef.current.contains(e.target)) {
        setLangOpen(false);
      }
    }
    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, []);

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <div className="site-header__top">
          <Link to="/" className="site-header__brand" aria-label="Bacco Perbacco home">
            <ItalianFlag className="site-header__flag" />
            <img src={logo} alt="" width={40} height={40} />
            <span>Bacco Perbacco</span>
          </Link>

          <div className="lang-dropdown" ref={langRef}>
            <button
              type="button"
              className="lang-dropdown__toggle"
              aria-expanded={langOpen}
              aria-haspopup="listbox"
              onClick={() => setLangOpen((v) => !v)}
            >
              <span>{currentLang.label}</span>
              <span className="lang-dropdown__caret" aria-hidden="true" />
            </button>
            {langOpen ? (
              <ul className="lang-dropdown__menu" role="listbox" aria-label="Language">
                {langs.map((item) => (
                  <li key={item.code}>
                    <button
                      type="button"
                      role="option"
                      aria-selected={lang === item.code}
                      className={
                        lang === item.code
                          ? 'lang-dropdown__option is-active'
                          : 'lang-dropdown__option'
                      }
                      onClick={() => {
                        setLang(item.code);
                        setLangOpen(false);
                      }}
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>

        <nav className="site-header__nav" aria-label={t('nav.aria')}>
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                isActive ? 'site-header__link is-active' : 'site-header__link'
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
