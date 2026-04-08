import { useState } from 'react';
import { FileText, BookOpen, Shield, Mail, Layers, CheckCircle, Download, Lock, X, Sparkles } from 'lucide-react';
import Button from '../components/Button';
import Section, { SectionHeader } from '../components/Section';

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
const MC_ACTION = `https://myaccessadvocacy.us19.list-manage.com/subscribe/post-json?u=${MC_U}&id=${MC_ID}`;

function subscribeToMailchimp({ email, firstName, lastName }) {
  return new Promise((resolve, reject) => {
    const callbackName = `mc_callback_${Date.now()}`;
    const script = document.createElement('script');
    const timeout = setTimeout(() => {
      cleanup();
      reject(new Error('Request timed out. Please try again.'));
    }, 10000);

    function cleanup() {
      clearTimeout(timeout);
      delete window[callbackName];
      if (script.parentNode) script.parentNode.removeChild(script);
    }

    window[callbackName] = (data) => {
      cleanup();
      if (data.result === 'success') {
        resolve(data);
      } else {
        const msg = data.msg
          ? data.msg.replace(/<[^>]+>/g, '').replace(/^\d+ - /, '').trim()
          : 'Something went wrong. Please try again.';
        if (msg.toLowerCase().includes('already subscribed')) {
          resolve({ result: 'success', msg });
        } else {
          reject(new Error(msg));
        }
      }
    };

    const params = new URLSearchParams({
      u: MC_U,
      id: MC_ID,
      c: callbackName,
      FNAME: firstName,
      LNAME: lastName,
      EMAIL: email,
    });

    script.src = `${MC_ACTION}&${params.toString()}`;
    script.onerror = () => {
      cleanup();
      reject(new Error('Network error. Please try again.'));
    };
    document.body.appendChild(script);
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
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

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
            <p className="text-text-muted">Check your email for access details.</p>
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

      {/* Hero */}
      <Section bg="secondary" className="!py-8 md:!py-10 !pb-0">
        <SectionHeader
          title="Resource Library"
          subtitle="Free tools and guides to help you navigate the special education process with confidence."
        />
      </Section>

      {/* Instant Download Resources */}
      <Section bg="primary">
        <SectionHeader
          title="Instant Downloads"
          subtitle="No sign-up needed. Click any guide to download it right now."
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
        {/* Bottom row — 2 cards, centered */}
        <div className="grid md:grid-cols-2 gap-6 max-w-[calc(66.666%+0.75rem)] mx-auto">
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
        </div>
      </Section>

      {/* Unlock Full Library CTA */}
      <section className="relative py-16 md:py-24 overflow-hidden" style={{ background: 'linear-gradient(135deg, #C4956A 0%, #d4a87a 40%, #e0c4a0 100%)' }}>
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full translate-x-1/3 translate-y-1/3" />

        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
            <Lock className="w-8 h-8 text-white" />
          </div>
          <h2 className="font-heading text-3xl md:text-5xl text-white mb-4 drop-shadow-sm">
            Unlock the Full Resource Library
          </h2>
          <p className="text-white/90 text-lg md:text-xl max-w-2xl mx-auto mb-8 leading-relaxed">
            Get access to our growing collection of parent guides, checklists, and tools — delivered straight to your inbox.
          </p>
          <button
            onClick={() => setShowModal(true)}
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#2C4A6E] font-heading font-bold text-lg rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
          >
            <Sparkles className="w-5 h-5" />
            Get Free Access
          </button>
          <p className="text-white/60 text-sm mt-4">Takes 10 seconds. No spam, ever.</p>
        </div>
      </section>

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
