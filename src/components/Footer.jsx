import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <img src="/logo.png" alt="Access Educational Advocacy" className="h-16 w-auto mb-4 brightness-0 invert" />
            <p className="font-tagline text-blue-200 text-sm mb-3">Navigating education, together.</p>
            <p className="text-blue-100 text-sm leading-relaxed">
              Helping families access their child's education with confidence and clarity. 
              Your child deserves the best possible education.
            </p>
          </div>

          <div>
            <h3 className="font-heading text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/services" className="text-blue-100 hover:text-white text-sm">Services</Link></li>
              <li><Link to="/about" className="text-blue-100 hover:text-white text-sm">About Karlie</Link></li>
              <li><Link to="/faq" className="text-blue-100 hover:text-white text-sm">FAQ</Link></li>
              <li><Link to="/contact" className="text-blue-100 hover:text-white text-sm">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-lg mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-sm">
                <Phone className="w-4 h-4 text-blue-200" />
                <a href="tel:804-420-2273" className="text-blue-100 hover:text-white">(804) 420-2273</a>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Mail className="w-4 h-4 text-blue-200" />
                <a href="mailto:info@kladvocacy.com" className="text-blue-100 hover:text-white">info@kladvocacy.com</a>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <MapPin className="w-4 h-4 text-blue-200" />
                <span className="text-blue-100">Richmond, Virginia</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-8 text-center text-blue-200 text-sm">
          <p>&copy; {new Date().getFullYear()} Access Educational Advocacy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
