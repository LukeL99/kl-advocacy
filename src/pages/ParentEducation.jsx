import { BookOpen, MessageCircle } from 'lucide-react';
import Button from '../components/Button';
import Section, { SectionHeader } from '../components/Section';

// Session booking links go to Contact page with parent-education interest

const sessions = [
  {
    number: 1,
    title: 'Understanding Your Rights',
    subtitle: 'Procedural Safeguards & IEP Meetings',
    description: 'Learn what your procedural safeguards mean, what rights you have as a parent, and exactly what you can say and do when you\u2019re sitting at that IEP table.',
  },
  {
    number: 2,
    title: 'How to Prepare for Your Child\u2019s IEP Meeting',
    subtitle: null,
    description: 'Know what to bring, what to say, and what questions to ask before you walk in the door.',
  },
  {
    number: 3,
    title: 'Understanding Special Education Eligibility',
    subtitle: null,
    description: 'Learn how schools determine if a child qualifies for special education services and what categories mean.',
  },
  {
    number: 4,
    title: 'What Is a PWN and What Do I Do With It?',
    subtitle: null,
    description: 'Understand what a Prior Written Notice means, why the school sent it, and what your options are.',
  },
  {
    number: 5,
    title: 'IEP vs. 504 \u2014 What\u2019s the Difference?',
    subtitle: null,
    description: 'Understand the difference between an IEP and a 504 plan and which one is right for your child.',
  },
  {
    number: 6,
    title: 'Understanding Least Restrictive Environment',
    subtitle: null,
    description: 'Learn what LRE means and whether your child\u2019s placement is appropriate.',
  },
  {
    number: 7,
    title: 'What Is FAPE and Does My Child Have It?',
    subtitle: null,
    description: 'Understand what Free Appropriate Public Education means and whether your child is receiving it.',
  },
  {
    number: 8,
    title: 'Understanding RTI \u2014 Response to Intervention',
    subtitle: null,
    description: 'Learn what RTI is, how schools use it, and what it means for your child\u2019s path to special education services.',
  },
  {
    number: 9,
    title: 'School-Based vs. Medical-Based Related Services',
    subtitle: null,
    description: 'Speech, OT, PT \u2014 your child may qualify in both settings, but schools and medical providers operate under completely different rules. Learn what each is required to provide, why they differ, and how to navigate both systems for your child.',
  },
  {
    number: 10,
    title: 'What Are Extended School Year Services (ESY)?',
    subtitle: null,
    description: 'Most parents never know to ask for ESY, but your child may be entitled to services beyond the regular school year. Learn what ESY is, who qualifies, and how to advocate for it at your child\u2019s next IEP meeting.',
  },
];

export default function ParentEducation() {
  return (
    <>
      <Section bg="secondary">
        <SectionHeader
          title="Parent Education"
          subtitle="Understanding the IEP process is the first step to advocating for your child. These 30-minute topic sessions are designed to give you clear, plain-language answers to your most pressing special education questions. No full advocacy package required."
        />

        <div className="grid md:grid-cols-2 gap-6">
          {sessions.map((session) => (
            <div key={session.number} className="bg-bg-primary rounded-2xl p-8 border border-border-muted hover:shadow-lg transition-shadow flex flex-col">
              <div className="flex items-start gap-4 mb-4">
                <span className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center font-heading text-primary text-sm">
                  {session.number}
                </span>
                <div>
                  <h3 className="font-heading text-lg text-text-primary leading-snug">
                    {session.title}
                  </h3>
                  {session.subtitle && (
                    <p className="text-sm text-text-secondary mt-1">{session.subtitle}</p>
                  )}
                </div>
              </div>
              <p className="text-text-muted text-sm leading-relaxed mb-6 flex-grow">
                {session.description}
              </p>
              <div className="flex items-center justify-between pt-4 border-t border-border-muted">
                <p className="font-heading text-primary">$65</p>
                <Button to={`/contact?interest=parent-education&topic=${encodeURIComponent(session.title)}`} variant="outline" size="sm">
                  Book This Session
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Don't See Your Topic? */}
      <Section bg="muted">
        <div className="max-w-2xl mx-auto text-center">
          <MessageCircle className="w-10 h-10 text-primary mx-auto mb-4" />
          <h2 className="font-heading text-3xl text-text-primary mb-3">
            Don&apos;t See Your Topic?
          </h2>
          <p className="text-text-muted mb-8">
            Have a specific question about your child&apos;s IEP, evaluation, or special education services? I offer custom 30-minute sessions on any topic. Reach out and we&apos;ll figure it out together.
          </p>
          <Button to="/contact" size="lg">
            Contact Me
          </Button>
        </div>
      </Section>

      {/* Ready for More? */}
      <Section bg="dark">
        <div className="text-center">
          <h2 className="font-heading text-3xl text-white mb-4">Ready for More Than a Single Session?</h2>
          <p className="text-blue-100 mb-8 max-w-xl mx-auto">
            If you&apos;re looking for ongoing support, document review, or meeting attendance, then explore our full advocacy services.
          </p>
          <Button to="/services" variant="white" size="lg">
            View Services
          </Button>
        </div>
      </Section>
    </>
  );
}
