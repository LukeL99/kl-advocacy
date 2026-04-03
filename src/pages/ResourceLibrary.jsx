import { useState } from 'react';
import { FileText, BookOpen, Shield, Mail, Layers, CheckCircle, Download, ArrowRight } from 'lucide-react';
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

function SignupForm() {
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

  if (submitted) {
    return (
      <div className="text-center py-8">
        <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
        <h3 className="font-heading text-xl text-text-primary mb-2">Thank you!</h3>
        <p className="text-text-muted">Check your email for access details.</p>
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
            placeholder="First name"
            className="w-full px-4 py-2.5 rounded-lg border border-border bg-bg-primary text-text-primary placeholder:text-text-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
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
            placeholder="Last name"
            className="w-full px-4 py-2.5 rounded-lg border border-border bg-bg-primary text-text-primary placeholder:text-text-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
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
          placeholder="you@example.com"
          className="w-full px-4 py-2.5 rounded-lg border border-border bg-bg-primary text-text-primary placeholder:text-text-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
        />
      </div>
      {error && (
        <p className="text-red-600 text-sm text-center">{error}</p>
      )}
      <Button type="submit" variant="primary" size="lg" className="w-full" disabled={loading}>
        {loading ? 'Sending...' : 'Send Me Access →'}
      </Button>
    </form>
  );
}

export default function ResourceLibrary() {
  return (
    <>
      {/* Hero */}
      <Section bg="secondary" className="!py-8 md:!py-10 !pb-0">
        <SectionHeader
          title="Resource Library"
          subtitle="Free tools and guides to help you navigate the special education process with confidence."
        />
      </Section>

      {/* Free Resources Grid */}
      <Section bg="primary">
        <SectionHeader
          title="Free Parent Resources"
          subtitle="Download any of these guides at no cost — no email required. Just click, save, and use them."
        />

        {/* Top row — 3 cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {resources.slice(0, 3).map((resource) => (
            <div
              key={resource.filename}
              className="bg-bg-primary rounded-2xl p-8 border border-border-muted hover:shadow-lg transition-shadow flex flex-col relative"
            >
              <span className="absolute top-4 right-4 inline-flex items-center gap-1 px-2.5 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                <CheckCircle className="w-3 h-3" /> FREE
              </span>
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                <resource.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-heading text-xl text-text-primary mb-3">{resource.title}</h3>
              <p className="text-text-muted text-sm mb-6 leading-relaxed flex-grow">{resource.description}</p>
              <div className="pt-4 border-t border-border-muted">
                <Button
                  href={`/resources/${resource.filename}.pdf`}
                  variant="outline"
                  className="w-full"
                >
                  <Download className="w-4 h-4" />
                  Download Free Guide
                </Button>
              </div>
            </div>
          ))}
        </div>
        {/* Bottom row — 2 cards, centered */}
        <div className="grid md:grid-cols-2 gap-6 max-w-[calc(66.666%+0.75rem)] mx-auto">
          {resources.slice(3).map((resource) => (
            <div
              key={resource.filename}
              className="bg-bg-primary rounded-2xl p-8 border border-border-muted hover:shadow-lg transition-shadow flex flex-col relative"
            >
              <span className="absolute top-4 right-4 inline-flex items-center gap-1 px-2.5 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                <CheckCircle className="w-3 h-3" /> FREE
              </span>
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                <resource.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-heading text-xl text-text-primary mb-3">{resource.title}</h3>
              <p className="text-text-muted text-sm mb-6 leading-relaxed flex-grow">{resource.description}</p>
              <div className="pt-4 border-t border-border-muted">
                <Button
                  href={`/resources/${resource.filename}.pdf`}
                  variant="outline"
                  className="w-full"
                >
                  <Download className="w-4 h-4" />
                  Download Free Guide
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Want Access to More — dark divider */}
      <section className="py-12 md:py-20 bg-[#1a2744]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Mail className="w-10 h-10 text-blue-300 mx-auto mb-4" />
          <h2 className="font-heading text-3xl md:text-4xl text-white mb-4">Want Access to More?</h2>
          <p className="text-blue-100 text-lg max-w-2xl mx-auto mb-2">
            Join the Access Educational Advocacy Resource Library for free and unlock our full collection of parent guides, checklists, and tools as we continue to add them.
          </p>
          <p className="text-blue-200/70 text-sm">Sign up below — it takes 10 seconds ↓</p>
        </div>
      </section>

      {/* Gated Signup */}
      <Section bg="muted">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-heading text-3xl text-text-primary mb-3">
            Get Free Access to the Full Library
          </h2>
          <p className="text-text-muted mb-8">
            Enter your name and email below. We&apos;ll send you a password to access the full resource library instantly.
          </p>
          <SignupForm />
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
            Schedule a Free Consultation →
            <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
      </section>
    </>
  );
}
