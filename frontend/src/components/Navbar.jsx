import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Menu, X, Github, Download } from 'lucide-react';
import { usePersonalInfo } from './hooks/usePortfolioData';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { personalInfo, loading } = usePersonalInfo();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' }
  ];

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  // Show initials or loading state
  const getInitials = () => {
    if (loading || !personalInfo) return 'Loading...';
    return personalInfo.name.split(' ').map(word => word.charAt(0)).join('');
  };

  const getGithubUrl = () => {
    return personalInfo?.social_links?.github || '#';
  };

  const getResumeUrl = () => {
    return personalInfo?.resume_url || '#';
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-black/90 backdrop-blur-md border-b border-gray-800' 
        : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent hover:from-gray-300 hover:to-white transition-all duration-300"
            >
              {getInitials()}
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium transition-all duration-300 relative group"
                >
                  {item.name}
                  <span className="absolute inset-x-0 bottom-0 h-0.5 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                </button>
              ))}
            </div>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <a
              href={getGithubUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-gray-300 hover:text-white transition-colors duration-300"
            >
              <Github className="w-5 h-5" />
            </a>
            <Button
              variant="outline"
              size="sm"
              className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white transition-all duration-300"
              onClick={() => window.open(getResumeUrl(), '_blank')}
            >
              <Download className="w-4 h-4 mr-2" />
              Resume
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white p-2 transition-colors duration-300"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden transition-all duration-300 ease-in-out ${
          isOpen 
            ? 'max-h-96 opacity-100' 
            : 'max-h-0 opacity-0 overflow-hidden'
        }`}>
          <div className="px-2 pt-2 pb-3 space-y-1 bg-black/95 backdrop-blur-md rounded-lg mt-2 border border-gray-800">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="text-gray-300 hover:text-white block px-3 py-2 text-base font-medium w-full text-left transition-colors duration-300 hover:bg-gray-800 rounded-md"
              >
                {item.name}
              </button>
            ))}
            
            <div className="pt-4 border-t border-gray-800 flex flex-col space-y-2">
              <a
                href={getGithubUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-gray-300 hover:text-white px-3 py-2 transition-colors duration-300 hover:bg-gray-800 rounded-md"
              >
                <Github className="w-5 h-5 mr-2" />
                GitHub
              </a>
              <button
                onClick={() => {
                  window.open(getResumeUrl(), '_blank');
                  setIsOpen(false);
                }}
                className="flex items-center text-gray-300 hover:text-white px-3 py-2 transition-colors duration-300 hover:bg-gray-800 rounded-md w-full text-left"
              >
                <Download className="w-5 h-5 mr-2" />
                Download CV
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;