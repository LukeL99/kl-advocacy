import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, Tag, CheckCircle, Facebook, Twitter, Mail, Lightbulb } from 'lucide-react';
import { blogPosts } from '../data/blogPosts';
import Button from '../components/Button';
import Section from '../components/Section';
import Comments from '../components/Comments';

export default function BlogPost() {
  const { slug } = useParams();
  const post = blogPosts.find(p => p.slug === slug);

  if (!post) {
    return (
      <Section bg="secondary">
        <div className="text-center py-12">
          <h1 className="font-heading text-4xl text-text-primary mb-4">Post Not Found</h1>
          <p className="text-text-muted mb-8">Sorry, we couldn't find that blog post.</p>
          <Button to="/blog" variant="outline">
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Button>
        </div>
      </Section>
    );
  }

  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const shareUrl = window.location.href;
  const shareTitle = encodeURIComponent(post.title);
  const shareText = encodeURIComponent(post.excerpt);

  return (
    <>
      {/* Hero Section with Gradient */}
      <Section bg="secondary" className="!py-12 md:!py-16">
        <div className="mb-6">
          <Link to="/blog" className="inline-flex items-center gap-2 text-primary hover:text-primary-dark transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Back to Blog</span>
          </Link>
        </div>

        <div className="max-w-4xl">
          <div className="flex flex-wrap gap-2 mb-4">
            {post.categories.map((category, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary text-sm rounded-full"
              >
                <Tag className="w-3 h-3" />
                {category}
              </span>
            ))}
          </div>

          <h1 className="font-heading text-4xl md:text-5xl text-text-primary mb-6 leading-tight">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-text-muted text-sm mb-8">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{formattedDate}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{post.readTime}</span>
            </div>
          </div>

          {/* Featured Image */}
          <div className="rounded-3xl overflow-hidden mb-8">
            <img 
              src="/images/blog-iep-meeting-prep.png" 
              alt="Parent preparing for IEP meeting — writing notes at a desk with a laptop and coffee"
              className="w-full h-64 md:h-80 object-cover"
            />
          </div>
        </div>
      </Section>

      {/* Article Content */}
      <Section bg="secondary" className="!pt-0">
        <article className="max-w-3xl mx-auto">
          {/* Introduction */}
          <div className="prose-custom mb-12">
            {post.content.intro.map((paragraph, idx) => (
              <p key={idx} className="text-lg text-text-muted mb-6 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Main Content Sections */}
          {post.content.sections.map((section, sectionIdx) => (
            <div key={sectionIdx}>
              {sectionIdx > 0 && (
                <hr className="border-border-muted my-12" />
              )}

              <h2 className="font-heading text-3xl text-text-primary mb-6">
                {section.heading}
              </h2>

              {section.intro && section.intro.map((paragraph, idx) => (
                <p key={idx} className="text-lg text-text-muted mb-6 leading-relaxed">
                  {paragraph}
                </p>
              ))}

              {section.subsections?.map((subsection, subIdx) => (
                <div key={subIdx} className="mb-10">
                  <h3 className="font-heading text-2xl text-text-primary mb-4">
                    {subsection.subheading}
                  </h3>

                  {subsection.content?.map((paragraph, idx) => (
                    <p key={idx} className="text-lg text-text-muted mb-4 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}

                  {subsection.list && (
                    <ul className="space-y-3 mb-6">
                      {subsection.list.map((item, idx) => (
                        <li key={idx} className="flex gap-3 text-lg text-text-muted">
                          <CheckCircle className="w-6 h-6 text-secondary flex-shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {subsection.afterList?.map((paragraph, idx) => (
                    <p key={idx} className="text-lg text-text-muted mb-4 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}

                  {subsection.proTip && (
                    <div className="my-8 border-l-4 border-accent bg-accent/5 rounded-r-xl p-6">
                      <div className="flex gap-3">
                        <Lightbulb className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                        <div>
                          <p className="font-semibold text-accent text-lg mb-2">Pro Tip</p>
                          <p className="text-lg text-text-muted leading-relaxed">
                            {subsection.proTip}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {subsection.afterProTip?.map((paragraph, idx) => (
                    <p key={idx} className="text-lg text-text-muted mb-4 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              ))}

              {section.pullQuote && (
                <div className="my-12 text-center">
                  <blockquote className="font-heading text-3xl md:text-4xl text-primary leading-tight">
                    "{section.pullQuote}"
                  </blockquote>
                </div>
              )}

              {section.actionPlan && (
                <div className="my-12 bg-bg-muted rounded-2xl p-8 border-2 border-primary/20">
                  <h3 className="font-heading text-2xl text-text-primary mb-6 text-center">
                    {section.actionPlan.title}
                  </h3>
                  <ol className="space-y-4 mb-6">
                    {section.actionPlan.steps.map((step, idx) => (
                      <li key={idx} className="flex gap-4 text-lg text-text-muted">
                        <span className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-semibold text-sm">
                          {idx + 1}
                        </span>
                        <span className="pt-0.5">{step}</span>
                      </li>
                    ))}
                  </ol>
                  {section.actionPlan.afterSteps?.map((paragraph, idx) => (
                    <p key={idx} className="text-lg text-text-muted text-center leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              )}

              {section.cta && (
                <div className="my-12 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl p-8 text-center">
                  <p className="text-lg text-text-muted mb-6 leading-relaxed max-w-2xl mx-auto">
                    {section.cta.text}
                  </p>
                  <Button
                    href={section.cta.buttonUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    size="lg"
                    className="mb-0"
                  >
                    {section.cta.buttonText}
                  </Button>
                </div>
              )}

              {section.closing?.map((paragraph, idx) => (
                <p key={idx} className="text-lg text-text-muted mb-6 leading-relaxed italic">
                  {paragraph}
                </p>
              ))}
            </div>
          ))}

          {/* Author Bio */}
          <div className="mt-16 pt-8 border-t border-border-muted">
            <div className="flex gap-4 items-start">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-2xl">K</span>
              </div>
              <div>
                <p className="text-text-muted mb-2">
                  <span className="font-semibold text-text-primary">Written by {post.author}</span>
                </p>
              </div>
            </div>
          </div>

          {/* Social Sharing */}
          <div className="mt-12 pt-8 border-t border-border-muted">
            <p className="text-text-primary font-semibold mb-4">Share this article:</p>
            <div className="flex gap-3">
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 bg-primary/10 hover:bg-primary hover:text-white text-primary rounded-full transition-colors"
                aria-label="Share on Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 bg-primary/10 hover:bg-primary hover:text-white text-primary rounded-full transition-colors"
                aria-label="Share on Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href={`mailto:?subject=${shareTitle}&body=${shareText}%0A%0A${shareUrl}`}
                className="flex items-center justify-center w-10 h-10 bg-primary/10 hover:bg-primary hover:text-white text-primary rounded-full transition-colors"
                aria-label="Share via Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Related Posts */}
          <div className="mt-16 pt-8 border-t border-border-muted">
            <h3 className="font-heading text-2xl text-text-primary mb-4">Related Posts</h3>
            <p className="text-text-muted">More posts coming soon...</p>
          </div>

          {/* Comments Section */}
          <Comments 
            pageUrl={shareUrl}
            pageIdentifier={post.slug}
            pageTitle={post.title}
          />
        </article>
      </Section>
    </>
  );
}
