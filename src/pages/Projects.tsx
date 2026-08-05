import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const allProjects = [
  {
    title: 'Education & Entrepreneurship',
    description: 'Empowering young minds with skills, knowledge, and opportunities for a self-sustaining future through vocational training and educational support.',
    category: 'Education',
    image: '/images/project-education.jpg',
    status: 'Active',
  },
  {
    title: 'Free Pad Initiative',
    description: 'Breaking barriers in menstrual health by providing free sanitary pads and health education to young women across communities.',
    category: 'Health',
    image: '/images/project-health-pads.jpg',
    status: 'Active',
  },
  {
    title: 'Thanksgiving Project',
    description: 'Bringing communities together through shared meals and food distribution, fostering unity and support for families in need.',
    category: 'Community',
    image: '/images/project-thanksgiving.jpg',
    status: 'Active',
  },
  {
    title: 'Door to Door Outreach',
    description: 'Reaching the most vulnerable through personalized home visits, delivering supplies, support, and connecting families with resources.',
    category: 'Community',
    image: '/images/project-outreach.jpg',
    status: 'Active',
  },
  {
    title: 'Kuwa Unachotaka (Dreamers)',
    description: 'Inspiring youth to pursue their dreams through mentorship, career guidance, and exposure to new opportunities and possibilities.',
    category: 'Youth',
    image: '/images/project-dreamers.jpg',
    status: 'Active',
  },
  {
    title: "The Girl's Archive",
    description: 'Documenting and celebrating the stories of young women in our communities, preserving their voices and inspiring future generations.',
    category: 'Empowerment',
    image: '/images/project-girls-archive.jpg',
    status: 'Active',
  },
  {
    title: 'Talk to Your Child',
    description: 'Strengthening family bonds through workshops that help parents communicate effectively with their children about life challenges.',
    category: 'Family',
    image: '/images/project-talk-child.jpg',
    status: 'Active',
  },
  {
    title: 'Rafiki Project',
    description: 'Building a network of friendship and mutual support within communities, creating lasting connections that strengthen social fabric.',
    category: 'Friendship',
    image: '/images/project-rafiki.jpg',
    status: 'Active',
  },
];

export default function Projects() {
  const heroRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (heroRef.current) {
        gsap.from('.projects-hero-animate > *', {
          opacity: 0, y: 30, stagger: 0.1, duration: 0.7, ease: 'power3.out',
        });
      }

      if (gridRef.current) {
        gsap.from('.project-card', {
          opacity: 0, y: 50, stagger: 0.1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: gridRef.current, start: 'top 80%' },
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
        <div className="projects-hero-animate container-narrow">
          <span className="section-label">OUR WORK</span>
          <h1
            style={{
              fontSize: 'clamp(3rem, 8vw, 7rem)',
              lineHeight: 0.95,
              letterSpacing: '-0.02em',
              color: 'var(--color-text-primary)',
              marginBottom: 'var(--space-md)',
            }}
          >
            Projects & Initiatives
          </h1>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(1.125rem, 1.5vw, 1.375rem)',
              lineHeight: 1.6,
              color: 'var(--color-text-secondary)',
              maxWidth: '700px',
              margin: '0 auto',
            }}
          >
            Discover the programs and initiatives driving positive change across Tanzania. From expanding access to education and healthcare to empowering communities and providing humanitarian support, every project reflects our commitment to creating sustainable impact and transforming lives.
          </p>
        </div>
      </section>

      {/* Projects Grid */}
      <section
        ref={gridRef}
        style={{
          padding: '0 var(--space-md) var(--space-xl)',
          backgroundColor: 'var(--color-bg-primary)',
        }}
      >
        <div
          className="container-main"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
            gap: 'var(--space-md)',
          }}
        >
          {allProjects.map((project, i) => (
            <div
              key={i}
              className="project-card"
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
              <div style={{ overflow: 'hidden', position: 'relative' }}>
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
                />
                <span
                  style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    backgroundColor: 'rgba(34,197,94,0.9)',
                    color: '#fff',
                    padding: '4px 12px',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.6875rem',
                    fontWeight: 600,
                    fontFamily: 'var(--font-body)',
                  }}
                >
                  {project.status}
                </span>
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
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {project.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
