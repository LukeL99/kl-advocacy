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
              I'm Karlie Libraro, M.S., CCC-SLP—a licensed Speech-Language Pathologist 
              with extensive experience working in school settings. I've seen firsthand 
              how challenging the IEP process can be for families.
            </p>
            <p className="text-text-muted mb-6">
              After years of sitting on the school side of IEP tables, I realized many 
              parents didn't fully understand their rights or how to advocate for their 
              children effectively. That's why I started KL Advocacy.
            </p>
            <p className="text-text-muted">
              Now, I use my clinical expertise and system knowledge to help parents 
              navigate special education, understand their rights, and ensure their 
              children receive the services they deserve.
            </p>
          </div>
          <div className="bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl p-8 flex items-center justify-center aspect-square max-w-md mx-auto">
            <div className="text-center">
              <div className="w-32 h-32 bg-primary/30 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-16 h-16 text-primary" />
              </div>
              <p className="font-heading text-2xl text-text-primary">Karlie Libraro</p>
              <p className="text-text-muted">M.S., CCC-SLP</p>
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
            <p className="text-sm text-text-muted">School-based therapy & IEP teams</p>
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
            "Every parent is their child's first and best advocate. My job is to give 
            you the knowledge, confidence, and support to make your voice heard."
          </blockquote>
          <Button to="/contact" size="lg">
            Let's Work Together
            <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
      </Section>
    </>
  );
}
