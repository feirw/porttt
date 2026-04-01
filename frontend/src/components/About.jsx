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
        className="py-20 md:py-28 bg-gradient-to-b from-black via-zinc-950 to-zinc-900 relative overflow-hidden"
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
        className="py-20 md:py-28 bg-gradient-to-b from-black via-zinc-950 to-zinc-900 relative overflow-hidden"
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
      className="py-20 md:py-28 bg-gradient-to-b from-black via-zinc-950 to-zinc-900 relative overflow-hidden"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-64 h-64 border border-gray-600 rounded-full animate-spin-slow"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 border border-gray-600 rounded-full animate-spin-reverse"></div>
      </div>

      <div className="container mx-auto max-w-6xl px-4 sm:px-6 relative z-10">
        <div className={`text-center mb-12 md:mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            About <span className="bg-gradient-to-r from-zinc-200 to-white bg-clip-text text-transparent">me</span>
          </h2>
          <p className="text-zinc-500 text-base sm:text-lg max-w-xl mx-auto mb-6">
            Background, skills, and how I work with teams and technology.
          </p>
          <div className="w-20 h-px bg-gradient-to-r from-transparent via-zinc-500 to-transparent mx-auto" />
        </div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 md:gap-12 items-start">
          {/* Bio Section */}
          <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <Card className="bg-gradient-to-br from-zinc-900/90 to-black/90 border-zinc-700/80 p-6 sm:p-8 backdrop-blur-sm hover:shadow-xl hover:shadow-black/30 hover:border-zinc-600/80 transition-all duration-500 md:hover:-translate-y-0.5">
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
            <Card className="bg-gradient-to-br from-zinc-900/90 to-black/90 border-zinc-700/80 p-6 sm:p-8 backdrop-blur-sm hover:shadow-xl hover:shadow-black/30 hover:border-zinc-600/80 transition-all duration-500">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-6">Tech skills</h3>
              
              <div className="space-y-6">
                {/* Languages */}
                <div>
                  <h4 className="text-gray-300 font-semibold mb-3 flex items-center">
                    <div className="w-3 h-3 bg-gradient-to-r from-gray-400 to-white rounded-full mr-2"></div>
                    Programming languages
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

                <div>
                  <h4 className="text-gray-300 font-semibold mb-3 flex items-center">
                    <div className="w-3 h-3 bg-gradient-to-r from-gray-400 to-white rounded-full mr-2"></div>
                    Product &amp; delivery
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

                {softskills?.corporate?.length > 0 && (
                  <div className="pt-6 mt-6 border-t border-zinc-700/60">
                    <h4 className="text-zinc-300 font-semibold mb-3 flex items-center">
                      <div className="w-3 h-3 bg-gradient-to-r from-violet-400 to-zinc-200 rounded-full mr-2" />
                      Soft skills
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {softskills.corporate.map((skill) => (
                        <Badge
                          key={skill}
                          variant="secondary"
                          className="bg-zinc-800/90 border border-zinc-700/50 text-zinc-200 hover:bg-zinc-700/90 transition-colors"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {personalInfo.spoken_languages?.length > 0 && (
                  <div className="pt-6 mt-6 border-t border-zinc-700/60">
                    <h4 className="text-zinc-300 font-semibold mb-3 flex items-center">
                      <div className="w-3 h-3 bg-gradient-to-r from-sky-400 to-zinc-200 rounded-full mr-2" />
                      Languages
                    </h4>
                    <ul className="space-y-2 text-sm text-zinc-400 leading-relaxed">
                      {personalInfo.spoken_languages.map((line) => (
                        <li key={line} className="border-l-2 border-zinc-700 pl-3">
                          {line}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
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