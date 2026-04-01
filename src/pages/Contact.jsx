import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, CheckCircle, Send } from 'lucide-react';
import Section, { SectionHeader } from '../components/Section';

const SERVICE_OPTIONS = [
  { value: '', label: 'Select one...' },
  { value: 'free-consultation', label: 'Free 15-Minute Consultation' },
  { value: 'consultation-documents', label: 'Consultation & Document Services' },
  { value: 'meeting-attendance', label: 'Meeting Attendance' },
  { value: 'support-package', label: 'Support Package' },
  { value: 'parent-education', label: 'Parent Education Session' },
  { value: 'other', label: 'Something else' },
];

// Map URL ?interest= param to dropdown values
const INTEREST_MAP = {
  'free-consultation': 'free-consultation',
  'consultation': 'consultation-documents',
  'meeting-attendance': 'meeting-attendance',
  'packages': 'support-package',
  'parent-education': 'parent-education',
  'learn-more': 'other',
};

export default function Contact() {
  const [searchParams] = useSearchParams();
  const interestParam = searchParams.get('interest') || '';
  const initialInterest = INTEREST_MAP[interestParam] || '';

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [interest, setInterest] = useState(initialInterest);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.target);

    // Map the interest value to a readable label for the email
    const interestLabel = SERVICE_OPTIONS.find(o => o.value === formData.get('interest'))?.label || 'Not specified';
    formData.set('_interest_label', interestLabel);

    try {
      const response = await fetch('https://formsubmit.co/ajax/myaccessadvocacy@gmail.com', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setLoading(false);
        setSubmitted(true);
      } else {
        throw new Error('Form submission failed');
      }
    } catch {
      setLoading(false);
      setError('Something went wrong. Please try again or email us directly at myaccessadvocacy@gmail.com.');
    }
  };

  return (
    <>
      <Section bg="secondary">
        <SectionHeader
          title="Get In Touch"
          subtitle="Ready to take the next step? Tell us a little about your situation and we'll follow up with the right next step for your family."
        />

        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <h3 className="font-heading text-2xl text-text-primary mb-6">Let&apos;s Connect</h3>
            <p className="text-text-muted mb-8">
              Fill out the form and I&apos;ll get back to you within one business day.
              If you&apos;d prefer to reach out directly, my contact info is right here.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-heading text-text-primary mb-1">Phone</h4>
                  <a href="tel:804-420-2273" className="text-primary hover:underline">(804) 420-2273</a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-heading text-text-primary mb-1">Email</h4>
                  <a href="mailto:myaccessadvocacy@gmail.com" className="text-primary hover:underline">myaccessadvocacy@gmail.com</a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-heading text-text-primary mb-1">Service Area</h4>
                  <p className="text-text-muted">Serving families virtually nationwide</p>
                  <p className="text-sm text-text-muted">Specialized expertise in Virginia &amp; Illinois. In-person services in Central Virginia.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-heading text-text-primary mb-1">Availability</h4>
                  <p className="text-text-muted">Monday - Friday: 9am - 5pm</p>
                  <p className="text-sm text-text-muted">Evening appointments available upon request</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-bg-primary rounded-2xl p-8 border border-border-muted">
            {submitted ? (
              <div className="text-center py-12">
                <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h3 className="font-heading text-xl text-text-primary mb-2">Message Sent!</h3>
                <p className="text-text-muted">
                  Thank you for reaching out. I&apos;ll get back to you within one business day.
                </p>
              </div>
            ) : (
              <>
                <h3 className="font-heading text-xl text-text-primary mb-6">How Can I Help?</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input type="hidden" name="_subject" value="New Inquiry from Access Educational Advocacy Website" />
                  <input type="hidden" name="_template" value="table" />
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-text-primary mb-2">First Name *</label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        required
                        className="w-full px-4 py-3 rounded-xl border border-border-muted bg-bg-secondary focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                        placeholder="First name"
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-text-primary mb-2">Last Name *</label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        required
                        className="w-full px-4 py-3 rounded-xl border border-border-muted bg-bg-secondary focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                        placeholder="Last name"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-text-primary mb-2">Email *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-border-muted bg-bg-secondary focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                      placeholder="you@example.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-text-primary mb-2">Phone (optional)</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      className="w-full px-4 py-3 rounded-xl border border-border-muted bg-bg-secondary focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                      placeholder="(804) 555-1234"
                    />
                  </div>
                  <div>
                    <label htmlFor="interest" className="block text-sm font-medium text-text-primary mb-2">I&apos;m interested in *</label>
                    <select
                      id="interest"
                      name="interest"
                      required
                      value={interest}
                      onChange={(e) => setInterest(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-border-muted bg-bg-secondary focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary text-text-primary"
                    >
                      {SERVICE_OPTIONS.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-text-primary mb-2">Tell me a little about your situation (optional)</label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl border border-border-muted bg-bg-secondary focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary resize-none"
                      placeholder="What's going on with your child's education? Any upcoming meetings or concerns?"
                    />
                  </div>
                  {error && (
                    <p className="text-red-600 text-sm">{error}</p>
                  )}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 bg-primary text-white rounded-full font-medium hover:bg-primary-dark transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {loading ? 'Sending...' : 'Send Message'}
                    {!loading && <Send className="w-4 h-4" />}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </Section>
    </>
  );
}
