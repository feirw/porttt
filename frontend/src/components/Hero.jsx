import React, { useEffect, useRef } from 'react';
import { Button } from './ui/button';
import { ChevronDown, Github, Linkedin, Mail } from 'lucide-react';
import { usePersonalInfo } from '../hooks/usePortfolioData';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';

const Hero = () => {
  const { personalInfo, loading, error } = usePersonalInfo();
  const heroRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const hero = heroRef.current;
      const text = textRef.current;
      
      if (hero && text) {
        // Parallax effect on background
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        // Fade out text as user scrolls
        text.style.opacity = Math.max(0, 1 - scrolled / 500);
        text.style.transform = `translateY(${scrolled * 0.3}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToNext = () => {
    const aboutSection = document.getElementById('about');
    aboutSection?.scrollIntoView({ behavior: 'smooth' });
  };

  if (loading) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black">
        <LoadingSpinner size="large" text="Loading portfolio..." />
      </section>
    );
  }

  if (error || !personalInfo) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black">
        <ErrorMessage 
          message={error || "Failed to load personal information"} 
          onRetry={() => window.location.reload()} 
        />
      </section>
    );
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-black via-gray-900 to-black">
      <div 
        ref={heroRef}
        className="absolute inset-0 bg-grid-pattern opacity-20"
        style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 0%, transparent 50%), 
                           radial-gradient(circle at 75% 75%, rgba(255,255,255,0.05) 0%, transparent 50%)`
        }}
      />
      
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="floating-code-1 absolute top-20 left-10 text-gray-600 font-mono text-sm opacity-30 animate-pulse">
          {`{ "status": "coding" }`}
        </div>
        <div className="floating-code-2 absolute top-40 right-20 text-gray-600 font-mono text-sm opacity-30 animate-pulse delay-1000">
          while(true) learn();
        </div>
        <div className="floating-code-3 absolute bottom-40 left-20 text-gray-600 font-mono text-sm opacity-30 animate-pulse delay-2000">
          const future = await build();
        </div>
      </div>

      <div ref={textRef} className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent mb-6 tracking-tight">
            {personalInfo.name}
          </h1>
          
          <div className="text-2xl md:text-3xl text-gray-300 mb-4 font-light">
            <span className="inline-block animate-typewriter">
              {personalInfo.title}
            </span>
          </div>
          
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            {personalInfo.tagline}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Button 
            className="bg-white text-black hover:bg-gray-200 px-8 py-4 text-lg font-semibold transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-white/20"
            onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })}
          >
            View My Work
          </Button>
          
          <Button 
            variant="outline" 
            className="border-gray-400 text-gray-300 hover:bg-gray-800 hover:text-white px-8 py-4 text-lg transform hover:scale-105 transition-all duration-300"
            onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
          >
            Get In Touch
          </Button>
        </div>

        {/* Social Links */}
        <div className="flex justify-center space-x-6 mb-12">
          <a 
            href={personalInfo.social_links.github}
            className="p-3 rounded-full bg-gray-800/50 hover:bg-gray-700 transition-all duration-300 transform hover:scale-110 hover:rotate-12"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github className="w-6 h-6 text-gray-300" />
          </a>
          <a 
            href={personalInfo.social_links.linkedin}
            className="p-3 rounded-full bg-gray-800/50 hover:bg-gray-700 transition-all duration-300 transform hover:scale-110 hover:rotate-12"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Linkedin className="w-6 h-6 text-gray-300" />
          </a>
          <a 
            href={`mailto:${personalInfo.email}`}
            className="p-3 rounded-full bg-gray-800/50 hover:bg-gray-700 transition-all duration-300 transform hover:scale-110 hover:rotate-12"
          >
            <Mail className="w-6 h-6 text-gray-300" />
          </a>
        </div>

        {/* Scroll indicator */}
        <div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer animate-bounce"
          onClick={scrollToNext}
        >
          <ChevronDown className="w-8 h-8 text-gray-400 hover:text-white transition-colors" />
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes typewriter {
          from { width: 0; }
          to { width: 100%; }
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
        
        .animate-typewriter {
          overflow: hidden;
          border-right: 2px solid white;
          white-space: nowrap;
          animation: typewriter 3s steps(40) 1s both;
        }
        
        .bg-grid-pattern {
          background-image: 
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px);
          background-size: 50px 50px;
        }
      `}</style>
    </section>
  );
};

export default Hero;