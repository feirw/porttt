import React from 'react';
import { Github, Linkedin, Mail, Heart, Code, Coffee, Instagram } from 'lucide-react';
import portfolioData from './data/mock';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gradient-to-t from-black via-zinc-950 to-zinc-900/80 border-t border-white/[0.06] relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white to-transparent"></div>
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-gray-600 to-transparent"></div>
        <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-gray-600 to-transparent"></div>
      </div>

      <div className="container mx-auto max-w-6xl px-4 sm:px-6 py-14 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
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
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-lg">Quick Links</h3>
            <div className="space-y-2">
              {[
                { name: 'About', href: '#about' },
                { name: 'Experience', href: '#experience' },
                { name: 'Projects', href: '#projects' },
                { name: 'Certificates', href: '#certificates' },
                { name: 'Hackathons', href: '#hackathons' },
                { name: 'Volunteer', href: '#volunteer' },
                { name: 'High school', href: '#highschool' },
                { name: 'Contact', href: '#contact' },
              ].map((link) => (
                <button
                  key={link.name}
                  type="button"
                  onClick={() => {
                    document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                  className="block w-full text-left text-zinc-500 hover:text-white transition-colors duration-200 text-sm py-1 rounded-md hover:translate-x-0.5"
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
              <div className="flex flex-wrap gap-3 pt-2">
                <a
                  href={portfolioData.personal.social_links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 bg-zinc-800/80 rounded-lg border border-zinc-700/50 hover:bg-zinc-700 hover:border-zinc-600 transition-all duration-200 hover:-translate-y-0.5 group min-h-[44px] min-w-[44px] flex items-center justify-center"
                  aria-label="GitHub"
                >
                  <Github className="w-5 h-5 text-zinc-400 group-hover:text-white" />
                </a>
                <a
                  href={portfolioData.personal.social_links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 bg-zinc-800/80 rounded-lg border border-zinc-700/50 hover:bg-zinc-700 hover:border-zinc-600 transition-all duration-200 hover:-translate-y-0.5 group min-h-[44px] min-w-[44px] flex items-center justify-center"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5 text-zinc-400 group-hover:text-white" />
                </a>
                {portfolioData.personal.social_links.instagram && (
                  <a
                    href={portfolioData.personal.social_links.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 bg-zinc-800/80 rounded-lg border border-zinc-700/50 hover:bg-zinc-700 hover:border-zinc-600 transition-all duration-200 hover:-translate-y-0.5 group min-h-[44px] min-w-[44px] flex items-center justify-center"
                    aria-label="Instagram"
                  >
                    <Instagram className="w-5 h-5 text-zinc-400 group-hover:text-white" />
                  </a>
                )}
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
                <span>Built with React</span>
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