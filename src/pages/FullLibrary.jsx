import { useState } from 'react';
import { Lock, BookOpen, Sparkles } from 'lucide-react';
import Section, { SectionHeader } from '../components/Section';
import Button from '../components/Button';

const CORRECT_PASSWORD = 'access';

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
      <Section bg="secondary">
        <SectionHeader
          title="Full Resource Library"
          subtitle="Your growing collection of guides, checklists, and tools."
        />
      </Section>

      <Section bg="primary">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-20 h-20 bg-accent/15 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Sparkles className="w-10 h-10 text-accent" />
          </div>
          <h2 className="font-heading text-3xl text-text-primary mb-4">
            Coming Soon
          </h2>
          <p className="text-text-muted text-lg mb-4 leading-relaxed">
            We&apos;re building out the full resource library with even more guides, checklists, templates, and tools to help you navigate the special education process.
          </p>
          <p className="text-text-muted mb-8">
            As a subscriber, you&apos;ll be the first to know when new resources are added. Keep an eye on your inbox!
          </p>
          <div className="grid sm:grid-cols-3 gap-4 mb-10">
            <div className="bg-bg-muted rounded-2xl p-6 text-center">
              <BookOpen className="w-6 h-6 text-primary mx-auto mb-2" />
              <p className="text-sm font-medium text-text-primary">In-Depth Guides</p>
            </div>
            <div className="bg-bg-muted rounded-2xl p-6 text-center">
              <BookOpen className="w-6 h-6 text-primary mx-auto mb-2" />
              <p className="text-sm font-medium text-text-primary">Printable Checklists</p>
            </div>
            <div className="bg-bg-muted rounded-2xl p-6 text-center">
              <BookOpen className="w-6 h-6 text-primary mx-auto mb-2" />
              <p className="text-sm font-medium text-text-primary">Meeting Templates</p>
            </div>
          </div>
          <p className="text-text-muted text-sm">
            In the meantime, check out the{' '}
            <a href="/resources" className="text-primary underline underline-offset-2">
              free resources
            </a>{' '}
            available now.
          </p>
        </div>
      </Section>
    </>
  );
}
