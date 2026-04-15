import { useState } from 'react';
import emailjs from '@emailjs/browser';
import { Phone, FileText, Users, Package, Download, CheckCircle, X, Sparkles, Heart } from 'lucide-react';
import Button from '../components/Button';
import Section, { SectionHeader } from '../components/Section';
import { useContactModal } from '../components/ContactModal';

const services = [
  {
    icon: Phone,
    title: 'Free 15-Minute Consultation',
    description: "Not sure where to start? Let\u2019s talk. This free call is your chance to share what\u2019s going on, ask questions, and find out if we\u2019re a good fit - with no pressure or commitment.",
    features: [
      'Initial situation assessment',
      'Answer your immediate questions',
      'Discuss next steps',
    ],
    price: 'FREE',
    cta: 'Schedule Free Call',
    interest: 'free-consultation',
  },
  {
    icon: FileText,
    title: 'Consultations & Document Services',
    description: "Whether you need help understanding your child\u2019s IEP, preparing for an upcoming meeting, or reviewing an evaluation, I\u2019m here to help you make sense of it all.",
    features: [
      'Consultations starting at $125',
      'Document review starting at $125',
      'Document drafting starting at $100',
    ],
    price: null,
    cta: 'Request Consultation',
    interest: 'consultation',
  },
  {
    icon: Users,
    title: 'Meeting Attendance',
    description: "Walking into an IEP, eligibility, or transition meeting alone can feel overwhelming. I\u2019ll be there with you - either virtually or in person - so you never have to navigate it by yourself.",
    features: [
      'Virtual meetings starting at $150',
      'In-person meetings available in Central Virginia',
      'All fees include preparation time',
    ],
    price: null,
    cta: 'Learn More',
    interest: 'meeting-attendance',
  },
  {
    icon: Package,
    title: 'Support Packages',
    description: 'Need more than one service? Our packages bundle consultations, document reviews, and meeting attendance together so you get more support for less.',
    features: [
      'Getting Started - $225',
      'Meeting Ready - $300',
      'Eligibility - $475',
      'Full Support - starting at $650',
    ],
    price: null,
    cta: 'Find Out More',
    interest: 'packages',
    openPricingModal: true,
  },
];

// Service buttons link to Contact page with pre-selected interest

// EmailJS config
const EMAILJS_SERVICE_ID = 'service_2k6r2lq';
const EMAILJS_TEMPLATE_ID = 'template_s9o9i3x';
const EMAILJS_PUBLIC_KEY = 'l_JoXar5QscpqYAd3';

// Mailchimp subscribe via hidden iframe (JSONP endpoint deprecated)
const MC_U = 'f60b2d5f1904ee6928eb2c5dd';
const MC_ID = 'dfdac89c42';
const MC_POST_URL = `https://myaccessadvocacy.us19.list-manage.com/subscribe/post`;

function subscribeToMailchimp({ email, firstName, lastName }) {
  return new Promise((resolve) => {
    const iframeName = `mc_iframe_${Date.now()}`;
    const iframe = document.createElement('iframe');
    iframe.name = iframeName;
    iframe.style.display = 'none';
    document.body.appendChild(iframe);

    const form = document.createElement('form');
    form.method = 'POST';
    form.action = MC_POST_URL;
    form.target = iframeName;
    form.style.display = 'none';

    const fields = { u: MC_U, id: MC_ID, EMAIL: email, FNAME: firstName, LNAME: lastName };
    for (const [key, value] of Object.entries(fields)) {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = key;
      input.value = value;
      form.appendChild(input);
    }

    document.body.appendChild(form);
    form.submit();

    setTimeout(() => {
      iframe.remove();
      form.remove();
    }, 3000);

    resolve({ result: 'success' });
  });
}

