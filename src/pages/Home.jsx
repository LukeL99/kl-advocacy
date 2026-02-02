import { ArrowRight, Phone, Mail, Shield, Users, FileText, CheckCircle } from 'lucide-react';
import Button from '../components/Button';
import Section, { SectionHeader } from '../components/Section';

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-bg-secondary to-bg-primary overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/5 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Shield className="w-4 h-4" />
                Certified IEP Parent Advocate
              </div>
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-text-primary leading-tight mb-6">
                Your Child's Education
                <span className="text-primary"> Deserves an Advocate</span>
              </h1>
              <p className="text-lg text-text-muted mb-8 max-w-lg">
                Navigating IEPs and special education can be overwhelming. 
                I help parents understand their rights and ensure their children 
                receive the services they're entitled to.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button to="/services" size="lg">
                  Learn How I Can Help
                  <ArrowRight className="w-5 h-5" />
                </Button>
                <Button to="/contact" variant="outline" size="lg">
                  Free Consultation
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square max-w-md mx-auto rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src="/hero-image.png" 
                  alt="Parent and child working together on education" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What I Do */}
      <Section bg="secondary">
        <SectionHeader
          title="How I Support Families"
          subtitle="From understanding your rights to attending IEP meetings by your side, I'm here to help."
        />

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-bg-primary rounded-2xl p-8 border border-border-muted hover:shadow-lg transition-shadow">
            <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
              <FileText className="w-7 h-7 text-primary" />
            </div>
            <h3 className="font-heading text-xl text-text-primary mb-3">IEP Review & Preparation</h3>
            <p className="text-text-muted text-sm mb-4 leading-relaxed">
              I'll review your child's IEP, help you understand every section, and prepare you for upcoming meetings.
            </p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2 text-sm text-text-muted">
                <CheckCircle className="w-4 h-4 text-secondary mt-0.5 shrink-0" />
                Document review
              </li>
              <li className="flex items-start gap-2 text-sm text-text-muted">
                <CheckCircle className="w-4 h-4 text-secondary mt-0.5 shrink-0" />
                Goal analysis
              </li>
              <li className="flex items-start gap-2 text-sm text-text-muted">
                <CheckCircle className="w-4 h-4 text-secondary mt-0.5 shrink-0" />
                Meeting prep
              </li>
            </ul>
          </div>

          <div className="bg-bg-primary rounded-2xl p-8 border border-border-muted hover:shadow-lg transition-shadow">
            <div className="w-14 h-14 bg-secondary/10 rounded-xl flex items-center justify-center mb-6">
              <Users className="w-7 h-7 text-secondary" />
            </div>
            <h3 className="font-heading text-xl text-text-primary mb-3">Meeting Attendance</h3>
            <p className="text-text-muted text-sm mb-4 leading-relaxed">
              I attend IEP meetings with you—virtually or in person—to provide support and ensure your voice is heard.
            </p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2 text-sm text-text-muted">
                <CheckCircle className="w-4 h-4 text-secondary mt-0.5 shrink-0" />
                In-person or virtual
              </li>
              <li className="flex items-start gap-2 text-sm text-text-muted">
                <CheckCircle className="w-4 h-4 text-secondary mt-0.5 shrink-0" />
                Note-taking
              </li>
              <li className="flex items-start gap-2 text-sm text-text-muted">
                <CheckCircle className="w-4 h-4 text-secondary mt-0.5 shrink-0" />
                Follow-up support
              </li>
            </ul>
          </div>

          <div className="bg-bg-primary rounded-2xl p-8 border border-border-muted hover:shadow-lg transition-shadow">
            <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center mb-6">
              <Shield className="w-7 h-7 text-accent" />
            </div>
            <h3 className="font-heading text-xl text-text-primary mb-3">Rights Education</h3>
            <p className="text-text-muted text-sm mb-4 leading-relaxed">
              Learn your rights under IDEA and Section 504. Knowledge is power when advocating for your child.
            </p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2 text-sm text-text-muted">
                <CheckCircle className="w-4 h-4 text-secondary mt-0.5 shrink-0" />
                IDEA rights
              </li>
              <li className="flex items-start gap-2 text-sm text-text-muted">
                <CheckCircle className="w-4 h-4 text-secondary mt-0.5 shrink-0" />
                504 plans
              </li>
              <li className="flex items-start gap-2 text-sm text-text-muted">
                <CheckCircle className="w-4 h-4 text-secondary mt-0.5 shrink-0" />
                Procedural safeguards
              </li>
            </ul>
          </div>
        </div>
      </Section>

      {/* Why Choose Me */}
      <Section bg="primary">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-heading text-3xl md:text-4xl text-text-primary mb-6">
              Why Work With Me?
            </h2>
            <p className="text-text-muted mb-8">
              As a licensed Speech-Language Pathologist with years of experience in schools, 
              I understand both sides of the IEP table. I know what schools can provide—and 
              what they sometimes overlook.
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                  <CheckCircle className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-heading text-text-primary mb-1">School System Experience</h4>
                  <p className="text-sm text-text-muted">I've worked in schools and understand how IEP teams operate.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                  <CheckCircle className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-heading text-text-primary mb-1">Clinical Background</h4>
                  <p className="text-sm text-text-muted">M.S. in Speech-Language Pathology with pediatric expertise.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                  <CheckCircle className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-heading text-text-primary mb-1">Parent-First Approach</h4>
                  <p className="text-sm text-text-muted">I'm on your team, advocating for your child's best interests.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-bg-muted rounded-2xl p-8 border border-border-muted">
            <blockquote className="text-lg text-text-primary italic mb-6">
              "Karlie helped us understand what our daughter was entitled to. 
              For the first time, we felt heard in an IEP meeting."
            </blockquote>
            <p className="text-text-muted text-sm">— Parent in Richmond, VA</p>
          </div>
        </div>
      </Section>

      {/* CTA Section */}
      <Section bg="dark">
        <div className="text-center">
          <h2 className="font-heading text-3xl md:text-4xl text-white mb-6">
            Ready to Advocate for Your Child?
          </h2>
          <p className="text-cyan-100 text-lg mb-8 max-w-2xl mx-auto">
            Schedule a free consultation to discuss your situation and how I can help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="tel:804-420-2273" variant="white" size="lg">
              <Phone className="w-5 h-5" />
              (804) 420-2273
            </Button>
            <Button href="mailto:info@kladvocacy.com" variant="outline-white" size="lg">
              <Mail className="w-5 h-5" />
              Email Me
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
