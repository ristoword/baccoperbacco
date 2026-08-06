import { useEffect, useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import logo from '../../assets/images/logo-bacco-perbacco.png';
import ItalianFlag from '../common/ItalianFlag.jsx';
import { useLanguage } from '../../i18n/LanguageContext.jsx';

export default function Header() {
  const { t, lang, langs, setLang } = useLanguage();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const links = [
    { to: '/', label: t('nav.home'), end: true },
    { to: '/menu', label: t('nav.menu') },
    { to: '/events', label: t('nav.events') },
    { to: '/reserveren', label: t('nav.reserve') },
    { to: '/forum', label: t('nav.forum') },
    { to: '/feedback', label: t('nav.feedback') },
  ];

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.classList.toggle('nav-open', open);
    return () => document.body.classList.remove('nav-open');
  }, [open]);

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link to="/" className="site-header__brand" aria-label="Bacco Perbacco home">
          <ItalianFlag className="site-header__flag" />
          <img src={logo} alt="" width={40} height={40} />
          <span>Bacco Perbacco</span>
        </Link>

        <nav
          id="site-nav"
          className={open ? 'site-header__nav is-open' : 'site-header__nav'}
          aria-label={t('nav.aria')}
        >
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

        <div className="site-header__tools">
          <div className="lang-switch" role="group" aria-label="Language">
            {langs.map((item) => (
              <button
                key={item.code}
                type="button"
                className={
                  lang === item.code ? 'lang-switch__btn is-active' : 'lang-switch__btn'
                }
                onClick={() => setLang(item.code)}
              >
                {item.label}
              </button>
            ))}
          </div>

          <button
            type="button"
            className={open ? 'nav-toggle is-open' : 'nav-toggle'}
            aria-expanded={open}
            aria-controls="site-nav"
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  );
}
