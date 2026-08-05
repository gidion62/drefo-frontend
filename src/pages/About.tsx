import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const teamMembers = [
  {
    name: 'John James Mmasi',
    role: 'Founder & CEO',
    bio: 'Visionary leader dedicated to community empowerment and sustainable development across Tanzania.',
    image: '/images/about-founder.jpg',
  },
  {
    name: 'Jesca R .Medard',
    role: 'General Secretary and treasurer',
    bio: 'Oversees all project operations and financial management.',
    image: '/images/gallery-8.jpg',
  },
  {
    name: 'Gidion E Mmasi',
    role: 'Programme and Community Coordinator ',
    bio: 'Builds bridges between DREFO and the communities we serve across the Kilimanjaro region.',
    image: '/images/gallery-6.jpg',
  },
];

export default function About() {
  const heroRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);
  const leadershipRef = useRef<HTMLDivElement>(null);
  const visionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (heroRef.current) {
        gsap.from('.about-hero-image', { opacity: 0, x: -40, duration: 0.9, ease: 'power3.out' });
        gsap.from('.about-hero-text > *', { opacity: 0, y: 30, stagger: 0.1, duration: 0.7, ease: 'power3.out', delay: 0.2 });
      }

      if (storyRef.current) {
        gsap.from(storyRef.current.querySelectorAll('.story-animate'), {
          opacity: 0, y: 40, stagger: 0.1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: storyRef.current, start: 'top 80%' },
        });
      }

      if (leadershipRef.current) {
        gsap.from('.team-card', {
          opacity: 0, y: 50, stagger: 0.15, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: leadershipRef.current, start: 'top 80%' },
        });
      }

      if (visionRef.current) {
        gsap.from('.vision-card', {
          opacity: 0, y: 40, stagger: 0.15, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: visionRef.current, start: 'top 80%' },
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
          <div className="about-hero-image">
            <img
              src="/images/gallery-4.jpg"
              alt="Community work in Tanzania"
              style={{
                width: '100%',
                borderRadius: 'var(--radius-lg)',
                aspectRatio: '4/3',
                objectFit: 'cover',
                display: 'block',
              }}
            />
          </div>
          <div className="about-hero-text">
            <span className="section-label">ABOUT DREFO</span>
            <h1
              style={{
                fontSize: 'clamp(2rem, 6vw, 6rem)',
                lineHeight: 0.95,
                letterSpacing: '-0.02em',
                color: 'var(--color-text-primary)',
                marginBottom: 'var(--space-md)',
              }}
            >
              A Foundation Built on Hope, Compassion & Action
            </h1>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(1.125rem, 1.5vw, 1.375rem)',
                lineHeight: 1.6,
                color: 'var(--color-text-secondary)',
              }}
            >
              Founded in 2019 by John James Mmasi in Moshi, Tanzania, Dreamers Foundation is dedicated to supporting communities through charity, humanitarian aid, and friendship-driven initiatives.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section
        ref={storyRef}
        style={{
          padding: 'var(--space-xl) var(--space-md)',
          backgroundColor: 'var(--color-bg-secondary)',
        }}
      >
        <div className="container-narrow">
          <h2
            className="story-animate"
            style={{
              fontSize: 'clamp(2rem, 5vw, 4.5rem)',
              lineHeight: 1.0,
              letterSpacing: '-0.015em',
              color: 'var(--color-text-primary)',
              textAlign: 'center',
              marginBottom: 'var(--space-lg)',
            }}
          >
            Our Story
          </h2>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-md)',
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(1.125rem, 1.5vw, 1.375rem)',
              lineHeight: 1.7,
              color: 'var(--color-text-primary)',
            }}
          >
            <p className="story-animate">
              Dreamers Foundation began with a simple belief: that every person deserves the opportunity to build a better future. In 2019, John James Mmasi gathered a small group of dedicated volunteers in Moshi, Tanzania, and set out to make that belief a reality.
            </p>
            <p className="story-animate">
              What started as grassroots community support has grown into a comprehensive network of programs touching education, health, youth empowerment, and community development. Through partnerships with local leaders, schools, and health facilities, DREFO has become a trusted presence in the communities we serve.
            </p>
            {/* Pull Quote */}
            <div
              className="story-animate"
              style={{
                backgroundColor: 'rgba(253,230,138,0.3)',
                padding: 'var(--space-lg)',
                borderRadius: 'var(--radius-md)',
                borderLeft: '4px solid var(--color-accent)',
                margin: 'var(--space-sm) 0',
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
                  lineHeight: 1.2,
                  color: 'var(--color-text-primary)',
                  fontStyle: 'italic',
                }}
              >
                "We do not give people hope. We help them discover the hope that has always been within them."
              </p>
            </div>
            <p className="story-animate">
              Our approach is rooted in collaboration and respect. We listen to community needs, work alongside local partners, and create sustainable solutions that continue to thrive long after our direct involvement ends. Every project is designed to build capacity, foster independence, and honor the dignity of those we serve.
            </p>
            <p className="story-animate">
              Today, DREFO operates across 8 communities in the Kilimanjaro region, with 12 active projects and a growing network of volunteers and supporters. We remain committed to our founding vision: a world where every community has the resources and support to build its own brighter tomorrow.
            </p>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section
        ref={leadershipRef}
        style={{
          padding: 'var(--space-xl) var(--space-md)',
          backgroundColor: 'var(--color-bg-primary)',
        }}
      >
        <div className="container-main">
          <h2
            style={{
              fontSize: 'clamp(2rem, 5vw, 4.5rem)',
              lineHeight: 1.0,
              letterSpacing: '-0.015em',
              color: 'var(--color-text-primary)',
              textAlign: 'center',
              marginBottom: 'var(--space-lg)',
            }}
          >
            Our Leadership
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))',
              gap: 'var(--space-md)',
            }}
          >
            {teamMembers.map((member, i) => (
              <div
                key={i}
                className="team-card"
                style={{
                  textAlign: 'center',
                  padding: 'var(--space-md)',
                }}
              >
                <img
                  src={member.image}
                  alt={member.name}
                  loading="lazy"
                  style={{
                    width: '230px',
                    height: '230px',
                    borderRadius: 'var(--radius-md)',
                    objectFit: 'cover',
                    margin: '0 auto var(--space-md)',
                    display: 'block',
                  }}
                />
                <h4
                  style={{
                    fontSize: 'clamp(1.25rem, 2vw, 1.75rem)',
                    lineHeight: 1.2,
                    color: 'var(--color-text-primary)',
                    marginBottom: '4px',
                  }}
                >
                  {member.name}
                </h4>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    color: 'var(--color-accent)',
                    marginBottom: '8px',
                  }}
                >
                  {member.role}
                </p>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.875rem',
                    color: 'var(--color-text-secondary)',
                    lineHeight: 1.5,
                  }}
                >
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section
        ref={visionRef}
        style={{
          padding: 'var(--space-xl) var(--space-md)',
          backgroundColor: 'var(--color-bg-secondary)',
        }}
      >
        <div
          className="container-main"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 350px), 1fr))',
            gap: 'var(--space-md)',
          }}
        >
          {/* Vision */}
          <div
            className="vision-card"
            style={{
              backgroundColor: 'var(--color-bg-primary)',
              padding: 'var(--space-lg)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--color-border)',
            }}
          >
            <span className="section-label">VISION</span>
            <h3
              style={{
                fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
                lineHeight: 1.1,
                color: 'var(--color-text-primary)',
                marginBottom: 'var(--space-sm)',
              }}
            >
              Our Vision
            </h3>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '1rem',
                lineHeight: 1.6,
                color: 'var(--color-text-secondary)',
              }}
            >
              We envision a Tanzania where every individual, family, and community has the opportunity, knowledge, and resources to thrive with dignity and hope. We aspire to build a nation where no one is left behind regardless of their background, location, gender, age, or economic status. In our vision, every child has access to quality education, every person enjoys the right to good health and well-being, and every young person is empowered with the skills, confidence, and opportunities to achieve their full potential.

