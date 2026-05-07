import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, Tag } from 'lucide-react';
import { blogPosts } from '../data/blogPosts';
import Section from '../components/Section';
import Button from '../components/Button';
import { useContactModal } from '../components/ContactModal';

// Get unique categories from all posts
const allCategories = [...new Set(blogPosts.flatMap(p => p.categories))].sort();

export default function Blog() {
  const [activeFilter, setActiveFilter] = useState('All');
  const { openContactModal } = useContactModal();

  // Sort posts by date (newest first)
  const sortedPosts = [...blogPosts].sort((a, b) => new Date(b.date) - new Date(a.date));

  // Featured post is the latest
  const featuredPost = sortedPosts[0];
  const remainingPosts = sortedPosts.slice(1);

  // Filter remaining posts
  const filteredPosts = activeFilter === 'All'
    ? remainingPosts
    : remainingPosts.filter(p => p.categories.includes(activeFilter));

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

  return (
    <>
      <Section bg="primary">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="font-heading text-4xl md:text-5xl text-text-primary mb-6">
            Educational Advocacy Blog
          </h1>
          <p className="text-lg text-text-muted">
            Expert insights, practical guidance, and empowering resources for parents
            navigating the IEP process and special education system.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Featured Post */}
          {featuredPost && (
            <Link
              to={`/blog/${featuredPost.slug}`}
              className="block mb-12 group"
            >
              <article className="bg-bg-secondary rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300">
                <div className="grid md:grid-cols-2 gap-0">
                  <div className="h-64 md:h-full overflow-hidden">
                    <img
                      src={featuredPost.image || '/images/blog-iep-meeting-prep.png'}
                      alt={featuredPost.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-8 flex flex-col justify-center">
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-accent/15 text-accent text-xs font-medium rounded-full">
                        Latest
                      </span>
                      {featuredPost.categories.map((category, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                        >
                          <Tag className="w-3 h-3" />
                          {category}
                        </span>
                      ))}
                    </div>
                    <h2 className="font-heading text-2xl md:text-3xl text-text-primary mb-4 leading-tight group-hover:text-primary transition-colors">
                      {featuredPost.title}
                    </h2>
                    <p className="text-text-muted mb-6 leading-relaxed">
                      {featuredPost.excerpt}
                    </p>
                    <div className="flex items-center gap-4 text-text-muted text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(featuredPost.date)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{featuredPost.readTime}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            </Link>
          )}

          {/* Category Filters */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
            <button
              onClick={() => setActiveFilter('All')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeFilter === 'All'
                  ? 'bg-primary text-white'
                  : 'bg-bg-secondary text-text-muted hover:bg-primary/10 hover:text-primary'
              }`}
            >
              All
            </button>
            {allCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeFilter === cat
                    ? 'bg-primary text-white'
                    : 'bg-bg-secondary text-text-muted hover:bg-primary/10 hover:text-primary'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Post Grid */}
          {filteredPosts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <article
                  key={post.slug}
                  className="bg-bg-secondary rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col"
                >
                  <div className="h-48 overflow-hidden">
                    <img
                      src={post.image || '/images/blog-iep-meeting-prep.png'}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6 flex-grow flex flex-col">
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
                    <h2 className="font-heading text-xl text-text-primary mb-3 leading-tight">
                      <Link
                        to={`/blog/${post.slug}`}
                        className="hover:text-primary transition-colors"
                      >
                        {post.title}
                      </Link>
                    </h2>
                    <p className="text-text-muted mb-4 line-clamp-3 flex-grow">
                      {post.excerpt}
                    </p>
                    <div className="flex flex-wrap items-center gap-4 text-text-muted text-sm mb-4 pt-4 border-t border-border-muted">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(post.date)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                    <Link
                      to={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-2 text-primary font-medium hover:text-primary-dark transition-colors"
                    >
                      Read More
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-text-muted text-lg">No posts in this category yet.</p>
              <button
                onClick={() => setActiveFilter('All')}
                className="mt-4 text-primary font-medium hover:text-primary-dark transition-colors"
              >
                View all posts
              </button>
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
            If you&apos;re preparing for an IEP meeting and want personalized support,
            let&apos;s talk. Schedule your free consultation today.
          </p>
          <Button size="lg" onClick={() => openContactModal('free-consultation')}>
            Schedule Your Free Consultation
          </Button>
        </div>
      </Section>
    </>
  );
}
