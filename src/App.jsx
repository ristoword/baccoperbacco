import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AdminAuthProvider } from './admin/AdminAuthContext.jsx';
import MainLayout from './components/layout/MainLayout.jsx';
import Home from './components/pages/Home.jsx';
import Reserve from './components/pages/Reserve.jsx';
import Menu from './components/pages/Menu.jsx';
import Forum from './components/pages/Forum.jsx';
import Feedback from './components/pages/Feedback.jsx';
import Events from './components/pages/Events.jsx';
import Photos from './components/pages/Photos.jsx';
import Contacts from './components/pages/Contacts.jsx';
import AdminLogin from './admin/AdminLogin.jsx';
import AdminLayout from './admin/AdminLayout.jsx';
import AdminDashboardHome from './admin/AdminDashboardHome.jsx';
import AdminPhotos from './admin/AdminPhotos.jsx';
import AdminMenu from './admin/AdminMenu.jsx';
import AdminEvents from './admin/AdminEvents.jsx';
import AdminFeedback from './admin/AdminFeedback.jsx';
import './styles/admin.css';

export default function App() {
  return (
    <AdminAuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminLayout />}>
            <Route index element={<AdminDashboardHome />} />
            <Route path="foto" element={<AdminPhotos />} />
            <Route path="menu" element={<AdminMenu />} />
            <Route path="eventi" element={<AdminEvents />} />
            <Route path="feedback" element={<AdminFeedback />} />
          </Route>

          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/reserveren" element={<Reserve />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/foto" element={<Photos />} />
            <Route path="/forum" element={<Forum />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/events" element={<Events />} />
            <Route path="/contatti" element={<Contacts />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AdminAuthProvider>
  );
}
