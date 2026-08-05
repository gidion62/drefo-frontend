import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ─────────────── data ─────────────── */

const heroImages = [
  '/images/gallery-4.jpg',
  '/images/project-education.jpg',
  '/images/project-health-pads.jpg',
  '/images/project-thanksgiving.jpg',
  '/images/volunteer-team.jpg',
  '/images/project-dreamers.jpg',
];

const stats = [
  { number: 320, suffix: '+', label: 'Youth Supported', sublabel: 'Empowered through education and skills training' },
  { number: 20, suffix: '+', label: 'Dedicated Volunteers', sublabel: 'Passionate individuals making a difference' },
  { number: 12, suffix: '', label: 'Active Projects', sublabel: 'Ongoing initiatives across communities' },
  { number: 8, suffix: '', label: 'Communities Reached', sublabel: 'Villages and towns touched by our work' },
];

const featuredProjects = [
  {
    title: 'Education & Entrepreneurship',
    description: 'Empowering young minds with skills, knowledge, and opportunities for a self-sustaining future.',
    category: 'Education',
    image: '/images/project-education.jpg',
  },
  {
    title: 'Free Pad Initiative',
    description: 'Breaking barriers in menstrual health by providing free sanitary pads and education to young women.',
    category: 'Health',
    image: '/images/project-health-pads.jpg',
  },
];

const smallProjects = [
  { title: 'Thanksgiving Project', category: 'Community', image: '/images/project-thanksgiving.jpg' },
  { title: 'Door to Door Outreach', category: 'Community', image: '/images/project-outreach.jpg' },
  { title: 'Kuwa Unachotaka (Dreamers)', category: 'Youth', image: '/images/project-dreamers.jpg' },
  { title: "The Girl's Archive", category: 'Empowerment', image: '/images/project-girls-archive.jpg' },
];

const updates = [
  {
    date: 'january 15, 2026',
    title: 'Community Health Fair Reaches 100+ Families',
    excerpt: 'Our recent health fair brought essential medical services and education to over 109 families in the Moshi region.',
    image: '/images/update-1.jpg',
  },
  {
    date: 'june 28, 2025',
    title: 'New Educational Materials Distributed to Schools',
    excerpt: 'Thanks to our donors, we delivered textbooks and learning supplies to 5 schools across 3 communities.',
    image: '/images/update-2.jpg',
  },
  {
    date: 'January 20, 2024',
    title: 'Annual Community Celebration Brings Hope',
    excerpt: 'Hundreds gathered to celebrate achievements and share stories of transformation from the past year.',
    image: '/images/update-3.jpg',
  },
];

/* ─────────────── components ─────────────── */

