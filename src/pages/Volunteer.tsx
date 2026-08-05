import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { submitVolunteerApplication } from '@/lib/publicForms';

gsap.registerPlugin(ScrollTrigger);

const interestAreas = [
  'Education',
  'Health',
  'Community Outreach',
  'Administration',
  'Event Planning',
];

const availabilityOptions = [
  'Full-time',
  'Part-time',
  'Weekends',
  'Flexible',
];

export default function Volunteer() {
  const heroRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    location: '',
    interests: [] as string[],
    skills: '',
    availability: '',
    message: '',
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (heroRef.current) {
        gsap.from('.volunteer-hero-animate > *', {
          opacity: 0, y: 30, stagger: 0.1, duration: 0.7, ease: 'power3.out',
        });
      }
      if (formRef.current) {
        gsap.from('.form-animate', {
          opacity: 0, y: 40, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: formRef.current, start: 'top 80%' },
        });
      }
    });
    return () => ctx.revert();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleInterestToggle = (area: string) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(area)
        ? prev.interests.filter((a) => a !== area)
        : [...prev.interests, area],
    }));
  };

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await submitVolunteerApplication(formData);
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit application. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

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
        <div className="volunteer-hero-animate container-narrow">
          <h1
            style={{
              fontSize: 'clamp(3rem, 8vw, 7rem)',
              lineHeight: 0.95,
              letterSpacing: '-0.02em',
              color: 'var(--color-text-primary)',
              marginBottom: 'var(--space-md)',
            }}
          >
            Join Us as a Volunteer
          </h1>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(1.125rem, 1.5vw, 1.375rem)',
              lineHeight: 1.6,
              color: 'var(--color-text-secondary)',
            }}
          >
            Be part of a movement that is transforming lives across Tanzania. By sharing your time, skills, and passion, you can help create lasting change in the communities we serve. Complete the form below and begin your journey of making a meaningful difference with DREFO.
          </p>
        </div>
      </section>

      {/* Form */}
      <section
        ref={formRef}
        style={{
          padding: '0 var(--space-md) var(--space-xl)',
          backgroundColor: 'var(--color-bg-primary)',
        }}
      >
        <div className="form-animate" style={{ maxWidth: '600px', margin: '0 auto' }}>
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
                Thank You!
              </h3>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '1rem',
                  color: 'var(--color-text-secondary)',
                  lineHeight: 1.6,
                }}
              >
                Your volunteer application has been submitted successfully. We will review your information and contact you soon with next steps.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
              {/* Full Name */}
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
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
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
                  Email Address
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

              {/* Phone */}
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
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
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

              {/* Location */}
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
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  placeholder="City, Country"
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

              {/* Areas of Interest */}
              <div>
                <label
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-body)',
                    fontWeight: 500,
                    fontSize: '0.875rem',
                    color: 'var(--color-text-primary)',
                    marginBottom: '10px',
                  }}
                >
                  Areas of Interest
                </label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                  {interestAreas.map((area) => (
                    <button
                      key={area}
                      type="button"
                      onClick={() => handleInterestToggle(area)}
                      style={{
                        padding: '8px 16px',
                        borderRadius: 'var(--radius-sm)',
                        border: '1.5px solid',
                        borderColor: formData.interests.includes(area) ? 'var(--color-accent)' : 'var(--color-border)',
                        backgroundColor: formData.interests.includes(area) ? 'rgba(217,119,6,0.1)' : 'var(--color-bg-secondary)',
                        color: formData.interests.includes(area) ? 'var(--color-accent)' : 'var(--color-text-primary)',
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.875rem',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      {area}
                    </button>
                  ))}
                </div>
              </div>

              {/* Skills */}
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
                  Skills & Experience
                </label>
                <textarea
                  name="skills"
                  value={formData.skills}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Tell us about your skills, experience, and what you can bring to DREFO..."
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

              {/* Availability */}
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
                  Availability
                </label>
                <select
                  name="availability"
                  value={formData.availability}
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
                  <option value="">Select your availability</option>
                  {availabilityOptions.map((opt) => (
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
                  rows={4}
                  placeholder="Why do you want to volunteer with DREFO? Any questions?"
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
                {submitting ? 'Submitting...' : 'Submit Application'}
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
