import React, { useRef, useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Building, Calendar, MapPin, Trophy } from 'lucide-react';
import { useExperience, useEducation } from './hooks/usePortfolioData';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';

const Experience = () => {
  const [visibleItems, setVisibleItems] = useState(new Set());
  const sectionRef = useRef(null);
  const { experience, loading: expLoading, error: expError } = useExperience();
  const { education, loading: eduLoading, error: eduError } = useEducation();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.dataset.index, 10);
            setVisibleItems(prev => new Set([...prev, index]));
          }
        });
      },
      { threshold: 0.3 }
    );

    const items = document.querySelectorAll('.experience-item');
    items.forEach(item => observer.observe(item));

    return () => observer.disconnect();
  }, [experience]);

  const loading = expLoading || eduLoading;
  const error = expError || eduError;

  if (loading) {
    return (
      <section id="experience" ref={sectionRef} className="py-20 md:py-28 bg-gradient-to-b from-black via-zinc-950 to-black relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <LoadingSpinner size="large" text="Loading experience..." />
        </div>
      </section>
    );
  }

  if (error || !education || !Array.isArray(experience)) {
    return (
      <section id="experience" ref={sectionRef} className="py-20 md:py-28 bg-gradient-to-b from-black via-zinc-950 to-black relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <ErrorMessage 
            message={error || "Failed to load experience information"} 
            onRetry={() => window.location.reload()} 
          />
        </div>
      </section>
    );
  }

  return (
    <section id="experience" ref={sectionRef} className="py-20 md:py-28 bg-gradient-to-b from-black via-zinc-950 to-black relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-2 h-2 bg-white rounded-full animate-ping"></div>
        <div className="absolute top-40 right-20 w-1 h-1 bg-gray-400 rounded-full animate-ping delay-1000"></div>
        <div className="absolute bottom-20 left-1/3 w-1.5 h-1.5 bg-gray-300 rounded-full animate-ping delay-2000"></div>
      </div>

      <div className="container mx-auto max-w-6xl px-4 sm:px-6 relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            Education &{' '}
            <span className="bg-gradient-to-r from-zinc-200 to-white bg-clip-text text-transparent">experience</span>
          </h2>
          <p className="text-zinc-500 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            University, high school, then professional roles.
          </p>
          <div className="w-20 h-px bg-gradient-to-r from-transparent via-zinc-500 to-transparent mx-auto mt-6" />
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Education Section */}
          <div className="mb-16">
            <h3 className="text-3xl font-bold text-white mb-8 text-center">Education</h3>
            <Card className="bg-gradient-to-br from-gray-900/90 to-black/90 border-gray-700 hover:border-gray-500 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-white/10 backdrop-blur-sm">
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <CardTitle className="text-2xl font-bold text-white">
                    {education.degree}
                  </CardTitle>
                  <Badge variant="secondary" className="bg-gray-800 text-gray-300 w-fit mt-2 md:mt-0">
                    GPA: {education.gpa}
                  </Badge>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center text-gray-400">
                    <Building className="w-4 h-4 mr-2" />
                    <span>{education.university}</span>
                  </div>
                  <div className="flex items-center text-gray-400">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>{education.duration}</span>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <div>
                  <h4 className="text-white font-semibold mb-4">Relevant coursework</h4>
                  <div className="flex flex-wrap gap-2">
                    {education.relevant_courses1.map((course) => (
                      <Badge
                        key={course}
                        variant="secondary"
                        className="bg-gray-800 text-gray-300 hover:bg-gray-700 transition-colors text-xs"
                      >
                        {course}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div id="highschool" className="mt-14 md:mt-20 scroll-mt-28 mb-16 md:mb-20">
            <h3 className="text-3xl font-bold text-white mb-8 text-center">
              My high school experience
            </h3>
            <Card className="bg-gradient-to-br from-gray-900/90 to-black/90 border-gray-700 hover:border-gray-500 transition-all duration-500 transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-white/10 backdrop-blur-sm">
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-3">
                  <CardTitle className="text-xl sm:text-2xl font-bold text-white leading-snug">
                    High School Diploma: Computer Science &amp; Finance
                  </CardTitle>
                  <Badge variant="secondary" className="bg-gray-800 text-gray-300 w-fit shrink-0">
                    GPA: 19.7/20
                  </Badge>
                </div>
                <div className="space-y-2 text-gray-400 text-sm sm:text-base">
                  <div className="flex items-center gap-2">
                    <Building className="w-4 h-4 shrink-0" />
                    <span>General High School of Spercheiada</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 shrink-0" />
                    <span>9/2021 – 6/2024</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                  <div>
                    <h4 className="text-white font-semibold mb-3">Relevant coursework</h4>
                    <div className="flex flex-wrap gap-2">
                      {education.relevant_courses2.map((course) => (
                        <Badge
                          key={course}
                          variant="secondary"
                          className="bg-gray-800 text-gray-300 hover:bg-gray-700 transition-colors text-xs"
                        >
                          {course}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                      <Trophy className="w-4 h-4" />
                      Achievements
                    </h4>
                    <ul className="space-y-2">
                      {education.achievements2.map((achievement, idx) => (
                        <li key={idx} className="text-gray-300 flex items-start text-sm leading-relaxed">
                          <span className="w-2 h-2 bg-white rounded-full mr-3 mt-2 shrink-0" />
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Work experience timeline */}
          {Array.isArray(experience) && experience.length > 0 && (
            <div>
              <h3 className="text-3xl font-bold text-white mb-8 text-center">Work Experience</h3>
              <div className="relative">
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-gray-600 to-gray-800"></div>
                
                <div className="space-y-12">
                  {experience.map((exp, index) => (
                    <div 
                      key={exp.id}
                      className={`experience-item relative transition-all duration-700 ${
                        visibleItems.has(index) ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
                      }`}
                      style={{ transitionDelay: `${index * 300}ms` }}
                      data-index={index}
                    >
                      <div className="absolute left-6 w-4 h-4 bg-white rounded-full border-4 border-gray-900 z-10"></div>
                      
                      <Card className="ml-20 bg-gradient-to-br from-gray-900/90 to-black/90 border-gray-700 hover:border-gray-500 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-white/10 group backdrop-blur-sm">
                        <CardHeader>
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                            <CardTitle className="text-xl font-bold text-white group-hover:text-gray-300 transition-colors">
                              {exp.position}
                            </CardTitle>
                            <Badge variant="secondary" className="bg-gray-800 text-gray-300 w-fit mt-2 md:mt-0">
                              {exp.duration}
                            </Badge>
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex items-center text-gray-400">
                              <Building className="w-4 h-4 mr-2" />
                              <span>{exp.company}</span>
                            </div>
                            <div className="flex items-center text-gray-400">
                              <MapPin className="w-4 h-4 mr-2" />
                              <span>{exp.location}</span>
                            </div>
                          </div>
                        </CardHeader>

                        <CardContent>
                          <p className="text-gray-300 mb-4 leading-relaxed">
                            {exp.description}
                          </p>
                          
                          <div>
                            <h4 className="text-white font-semibold mb-3 flex items-center">
                              <Trophy className="w-4 h-4 mr-2" />
                              Key Achievements
                            </h4>
                            <ul className="space-y-2">
                              {exp.achievements.map((achievement, idx) => (
                                <li key={idx} className="text-gray-300 flex items-start">
                                  <div className="w-2 h-2 bg-white rounded-full mr-3 mt-2 flex-shrink-0"></div>
                                  <span>{achievement}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  );
};

export default Experience;