import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header.jsx';
import Footer from './Footer.jsx';

export default function MainLayout() {
  const { pathname } = useLocation();
  const isHome = pathname === '/';

  return (
    <div className={isHome ? 'shell shell--home' : 'shell'}>
      <Header />
      <Outlet />
      {!isHome && <Footer />}
    </div>
  );
}
