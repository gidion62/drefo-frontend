import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/projects', label: 'Projects' },
  { path: '/gallery', label: 'Gallery' },
  { path: '/updates', label: 'Updates' },
  { path: '/volunteer', label: 'Volunteer' },
  { path: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const isHome = location.pathname === '/';
  const showSolid = !isHome || scrolled;

  return (
    <>
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '72px',
          zIndex: 1000,
          transition: 'all 0.4s ease',
          backgroundColor: showSolid ? 'rgba(255,251,235,0.95)' : 'transparent',
          backdropFilter: showSolid ? 'blur(12px)' : 'none',
          boxShadow: showSolid ? '0 1px 20px rgba(0,0,0,0.06)' : 'none',
        }}
      >
        <div className="container-main" style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Logo */}
          <Link
            to="/"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.5rem',
              color: 'var(--color-accent)',
              textDecoration: 'none',
              fontWeight: 400,
              letterSpacing: '-0.02em',
            }}
          >
            DREFO
          </Link>

          {/* Desktop Nav Links */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '2rem',
            }}
            className="hidden lg:flex"
          >
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.8125rem',
                  fontWeight: 500,
                  color: location.pathname === link.path ? 'var(--color-accent)' : 'var(--color-text-primary)',
                  textDecoration: 'none',
                  transition: 'color 0.3s ease',
                  borderBottom: location.pathname === link.path ? '2px solid var(--color-accent)' : '2px solid transparent',
                  paddingBottom: '4px',
                }}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/contact"
              className="btn-filled btn-small"
            >
              Donate
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="lg:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '8px',
              display: 'flex',
              flexDirection: 'column',
              gap: '5px',
            }}
            aria-label="Toggle menu"
          >
            <span
              style={{
                width: '24px',
                height: '2px',
                backgroundColor: 'var(--color-text-primary)',
                transition: 'all 0.3s ease',
                transform: menuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none',
              }}
            />
            <span
              style={{
                width: '24px',
                height: '2px',
                backgroundColor: 'var(--color-text-primary)',
                transition: 'all 0.3s ease',
                opacity: menuOpen ? 0 : 1,
              }}
            />
            <span
              style={{
                width: '24px',
                height: '2px',
                backgroundColor: 'var(--color-text-primary)',
                transition: 'all 0.3s ease',
                transform: menuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none',
              }}
            />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 999,
          backgroundColor: 'var(--color-bg-primary)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          gap: '1.25rem',
          padding: '96px 1.5rem 2rem',
          overflowY: 'auto',
          WebkitOverflowScrolling: 'touch',
          transition: 'all 0.4s ease',
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? 'auto' : 'none',
        }}
        className="lg:hidden"
      >
        {navLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            onClick={() => setMenuOpen(false)}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.25rem, 6vw, 2.25rem)',
              color: location.pathname === link.path ? 'var(--color-accent)' : 'var(--color-text-primary)',
              textDecoration: 'none',
              transition: 'color 0.3s ease',
              flexShrink: 0,
            }}
          >
            {link.label}
          </Link>
        ))}
        <Link
          to="/contact"
          className="btn-filled"
          onClick={() => setMenuOpen(false)}
          style={{ flexShrink: 0, marginTop: '0.5rem', marginBottom: '1rem' }}
        >
          Donate
        </Link>
      </div>
    </>
  );
}