We believe that sustainable development begins with empowered communities that are equipped to solve their own challenges and shape their own future. Through collaboration, innovation, and shared responsibility, we envision resilient communities that protect the environment, embrace equality and inclusion, create economic opportunities, and inspire future generations to lead positive change. Our vision is a prosperous, healthy, educated, and self-reliant Tanzania where every citizen contributes to national development and every community flourishes
            </p>
          </div>

          {/* Mission */}
          <div
            className="vision-card"
            style={{
              backgroundColor: 'var(--color-bg-primary)',
              padding: 'var(--space-lg)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--color-border)',
            }}
          >
            <span className="section-label">MISSION</span>
            <h3
              style={{
                fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
                lineHeight: 1.1,
                color: 'var(--color-text-primary)',
                marginBottom: 'var(--space-sm)',
              }}
            >
              Our Mission
            </h3>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '1rem',
                lineHeight: 1.6,
                color: 'var(--color-text-secondary)',
              }}
            >
            Our mission is to empower communities across Tanzania by delivering impactful education programs, improving access to quality healthcare, promoting sustainable livelihoods, and providing humanitarian support to vulnerable populations. We are committed to addressing the root causes of poverty, inequality, and social exclusion through practical, community-driven solutions that create lasting change.

Working hand in hand with local communities, government institutions, development partners, civil society organizations, and the private sector, DREFO strengthens local capacity and encourages active participation in every stage of development. We believe that the people closest to the challenges are also closest to the solutions, and we are dedicated to ensuring that communities become leaders of their own transformation.

Through integrity, innovation, inclusiveness, accountability, and compassion, we invest in people by expanding educational opportunities, promoting healthy lives, empowering youth and women, responding to humanitarian needs, and strengthening community resilience. Our goal is to create lasting impact by enabling individuals and communities to become self-reliant, resilient, and capable of improving their quality of life for generations to come.

At DREFO, we measure success not only by the projects we implement but by the lasting impact we create—stronger communities, empowered citizens, inspired young leaders, healthier families, and a Tanzania where sustainable development becomes a shared responsibility and a lasting reality.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
