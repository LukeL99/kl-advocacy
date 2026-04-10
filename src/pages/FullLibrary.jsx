import { useState } from 'react';
import { Lock, Download, FileText, AlertTriangle, HelpCircle } from 'lucide-react';
import Section, { SectionHeader } from '../components/Section';
import Button from '../components/Button';

const CORRECT_PASSWORD = 'access';

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
    icon: AlertTriangle,
    title: 'IEP Meeting Red Flags Checklist',
    description:
      'A checklist of warning signs to watch for during the meeting and in the IEP document itself. Trust your instincts and know what to look for.',
    filename: 'iep-red-flags',
  },
];

export default function FullLibrary() {
  const [password, setPassword] = useState('');
  const [unlocked, setUnlocked] = useState(false);
  const [error, setError] = useState('');

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
      </Section>
    </>
  );
}
