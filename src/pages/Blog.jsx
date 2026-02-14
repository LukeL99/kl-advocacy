import { Link } from 'react-router-dom';
import { Calendar, Clock, Tag, ArrowRight } from 'lucide-react';
import { blogPosts } from '../data/blogPosts';
import Section, { SectionHeader } from '../components/Section';
import Button from '../components/Button';

export default function Blog() {
  return (
    <>
      {/* Hero Section */}
      <Section bg="secondary" className="!py-16 md:!py-20">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="font-heading text-4xl md:text-5xl text-text-primary mb-6">
            Educational Advocacy Blog
          </h1>
          <p className="text-lg text-text-muted">
            Expert insights, practical guidance, and empowering resources for parents 
            navigating the IEP process and special education system.
          </p>
        </div>
      </Section>

      {/* Blog Posts Grid */}
      <Section bg="primary">
        <div className="max-w-6xl mx-auto">
          {blogPosts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post) => {
                const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                });

                return (
                  <article
                    key={post.slug}
                    className="bg-bg-secondary rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col"
                  >
                    {/* Featured Image / Gradient */}
                    <div className="bg-gradient-to-br from-primary/30 via-secondary/20 to-accent/20 h-48 flex items-center justify-center">
                      <div className="text-center px-6">
                        <p className="font-heading text-lg text-text-primary">
                          {post.categories[0]}
                        </p>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex-grow flex flex-col">
                      {/* Categories */}
                      <div className="flex flex-wrap gap-2 mb-3">
                        {post.categories.map((category, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                          >
                            <Tag className="w-3 h-3" />
                            {category}
                          </span>
                        ))}
                      </div>

                      {/* Title */}
                      <h2 className="font-heading text-xl text-text-primary mb-3 leading-tight">
                        <Link
                          to={`/blog/${post.slug}`}
                          className="hover:text-primary transition-colors"
                        >
                          {post.title}
                        </Link>
                      </h2>

                      {/* Excerpt */}
                      <p className="text-text-muted mb-4 line-clamp-3 flex-grow">
                        {post.excerpt}
                      </p>

                      {/* Meta Info */}
                      <div className="flex flex-wrap items-center gap-4 text-text-muted text-sm mb-4 pt-4 border-t border-border-muted">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>{formattedDate}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          <span>{post.readTime}</span>
                        </div>
                      </div>

                      {/* Read More Link */}
                      <Link
                        to={`/blog/${post.slug}`}
                        className="inline-flex items-center gap-2 text-primary font-medium hover:text-primary-dark transition-colors"
                      >
                        Read More
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-text-muted text-lg">No blog posts yet. Check back soon!</p>
            </div>
          )}
        </div>
      </Section>

      {/* CTA Section */}
      <Section bg="muted">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-heading text-3xl text-text-primary mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-text-muted mb-8">
            If you're preparing for an IEP meeting and want personalized support, 
            let's talk. Schedule your free 30-minute consultation today.
          </p>
          <Button
            href="https://docs.google.com/forms/d/e/1FAIpQLSeCZBm-Vppz8ReNgpLqQU9xA9kAUPihWj_-2gqSQ1AbtUCrCg/viewform?usp=header"
            target="_blank"
            rel="noopener noreferrer"
            size="lg"
          >
            Schedule Your Free Consultation
          </Button>
        </div>
      </Section>
    </>
  );
}
