import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Mail, 
  Phone, 
  MapPin,
  Twitter,
  Linkedin,
  Github,
  MessageCircle
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 rounded-lg overflow-hidden">
                <img 
                  src="/image.png" 
                  alt="SlashByte Logo" 
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-xl font-bold">SlashByte</span>
            </Link>
            <p className="text-gray-300 mb-6 leading-relaxed">
              We build, design, code, and create. Empowering businesses with AI and digital solutions 
              that transform challenges into opportunities.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="bg-gray-800 p-2 rounded-lg hover:bg-blue-600 transition-colors duration-200"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="https://www.linkedin.com/company/slashbyte%E2%84%A2"
                className="bg-gray-800 p-2 rounded-lg hover:bg-blue-600 transition-colors duration-200"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="bg-gray-800 p-2 rounded-lg hover:bg-blue-600 transition-colors duration-200"
              >
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-6">AI Solutions</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/services" className="text-gray-300 hover:text-white transition-colors duration-200">
                  AI Chatbots
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-300 hover:text-white transition-colors duration-200">
                  RAG Systems
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Voice AI
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-300 hover:text-white transition-colors duration-200">
                  AI-Powered Apps
                </Link>
              </li>
            </ul>
          </div>

          {/* Digital Services */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Digital Services</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/services" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Web Development
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Mobile Apps
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-300 hover:text-white transition-colors duration-200">
                  UI/UX Design
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Digital Marketing
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Get in Touch</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-blue-400" />
                <span className="text-gray-300">hello@slashbyte.org</span>
              </div>
              <div className="flex items-center space-x-3">
                <MessageCircle className="h-5 w-5 text-green-400" />
                <span className="text-gray-300">WhatsApp Chat</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-purple-400" />
                <span className="text-gray-300">+916009915076</span>
              </div>
            </div>
            
            <div className="mt-6">
              <Link
                to="/contact"
                className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
              >
                Start Your Project
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Links */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-wrap justify-center md:justify-start space-x-6">
              <Link to="/about" className="text-gray-300 hover:text-white transition-colors duration-200">
                About
              </Link>
              <Link to="/services" className="text-gray-300 hover:text-white transition-colors duration-200">
                Services
              </Link>
              <Link to="/portfolio" className="text-gray-300 hover:text-white transition-colors duration-200">
                Portfolio
              </Link>
              <Link to="/careers" className="text-gray-300 hover:text-white transition-colors duration-200">
                Careers
              </Link>
              <Link to="/contact" className="text-gray-300 hover:text-white transition-colors duration-200">
                Contact
              </Link>
              <Link to="/privacy-policy" className="text-gray-300 hover:text-white transition-colors duration-200">
                Privacy Policy
              </Link>
              <Link to="/terms-of-service" className="text-gray-300 hover:text-white transition-colors duration-200">
                Terms of Service
              </Link>
            </div>
            
            <div className="text-gray-400 text-sm">
              © {currentYear} SlashByte. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;