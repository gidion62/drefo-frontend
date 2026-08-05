import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { submitContactForm } from '@/lib/publicForms';

gsap.registerPlugin(ScrollTrigger);

const subjectOptions = [
  'General Inquiry',
  'Partnership',
  'Donation',
  'Media',
  'Other',
];

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (sectionRef.current) {
        gsap.from('.contact-animate', {
          opacity: 0, y: 40, stagger: 0.1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        });
      }
    });
    return () => ctx.revert();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await submitContactForm(formData);
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send message. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <section
        ref={sectionRef}
        style={{
          padding: 'var(--space-xl) var(--space-md)',
          backgroundColor: 'var(--color-bg-primary)',
        }}
      >
        <div
          className="container-main contact-animate"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 350px), 1fr))',
            gap: 'var(--space-xl)',
            alignItems: 'start',
          }}
        >
          {/* Left - Contact Info */}
          <div>
            <h2
              style={{
                fontSize: 'clamp(2rem, 5vw, 4.5rem)',
                lineHeight: 1.0,
                letterSpacing: '-0.015em',
                color: 'var(--color-text-primary)',
                marginBottom: 'var(--space-md)',
              }}
            >
              Get in Touch
            </h2>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '1rem',
                lineHeight: 1.6,
                color: 'var(--color-text-secondary)',
                marginBottom: 'var(--space-lg)',
              }}
            >
              Together, we can create lasting change. Whether you're interested in partnering with us, supporting our mission through a donation, volunteering your time, or simply learning more about our work, we'd love to hear from you. Every conversation, contribution, and collaboration helps bring hope and opportunity to communities across Tanzania.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
              {/* Address */}
              <div>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    color: 'var(--color-accent)',
                    marginBottom: '4px',
                  }}
                >
                  Address
                </p>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '1rem',
                    color: 'var(--color-text-primary)',
                    lineHeight: 1.5,
                  }}
                >
                  DREFO Office<br />
                  Moshi, Kilimanjaro<br />
                  Tanzania
                </p>
              </div>

              {/* Phone */}
              <div>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    color: 'var(--color-accent)',
                    marginBottom: '4px',
                  }}
                >
                  Phone
                </p>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '1rem',
                    color: 'var(--color-text-primary)',
                  }}
                >
                  +255 712 849 218
                </p>
              </div>

              {/* Email */}
              <div>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    color: 'var(--color-accent)',
                    marginBottom: '4px',
                  }}
                >
                  Email
                </p>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '1rem',
                    color: 'var(--color-text-primary)',
                  }}
                >
                  info@drefo.org
                </p>
              </div>
            </div>

            {/* Partnership CTA */}
            <div
              style={{
                marginTop: 'var(--space-lg)',
                padding: 'var(--space-md)',
                backgroundColor: 'var(--color-bg-secondary)',
                borderRadius: 'var(--radius-md)',
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.9375rem',
                  color: 'var(--color-text-primary)',
                  marginBottom: '8px',
                }}
              >
                Interested in partnering with us?we would love that.
              </p>
              <a
                href="mailto:info@drefo.org"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.875rem',
                  color: 'var(--color-accent)',
                  fontWeight: 600,
                  textDecoration: 'none',
                }}
              >
                Send us an email -
              </a>
            </div>
          </div>

          {/* Right - Contact Form */}
          <div>
            {submitted ? (
              <div
                style={{
                  backgroundColor: 'var(--color-bg-secondary)',
                  borderRadius: 'var(--radius-lg)',
                  padding: 'var(--space-lg)',
                  textAlign: 'center',
                }}
              >
                <h3
                  style={{
                    fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
                    color: 'var(--color-text-primary)',
                    marginBottom: 'var(--space-sm)',
                  }}
                >
                  Message Sent!
                </h3>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '1rem',
                    color: 'var(--color-text-secondary)',
                    lineHeight: 1.6,
                  }}
                >
                  Thank you for reaching out. We have received your message and will get back to you as soon as possible.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'var(--space-md)',
                }}
              >
                {/* Name */}
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontFamily: 'var(--font-body)',
                      fontWeight: 500,
                      fontSize: '0.875rem',
                      color: 'var(--color-text-primary)',
                      marginBottom: '6px',
                    }}
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      backgroundColor: 'var(--color-bg-secondary)',
                      border: '1px solid var(--color-border)',
                      borderRadius: 'var(--radius-sm)',
                      fontFamily: 'var(--font-body)',
                      fontSize: '1rem',
                      outline: 'none',
                      transition: 'border-color 0.3s, box-shadow 0.3s',
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = 'var(--color-accent)';
                      e.currentTarget.style.boxShadow = '0 0 0 3px rgba(217,119,6,0.15)';
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = 'var(--color-border)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontFamily: 'var(--font-body)',
                      fontWeight: 500,
                      fontSize: '0.875rem',
                      color: 'var(--color-text-primary)',
                      marginBottom: '6px',
                    }}
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      backgroundColor: 'var(--color-bg-secondary)',
                      border: '1px solid var(--color-border)',
                      borderRadius: 'var(--radius-sm)',
                      fontFamily: 'var(--font-body)',
                      fontSize: '1rem',
                      outline: 'none',
                      transition: 'border-color 0.3s, box-shadow 0.3s',
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = 'var(--color-accent)';
                      e.currentTarget.style.boxShadow = '0 0 0 3px rgba(217,119,6,0.15)';
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = 'var(--color-border)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  />
                </div>

                {/* Subject */}
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontFamily: 'var(--font-body)',
                      fontWeight: 500,
                      fontSize: '0.875rem',
                      color: 'var(--color-text-primary)',
                      marginBottom: '6px',
                    }}
                  >
                    Subject
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      backgroundColor: 'var(--color-bg-secondary)',
                      border: '1px solid var(--color-border)',
                      borderRadius: 'var(--radius-sm)',
                      fontFamily: 'var(--font-body)',
                      fontSize: '1rem',
                      outline: 'none',
                      cursor: 'pointer',
                      transition: 'border-color 0.3s, box-shadow 0.3s',
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = 'var(--color-accent)';
                      e.currentTarget.style.boxShadow = '0 0 0 3px rgba(217,119,6,0.15)';
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = 'var(--color-border)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <option value="">Select a subject</option>
                    {subjectOptions.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontFamily: 'var(--font-body)',
                      fontWeight: 500,
                      fontSize: '0.875rem',
                      color: 'var(--color-text-primary)',
                      marginBottom: '6px',
                    }}
                  >
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    required
                    placeholder="How can we help you?"
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      backgroundColor: 'var(--color-bg-secondary)',
                      border: '1px solid var(--color-border)',
                      borderRadius: 'var(--radius-sm)',
                      fontFamily: 'var(--font-body)',
                      fontSize: '1rem',
                      outline: 'none',
                      resize: 'vertical',
                      transition: 'border-color 0.3s, box-shadow 0.3s',
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = 'var(--color-accent)';
                      e.currentTarget.style.boxShadow = '0 0 0 3px rgba(217,119,6,0.15)';
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = 'var(--color-border)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  />
                </div>

                {/* Submit */}
                {error && (
                  <p style={{ color: '#dc2626', fontSize: '0.9rem', margin: 0 }}>{error}</p>
                )}
                <button
                  type="submit"
                  className="btn-filled"
                  disabled={submitting}
                  style={{ width: '100%', padding: '16px', opacity: submitting ? 0.7 : 1 }}
                >
                  {submitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
