import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const galleryImages = [
  { src: '/images/hero-community.jpg', alt: 'Community aid workers in Tanzania' },
  { src: '/images/project-education.jpg', alt: 'Children in classroom' },
  { src: '/images/project-health-pads.jpg', alt: 'Health education session' },
  { src: '/images/project-thanksgiving.jpg', alt: 'Community Thanksgiving gathering' },
  { src: '/images/project-outreach.jpg', alt: 'Door to door outreach' },
  { src: '/images/project-dreamers.jpg', alt: 'Youth empowerment workshop' },
  { src: '/images/project-girls-archive.jpg', alt: "Girl's mentorship program" },
  { src: '/images/project-talk-child.jpg', alt: 'Family communication workshop' },
  { src: '/images/project-rafiki.jpg', alt: 'Friendship and community support' },
  { src: '/images/volunteer-team.jpg', alt: 'Volunteers working together' },
  { src: '/images/gallery-1.jpg', alt: 'Children learning outdoors' },
  { src: '/images/gallery-2.jpg', alt: 'Food distribution event' },
  { src: '/images/gallery-3.jpg', alt: 'Youth discussion circle' },
  { src: '/images/gallery-4.jpg', alt: 'Women health education' },
  { src: '/images/gallery-5.jpg', alt: 'Community building project' },
  { src: '/images/gallery-6.jpg', alt: 'Girl reading under tree' },
  { src: '/images/gallery-8.jpg', alt: 'Jesca R. Medard' },
  { src: '/images/gallery-9.jpg', alt: 'mothers giving to school' },
  { src: '/images/update-1.jpg', alt: 'Community health fair' },
  { src: '/images/update-2.jpg', alt: 'School children with supplies' },
  { src: '/images/update-3.jpg', alt: 'Community celebration' },
  { src: '/images/about-founder.jpg', alt: 'DEFRO founder portrait' },
];

export default function Gallery() {
  const heroRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [lightbox, setLightbox] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (heroRef.current) {
        gsap.from('.gallery-hero-animate > *', {
          opacity: 0, y: 30, stagger: 0.1, duration: 0.7, ease: 'power3.out',
        });
      }
      if (gridRef.current) {
        gsap.from('.gallery-item', {
          opacity: 0, y: 40, stagger: 0.06, duration: 0.7, ease: 'power3.out',
          scrollTrigger: { trigger: gridRef.current, start: 'top 85%' },
        });
      }
    });
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (lightbox !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [lightbox]);

  const openLightbox = (index: number) => setLightbox(index);
  const closeLightbox = () => setLightbox(null);
  const prevImage = () => setLightbox((prev) => (prev !== null ? (prev - 1 + galleryImages.length) % galleryImages.length : null));
  const nextImage = () => setLightbox((prev) => (prev !== null ? (prev + 1) % galleryImages.length : null));

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
        <div className="gallery-hero-animate container-narrow">
          <h1
            style={{
              fontSize: 'clamp(2rem, 6vw, 6rem)',
              lineHeight: 0.95,
              letterSpacing: '-0.02em',
              color: 'var(--color-text-primary)',
              marginBottom: 'var(--space-md)',
            }}
          >
            Our Gallery
          </h1>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(1.125rem, 1.5vw, 1.375rem)',
              lineHeight: 1.6,
              color: 'var(--color-text-secondary)',
            }}
          >
          Every image tells a story of hope, resilience, and transformation. Explore moments that capture DREFO's journey of empowering communities, changing lives, and creating lasting impact across Tanzania through education, health, humanitarian action, and community development.
          </p>
        </div>
      </section>

      {/* Photo Grid - Masonry Style */}
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
            columnCount: 3,
            columnGap: 'var(--space-sm)',
          }}
        >
          {galleryImages.map((img, i) => (
            <div
              key={i}
              className="gallery-item"
              style={{
                breakInside: 'avoid',
                marginBottom: 'var(--space-sm)',
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                cursor: 'pointer',
                position: 'relative',
              }}
              onClick={() => openLightbox(i)}
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                style={{
                  width: '100%',
                  display: 'block',
                  transition: 'transform 0.4s ease',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.02)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundColor: 'rgba(217,119,6,0.1)',
                  opacity: 0,
                  transition: 'opacity 0.3s ease',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.opacity = '1'; }}
                onMouseLeave={(e) => { e.currentTarget.style.opacity = '0'; }}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 10000,
            backgroundColor: 'rgba(0,0,0,0.92)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              background: 'none',
              border: 'none',
              color: '#fff',
              fontSize: '2rem',
              cursor: 'pointer',
              zIndex: 10001,
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            aria-label="Close lightbox"
          >
            &times;
          </button>

          {/* Previous */}
          <button
            onClick={(e) => { e.stopPropagation(); prevImage(); }}
            style={{
              position: 'absolute',
              left: '20px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'rgba(255,255,255,0.1)',
              border: 'none',
              color: '#fff',
              fontSize: '2rem',
              cursor: 'pointer',
              zIndex: 10001,
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            aria-label="Previous image"
          >
            &#8249;
          </button>

          {/* Image */}
          <img
            src={galleryImages[lightbox].src}
            alt={galleryImages[lightbox].alt}
            style={{
              maxWidth: '90vw',
              maxHeight: '90vh',
              objectFit: 'contain',
              borderRadius: 'var(--radius-md)',
            }}
            onClick={(e) => e.stopPropagation()}
          />

          {/* Next */}
          <button
            onClick={(e) => { e.stopPropagation(); nextImage(); }}
            style={{
              position: 'absolute',
              right: '20px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'rgba(255,255,255,0.1)',
              border: 'none',
              color: '#fff',
              fontSize: '2rem',
              cursor: 'pointer',
              zIndex: 10001,
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            aria-label="Next image"
          >
            &#8250;
          </button>

          {/* Counter */}
          <div
            style={{
              position: 'absolute',
              bottom: '20px',
              left: '50%',
              transform: 'translateX(-50%)',
              color: 'rgba(255,255,255,0.7)',
              fontFamily: 'var(--font-body)',
              fontSize: '0.875rem',
            }}
          >
            {lightbox + 1} / {galleryImages.length}
          </div>
        </div>
      )}
    </div>
  );
}
