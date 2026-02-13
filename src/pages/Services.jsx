import { Phone, FileText, Users, ArrowRight } from 'lucide-react';
import Button from '../components/Button';
import Section, { SectionHeader } from '../components/Section';

const services = [
  {
    icon: Phone,
    title: 'Free 15-Minute Consultation',
    description: 'A brief introductory call to discuss your situation and determine how I can best support your family.',
    features: ['Initial situation assessment', 'Answer your immediate questions', 'Discuss next steps'],
    price: 'Free',
    cta: 'Schedule Free Call',
  },
  {
    icon: FileText,
    title: 'Individual Consultation (60 minutes)',
    description: 'Comprehensive one-on-one consultation to review your child\'s IEP, 504 plan, evaluations, or discuss specific concerns about special education services.',
    features: ['Detailed document review (IEP, 504, evaluations)', 'Goal and service level analysis', 'Meeting preparation strategies', 'Parent rights education', 'Written summary with recommendations'],
    price: 'Starting at $150',
    cta: 'Request Consultation',
  },
  {
    icon: Users,
    title: 'Full Advocacy Support',
    description: 'Ongoing partnership throughout your child\'s special education journey. Ideal for families navigating complex situations, disputes, or needing consistent support.',
    features: ['Everything in Individual Consultation, plus:', 'IEP meeting attendance (virtual or in-person)', 'Communication with school teams', 'Document drafting and review', 'Dispute resolution support', 'Ongoing email/phone support between meetings'],
    price: 'Custom packages available - Contact for pricing',
    cta: 'Learn More',
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

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service) => (
            <div key={service.title} className="bg-bg-primary rounded-2xl p-8 border border-border-muted hover:shadow-lg transition-shadow flex flex-col">
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                <service.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-heading text-xl text-text-primary mb-3">{service.title}</h3>
              <p className="text-text-muted text-sm mb-4 leading-relaxed">{service.description}</p>
              <div className="mb-6">
                <p className="text-sm font-medium text-text-secondary mb-3">What's Included:</p>
                <ul className="space-y-2">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm text-text-muted">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-auto pt-4 border-t border-border-muted">
                <p className="font-heading text-primary mb-4">{service.price}</p>
                <Button href="https://docs.google.com/forms/d/e/1FAIpQLSeCZBm-Vppz8ReNgpLqQU9xA9kAUPihWj_-2gqSQ1AbtUCrCg/viewform?usp=header" variant="outline" className="w-full">
                  {service.cta}
                </Button>
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
          <Button href="https://docs.google.com/forms/d/e/1FAIpQLSeCZBm-Vppz8ReNgpLqQU9xA9kAUPihWj_-2gqSQ1AbtUCrCg/viewform?usp=header" target="_blank" rel="noopener noreferrer" variant="white" size="lg">
            Schedule Free Consultation
            <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
      </Section>
    </>
  );
}
