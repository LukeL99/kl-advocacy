import { FileText, Users, Shield, BookOpen, MessageCircle, ClipboardList, ArrowRight } from 'lucide-react';
import Button from '../components/Button';
import Section, { SectionHeader } from '../components/Section';

const services = [
  {
    icon: FileText,
    title: 'IEP Review & Analysis',
    description: 'Comprehensive review of your child\'s current IEP, identifying strengths, gaps, and opportunities for improvement.',
    features: ['Full document review', 'Goal appropriateness check', 'Service level analysis', 'Written summary provided'],
    price: 'Starting at $150',
  },
  {
    icon: ClipboardList,
    title: 'Meeting Preparation',
    description: 'Get ready for your next IEP meeting with confidence. We\'ll review documents, prepare questions, and strategize.',
    features: ['Document review', 'Question preparation', 'Strategy session', 'Parent rights review'],
    price: 'Starting at $100',
  },
  {
    icon: Users,
    title: 'Meeting Attendance',
    description: 'I\'ll attend the IEP meeting with you—in person or virtually—to provide support and ensure your voice is heard.',
    features: ['Pre-meeting strategy call', 'In-person or virtual attendance', 'Note-taking', 'Post-meeting debrief'],
    price: 'Starting at $200',
  },
  {
    icon: Shield,
    title: 'Dispute Resolution Support',
    description: 'If you disagree with your school district\'s decisions, I can help you understand your options and next steps.',
    features: ['Rights education', 'Documentation review', 'Letter writing support', 'Mediation preparation'],
    price: 'Contact for quote',
  },
  {
    icon: BookOpen,
    title: 'Parent Education',
    description: 'One-on-one sessions to help you understand IDEA, Section 504, and how to effectively advocate for your child.',
    features: ['IDEA overview', '504 plan basics', 'Procedural safeguards', 'Q&A session'],
    price: 'Starting at $75/hour',
  },
  {
    icon: MessageCircle,
    title: 'Ongoing Consultation',
    description: 'Need someone in your corner throughout the year? Monthly retainer packages for ongoing support.',
    features: ['Monthly check-ins', 'Email/phone support', 'Document reviews', 'Priority scheduling'],
    price: 'Monthly packages available',
  },
];

export default function Services() {
  return (
    <>
      <Section bg="secondary">
        <SectionHeader
          title="Services"
          subtitle="Comprehensive advocacy support tailored to your family's needs."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div key={service.title} className="bg-bg-primary rounded-2xl p-8 border border-border-muted hover:shadow-lg transition-shadow flex flex-col">
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                <service.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-heading text-xl text-text-primary mb-3">{service.title}</h3>
              <p className="text-text-muted text-sm mb-4 leading-relaxed">{service.description}</p>
              <ul className="space-y-2 mb-6 flex-grow">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-text-muted">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                    {feature}
                  </li>
                ))}
              </ul>
              <div className="pt-4 border-t border-border-muted">
                <p className="font-heading text-primary">{service.price}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section bg="dark">
        <div className="text-center">
          <h2 className="font-heading text-3xl text-white mb-4">Not Sure What You Need?</h2>
          <p className="text-cyan-100 mb-8 max-w-xl mx-auto">
            Every family's situation is unique. Schedule a free consultation and we'll figure out the best way I can help.
          </p>
          <Button to="/contact" variant="white" size="lg">
            Schedule Free Consultation
            <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
      </Section>
    </>
  );
}