function PricingGuideModal({ isOpen, onClose }) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const form = e.currentTarget;
    const firstName = form.firstName.value.trim();
    const lastName = form.lastName.value.trim();
    const email = form.email.value.trim();

    try {
      await subscribeToMailchimp({ email, firstName, lastName });
      setSubmitted(true);
      const siteUrl = window.location.origin;
      emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        to_email: email,
        first_name: firstName,
        download_link: `${siteUrl}/AEA-Services-and-Pricing-Guide.pdf`,
      }, EMAILJS_PUBLIC_KEY).catch(() => {});
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) {
    if (submitted) setSubmitted(false);
    if (error) setError(null);
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      <div
        className="relative bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 md:p-10"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full text-text-muted hover:bg-gray-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-4">
            <CheckCircle className="w-14 h-14 text-green-500 mx-auto mb-4" />
            <h3 className="font-heading text-2xl text-text-primary mb-2">You&apos;re all set!</h3>
            <p className="text-text-muted mb-6">
              Check your inbox for a copy of the guide. You can also download it right now:
            </p>
            <a
              href="/AEA-Services-and-Pricing-Guide.pdf"
              download
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent text-white font-medium hover:bg-[#b8854f] transition-colors"
            >
              <Download className="w-5 h-5" />
              Download Pricing Guide
            </a>
          </div>
        ) : (
          <>
            <div className="text-center mb-6">
              <div className="w-14 h-14 bg-accent/15 rounded-full flex items-center justify-center mx-auto mb-4">
                <Download className="w-7 h-7 text-accent" />
              </div>
              <h3 className="font-heading text-2xl text-text-primary mb-2">
                Get the Full Pricing Guide
              </h3>
              <p className="text-text-muted text-sm">
                Enter your info and we&apos;ll send our complete Services &amp; Pricing guide directly to your inbox.
              </p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="pg-firstName" className="block text-sm font-medium text-text-secondary mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="pg-firstName"
                    name="firstName"
                    required
                    className="w-full px-4 py-2.5 rounded-lg border border-border bg-white text-text-primary placeholder:text-text-muted/50 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-colors"
                    placeholder="First name"
                  />
                </div>
                <div>
                  <label htmlFor="pg-lastName" className="block text-sm font-medium text-text-secondary mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="pg-lastName"
                    name="lastName"
                    required
                    className="w-full px-4 py-2.5 rounded-lg border border-border bg-white text-text-primary placeholder:text-text-muted/50 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-colors"
                    placeholder="Last name"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="pg-email" className="block text-sm font-medium text-text-secondary mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="pg-email"
                  name="email"
                  required
                  className="w-full px-4 py-2.5 rounded-lg border border-border bg-white text-text-primary placeholder:text-text-muted/50 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-colors"
                  placeholder="you@example.com"
                />
              </div>
              {error && (
                <div className="flex items-start gap-2 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
                  <span className="shrink-0 mt-0.5">⚠️</span>
                  <span>{error}</span>
                </div>
              )}
              <button
                type="submit"
                disabled={loading}
                className="w-full px-6 py-3 rounded-full bg-accent text-white font-medium text-base hover:bg-[#b8854f] transition-colors disabled:opacity-60"
              >
                {loading ? 'Sending...' : 'Send Me the Guide'}
              </button>
              <p className="text-text-muted/50 text-xs text-center">No spam. Unsubscribe anytime.</p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

function SlidingScaleModal({ isOpen, onClose }) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.target);
    const firstName = formData.get('firstName');
    const lastName = formData.get('lastName');
    const email = formData.get('email');
    const familySize = formData.get('familySize');
    const householdIncome = formData.get('householdIncome');

    try {
      const response = await fetch('https://formsubmit.co/ajax/myaccessadvocacy@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          _subject: 'Sliding Scale Request',
          name: `${firstName} ${lastName}`,
          email,
          'Family Size': familySize,
          'Total Household Income': householdIncome,
        }),
      });

      if (!response.ok) throw new Error('Failed to send request');

      subscribeToMailchimp({ email, firstName, lastName });
      setSubmitted(true);
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) {
    if (submitted) setSubmitted(false);
    if (error) setError(null);
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      <div
        className="relative bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 md:p-10"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full text-text-muted hover:bg-gray-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-4">
            <CheckCircle className="w-14 h-14 text-green-500 mx-auto mb-4" />
            <h3 className="font-heading text-2xl text-text-primary mb-2">Request received!</h3>
            <p className="text-text-muted">I&apos;ll review your information and follow up with you personally within 1-2 business days.</p>
            <button
              onClick={onClose}
              className="mt-6 px-6 py-2.5 rounded-full bg-primary text-white font-medium hover:bg-primary-dark transition-colors"
            >
              Got it
            </button>
          </div>
        ) : (
          <>
            <div className="text-center mb-6">
              <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-heading text-2xl text-text-primary mb-2">
                Sliding Scale Request
              </h3>
              <p className="text-text-muted text-sm">
                Fill out the form below and I&apos;ll follow up with a customized services agreement based on your household information.
              </p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="ss-firstName" className="block text-sm font-medium text-text-secondary mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="ss-firstName"
                    name="firstName"
                    required
                    placeholder="First name"
                    className="w-full px-4 py-2.5 rounded-lg border border-border bg-white text-text-primary placeholder:text-text-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="ss-lastName" className="block text-sm font-medium text-text-secondary mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="ss-lastName"
                    name="lastName"
                    required
                    placeholder="Last name"
                    className="w-full px-4 py-2.5 rounded-lg border border-border bg-white text-text-primary placeholder:text-text-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="ss-email" className="block text-sm font-medium text-text-secondary mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="ss-email"
                  name="email"
                  required
                  placeholder="you@example.com"
                  className="w-full px-4 py-2.5 rounded-lg border border-border bg-white text-text-primary placeholder:text-text-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                />
              </div>
              <div>
                <label htmlFor="ss-familySize" className="block text-sm font-medium text-text-secondary mb-1">
                  Family Size
                </label>
                <select
                  id="ss-familySize"
                  name="familySize"
                  required
                  className="w-full px-4 py-2.5 rounded-lg border border-border bg-white text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                >
                  <option value="">Select family size</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7+">7+</option>
                </select>
              </div>
              <div>
                <label htmlFor="ss-income" className="block text-sm font-medium text-text-secondary mb-1">
                  Total Household Income
                </label>
                <select
                  id="ss-income"
                  name="householdIncome"
                  required
                  className="w-full px-4 py-2.5 rounded-lg border border-border bg-white text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                >
                  <option value="">Select income range</option>
                  <option value="Under $25,000">Under $25,000</option>
                  <option value="$25,000 - $35,000">$25,000 - $35,000</option>
                  <option value="$35,000 - $50,000">$35,000 - $50,000</option>
                  <option value="$50,000 - $65,000">$50,000 - $65,000</option>
                  <option value="$65,000 - $80,000">$65,000 - $80,000</option>
                  <option value="Over $80,000">Over $80,000</option>
                </select>
              </div>
              {error && (
                <p className="text-red-600 text-sm text-center">{error}</p>
              )}
              <button
                type="submit"
                disabled={loading}
                className="w-full px-6 py-3 rounded-full bg-primary text-white font-medium text-base hover:bg-primary-dark transition-colors disabled:opacity-60"
              >
                {loading ? 'Sending...' : 'Submit Request'}
              </button>
              <p className="text-text-muted/50 text-xs text-center">No documentation required. Self-reported.</p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default function Services() {
  const [showPricingModal, setShowPricingModal] = useState(false);
  const [showSlidingScaleModal, setShowSlidingScaleModal] = useState(false);
  const { openContactModal } = useContactModal();

  return (
    <>
      <PricingGuideModal isOpen={showPricingModal} onClose={() => setShowPricingModal(false)} />
      <SlidingScaleModal isOpen={showSlidingScaleModal} onClose={() => setShowSlidingScaleModal(false)} />

      <Section bg="secondary">
        <SectionHeader
          title="Services"
          subtitle="Comprehensive advocacy support tailored to your family's needs."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <div key={service.title} className="bg-bg-primary rounded-2xl p-8 border border-border-muted hover:shadow-lg transition-shadow flex flex-col">
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                <service.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-heading text-xl text-text-primary mb-3">{service.title}</h3>
              <p className="text-text-muted text-sm mb-4 leading-relaxed">{service.description}</p>
              <div className="mb-6">
                <p className="text-sm font-medium text-text-secondary mb-3">What&apos;s Included:</p>
                <ul className="space-y-2">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm text-text-muted">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-auto pt-4 border-t border-border-muted text-center">
                {service.price && (
                  <p className="font-heading text-primary mb-4">{service.price}</p>
                )}
                {service.openPricingModal ? (
                  <button
                    onClick={() => setShowPricingModal(true)}
                    className="w-full inline-flex items-center justify-center px-5 py-2.5 rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-white transition-colors font-medium text-sm"
                  >
                    {service.cta}
                  </button>
                ) : (
                  <Button variant="outline" className="w-full" onClick={() => openContactModal(service.interest)}>
                    {service.cta}
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Pricing Guide CTA */}
      <section className="relative py-10 md:py-14 overflow-hidden" style={{ background: 'linear-gradient(135deg, #C4956A 0%, #d4a87a 50%, #e0c4a0 100%)' }}>
        <div className="absolute -top-6 -left-6 w-32 h-32 bg-white/10 rounded-full" />
        <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-white/10 rounded-full" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
            <Download className="w-8 h-8 text-white" />
          </div>
          <h2 className="font-heading text-3xl md:text-4xl text-white mb-4 drop-shadow-sm">
            Get the Full Pricing Guide
          </h2>
          <p className="text-white/90 text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
            Want all the details? Get our complete Services &amp; Pricing guide sent directly to your inbox.
          </p>
          <button
            onClick={() => setShowPricingModal(true)}
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#2C4A6E] font-heading font-bold text-lg rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
          >
            <Sparkles className="w-5 h-5" />
            Send Me the Guide
          </button>
          <p className="text-white/60 text-sm mt-4 mb-8">Free. No spam, ever.</p>
          <div className="flex items-center justify-center gap-2 flex-wrap">
            <Heart className="w-4 h-4 text-white/70 shrink-0" />
            <p className="font-tagline text-white/70 text-sm">
              Sliding scale pricing is available for families who need it.
            </p>
            <button
              onClick={() => setShowSlidingScaleModal(true)}
              className="text-white/80 text-sm underline underline-offset-2 hover:text-white transition-colors"
            >
              Request here
            </button>
          </div>
        </div>
      </section>

      {/* Parent Education Callout */}
      <Section bg="primary">
        <div className="text-center">
          <p className="text-text-muted text-lg mb-6">
            Not ready for full advocacy? Just want to understand the process first?
          </p>
          <Button to="/parent-education" variant="outline" size="lg">
            Explore Parent Education
          </Button>
        </div>
      </Section>

      {/* Not Sure What You Need */}
      <Section bg="dark">
        <div className="text-center">
          <h2 className="font-heading text-3xl text-white mb-4">Not Sure What You Need?</h2>
          <p className="text-blue-100 mb-8 max-w-xl mx-auto">
            Every family&apos;s situation is unique. Schedule a free consultation and we&apos;ll figure out the best way I can help.
          </p>
          <Button variant="white" size="lg" onClick={() => openContactModal('free-consultation')}>
            Schedule Free Consultation
          </Button>
        </div>
      </Section>
    </>
  );
}
