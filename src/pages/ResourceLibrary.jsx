import { useState } from 'react';
import emailjs from '@emailjs/browser';
import { FileText, BookOpen, Shield, Mail, Layers, CheckCircle, Download, Lock, X, Sparkles } from 'lucide-react';
import Button from '../components/Button';
import Section, { SectionHeader } from '../components/Section';

// EmailJS config — same service as Services page, new template for resource library
const EMAILJS_SERVICE_ID = 'service_2k6r2lq';
const EMAILJS_TEMPLATE_ID = 'template_6p9u1sp';
const EMAILJS_PUBLIC_KEY = 'l_JoXar5QscpqYAd3';

const resources = [
  {
    icon: FileText,
    title: 'IEP vs 504: What\'s the Difference?',
    description:
      'A side-by-side comparison of both plans — who qualifies, what\'s included, and what law governs each. Perfect if you\'re trying to understand which plan is right for your child.',
    filename: 'iep-vs-504',
  },
  {
    icon: BookOpen,
    title: 'Know The Terms: Special Education Glossary',
    description:
      'Special education comes with a lot of acronyms and jargon. This two-page glossary covers the terms you\'re most likely to hear in meetings and see in documents.',
    filename: 'special-education-glossary',
  },
  {
    icon: Shield,
    title: 'Know Your Rights: Procedural Safeguards Summary',
    description:
      'Every parent has rights under IDEA. This summary breaks down exactly what those rights are so you can walk into any meeting informed and prepared.',
    filename: 'procedural-safeguards-summary',
  },
  {
    icon: Mail,
    title: 'What Is a PWN?',
    description:
      'Most parents have no idea what a Prior Written Notice is or why it matters. This guide explains what it is, when the school must send one, and what to do when you receive one.',
    filename: 'what-is-a-pwn',
  },
  {
    icon: Layers,
    title: 'Accommodations vs Modifications: What\'s the Difference?',
    description:
      'Two words that sound similar but mean very different things for your child\'s education. This guide breaks down the distinction.',
    filename: 'accommodations-vs-modifications',
  },
];

// Mailchimp config — same list as Services page
const MC_U = 'f60b2d5f1904ee6928eb2c5dd';
const MC_ID = 'dfdac89c42';
const MC_POST_URL = `https://myaccessadvocacy.us19.list-manage.com/subscribe/post`;

function subscribeToMailchimp({ email, firstName, lastName }) {
  return new Promise((resolve) => {
    // Submit via hidden iframe (Mailchimp's JSONP endpoint is deprecated)
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

    // Clean up after a short delay -- we can't read the iframe response (cross-origin)
    // but the subscription goes through
    setTimeout(() => {
      iframe.remove();
      form.remove();
    }, 3000);

    resolve({ result: 'success' });
  });
}

