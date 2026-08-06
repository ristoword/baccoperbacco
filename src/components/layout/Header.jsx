import { NavLink, Link } from 'react-router-dom';
import logo from '../../assets/images/logo-bacco-perbacco.png';
import { useLanguage } from '../../i18n/LanguageContext.jsx';

export default function Header() {
  const { t, lang, langs, setLang } = useLanguage();

  const links = [
    { to: '/', label: t('nav.home'), end: true },
    { to: '/menu', label: t('nav.menu') },
    { to: '/events', label: t('nav.events') },
    { to: '/reserveren', label: t('nav.reserve') },
    { to: '/forum', label: t('nav.forum') },
    { to: '/feedback', label: t('nav.feedback') },
  ];

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link to="/" className="site-header__brand" aria-label="Bacco Perbacco home">
          <img src={logo} alt="" width={48} height={48} />
          <span>Bacco Perbacco</span>
        </Link>

        <div className="site-header__right">
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
        </div>
      </div>
    </header>
  );
}
