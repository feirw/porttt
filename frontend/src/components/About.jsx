import React, { useRef, useEffect, useState } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { usePersonalInfo, useSkills, useSoftSkills } from './hooks/usePortfolioData';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const { personalInfo, loading: personalLoading, error: personalError } = usePersonalInfo();
  const { skills, loading: skillsLoading, error: skillsError } = useSkills();
  const { softskills } = useSoftSkills();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const loading = personalLoading || skillsLoading;
  const error = personalError || skillsError;

  if (loading) {
    return (
      <section 
        id="about" 
        ref={sectionRef}
        className="py-20 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden"
      >
        <div className="container mx-auto px-6 relative z-10">
          <LoadingSpinner size="large" text="Loading about information..." />
        </div>
      </section>
    );
  }

  if (error || !personalInfo || !skills) {
    return (
      <section 
        id="about" 
        ref={sectionRef}
        className="py-20 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden"
      >
        <div className="container mx-auto px-6 relative z-10">
          <ErrorMessage 
            message={error || "Failed to load about information"} 
            onRetry={() => window.location.reload()} 
          />
        </div>
      </section>
    );
  }

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="py-20 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-64 h-64 border border-gray-600 rounded-full animate-spin-slow"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 border border-gray-600 rounded-full animate-spin-reverse"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-5xl font-bold text-white mb-4">
            About <span className="bg-gradient-to-r from-gray-300 to-white bg-clip-text text-transparent">Me</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-gray-600 to-white mx-auto"></div>
        </div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          {/* Bio Section */}
          <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <Card className="bg-gradient-to-br from-gray-900/80 to-black/80 border-gray-700 p-8 backdrop-blur-sm hover:shadow-2xl hover:shadow-white/10 transition-all duration-500 transform hover:scale-105">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-white mb-4">
                  Hello, I'm {personalInfo.name}
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed">
                  {personalInfo.bio}
                </p>
              </div>
              
            </Card>
          </div>

          {/* Skills Section */}
          <div className={`transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <Card className="bg-gradient-to-br from-gray-900/80 to-black/80 border-gray-700 p-8 backdrop-blur-sm hover:shadow-2xl hover:shadow-white/10 transition-all duration-500">
              <h3 className="text-2xl font-bold text-white mb-6">Tech Skills</h3>
              
              <div className="space-y-6">
                {/* Languages */}
                <div>
                  <h4 className="text-gray-300 font-semibold mb-3 flex items-center">
                    <div className="w-3 h-3 bg-gradient-to-r from-gray-400 to-white rounded-full mr-2"></div>
                    Languages
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {skills.languages.map((skill, index) => (
                      <Badge 
                        key={skill} 
                        variant="secondary" 
                        className={`bg-gray-800 hover:bg-gray-700 text-gray-300 transition-all duration-300 transform hover:scale-110 cursor-default animate-fade-in-delay-${index}`}
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Frameworks */}
                <div>
                  <h4 className="text-gray-300 font-semibold mb-3 flex items-center">
                    <div className="w-3 h-3 bg-gradient-to-r from-gray-400 to-white rounded-full mr-2"></div>
                    Frameworks
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {skills.frameworks.map((skill, index) => (
                      <Badge 
                        key={skill} 
                        variant="secondary" 
                        className={`bg-gray-800 hover:bg-gray-700 text-gray-300 transition-all duration-300 transform hover:scale-110 cursor-default animate-fade-in-delay-${index}`}
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Tools */}
                <div>
                  <h4 className="text-gray-300 font-semibold mb-3 flex items-center">
                    <div className="w-3 h-3 bg-gradient-to-r from-gray-400 to-white rounded-full mr-2"></div>
                    Concepts
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {[...skills.concepts].map((skill, index) => (
                      <Badge 
                        key={skill} 
                        variant="secondary" 
                        className={`bg-gray-800 hover:bg-gray-700 text-gray-300 transition-all duration-300 transform hover:scale-110 cursor-default animate-fade-in-delay-${index}`}
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes spin-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        
        .animate-spin-reverse {
          animation: spin-reverse 15s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default About;