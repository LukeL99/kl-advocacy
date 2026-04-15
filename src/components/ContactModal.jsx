import { createContext, useContext, useState, useCallback } from 'react';
import { X, CheckCircle, Send } from 'lucide-react';

const SERVICE_OPTIONS = [
  { value: '', label: 'Select one...' },
  { value: 'free-consultation', label: 'Free 15-Minute Consultation' },
  { value: 'consultation-documents', label: 'Consultation & Document Services' },
  { value: 'meeting-attendance', label: 'Meeting Attendance' },
  { value: 'support-package', label: 'Support Package' },
  { value: 'parent-education', label: 'Parent Education Session' },
  { value: 'other', label: 'Something else' },
];

// Map interest keys to dropdown values
const INTEREST_MAP = {
  'free-consultation': 'free-consultation',
  'consultation': 'consultation-documents',
  'meeting-attendance': 'meeting-attendance',
  'packages': 'support-package',
  'parent-education': 'parent-education',
  'learn-more': 'other',
};

// Context
const ContactModalContext = createContext(null);

export function useContactModal() {
  return useContext(ContactModalContext);
}

export function ContactModalProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [interest, setInterest] = useState('');
  const [prefillMessage, setPrefillMessage] = useState('');

  const openContactModal = useCallback((interestKey = '', message = '') => {
    setInterest(INTEREST_MAP[interestKey] || interestKey || '');
    setPrefillMessage(message);
    setIsOpen(true);
  }, []);

  const closeContactModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <ContactModalContext.Provider value={{ openContactModal }}>
      {children}
      <ContactModal
        isOpen={isOpen}
        onClose={closeContactModal}
        initialInterest={interest}
        prefillMessage={prefillMessage}
      />
    </ContactModalContext.Provider>
  );
}

function ContactModal({ isOpen, onClose, initialInterest = '', prefillMessage = '' }) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [interest, setInterest] = useState(initialInterest);

  // Sync initialInterest when modal opens with new value
  if (isOpen && initialInterest !== interest && !submitted) {
    setInterest(initialInterest);
  }

  if (!isOpen) {
    if (submitted) setSubmitted(false);
    if (error) setError(null);
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.target);
    const interestLabel = SERVICE_OPTIONS.find(o => o.value === formData.get('interest'))?.label || 'Not specified';
    formData.set('_interest_label', interestLabel);

    try {
      const response = await fetch('https://formsubmit.co/ajax/myaccessadvocacy@gmail.com', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        throw new Error('Form submission failed');
      }
    } catch {
      setError('Something went wrong. Please try again or email us directly at myaccessadvocacy@gmail.com.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      <div
        className="relative bg-white rounded-3xl shadow-2xl max-w-lg w-full p-8 md:p-10 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full text-text-muted hover:bg-gray-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-6">
            <CheckCircle className="w-14 h-14 text-green-500 mx-auto mb-4" />
            <h3 className="font-heading text-2xl text-text-primary mb-2">Message sent!</h3>
            <p className="text-text-muted">I&apos;ll get back to you within one business day.</p>
            <button
              onClick={onClose}
              className="mt-6 px-6 py-2.5 rounded-full bg-primary text-white font-medium hover:bg-primary-dark transition-colors"
            >
              Got it
            </button>
          </div>
        ) : (
          <>
            <h3 className="font-heading text-2xl text-text-primary mb-1 text-center">How Can I Help?</h3>
            <p className="text-text-muted text-sm mb-6 text-center">
              Fill out the form and I&apos;ll get back to you within one business day.
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="hidden" name="_subject" value="New Inquiry from Access Educational Advocacy Website" />
              <input type="hidden" name="_template" value="table" />
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="cm-firstName" className="block text-sm font-medium text-text-secondary mb-1">
                    First Name *
                  </label>
                  <input
                    type="text"
                    id="cm-firstName"
                    name="firstName"
                    required
                    placeholder="First name"
                    className="w-full px-4 py-2.5 rounded-lg border border-border bg-white text-text-primary placeholder:text-text-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="cm-lastName" className="block text-sm font-medium text-text-secondary mb-1">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    id="cm-lastName"
                    name="lastName"
                    required
                    placeholder="Last name"
                    className="w-full px-4 py-2.5 rounded-lg border border-border bg-white text-text-primary placeholder:text-text-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="cm-email" className="block text-sm font-medium text-text-secondary mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  id="cm-email"
                  name="email"
                  required
                  placeholder="you@example.com"
                  className="w-full px-4 py-2.5 rounded-lg border border-border bg-white text-text-primary placeholder:text-text-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                />
              </div>
              <div>
                <label htmlFor="cm-phone" className="block text-sm font-medium text-text-secondary mb-1">
                  Phone (optional)
                </label>
                <input
                  type="tel"
                  id="cm-phone"
                  name="phone"
                  placeholder="(804) 555-1234"
                  className="w-full px-4 py-2.5 rounded-lg border border-border bg-white text-text-primary placeholder:text-text-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                />
              </div>
              <div>
                <label htmlFor="cm-interest" className="block text-sm font-medium text-text-secondary mb-1">
                  I&apos;m interested in *
                </label>
                <select
                  id="cm-interest"
                  name="interest"
                  required
                  value={interest}
                  onChange={(e) => setInterest(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-border bg-white text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                >
                  {SERVICE_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="cm-message" className="block text-sm font-medium text-text-secondary mb-1">
                  Tell me a little about your situation (optional)
                </label>
                <textarea
                  id="cm-message"
                  name="message"
                  rows={3}
                  defaultValue={prefillMessage}
                  placeholder="What's going on with your child's education? Any upcoming meetings or concerns?"
                  className="w-full px-4 py-2.5 rounded-lg border border-border bg-white text-text-primary placeholder:text-text-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors resize-none"
                />
              </div>
              {error && (
                <p className="text-red-600 text-sm text-center">{error}</p>
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
  );
}
