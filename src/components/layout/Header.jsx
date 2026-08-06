import { NavLink, Link } from 'react-router-dom';
import logo from '../../assets/images/logo-bacco-perbacco.png';

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/menu', label: 'Onze gerechten' },
  { to: '/reserveren', label: 'Reserveren' },
  { to: '/forum', label: 'Forum' },
  { to: '/feedback', label: 'Feedback' },
];

export default function Header() {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link to="/" className="site-header__brand" aria-label="Bacco Perbacco home">
          <img src={logo} alt="" width={48} height={48} />
          <span>Bacco Perbacco</span>
        </Link>

        <nav className="site-header__nav" aria-label="Hoofdmenu">
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
