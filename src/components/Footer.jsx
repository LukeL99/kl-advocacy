import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <span className="font-bold text-xl">KL</span>
              </div>
              <div>
                <span className="font-heading text-xl">KL Advocacy</span>
              </div>
            </div>
            <p className="text-cyan-100 text-sm leading-relaxed">
              Empowering parents to advocate for their children's educational rights. 
              Your child deserves the best possible education.
            </p>
          </div>

          <div>
            <h3 className="font-heading text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/services" className="text-cyan-100 hover:text-white text-sm">Services</Link></li>
              <li><Link to="/about" className="text-cyan-100 hover:text-white text-sm">About Karlie</Link></li>
              <li><Link to="/faq" className="text-cyan-100 hover:text-white text-sm">FAQ</Link></li>
              <li><Link to="/contact" className="text-cyan-100 hover:text-white text-sm">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-lg mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-sm">
                <Phone className="w-4 h-4 text-cyan-200" />
                <a href="tel:804-420-2273" className="text-cyan-100 hover:text-white">(804) 420-2273</a>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Mail className="w-4 h-4 text-cyan-200" />
                <a href="mailto:info@kladvocacy.com" className="text-cyan-100 hover:text-white">info@kladvocacy.com</a>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <MapPin className="w-4 h-4 text-cyan-200" />
                <span className="text-cyan-100">Richmond, Virginia</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-8 text-center text-cyan-200 text-sm">
          <p>&copy; {new Date().getFullYear()} KL Advocacy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
