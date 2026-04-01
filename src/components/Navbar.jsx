import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Services', path: '/services' },
  { name: 'Parent Education', path: '/parent-education' },
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
        {/* Logo centered on top */}
        <div className="flex justify-center pt-3 pb-2">
          <Link to="/">
            <img src="/logo-vertical.png" alt="Access Educational Advocacy" className="h-24 md:h-28 w-auto" />
          </Link>
          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden absolute right-4 top-6 p-2 rounded-lg text-text-secondary hover:bg-primary/5"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Nav links spread across below logo */}
        <div className="hidden lg:flex items-center justify-center gap-6 pb-3">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`px-4 py-2 rounded-lg text-sm font-medium tracking-wide transition-colors duration-200 ${
                location.pathname === link.path
                  ? 'bg-primary/10 text-primary'
                  : 'text-text-secondary hover:bg-primary/5 hover:text-primary'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <a
            href="tel:804-420-2273"
            className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-full font-medium text-sm hover:bg-primary-dark transition-colors duration-200"
          >
            <Phone className="w-4 h-4" />
            <span>(804) 420-2273</span>
          </a>
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
              <a
                href="tel:804-420-2273"
                className="flex items-center justify-center gap-2 mt-4 bg-primary text-white px-5 py-3 rounded-full font-medium text-sm"
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
