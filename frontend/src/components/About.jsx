import React from 'react';
import { MapPin, Mail, FileText } from 'lucide-react';
import { Button } from './ui/button';
import { portfolioData } from '../data/mockData';

const About = () => {
  const { personal } = portfolioData;

  return (
    <section id="about" className="py-24 bg-black relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-gray-900/50 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Content */}
          <div>
            {/* Section Label */}
            <p className="text-gray-500 text-sm tracking-[0.3em] uppercase mb-4">
              About Me
            </p>
            
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
              Passionate about
              <span className="block text-gray-400">Technology & Innovation</span>
            </h2>

            <p className="text-gray-400 text-lg leading-relaxed mb-8">
              {personal.bio}
            </p>

            {/* Info Cards */}
            <div className="flex flex-wrap gap-4 mb-8">
              <div className="flex items-center gap-3 bg-gray-900/50 border border-gray-800 rounded-full px-5 py-3">
                <MapPin size={18} className="text-gray-500" />
                <span className="text-gray-300 text-sm">{personal.location}</span>
              </div>
              <div className="flex items-center gap-3 bg-gray-900/50 border border-gray-800 rounded-full px-5 py-3">
                <Mail size={18} className="text-gray-500" />
                <span className="text-gray-300 text-sm">{personal.email}</span>
              </div>
            </div>

            <Button
              onClick={() => window.open(personal.resume_url, '_blank')}
              className="bg-white text-black hover:bg-gray-200 rounded-full px-6 py-5 text-sm font-medium transition-all inline-flex items-center gap-2"
            >
              <FileText size={18} />
              Download Resume
            </Button>
          </div>

          {/* Right Column - Stats */}
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8 hover:border-gray-700 transition-colors">
              <p className="text-5xl font-bold text-white mb-2">8.53</p>
              <p className="text-gray-500 text-sm uppercase tracking-wide">GPA / 10</p>
            </div>
            <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8 hover:border-gray-700 transition-colors">
              <p className="text-5xl font-bold text-white mb-2">7+</p>
              <p className="text-gray-500 text-sm uppercase tracking-wide">Certifications</p>
            </div>
            <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8 hover:border-gray-700 transition-colors">
              <p className="text-5xl font-bold text-white mb-2">5+</p>
              <p className="text-gray-500 text-sm uppercase tracking-wide">Hackathons</p>
            </div>
            <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8 hover:border-gray-700 transition-colors">
              <p className="text-5xl font-bold text-white mb-2">100K+</p>
              <p className="text-gray-500 text-sm uppercase tracking-wide">Social Views</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
