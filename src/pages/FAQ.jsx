import { useState } from 'react';
import { ChevronDown, ArrowRight } from 'lucide-react';
import Button from '../components/Button';
import Section, { SectionHeader } from '../components/Section';

const faqs = [
  {
    question: "What is an IEP advocate?",
    answer: "An IEP advocate is someone who helps parents navigate the special education system. I attend meetings with you, help you understand your rights, review documents, and ensure your child's needs are properly addressed. I'm not an attorney, but I am an expert in the IEP process."
  },
  {
    question: "Do I really need an advocate?",
    answer: "Not every family needs one, but having an advocate can be incredibly helpful if you feel overwhelmed, unheard, or unsure about the IEP process. I'm especially helpful if you're new to IEPs, preparing for a contentious meeting, or feel like your child isn't getting appropriate services."
  },
  {
    question: "What's the difference between an advocate and an attorney?",
    answer: "An attorney can represent you in due process hearings and legal proceedings. As an advocate, I provide educational support, meeting attendance, and help you understand your rights—but I cannot provide legal representation. For most families, an advocate is sufficient; attorneys are typically needed only for formal disputes."
  },
  {
    question: "Can you attend meetings virtually?",
    answer: "Yes! I offer both in-person and virtual meeting attendance. Virtual attendance works great and allows me to support families across Virginia and beyond."
  },
  {
    question: "What areas do you serve?",
    answer: "I primarily serve families in Virginia, with virtual consultations available statewide. I'm based in Richmond and can attend meetings in person throughout central Virginia."
  },
  {
    question: "How much do your services cost?",
    answer: "Services start at $75/hour for consultations, with package options available. IEP review and meeting attendance are priced based on complexity. I offer a free initial consultation to discuss your needs and provide a quote."
  },
  {
    question: "What should I bring to our first meeting?",
    answer: "Bring any IEP documents, evaluation reports, and progress reports you have. It's also helpful to write down your main concerns and questions. Don't worry if you don't have everything—we'll work with what you have."
  },
  {
    question: "Can you help with 504 plans too?",
    answer: "Absolutely. While IEPs fall under IDEA, 504 plans have their own set of rules and protections. I can help you understand the differences and advocate for appropriate accommodations under either plan."
  },
];

function FAQItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-border-muted last:border-b-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-center justify-between text-left"
      >
        <span className="font-heading text-lg text-text-primary pr-4">{question}</span>
        <ChevronDown className={`w-5 h-5 text-primary shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="pb-6 text-text-muted leading-relaxed">
          {answer}
        </div>
      )}
    </div>
  );
}

export default function FAQ() {
  return (
    <>
      <Section bg="secondary">
        <SectionHeader
          title="Frequently Asked Questions"
          subtitle="Common questions about IEP advocacy and how I can help."
        />

        <div className="max-w-3xl mx-auto bg-bg-primary rounded-2xl p-6 md:p-8 border border-border-muted">
          {faqs.map((faq) => (
            <FAQItem key={faq.question} {...faq} />
          ))}
        </div>
      </Section>

      <Section bg="muted">
        <div className="text-center">
          <h2 className="font-heading text-2xl text-text-primary mb-4">Still Have Questions?</h2>
          <p className="text-text-muted mb-8">
            I'm happy to answer any questions about my services or the IEP process.
          </p>
          <Button to="/contact" size="lg">
            Get In Touch
            <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
      </Section>
    </>
  );
}
