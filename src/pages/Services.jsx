import { useState } from 'react';
import { Phone, FileText, Users, Package, ArrowRight, Download, CheckCircle } from 'lucide-react';
import Button from '../components/Button';
import Section, { SectionHeader } from '../components/Section';

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
    cta: 'View Packages',
    interest: 'packages',
  },
];

// Service buttons link to Contact page with pre-selected interest

function PricingGuideForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // TODO: Wire up email delivery + contact list integration
    // For now, simulate submission
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1000);
  };

  if (submitted) {
    return (
      <div className="text-center py-8">
        <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
        <h3 className="font-heading text-xl text-text-primary mb-2">Check Your Inbox!</h3>
        <p className="text-text-muted">
          Your pricing guide is on its way. If you don&apos;t see it in a few minutes, check your spam folder.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-text-secondary mb-1">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            required
            className="w-full px-4 py-2.5 rounded-lg border border-border bg-bg-primary text-text-primary placeholder:text-text-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
            placeholder="First name"
          />
        </div>
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-text-secondary mb-1">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            required
            className="w-full px-4 py-2.5 rounded-lg border border-border bg-bg-primary text-text-primary placeholder:text-text-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
            placeholder="Last name"
          />
        </div>
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-text-secondary mb-1">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className="w-full px-4 py-2.5 rounded-lg border border-border bg-bg-primary text-text-primary placeholder:text-text-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
          placeholder="you@example.com"
        />
      </div>
      <Button type="submit" variant="primary" size="lg" className="w-full" disabled={loading}>
        {loading ? 'Sending...' : 'Send Me the Guide'}
        {!loading && <Download className="w-5 h-5" />}
      </Button>
    </form>
  );
}

export default function Services() {
  return (
    <>
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
              <div className="mt-auto pt-4 border-t border-border-muted">
                {service.price && (
                  <p className="font-heading text-primary mb-4">{service.price}</p>
                )}
                <Button to={`/contact?interest=${service.interest}`} variant="outline" className="w-full">
                  {service.cta}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Parent Education Callout */}
      <Section bg="primary">
        <div className="text-center">
          <p className="text-text-muted text-lg mb-6">
            Not ready for full advocacy? Just want to understand the process first?
          </p>
          <Button to="/parent-education" variant="outline" size="lg">
            Explore Parent Education
            <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
      </Section>

      {/* Gated Pricing Guide Download */}
      <Section bg="muted">
        <div className="max-w-2xl mx-auto text-center">
          <Download className="w-10 h-10 text-primary mx-auto mb-4" />
          <h2 className="font-heading text-3xl text-text-primary mb-3">
            Get the Full Pricing Guide
          </h2>
          <p className="text-text-muted mb-8">
            Enter your information below and we&apos;ll send our complete Services &amp; Pricing guide directly to your inbox.
          </p>
          <PricingGuideForm />
        </div>
      </Section>

      {/* Not Sure What You Need — kept as-is */}
      <Section bg="dark">
        <div className="text-center">
          <h2 className="font-heading text-3xl text-white mb-4">Not Sure What You Need?</h2>
          <p className="text-blue-100 mb-8 max-w-xl mx-auto">
            Every family&apos;s situation is unique. Schedule a free consultation and we&apos;ll figure out the best way I can help.
          </p>
          <Button to="/contact?interest=free-consultation" variant="white" size="lg">
            Schedule Free Consultation
            <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
      </Section>
    </>
  );
}
