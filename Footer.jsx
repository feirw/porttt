import React from 'react';
import { Github, Linkedin, Mail, Heart, Code, Coffee } from 'lucide-react';
import portfolioData from '../data/mock';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gradient-to-t from-black to-gray-900 border-t border-gray-800 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white to-transparent"></div>
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-gray-600 to-transparent"></div>
        <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-gray-600 to-transparent"></div>
      </div>

      <div className="container mx-auto px-6 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <button
              onClick={scrollToTop}
              className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent hover:from-gray-300 hover:to-white transition-all duration-300"
            >
              {portfolioData.personal.name}
            </button>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
              {portfolioData.personal.tagline}
            </p>
            <div className="flex items-center space-x-2 text-gray-500 text-sm">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-500 animate-pulse" />
              <span>and</span>
              <Coffee className="w-4 h-4 text-yellow-600" />
              <span>by a CS student</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-lg">Quick Links</h3>
            <div className="space-y-2">
              {[
                { name: 'About', href: '#about' },
                { name: 'Projects', href: '#projects' },
                { name: 'Experience', href: '#experience' },
                { name: 'Contact', href: '#contact' }
              ].map((link) => (
                <button
                  key={link.name}
                  onClick={() => {
                    const element = document.querySelector(link.href);
                    element?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="block text-gray-400 hover:text-white transition-colors duration-300 text-sm hover:translate-x-1 transform"
                >
                  {link.name}
                </button>
              ))}
            </div>
          </div>

          {/* Contact & Social */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-lg">Connect</h3>
            <div className="space-y-3">
              <a
                href={`mailto:${portfolioData.personal.email}`}
                className="flex items-center space-x-3 text-gray-400 hover:text-white transition-colors duration-300 group"
              >
                <Mail className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span className="text-sm">{portfolioData.personal.email}</span>
              </a>
              <div className="flex space-x-4 pt-2">
                <a
                  href={portfolioData.personal.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 group"
                >
                  <Github className="w-5 h-5 text-gray-400 group-hover:text-white" />
                </a>
                <a
                  href={portfolioData.personal.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 group"
                >
                  <Linkedin className="w-5 h-5 text-gray-400 group-hover:text-white" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4 text-gray-500 text-sm">
              <span>© {currentYear} {portfolioData.personal.name}</span>
              <div className="flex items-center space-x-1">
                <Code className="w-4 h-4" />
                <span>Built with React & FastAPI</span>
              </div>
            </div>
            
            <button
              onClick={scrollToTop}
              className="flex items-center space-x-2 text-gray-400 hover:text-white transition-all duration-300 transform hover:-translate-y-1 group"
            >
              <span className="text-sm">Back to top</span>
              <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center group-hover:bg-gray-700 transition-colors">
                <svg className="w-4 h-4 transform rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Animated background effect */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 animate-pulse"></div>
    </footer>
  );
};

export default Footer;