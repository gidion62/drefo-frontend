import { Link } from 'react-router-dom';

const quickLinks = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/projects', label: 'Projects' },
  { path: '/gallery', label: 'Gallery' },
  { path: '/updates', label: 'Updates' },
  { path: '/volunteer', label: 'Volunteer' },
  { path: '/contact', label: 'Contact' },
];

const projectLinks = [
  { path: '/projects', label: 'Thanksgiving Project' },
  { path: '/projects', label: 'Education & Entrepreneurship' },
  { path: '/projects', label: 'Free Pad Initiative' },
  { path: '/projects', label: 'Door to Door Outreach' },
  { path: '/projects', label: 'Kuwa Unachotaka' },
  { path: '/projects', label: "The Girl's Archive" },
  { path: '/projects', label: 'Talk to Your Child' },
  { path: '/projects', label: 'Rafiki Project' },
];

export default function Footer() {
  return (
    <footer style={{ backgroundColor: 'var(--color-bg-dark)', paddingTop: 'var(--space-xl)', paddingBottom: 'var(--space-lg)' }}>
      <div className="container-main">
        {/* Top Section */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 'var(--space-lg)',
          }}
        >
          {/* Brand Column */}
          <div>
            <Link
              to="/"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.75rem',
                color: 'var(--color-accent)',
                textDecoration: 'none',
              }}
            >
              DREFO
            </Link>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.9375rem',
                color: 'rgba(255,251,235,0.7)',
                marginTop: 'var(--space-sm)',
                lineHeight: 1.6,
              }}
            >
              Building Hope, Changing Lives
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.875rem',
                fontWeight: 600,
                color: 'var(--color-text-light)',
                marginBottom: 'var(--space-sm)',
              }}
            >
              Quick Links
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {quickLinks.map((link) => (
                <li key={link.path + link.label}>
                  <Link
                    to={link.path}
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.8125rem',
                      color: 'rgba(255,251,235,0.6)',
                      textDecoration: 'none',
                      transition: 'color 0.3s ease',
                    }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Projects */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.875rem',
                fontWeight: 600,
                color: 'var(--color-text-light)',
                marginBottom: 'var(--space-sm)',
              }}
            >
              Our Projects
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {projectLinks.map((link, idx) => (
                <li key={idx}>
                  <Link
                    to={link.path}
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.8125rem',
                      color: 'rgba(255,251,235,0.6)',
                      textDecoration: 'none',
                      transition: 'color 0.3s ease',
                    }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.875rem',
                fontWeight: 600,
                color: 'var(--color-text-light)',
                marginBottom: 'var(--space-sm)',
              }}
            >
              Contact Us
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8125rem', color: 'rgba(255,251,235,0.6)', lineHeight: 1.5 }}>
                DREFO Office<br />
                Moshi, Kilimanjaro<br />
                Tanzania
              </p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8125rem', color: 'rgba(255,251,235,0.6)' }}>
                info@drefo.org
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            borderTop: '1px solid rgba(255,251,235,0.1)',
            paddingTop: 'var(--space-md)',
            marginTop: 'var(--space-lg)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 'var(--space-sm)',
          }}
        >
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.6875rem', color: 'rgba(255,251,235,0.4)' }}>
            &copy; 2025 Dreamers Foundation. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.6875rem', color: 'rgba(255,251,235,0.4)', cursor: 'pointer' }}>
              Privacy Policy
            </span>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.6875rem', color: 'rgba(255,251,235,0.4)', cursor: 'pointer' }}>
              Terms of Service
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
