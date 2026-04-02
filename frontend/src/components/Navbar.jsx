import React, { useState, useEffect, useCallback } from 'react';
import { Button } from './ui/button';
import { Menu, X, Github, Download } from 'lucide-react';
import { usePersonalInfo } from './hooks/usePortfolioData';

const SECTION_IDS = ['about', 'experience', 'projects', 'hackathons', 'certificates', 'volunteer', 'highschool', 'contact'];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const { personalInfo, loading } = usePersonalInfo();

  const navItems = [
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Hackathons', href: '#hackathons' },
    { name: 'Certificates', href: '#certificates' },
    { name: 'Volunteer', href: '#volunteer' },
    { name: 'High school', href: '#highschool' },
    { name: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target.id) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-42% 0px -42% 0px', threshold: 0 }
    );

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const scrollToSection = useCallback((href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsOpen(false);
  }, []);

  const getInitials = () => {
    if (loading || !personalInfo) return '···';
    return personalInfo.name
      .split(' ')
      .map((word) => word.charAt(0))
      .join('');
  };

  const getGithubUrl = () => {
    return personalInfo?.social_links?.github || '#';
  };

  const getResumeUrl = () => {
    return personalInfo?.resume_url || '#';
  };

  return (
    <nav
      aria-label="Primary"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-black/85 backdrop-blur-lg border-b border-white/[0.06] shadow-[0_8px_30px_rgba(0,0,0,0.45)]'
          : 'bg-black/40 backdrop-blur-sm'
      }`}
    >
      <div className="container mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-xl sm:text-2xl font-bold tracking-tight bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent hover:from-gray-200 hover:to-white transition-all duration-300 rounded-md px-1 min-h-[44px] min-w-[44px] flex items-center justify-start"
              aria-label="Scroll to top"
            >
              {getInitials()}
            </button>
          </div>

          <div className="hidden lg:flex lg:items-center lg:gap-1 xl:gap-2">
            {navItems.map((item) => {
              const id = item.href.replace('#', '');
              const isActive = activeSection === id;
              return (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => scrollToSection(item.href)}
                  className={`rounded-md px-3 py-2 text-sm font-medium transition-colors duration-200 relative min-h-[40px] ${
                    isActive
                      ? 'text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {item.name}
                  <span
                    className={`absolute inset-x-2 bottom-1 h-0.5 rounded-full bg-white transition-transform duration-300 origin-left ${
                      isActive ? 'scale-x-100' : 'scale-x-0 hover:scale-x-80'
                    }`}
                    aria-hidden
                  />
                </button>
              );
            })}
          </div>

          <div className="hidden lg:flex items-center gap-2 xl:gap-3">
            <a
              href={getGithubUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 text-gray-400 hover:text-white transition-colors duration-200 rounded-md min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="GitHub profile"
            >
              <Github className="w-5 h-5" />
            </a>
            <Button
              variant="outline"
              size="sm"
              className="border-white/20 text-gray-200 hover:bg-white/10 hover:text-white hover:border-white/30 transition-all duration-200"
              onClick={() => window.open(getResumeUrl(), '_blank')}
            >
              <Download className="w-4 h-4 mr-2" />
              CV
            </Button>
          </div>

          <div className="lg:hidden">
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white p-2.5 rounded-md transition-colors duration-200 min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-expanded={isOpen}
              aria-controls="mobile-nav-panel"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        <div
          id="mobile-nav-panel"
          className={`lg:hidden overflow-hidden transition-[max-height,opacity] duration-300 ease-out ${
            isOpen ? 'max-h-[min(85vh,520px)] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
          }`}
          aria-hidden={!isOpen}
        >
          <div className="px-1 pt-2 pb-4 space-y-0.5 bg-black/92 backdrop-blur-xl rounded-xl mt-2 mb-3 border border-white/[0.08] shadow-xl">
            {navItems.map((item) => {
              const id = item.href.replace('#', '');
              const isActive = activeSection === id;
              return (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => scrollToSection(item.href)}
                  className={`flex w-full items-center rounded-lg px-4 py-3 text-left text-base font-medium transition-colors min-h-[48px] ${
                    isActive
                      ? 'bg-white/10 text-white'
                      : 'text-gray-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {item.name}
                </button>
              );
            })}

            <div className="pt-3 mt-2 border-t border-white/[0.08] flex flex-col gap-1">
              <a
                href={getGithubUrl()}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 text-gray-300 hover:text-white px-4 py-3 rounded-lg hover:bg-white/5 min-h-[48px]"
              >
                <Github className="w-5 h-5 shrink-0" />
                GitHub
              </a>
              <button
                type="button"
                onClick={() => {
                  window.open(getResumeUrl(), '_blank');
                  setIsOpen(false);
                }}
                className="flex items-center gap-3 text-gray-300 hover:text-white px-4 py-3 rounded-lg hover:bg-white/5 w-full text-left min-h-[48px]"
              >
                <Download className="w-5 h-5 shrink-0" />
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
