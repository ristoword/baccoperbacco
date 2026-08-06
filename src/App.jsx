import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout.jsx';
import Home from './components/pages/Home.jsx';
import Reserve from './components/pages/Reserve.jsx';
import Menu from './components/pages/Menu.jsx';
import Forum from './components/pages/Forum.jsx';
import Feedback from './components/pages/Feedback.jsx';
import Events from './components/pages/Events.jsx';
import Photos from './components/pages/Photos.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/reserveren" element={<Reserve />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/foto" element={<Photos />} />
          <Route path="/forum" element={<Forum />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/events" element={<Events />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
