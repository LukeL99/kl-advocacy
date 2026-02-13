import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import Section, { SectionHeader } from '../components/Section';

export default function Contact() {
  return (
    <>
      <Section bg="secondary">
        <SectionHeader
          title="Get In Touch"
          subtitle="Ready to advocate for your child? Let's talk."
        />

        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <h3 className="font-heading text-2xl text-text-primary mb-6">Free Consultation</h3>
            <p className="text-text-muted mb-8">
              Every family's situation is unique. Schedule a free 20-minute consultation 
              to discuss your needs and learn how I can help. No pressure, no obligation—just 
              a conversation about your child's education.
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
                  <a href="mailto:info@kladvocacy.com" className="text-primary hover:underline">info@kladvocacy.com</a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-heading text-text-primary mb-1">Location</h4>
                  <p className="text-text-muted">Richmond, Virginia</p>
                  <p className="text-sm text-text-muted">Virtual consultations available statewide</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-heading text-text-primary mb-1">Availability</h4>
                  <p className="text-text-muted">Monday – Friday: 9am – 5pm</p>
                  <p className="text-sm text-text-muted">Evening appointments available upon request</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-bg-primary rounded-2xl p-8 border border-border-muted">
            <h3 className="font-heading text-xl text-text-primary mb-6">Send a Message</h3>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-text-primary mb-2">Name</label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-3 rounded-xl border border-border-muted bg-bg-secondary focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-text-primary mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 rounded-xl border border-border-muted bg-bg-secondary focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-text-primary mb-2">Phone (optional)</label>
                <input
                  type="tel"
                  id="phone"
                  className="w-full px-4 py-3 rounded-xl border border-border-muted bg-bg-secondary focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                  placeholder="(804) 555-1234"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-text-primary mb-2">How can I help?</label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-border-muted bg-bg-secondary focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary resize-none"
                  placeholder="Tell me about your situation..."
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-primary text-white rounded-full font-medium hover:bg-primary-dark transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </Section>
    </>
  );
}
