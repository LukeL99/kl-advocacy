import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Services', path: '/services' },
  { name: 'About', path: '/about' },
  { name: 'FAQ', path: '/faq' },
  { name: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="bg-bg-secondary/95 backdrop-blur-sm sticky top-0 z-50 border-b border-border-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">KL</span>
            </div>
            <div>
              <span className="font-heading text-xl text-text-primary">KL Advocacy</span>
              <span className="hidden sm:block text-xs text-text-muted">Educational Advocacy Services</span>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  location.pathname === link.path
                    ? 'bg-primary/10 text-primary'
                    : 'text-text-secondary hover:bg-primary/5 hover:text-primary'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center">
            <a
              href="tel:804-420-2273"
              className="flex items-center gap-2 bg-primary text-white px-4 py-2.5 rounded-full font-medium text-sm hover:bg-primary-dark transition-colors duration-200"
            >
              <Phone className="w-4 h-4" />
              <span>(804) 420-2273</span>
            </a>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg text-text-secondary hover:bg-primary/5"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

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
