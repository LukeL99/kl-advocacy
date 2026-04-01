import { GraduationCap, Award, Heart, Briefcase, ArrowRight } from 'lucide-react';
import Button from '../components/Button';
import Section, { SectionHeader } from '../components/Section';

export default function About() {
  return (
    <>
      <Section bg="secondary">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="font-heading text-4xl md:text-5xl text-text-primary mb-6">
              Meet Karlie
            </h1>
            <p className="text-lg text-text-muted mb-6">
              I&apos;m Karlie Libraro, M.S., CCC-SLP - a licensed Speech-Language Pathologist 
              with over a decade of experience working across school-based, outpatient, and private 
              practice settings in Virginia and Illinois.
            </p>
            <p className="text-text-muted mb-6">
              After years of sitting on the school side of the IEP table, I saw something that 
              stayed with me: parents who cared deeply about their child&apos;s education but felt 
              lost, unheard, or overwhelmed by a system that wasn&apos;t designed to be easy to 
              navigate. Not because they weren&apos;t asking the right questions - but because the 
              disconnect between families and school districts is real, and it runs deep.
            </p>
            <p className="text-text-muted mb-6 font-semibold">
              I started Access Educational Advocacy because I want to be the bridge.
            </p>
            <p className="text-text-muted mb-6">
              I know how schools think, how IEP teams operate, and what the law requires. I also 
              understand the medical and clinical side - what therapists see in outpatient settings 
              versus what schools are required to provide, and why those two worlds so rarely speak 
              the same language. My goal is to bring everyone to the same table - not to fight, not 
              to escalate, but to make sure every family walks in informed, confident, and ready to 
              advocate for their child.
            </p>
            <p className="text-text-muted">
              Because every student deserves access to their education. And every parent deserves 
              to understand how to get it for them.
            </p>
          </div>
          <div className="flex justify-center">
            <div className="aspect-square max-w-md w-full rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src="/karlie-headshot.png" 
                alt="Karlie Libraro, M.S., CCC-SLP" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </Section>

      <Section bg="primary">
        <SectionHeader
          title="Credentials & Experience"
          subtitle="The expertise behind your advocacy support."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-bg-secondary rounded-2xl p-6 text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <GraduationCap className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-heading text-lg text-text-primary mb-2">Education</h3>
            <p className="text-sm text-text-muted">M.S. Speech-Language Pathology</p>
          </div>

          <div className="bg-bg-secondary rounded-2xl p-6 text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-heading text-lg text-text-primary mb-2">Certification</h3>
            <p className="text-sm text-text-muted">ASHA Certified (CCC-SLP)</p>
          </div>

          <div className="bg-bg-secondary rounded-2xl p-6 text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Briefcase className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-heading text-lg text-text-primary mb-2">Experience</h3>
            <p className="text-sm text-text-muted">10+ years in school, outpatient & private practice</p>
          </div>

          <div className="bg-bg-secondary rounded-2xl p-6 text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-heading text-lg text-text-primary mb-2">Passion</h3>
            <p className="text-sm text-text-muted">Empowering parents & families</p>
          </div>
        </div>
      </Section>

      <Section bg="muted">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-heading text-3xl text-text-primary mb-6">
            My Philosophy
          </h2>
          <blockquote className="text-xl text-text-muted italic mb-8">
            &ldquo;Every parent wants the best for their child. My job is to give 
            you the knowledge, confidence, and support to be an effective partner 
            in your child&apos;s education - not an adversary, a partner.&rdquo;
          </blockquote>
          <Button to="/contact" size="lg">
            Let&apos;s Work Together
            <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
      </Section>
    </>
  );
}
