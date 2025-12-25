import React from 'react';
import { ArrowDown, Github, Linkedin, Instagram } from 'lucide-react';
import { Button } from './ui/button';
import { portfolioData } from '../data/mockData';

const Hero = () => {
  const { personal } = portfolioData;

  const scrollToAbout = () => {
    const element = document.querySelector('#about');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden"
    >
      {/* Animated Background Lines */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-gray-700/50 to-transparent animate-pulse" />
        <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-gray-700/30 to-transparent animate-pulse delay-700" />
        <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-gray-700/50 to-transparent animate-pulse delay-1000" />
        <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-700/30 to-transparent animate-pulse delay-500" />
      </div>

      {/* Gradient Orbs */}
      <div className="absolute top-20 right-20 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-20 w-80 h-80 bg-gray-500/10 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center">
          {/* Greeting */}
          <p className="text-gray-400 text-sm tracking-[0.3em] uppercase mb-6 animate-fade-in">
            Hello, I'm
          </p>

          {/* Name */}
          <h1 className="font-bold text-5xl md:text-7xl lg:text-8xl text-white mb-6 tracking-tight">
            {personal.name}
          </h1>

          {/* Title */}
          <h2 className="text-xl md:text-2xl lg:text-3xl text-gray-300 mb-4 font-light">
            {personal.title}
          </h2>

          {/* Tagline */}
          <p className="text-gray-500 text-lg md:text-xl max-w-2xl mx-auto mb-10">
            {personal.tagline}
          </p>

          {/* Social Links */}
          <div className="flex items-center justify-center gap-6 mb-12">
            <a
              href={personal.social_links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full"
            >
              <Github size={24} />
            </a>
            <a
              href={personal.social_links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full"
            >
              <Linkedin size={24} />
            </a>
            <a
              href={personal.social_links.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full"
            >
              <Instagram size={24} />
            </a>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-white text-black hover:bg-gray-200 rounded-full px-8 py-6 text-sm font-medium transition-all"
            >
              View My Work
            </Button>
            <Button
              variant="outline"
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="border-gray-600 text-gray-300 hover:bg-white/10 hover:text-white rounded-full px-8 py-6 text-sm font-medium transition-all"
            >
              Contact Me
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={scrollToAbout}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gray-400 hover:text-white transition-colors animate-bounce"
      >
        <ArrowDown size={24} />
      </button>
    </section>
  );
};

export default Hero;