function SignupModal({ isOpen, onClose }) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const formData = new FormData(e.target);
    const firstName = formData.get('firstName');
    const lastName = formData.get('lastName');
    const email = formData.get('email');

    try {
      await subscribeToMailchimp({ email, firstName, lastName });
      setSubmitted(true);
      // Send welcome email in background — don't block signup on email delivery
      const siteUrl = window.location.origin;
      emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        to_email: email,
        first_name: firstName,
        library_link: `${siteUrl}/full-library`,
      }, EMAILJS_PUBLIC_KEY).catch(() => {});
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Reset state when modal is closed so it's fresh next time
  if (!isOpen) {
    if (submitted) setSubmitted(false);
    if (error) setError('');
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      {/* Modal */}
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
            <h3 className="font-heading text-2xl text-text-primary mb-2">You&apos;re in!</h3>
            <p className="text-text-muted mb-4">Here&apos;s your password to access the full library:</p>
            <div className="bg-bg-muted rounded-xl px-6 py-3 mb-4 inline-block">
              <span className="font-heading text-2xl text-primary tracking-widest select-all">access</span>
            </div>
            <p className="text-text-muted/60 text-sm mb-6">We&apos;ve also sent this to your email.</p>
            <a
              href="/full-library"
              className="inline-flex px-6 py-2.5 rounded-full bg-accent text-white font-medium hover:bg-[#b8854f] transition-colors"
            >
              Go to Full Library
            </a>
          </div>
        ) : (
          <>
            <div className="text-center mb-6">
              <div className="w-14 h-14 bg-accent/15 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-7 h-7 text-accent" />
              </div>
              <h3 className="font-heading text-2xl text-text-primary mb-2">
                Get Full Access
              </h3>
              <p className="text-text-muted text-sm">
                Enter your info and we&apos;ll send you instant access to the full resource library.
              </p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="modal-firstName" className="block text-sm font-medium text-text-secondary mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="modal-firstName"
                    name="firstName"
                    required
                    placeholder="First name"
                    className="w-full px-4 py-2.5 rounded-lg border border-border bg-white text-text-primary placeholder:text-text-muted/50 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="modal-lastName" className="block text-sm font-medium text-text-secondary mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="modal-lastName"
                    name="lastName"
                    required
                    placeholder="Last name"
                    className="w-full px-4 py-2.5 rounded-lg border border-border bg-white text-text-primary placeholder:text-text-muted/50 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-colors"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="modal-email" className="block text-sm font-medium text-text-secondary mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="modal-email"
                  name="email"
                  required
                  placeholder="you@example.com"
                  className="w-full px-4 py-2.5 rounded-lg border border-border bg-white text-text-primary placeholder:text-text-muted/50 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-colors"
                />
              </div>
              {error && (
                <p className="text-red-600 text-sm text-center">{error}</p>
              )}
              <button
                type="submit"
                disabled={loading}
                className="w-full px-6 py-3 rounded-full bg-accent text-white font-medium text-base hover:bg-[#b8854f] transition-colors disabled:opacity-60"
              >
                {loading ? 'Sending...' : 'Send Me Access'}
              </button>
              <p className="text-text-muted/50 text-xs text-center">No spam. Unsubscribe anytime.</p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default function ResourceLibrary() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <SignupModal isOpen={showModal} onClose={() => setShowModal(false)} />

      {/* Resource Library + Instant Downloads — single section */}
      <Section bg="primary">
        <SectionHeader
          title="Resource Library"
          subtitle="Free tools and guides to help you navigate the special education process with confidence."
        />

        {/* Top row — 3 cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {resources.slice(0, 3).map((resource) => (
            <div
              key={resource.filename}
              className="bg-bg-primary rounded-2xl p-8 border-2 border-primary/20 hover:border-primary/40 hover:shadow-lg transition-all flex flex-col"
            >
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                <resource.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-heading text-xl text-text-primary mb-3">{resource.title}</h3>
              <p className="text-text-muted text-sm mb-6 leading-relaxed flex-grow">{resource.description}</p>
              <div className="pt-4 border-t border-border-muted">
                <a
                  href={`/resources/${resource.filename}.pdf`}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 font-medium rounded-full transition-colors duration-200 bg-primary text-white hover:bg-primary-dark px-5 py-2.5 text-sm w-full"
                >
                  <Download className="w-4 h-4" />
                  Download Now
                </a>
              </div>
            </div>
          ))}
        </div>
        {/* Bottom row — 2 resource cards + unlock CTA card */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.slice(3).map((resource) => (
            <div
              key={resource.filename}
              className="bg-bg-primary rounded-2xl p-8 border-2 border-primary/20 hover:border-primary/40 hover:shadow-lg transition-all flex flex-col"
            >
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                <resource.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-heading text-xl text-text-primary mb-3">{resource.title}</h3>
              <p className="text-text-muted text-sm mb-6 leading-relaxed flex-grow">{resource.description}</p>
              <div className="pt-4 border-t border-border-muted">
                <a
                  href={`/resources/${resource.filename}.pdf`}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 font-medium rounded-full transition-colors duration-200 bg-primary text-white hover:bg-primary-dark px-5 py-2.5 text-sm w-full"
                >
                  <Download className="w-4 h-4" />
                  Download Now
                </a>
              </div>
            </div>
          ))}

          {/* Unlock Full Library — CTA card */}
          <div
            className="relative rounded-2xl p-8 flex flex-col overflow-hidden border-2 border-accent/40 shadow-lg hover:shadow-xl transition-all duration-200"
            style={{ background: 'linear-gradient(135deg, #C4956A 0%, #d4a87a 50%, #e0c4a0 100%)' }}
          >
            {/* Decorative circles */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-white/10 rounded-full" />
            <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-white/10 rounded-full" />

            <div className="relative flex flex-col h-full text-center">
              <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
                <Lock className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-heading text-xl text-white mb-3">
                Unlock the Full Library
              </h3>
              <p className="text-white/85 text-sm mb-6 leading-relaxed flex-grow">
                Get access to our growing collection of guides, checklists, and tools — delivered straight to your inbox.
              </p>
              <div className="pt-4 border-t border-white/20 space-y-2">
                <button
                  onClick={() => setShowModal(true)}
                  className="inline-flex items-center justify-center gap-2 font-medium rounded-full bg-white text-[#2C4A6E] px-5 py-2.5 text-sm w-full hover:bg-white/90 transition-colors cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  Get Free Access
                </button>
                <a
                  href="/full-library"
                  className="inline-flex items-center justify-center gap-2 font-medium rounded-full border-2 border-white/60 text-white px-5 py-2.5 text-sm w-full hover:bg-white/10 transition-colors"
                >
                  Log In to Library
                </a>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Bottom CTA — dark navy */}
      <section className="py-10 md:py-16 bg-[#1a2744]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-3xl md:text-4xl text-white mb-4">
            Have a Question About Your Child&apos;s IEP?
          </h2>
          <p className="text-blue-100 text-lg max-w-xl mx-auto mb-8">
            These resources are a starting point. If you need personalized support, I&apos;m here.
          </p>
          <Button
            href="https://docs.google.com/forms/d/e/1FAIpQLSeCZBm-Vppz8ReNgpLqQU9xA9kAUPihWj_-2gqSQ1AbtUCrCg/viewform?usp=header"
            variant="white"
            size="lg"
          >
            Schedule a Free Consultation
          </Button>
        </div>
      </section>
    </>
  );
}