function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const triggered = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !triggered.current) {
          triggered.current = true;
          const duration = 2000;
          const start = performance.now();

          const animate = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

/* ─────────────── page ─────────────── */

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const missionRef = useRef<HTMLDivElement>(null);
  const impactRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const donateRef = useRef<HTMLDivElement>(null);
  const volunteerRef = useRef<HTMLDivElement>(null);
  const updatesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animations
      gsap.from('.hero-label', { opacity: 0, y: 20, duration: 0.6, ease: 'power3.out', delay: 0.2 });
      gsap.from('.hero-heading', { opacity: 0, y: 40, duration: 0.8, ease: 'power3.out', delay: 0.4 });
      gsap.from('.hero-subtitle', { opacity: 0, y: 30, duration: 0.7, ease: 'power3.out', delay: 0.8 });
      gsap.from('.hero-buttons', { opacity: 0, y: 20, duration: 0.6, ease: 'power3.out', delay: 1.0 });
      gsap.from('.hero-image', { opacity: 0, x: 60, duration: 1, ease: 'power3.out', delay: 0.6 });

      // Mission
      if (missionRef.current) {
        gsap.from(missionRef.current.querySelector('.mission-line'), {
          scaleX: 0, duration: 0.6, ease: 'power2.out',
          scrollTrigger: { trigger: missionRef.current, start: 'top 80%' },
        });
        gsap.from(missionRef.current.querySelector('.mission-quote'), {
          opacity: 0, y: 40, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: missionRef.current, start: 'top 80%' },
        });
        gsap.from(missionRef.current.querySelector('.mission-attr'), {
          opacity: 0, duration: 0.6, delay: 0.4,
          scrollTrigger: { trigger: missionRef.current, start: 'top 80%' },
        });
      }

      // Impact stats
      if (impactRef.current) {
        gsap.from('.stat-card', {
          opacity: 0, y: 50, stagger: 0.15, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: impactRef.current, start: 'top 80%' },
        });
      }

      // Projects
      if (projectsRef.current) {
        gsap.from('.projects-header', {
          opacity: 0, y: 30, duration: 0.7, ease: 'power3.out',
          scrollTrigger: { trigger: projectsRef.current, start: 'top 80%' },
        });
        gsap.from('.large-project-card', {
          opacity: 0, x: (i) => i === 0 ? -40 : 40, stagger: 0.15, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: '.large-project-card', start: 'top 85%' },
        });
        gsap.from('.small-project-card', {
          opacity: 0, scale: 0.95, stagger: 0.1, duration: 0.7, delay: 0.3, ease: 'power3.out',
          scrollTrigger: { trigger: '.small-project-card', start: 'top 85%' },
        });
      }

      // Donate CTA
      if (donateRef.current) {
        gsap.from('.donate-heading', { opacity: 0, y: 40, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: donateRef.current, start: 'top 80%' } });
        gsap.from('.donate-desc', { opacity: 0, duration: 0.6, delay: 0.2, scrollTrigger: { trigger: donateRef.current, start: 'top 80%' } });
        gsap.from('.donate-btn', { opacity: 0, scale: 0.9, duration: 0.6, delay: 0.4, scrollTrigger: { trigger: donateRef.current, start: 'top 80%' } });
      }

      // Volunteer
      if (volunteerRef.current) {
        gsap.from('.volunteer-image', { opacity: 0, x: -40, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: volunteerRef.current, start: 'top 80%' } });
        gsap.from('.volunteer-text > *', { opacity: 0, x: 30, stagger: 0.1, duration: 0.7, ease: 'power3.out', scrollTrigger: { trigger: volunteerRef.current, start: 'top 80%' } });
      }

      // Updates
      if (updatesRef.current) {
        gsap.from('.update-card', { opacity: 0, y: 40, stagger: 0.15, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: updatesRef.current, start: 'top 80%' } });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <div>
      {/* ─── Hero ─── */}
      <section
        ref={heroRef}
        style={{
          minHeight: 'calc(100vh - 72px)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 400px), 1fr))',
          alignItems: 'center',
          gap: 'var(--space-lg)',
          padding: 'var(--space-lg) var(--space-md)',
          maxWidth: 'var(--container-max)',
          margin: '0 auto',
        }}
      >
        {/* Text Column */}
        <div style={{ paddingRight: 'clamp(0px, 3vw, 3rem)' }}>
          <span className="section-label hero-label">INTERNATIONAL AID & DEVELOPMENT</span>
          <h1
            className="hero-heading"
            style={{
              fontSize: 'clamp(3rem, 8vw, 7rem)',
              lineHeight: 0.95,
              letterSpacing: '-0.02em',
              color: 'var(--color-text-primary)',
              marginBottom: 'var(--space-md)',
            }}
          >
            Building Hope,<br />
            <span className="text-gradient">Changing Lives</span>
          </h1>
          <p
            className="hero-subtitle"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(1.125rem, 1.5vw, 1.375rem)',
              lineHeight: 1.6,
              color: 'var(--color-text-secondary)',
              maxWidth: '520px',
              marginBottom: 'var(--space-md)',
            }}
          >
            Since 2019, Dreamers Foundation has been empowering communities across Tanzania through education, health initiatives, and humanitarian support.
          </p>
          <div className="hero-buttons" style={{ display: 'flex', gap: 'var(--space-sm)', flexWrap: 'wrap' }}>
            <Link to="/projects" className="btn-filled">Our Projects</Link>
            <Link to="/contact" className="btn-outlined">Donate Now</Link>
          </div>
        </div>

        {/* Image Column with Carousel */}
        <div
          className="hero-image"
          style={{
            position: 'relative',
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden',
            aspectRatio: '3/4',
            maxHeight: '70vh',
          }}
        >
          {heroImages.map((src, i) => (
            <div
              key={i}
              className="hero-carousel-slide"
              style={{
                backgroundImage: `url(${src})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
          ))}
        </div>
      </section>

      {/* ─── Mission Statement ─── */}
      <section
        ref={missionRef}
        style={{
          backgroundColor: 'var(--color-bg-secondary)',
          padding: 'var(--space-xl) var(--space-md)',
        }}
      >
        <div className="container-narrow" style={{ textAlign: 'center' }}>
          <div
            className="mission-line"
            style={{
              width: '80px',
              height: '2px',
              backgroundColor: 'var(--color-accent)',
              margin: '0 auto var(--space-md)',
            }}
          />
          <h2
            className="mission-quote"
            style={{
              fontSize: 'clamp(2rem, 5vw, 4.5rem)',
              lineHeight: 1.0,
              letterSpacing: '-0.015em',
              color: 'var(--color-text-primary)',
              marginBottom: 'var(--space-md)',
            }}
          >
            "We believe every community holds the power to shape its own future. Our role is to walk alongside them — providing resources, education, and unwavering support until hope becomes reality."
          </h2>
          <p
            className="mission-attr"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.875rem',
              fontStyle: 'italic',
              color: 'var(--color-text-secondary)',
            }}
          >
            — John James Mmasi, Founder
          </p>
        </div>
      </section>

      {/* ─── Impact Statistics ─── */}
      <section
        ref={impactRef}
        style={{
          padding: 'var(--space-xl) var(--space-md)',
          backgroundColor: 'var(--color-bg-primary)',
        }}
      >
        <div className="container-main">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: 'var(--space-lg)',
              textAlign: 'center',
            }}
          >
            {stats.map((stat, i) => (
              <div key={i} className="stat-card">
                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(3rem, 6vw, 5rem)',
                    color: 'var(--color-accent)',
                    lineHeight: 1,
                    marginBottom: 'var(--space-sm)',
                  }}
                >
                  <AnimatedCounter target={stat.number} suffix={stat.suffix} />
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontWeight: 600,
                    fontSize: '1rem',
                    color: 'var(--color-text-primary)',
                    marginBottom: '4px',
                  }}
                >
                  {stat.label}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.875rem',
                    color: 'var(--color-text-secondary)',
                  }}
                >
                  {stat.sublabel}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Featured Projects ─── */}
      <section
        ref={projectsRef}
        style={{
          padding: 'var(--space-xl) var(--space-md) var(--space-2xl)',
          backgroundColor: 'var(--color-bg-primary)',
        }}
      >
        <div className="container-main">
          {/* Header */}
          <div className="projects-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 'var(--space-lg)', flexWrap: 'wrap', gap: 'var(--space-sm)' }}>
            <div>
              <span className="section-label">OUR INITIATIVES</span>
              <h2
                style={{
                  fontSize: 'clamp(2rem, 5vw, 4.5rem)',
                  lineHeight: 1.0,
                  letterSpacing: '-0.015em',
                  color: 'var(--color-text-primary)',
                }}
              >
                Projects That Transform Lives
              </h2>
            </div>
            <Link
              to="/projects"
              style={{
                fontFamily: 'var(--font-body)',
                color: 'var(--color-accent)',
                fontWeight: 600,
                fontSize: '0.9375rem',
                textDecoration: 'none',
                whiteSpace: 'nowrap',
              }}
            >
              View All Projects -
            </Link>
          </div>

          {/* Large Cards */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 400px), 1fr))',
              gap: 'var(--space-md)',
              marginBottom: 'var(--space-md)',
            }}
          >
            {featuredProjects.map((project, i) => (
              <div
                key={i}
                className="large-project-card"
                style={{
                  backgroundColor: 'var(--color-bg-secondary)',
                  borderRadius: 'var(--radius-md)',
                  overflow: 'hidden',
                  transition: 'transform 0.4s ease, box-shadow 0.4s ease',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{ overflow: 'hidden' }}>
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    style={{
                      width: '100%',
                      aspectRatio: '16/10',
                      objectFit: 'cover',
                      display: 'block',
                      transition: 'transform 0.6s ease-out',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.03)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
                  />
                </div>
                <div style={{ padding: 'var(--space-md)' }}>
                  <span
                    style={{
                      display: 'inline-block',
                      backgroundColor: 'rgba(217,119,6,0.15)',
                      color: 'var(--color-accent-deep)',
                      padding: '4px 12px',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      marginBottom: 'var(--space-sm)',
                    }}
                  >
                    {project.category}
                  </span>
                  <h4
                    style={{
                      fontSize: 'clamp(1.25rem, 2vw, 1.75rem)',
                      lineHeight: 1.2,
                      color: 'var(--color-text-primary)',
                      marginBottom: '8px',
                    }}
                  >
                    {project.title}
                  </h4>
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.875rem',
                      color: 'var(--color-text-secondary)',
                      lineHeight: 1.5,
                      marginBottom: 'var(--space-sm)',
                    }}
                  >
                    {project.description}
                  </p>
                  <Link
                    to="/projects"
                    style={{
                      fontFamily: 'var(--font-body)',
                      color: 'var(--color-accent)',
                      fontWeight: 600,
                      fontSize: '0.875rem',
                      textDecoration: 'none',
                    }}
                  >
                    Learn More -
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Small Cards */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))',
              gap: 'var(--space-md)',
            }}
          >
            {smallProjects.map((project, i) => (
              <div
                key={i}
                className="small-project-card"
                style={{
                  backgroundColor: 'var(--color-bg-secondary)',
                  borderRadius: 'var(--radius-md)',
                  overflow: 'hidden',
                  transition: 'transform 0.4s ease, box-shadow 0.4s ease',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{ overflow: 'hidden' }}>
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    style={{
                      width: '100%',
                      aspectRatio: '4/3',
                      objectFit: 'cover',
                      display: 'block',
                      transition: 'transform 0.6s ease-out',
                    }}
                  />
                </div>
                <div style={{ padding: 'var(--space-sm)' }}>
                  <span
                    style={{
                      display: 'inline-block',
                      backgroundColor: 'rgba(217,119,6,0.15)',
                      color: 'var(--color-accent-deep)',
                      padding: '3px 10px',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '0.6875rem',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      marginBottom: '6px',
                    }}
                  >
                    {project.category}
                  </span>
                  <h4
                    style={{
                      fontSize: '1.125rem',
                      lineHeight: 1.2,
                      color: 'var(--color-text-primary)',
                    }}
                  >
                    {project.title}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Donate CTA ─── */}
      <section
        ref={donateRef}
        style={{
          padding: 'var(--space-2xl) var(--space-md)',
          backgroundColor: 'var(--color-bg-warm)',
          textAlign: 'center',
        }}
      >
        <div className="container-narrow">
          <h2
            className="donate-heading"
            style={{
              fontSize: 'clamp(2rem, 5vw, 4.5rem)',
              lineHeight: 1.0,
              letterSpacing: '-0.015em',
              color: 'var(--color-text-primary)',
              marginBottom: 'var(--space-md)',
            }}
          >
            Be Part of the Change
          </h2>
          <p
            className="donate-desc"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(1.125rem, 1.5vw, 1.375rem)',
              lineHeight: 1.6,
              color: 'var(--color-text-secondary)',
              maxWidth: '600px',
              margin: '0 auto var(--space-lg)',
            }}
          >
            Your support helps us continue our mission of empowering communities across Tanzania. Every contribution makes a real difference.
          </p>
          <Link
            to="/contact"
            className="btn-filled donate-btn"
            style={{ padding: '16px 48px', fontSize: '1rem' }}
          >
            Support Our Mission
          </Link>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.875rem',
              color: 'var(--color-text-secondary)',
              marginTop: 'var(--space-md)',
            }}
          >
            <Link to="/contact" style={{ color: 'var(--color-accent)', textDecoration: 'underline' }}>
              Contact us for partnership opportunities
            </Link>
          </p>
        </div>
      </section>

      {/* ─── Volunteer CTA ─── */}
      <section
        ref={volunteerRef}
        style={{
          padding: 'var(--space-xl) var(--space-md)',
          backgroundColor: 'var(--color-bg-primary)',
        }}
      >
        <div
          className="container-main"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 400px), 1fr))',
            gap: 'var(--space-lg)',
            alignItems: 'center',
          }}
        >
          {/* Image */}
          <div className="volunteer-image">
            <img
              src="/images/volunteer-team.jpg"
              alt="Volunteers working together"
              loading="lazy"
              style={{
                width: '100%',
                borderRadius: 'var(--radius-lg)',
                aspectRatio: '4/3',
                objectFit: 'cover',
                display: 'block',
              }}
            />
          </div>

          {/* Text */}
          <div className="volunteer-text">
            <span className="section-label">JOIN OUR TEAM</span>
            <h2
              style={{
                fontSize: 'clamp(2rem, 5vw, 4.5rem)',
                lineHeight: 1.0,
                letterSpacing: '-0.015em',
                color: 'var(--color-text-primary)',
                marginBottom: 'var(--space-md)',
              }}
            >
              Become a Volunteer
            </h2>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(1.125rem, 1.5vw, 1.375rem)',
                lineHeight: 1.6,
                color: 'var(--color-text-secondary)',
                marginBottom: 'var(--space-md)',
              }}
            >
              Join our community of dedicated volunteers working together with global volunteers from around the world to create lasting change.whether you want to volunteer in Tanzania from outside or locally, your contribution matters. Whether you have a few hours or a few weeks, your time and skills can transform lives.
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 var(--space-md)', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {[
                'Make a direct impact in communities',
                'Gain valuable experience and connections',
                'Be part of a passionate, caring team',
              ].map((item, i) => (
                <li
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    fontFamily: 'var(--font-body)',
                    fontSize: '1rem',
                    color: 'var(--color-text-primary)',
                  }}
                >
                  <span
                    style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--color-accent)',
                      flexShrink: 0,
                    }}
                  />
                  {item}
                </li>
              ))}
            </ul>
            <Link to="/volunteer" className="btn-outlined">
              Apply to Volunteer
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Latest Updates ─── */}
      <section
        ref={updatesRef}
        style={{
          padding: 'var(--space-xl) var(--space-md) var(--space-2xl)',
          backgroundColor: 'var(--color-bg-secondary)',
        }}
      >
        <div className="container-main">
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 'var(--space-lg)', flexWrap: 'wrap', gap: 'var(--space-sm)' }}>
            <div>
              <span className="section-label">NEWS & UPDATES</span>
              <h2
                style={{
                  fontSize: 'clamp(2rem, 5vw, 4.5rem)',
                  lineHeight: 1.0,
                  letterSpacing: '-0.015em',
                  color: 'var(--color-text-primary)',
                }}
              >
                Latest from the Field
              </h2>
            </div>
            <Link
              to="/updates"
              style={{
                fontFamily: 'var(--font-body)',
                color: 'var(--color-accent)',
                fontWeight: 600,
                fontSize: '0.9375rem',
                textDecoration: 'none',
                whiteSpace: 'nowrap',
              }}
            >
              View All Updates -
            </Link>
          </div>

          {/* Cards */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
              gap: 'var(--space-md)',
            }}
          >
            {updates.map((update, i) => (
              <div
                key={i}
                className="update-card"
                style={{
                  backgroundColor: 'var(--color-bg-primary)',
                  borderRadius: 'var(--radius-md)',
                  overflow: 'hidden',
                  transition: 'transform 0.4s ease, box-shadow 0.4s ease',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <img
                  src={update.image}
                  alt={update.title}
                  loading="lazy"
                  style={{
                    width: '100%',
                    aspectRatio: '16/9',
                    objectFit: 'cover',
                    display: 'block',
                  }}
                />
                <div style={{ padding: 'var(--space-md)' }}>
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      color: 'var(--color-text-secondary)',
                      marginBottom: '8px',
                    }}
                  >
                    {update.date}
                  </p>
                  <h4
                    style={{
                      fontSize: 'clamp(1.25rem, 2vw, 1.75rem)',
                      lineHeight: 1.2,
                      color: 'var(--color-text-primary)',
                      marginBottom: '8px',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {update.title}
                  </h4>
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.875rem',
                      color: 'var(--color-text-secondary)',
                      lineHeight: 1.5,
                      marginBottom: 'var(--space-sm)',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {update.excerpt}
                  </p>
                  <Link
                    to="/updates"
                    style={{
                      fontFamily: 'var(--font-body)',
                      color: 'var(--color-accent)',
                      fontWeight: 600,
                      fontSize: '0.875rem',
                      textDecoration: 'none',
                    }}
                  >
                    Read More -
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
