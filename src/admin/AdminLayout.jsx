import { NavLink, Outlet, Navigate } from 'react-router-dom';
import { useAdminAuth } from './AdminAuthContext.jsx';

const NAV = [
  { to: '/admin/dashboard', end: true, label: 'Panoramica' },
  { to: '/admin/dashboard/foto', label: 'Foto' },
  { to: '/admin/dashboard/menu', label: 'Menu' },
  { to: '/admin/dashboard/eventi', label: 'Eventi' },
  { to: '/admin/dashboard/feedback', label: 'Rispondi' },
];

export default function AdminLayout() {
  const { user, booting, logout } = useAdminAuth();

  if (booting) {
    return (
      <div className="admin-shell admin-shell--loading">
        <p>Caricamento…</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/admin" replace />;
  }

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="admin-sidebar__brand">
          <strong>Bacco Perbacco</strong>
          <span>Enterprise</span>
        </div>
        <nav className="admin-nav">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                isActive ? 'admin-nav__link admin-nav__link--active' : 'admin-nav__link'
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="admin-sidebar__foot">
          <p>{user.username}</p>
          <button type="button" className="admin-btn admin-btn--ghost" onClick={logout}>
            Esci
          </button>
        </div>
      </aside>
      <div className="admin-main">
        <header className="admin-topbar">
          <h1>Pannello di controllo</h1>
          <a href="/" className="admin-topbar__site">
            Vai al sito →
          </a>
        </header>
        <div className="admin-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
