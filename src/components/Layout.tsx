import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import FilmGrain from './FilmGrain';

export default function Layout() {
  const location = useLocation();
  const [fadeIn, setFadeIn] = useState(true);

  useEffect(() => {
    setFadeIn(false);
    const timeout = setTimeout(() => {
      setFadeIn(true);
      window.scrollTo(0, 0);
    }, 50);
    return () => clearTimeout(timeout);
  }, [location.pathname]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <FilmGrain />
      <Navbar />
      <main
        style={{
          flex: 1,
          opacity: fadeIn ? 1 : 0,
          transition: 'opacity 0.4s ease',
          paddingTop: '72px',
        }}
      >
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
