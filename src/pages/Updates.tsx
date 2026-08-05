import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const articles = [
  {
    date: 'january 15, 2026',
    title: 'Community Health Fair Reaches 100+ Families',
    excerpt: 'Our recent health fair brought essential medical services, health education, and free screenings to over 109 families in the Moshi region. Local health workers and DREFO volunteers collaborated to provide checkups, distribute health supplies, and connect community members with ongoing care resources.',
    image: '/images/update-1.jpg',
  },
  {
    date: 'june 28, 2025',
    title: 'New Educational Materials Distributed to Schools',
    excerpt: 'Thanks to the generosity of our donors, we delivered over 250 textbooks, notebooks, and learning supplies to 5 schools across 3 communities. Teachers reported immediate impact as students eagerly embraced their new materials.',
    image: '/images/update-2.jpg',
  },
  {
    date: 'January 20, 2024',
    title: 'Annual Community Celebration Brings Hope',
    excerpt: 'Hundreds of community members gathered to celebrate achievements from the past year and share stories of transformation. The event featured performances, awards for outstanding volunteers, and a shared vision for the year ahead.',
    image: '/images/update-3.jpg',
  },
  {
    date: 'December 10, 2023',
    title: 'Free Pad Initiative Expands to Three New Communities',
    excerpt: 'Our menstrual health program has grown to serve three additional communities, reaching over 174 more young women with sanitary supplies and health education. Local health workers have been trained to sustain the program.',
    image: '/images/project-health-pads.jpg',
  },
  {
    date: 'November 5, 2022',
    title: 'Youth Entrepreneurship Workshop Sparks Innovation',
    excerpt: 'A week-long workshop brought together 70 young people to learn self awareness, financial literacy, and creative problem-solving. Several participants have already launched small businesses in their communities.',
    image: '/images/project-dreamers.jpg',
  },
  {
    date: 'October 18, 2020',
    title: 'Door to Door Campaign Connects with 157 Families',
    excerpt: 'Our outreach team visited homes across three villages, identifying families in need and connecting them with DREFO programs, local resources, and community support networks.',
    image: '/images/project-outreach.jpg',
  },
];

export default function Updates() {
  const heroRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (heroRef.current) {
        gsap.from('.updates-hero-animate > *', {
          opacity: 0, y: 30, stagger: 0.1, duration: 0.7, ease: 'power3.out',
        });
      }
      if (listRef.current) {
        gsap.from('.article-card', {
          opacity: 0, y: 40, stagger: 0.12, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: listRef.current, start: 'top 80%' },
        });
      }
    });
    return () => ctx.revert();
  }, []);

  return (
    <div>
      {/* Hero */}
      <section
        ref={heroRef}
        style={{
          padding: 'var(--space-lg) var(--space-md) var(--space-xl)',
          backgroundColor: 'var(--color-bg-primary)',
          textAlign: 'center',
        }}
      >
        <div className="updates-hero-animate container-narrow">
          <h1
            style={{
              fontSize: 'clamp(3rem, 8vw, 7rem)',
              lineHeight: 0.95,
              letterSpacing: '-0.02em',
              color: 'var(--color-text-primary)',
              marginBottom: 'var(--space-md)',
            }}
          >
            News & Updates
          </h1>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(1.125rem, 1.5vw, 1.375rem)',
              lineHeight: 1.6,
              color: 'var(--color-text-secondary)',
            }}
          >
            Stay informed about our latest activities, upcoming events, community initiatives, and inspiring stories from the communities we serve. Discover project milestones, success stories, important announcements, and the impact of our work as we continue to empower lives and create lasting positive change.
          </p>
        </div>
      </section>

      {/* Articles List */}
      <section
        ref={listRef}
        style={{
          padding: '0 var(--space-md) var(--space-xl)',
          backgroundColor: 'var(--color-bg-primary)',
        }}
      >
        <div className="container-narrow" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
          {articles.map((article, i) => (
            <div
              key={i}
              className="article-card"
              style={{
                backgroundColor: 'var(--color-bg-secondary)',
                borderRadius: 'var(--radius-lg)',
                padding: 'var(--space-md)',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))',
                gap: 'var(--space-md)',
                alignItems: 'start',
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
                src={article.image}
                alt={article.title}
                loading="lazy"
                style={{
                  width: '100%',
                  aspectRatio: '16/10',
                  objectFit: 'cover',
                  borderRadius: 'var(--radius-md)',
                  display: 'block',
                }}
              />
              <div>
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
                  {article.date}
                </p>
                <h4
                  style={{
                    fontSize: 'clamp(1.25rem, 2vw, 1.75rem)',
                    lineHeight: 1.2,
                    color: 'var(--color-text-primary)',
                    marginBottom: '8px',
                  }}
                >
                  {article.title}
                </h4>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.875rem',
                    color: 'var(--color-text-secondary)',
                    lineHeight: 1.5,
                    marginBottom: 'var(--space-sm)',
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {article.excerpt}
                </p>
                <Link
                  to="#"
                  style={{
                    fontFamily: 'var(--font-body)',
                    color: 'var(--color-accent)',
                    fontWeight: 600,
                    fontSize: '0.875rem',
                    textDecoration: 'none',
                  }}
                >
                  
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
