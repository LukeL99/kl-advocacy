import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Facebook, Instagram } from 'lucide-react';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Services', path: '/services' },
  { name: 'Parent Education', path: '/parent-education' },
  { name: 'Resource Library', path: '/resources' },
  { name: 'About', path: '/about' },
  { name: 'FAQ', path: '/faq' },
  { name: 'Blog', path: '/blog' },
  { name: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="bg-bg-primary/95 backdrop-blur-sm sticky top-0 z-50 border-b border-border-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top bar: logo left, phone + social right */}
        <div className="flex items-center justify-between py-3">
          <Link to="/" className="shrink-0">
            <img src="/logo-vertical.png" alt="Access Educational Advocacy" className="h-20 md:h-28 w-auto" />
          </Link>

          {/* Right side: social + phone (desktop) */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="https://www.facebook.com/myaccessadvocacy"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
              aria-label="Facebook"
            >
              <Facebook className="w-5 h-5" />
            </a>
            <a
              href="https://www.instagram.com/myaccessadvocacy"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="tel:804-420-2273"
              className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-full font-medium text-sm hover:bg-primary-dark transition-colors duration-200 ml-1"
            >
              <Phone className="w-4 h-4" />
              <span>(804) 420-2273</span>
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg text-text-secondary hover:bg-primary/5"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Nav links row (desktop) */}
        <div className="hidden lg:flex items-center justify-center pb-3">
          <div className="flex items-center border border-primary/30 rounded-full overflow-hidden">
            {navLinks.map((link, i) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-5 py-2.5 text-sm font-medium tracking-wide transition-colors duration-200 whitespace-nowrap ${
                  i > 0 ? 'border-l border-primary/30' : ''
                } ${
                  location.pathname === link.path
                    ? 'bg-primary text-white'
                    : 'text-primary hover:bg-primary/10'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="lg:hidden py-4 border-t border-border-muted">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`px-4 py-3 rounded-lg text-sm font-medium ${
                    location.pathname === link.path
                      ? 'bg-primary/10 text-primary'
                      : 'text-text-secondary hover:bg-primary/5'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="flex items-center justify-center gap-4 mt-4">
                <a
                  href="https://www.facebook.com/myaccessadvocacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href="https://www.instagram.com/myaccessadvocacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
              <a
                href="tel:804-420-2273"
                className="flex items-center justify-center gap-2 mt-3 bg-primary text-white px-5 py-3 rounded-full font-medium text-sm"
              >
                <Phone className="w-4 h-4" />
                <span>(804) 420-2273</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
