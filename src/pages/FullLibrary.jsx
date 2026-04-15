import { useState } from 'react';
import { Lock, Download, FileText, Flag, HelpCircle, BookOpen, X, CheckCircle, MessageSquare } from 'lucide-react';
import Section, { SectionHeader } from '../components/Section';
import Button from '../components/Button';

const CORRECT_PASSWORD = 'access';

// Mailchimp config
const MC_U = 'f60b2d5f1904ee6928eb2c5dd';
const MC_ID = 'dfdac89c42';
const MC_POST_URL = 'https://myaccessadvocacy.us19.list-manage.com/subscribe/post';

function subscribeToMailchimp({ email, firstName, lastName }) {
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
}

function RequestModal({ isOpen, onClose }) {
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
    const topic = formData.get('topic');

    try {
      // Send topic request to gmail via FormSubmit
      const response = await fetch('https://formsubmit.co/ajax/myaccessadvocacy@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          _subject: 'Resource Topic Request',
          name: `${firstName} ${lastName}`,
          email,
          topic,
        }),
      });

      if (!response.ok) throw new Error('Failed to send request');

      // Add to Mailchimp in background
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
    if (error) setError('');
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
            <h3 className="font-heading text-2xl text-text-primary mb-2">Request sent!</h3>
            <p className="text-text-muted">Thanks for the suggestion. I&apos;ll let you know when it&apos;s available.</p>
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
                <MessageSquare className="w-7 h-7 text-accent" />
              </div>
              <h3 className="font-heading text-2xl text-text-primary mb-2">
                Request a Topic
              </h3>
              <p className="text-text-muted text-sm">
                What resource would help you the most? Let me know and I&apos;ll work on creating it.
              </p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="req-firstName" className="block text-sm font-medium text-text-secondary mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="req-firstName"
                    name="firstName"
                    required
                    placeholder="First name"
                    className="w-full px-4 py-2.5 rounded-lg border border-border bg-white text-text-primary placeholder:text-text-muted/50 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="req-lastName" className="block text-sm font-medium text-text-secondary mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="req-lastName"
                    name="lastName"
                    required
                    placeholder="Last name"
                    className="w-full px-4 py-2.5 rounded-lg border border-border bg-white text-text-primary placeholder:text-text-muted/50 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-colors"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="req-email" className="block text-sm font-medium text-text-secondary mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="req-email"
                  name="email"
                  required
                  placeholder="you@example.com"
                  className="w-full px-4 py-2.5 rounded-lg border border-border bg-white text-text-primary placeholder:text-text-muted/50 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-colors"
                />
              </div>
              <div>
                <label htmlFor="req-topic" className="block text-sm font-medium text-text-secondary mb-1">
                  What topic or resource would be helpful?
                </label>
                <textarea
                  id="req-topic"
                  name="topic"
                  required
                  rows={3}
                  placeholder="e.g., How to prepare for a transition meeting..."
                  className="w-full px-4 py-2.5 rounded-lg border border-border bg-white text-text-primary placeholder:text-text-muted/50 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-colors resize-none"
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
                {loading ? 'Sending...' : 'Submit Request'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

const gatedResources = [
  {
    icon: HelpCircle,
    title: 'Questions to Ask at an Eligibility Meeting',
    description:
      '10 essential questions to ask before a decision is made about your child\'s eligibility for special education services under IDEA.',
    filename: 'eligibility-meeting-questions',
  },
  {
    icon: FileText,
    title: 'Questions to Ask at Every IEP Meeting',
    description:
      '10 questions to help you come prepared and leave informed. Covers goals, services, progress monitoring, and your rights.',
    filename: 'iep-meeting-questions',
  },
  {
    icon: Flag,
    title: 'IEP Meeting Red Flags Checklist',
    description:
      'A checklist of warning signs to watch for during the meeting and in the IEP document itself. Trust your instincts and know what to look for.',
    filename: 'iep-red-flags',
  },
  {
    icon: BookOpen,
    title: 'Understanding the 13 IDEA Eligibility Categories',
    description:
      'A breakdown of all 13 federal eligibility categories under IDEA, what each one means, and how schools use them to determine if your child qualifies for special education.',
    filename: 'eligibility-categories',
  },
];

export default function FullLibrary() {
  const [password, setPassword] = useState('');
  const [unlocked, setUnlocked] = useState(false);
  const [error, setError] = useState('');
  const [showRequestModal, setShowRequestModal] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password.trim().toLowerCase() === CORRECT_PASSWORD) {
      setUnlocked(true);
      setError('');
    } else {
      setError('Incorrect password. Sign up on the Resource Library page to get access.');
    }
  };

  if (!unlocked) {
    return (
      <>
        <Section bg="secondary">
          <div className="max-w-md mx-auto text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Lock className="w-8 h-8 text-primary" />
            </div>
            <h1 className="font-heading text-3xl md:text-4xl text-text-primary mb-4">
              Full Resource Library
            </h1>
            <p className="text-text-muted mb-8">
              This area is for subscribers. Enter your password to access the full library.
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full px-4 py-3 rounded-full border border-border bg-white text-text-primary placeholder:text-text-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors text-center text-lg"
                />
              </div>
              {error && (
                <p className="text-red-600 text-sm">{error}</p>
              )}
              <Button type="submit" variant="primary" size="lg" className="w-full">
                Unlock
              </Button>
            </form>
            <p className="text-text-muted/60 text-sm mt-6">
              Don&apos;t have a password?{' '}
              <a href="/resources" className="text-primary underline underline-offset-2">
                Sign up here
              </a>{' '}
              to get free access.
            </p>
          </div>
        </Section>
      </>
    );
  }

  return (
    <>
      <RequestModal isOpen={showRequestModal} onClose={() => setShowRequestModal(false)} />

      <Section bg="primary">
        <SectionHeader
          title="Full Resource Library"
          subtitle="Exclusive guides and tools for subscribers. More resources are added regularly."
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {gatedResources.map((resource) => (
            <div
              key={resource.filename}
              className="bg-bg-primary rounded-2xl p-8 border-2 border-accent/20 hover:border-accent/40 hover:shadow-lg transition-all flex flex-col"
            >
              <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center mb-6">
                <resource.icon className="w-7 h-7 text-accent" />
              </div>
              <h3 className="font-heading text-xl text-text-primary mb-3">{resource.title}</h3>
              <p className="text-text-muted text-sm mb-6 leading-relaxed flex-grow">{resource.description}</p>
              <div className="pt-4 border-t border-border-muted">
                <a
                  href={`/resources/${resource.filename}.pdf`}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 font-medium rounded-full transition-colors duration-200 bg-accent text-white hover:bg-[#b8854f] px-5 py-2.5 text-sm w-full"
                >
                  <Download className="w-4 h-4" />
                  Download
                </a>
              </div>
            </div>
          ))}
        </div>

        <p className="text-text-muted text-sm text-center mt-10">
          More resources coming soon. Also check out the{' '}
          <a href="/resources" className="text-primary underline underline-offset-2">
            free resource library
          </a>{' '}
          for additional guides.
        </p>
        <p className="text-center mt-4">
          <button
            onClick={() => setShowRequestModal(true)}
            className="text-accent hover:text-[#b8854f] font-medium transition-colors underline underline-offset-2"
          >
            Don&apos;t see what you&apos;re looking for? Request a topic here.
          </button>
        </p>
      </Section>
    </>
  );
}
