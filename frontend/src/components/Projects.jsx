import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Github, ExternalLink, Zap, Clock, X } from 'lucide-react';
import { portfolioData } from '../data/mockData';

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [visibleCards, setVisibleCards] = useState(new Set());
  const sectionRef = useRef(null);
  const { projects } = portfolioData;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.dataset.index);
            if (!isNaN(index)) {
              setVisibleCards((prev) => new Set([...prev, index]));
            }
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      const cards = document.querySelectorAll('.project-card');
      cards.forEach((card) => observer.observe(card));
    }, 100);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [projects]);

  const ProjectCard = ({ project, index }) => {
    const isVisible = visibleCards.has(index);
    const isCompleted = project.status === 'completed';

    return (
      <Card
        className={`project-card bg-gray-900/80 border-gray-800 hover:border-gray-600 transition-all duration-700 transform hover:scale-[1.02] hover:-translate-y-1 hover:shadow-xl hover:shadow-white/5 group cursor-pointer backdrop-blur-sm ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
        style={{ transitionDelay: `${index * 150}ms` }}
        data-index={index}
        onClick={() => setSelectedProject(project)}
      >
        <CardHeader className="pb-4">
          <div className="flex items-start justify-between mb-3">
            <CardTitle className="text-xl font-semibold text-white group-hover:text-gray-100 transition-colors pr-4">
              {project.title}
            </CardTitle>
            <div className="flex-shrink-0">
              {isCompleted ? (
                <div className="flex items-center gap-1.5 bg-green-900/30 border border-green-800/50 rounded-full px-3 py-1">
                  <Zap className="w-3.5 h-3.5 text-green-400" />
                  <span className="text-xs text-green-400 font-medium">Completed</span>
                </div>
              ) : (
                <div className="flex items-center gap-1.5 bg-yellow-900/30 border border-yellow-800/50 rounded-full px-3 py-1">
                  <Clock className="w-3.5 h-3.5 text-yellow-400" />
                  <span className="text-xs text-yellow-400 font-medium">In Progress</span>
                </div>
              )}
            </div>
          </div>

          <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors line-clamp-3">
            {project.description}
          </p>
        </CardHeader>

        <CardContent className="pt-0">
          <div className="mb-5">
            <div className="flex flex-wrap gap-2">
              {project.technologies.slice(0, 4).map((tech) => (
                <Badge
                  key={tech}
                  variant="secondary"
                  className="bg-gray-800 text-gray-300 hover:bg-gray-700 transition-colors text-xs rounded-full px-3 py-1"
                >
                  {tech}
                </Badge>
              ))}
              {project.technologies.length > 4 && (
                <Badge
                  variant="secondary"
                  className="bg-gray-800 text-gray-400 text-xs rounded-full px-3 py-1"
                >
                  +{project.technologies.length - 4}
                </Badge>
              )}
            </div>
          </div>

          <Button
            size="sm"
            variant="outline"
            className="border-gray-700 text-gray-300 hover:bg-white hover:text-black hover:border-white rounded-full transition-all w-full group-hover:border-gray-500"
            onClick={(e) => {
              e.stopPropagation();
              window.open(project.github_url, '_blank');
            }}
          >
            <Github className="w-4 h-4 mr-2" />
            View Code
          </Button>
        </CardContent>
      </Card>
    );
  };

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="py-24 bg-black relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-gray-800 to-transparent opacity-50" />
        <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-gray-800 to-transparent opacity-50" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-gray-500 text-sm tracking-[0.3em] uppercase mb-4">
            My Work
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Featured Projects
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-4">
            Here are some of the projects I've built during my journey as a computer science student.
          </p>
          <div className="w-24 h-1 bg-white mx-auto" />
        </div>

        {/* Projects Grid - Fixed to show all 3 projects properly */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* Project Details Modal */}
        {selectedProject && (
          <div
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedProject(null)}
          >
            <Card
              className="bg-gray-900 border-gray-700 max-w-2xl w-full max-h-[85vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <CardHeader className="relative">
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                >
                  <X size={24} />
                </button>
                <div className="flex items-center gap-3 mb-3">
                  {selectedProject.status === 'completed' ? (
                    <div className="flex items-center gap-1.5 bg-green-900/30 border border-green-800/50 rounded-full px-3 py-1">
                      <Zap className="w-3.5 h-3.5 text-green-400" />
                      <span className="text-xs text-green-400 font-medium">Completed</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5 bg-yellow-900/30 border border-yellow-800/50 rounded-full px-3 py-1">
                      <Clock className="w-3.5 h-3.5 text-yellow-400" />
                      <span className="text-xs text-yellow-400 font-medium">In Progress</span>
                    </div>
                  )}
                </div>
                <CardTitle className="text-2xl font-bold text-white mb-3 pr-8">
                  {selectedProject.title}
                </CardTitle>
                <p className="text-gray-300 leading-relaxed">
                  {selectedProject.description}
                </p>
              </CardHeader>

              <CardContent>
                <div className="space-y-6">
                  {/* Features */}
                  <div>
                    <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wide">
                      Key Features
                    </h4>
                    <ul className="space-y-2">
                      {selectedProject.features.map((feature, index) => (
                        <li key={index} className="text-gray-300 flex items-start">
                          <span className="w-1.5 h-1.5 bg-white rounded-full mr-3 mt-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Technologies */}
                  <div>
                    <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wide">
                      Technologies Used
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.technologies.map((tech) => (
                        <Badge
                          key={tech}
                          variant="secondary"
                          className="bg-gray-800 text-gray-300 rounded-full px-4 py-1.5"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4 pt-4">
                    <Button
                      className="bg-white text-black hover:bg-gray-200 flex-1 rounded-full"
                      onClick={() => window.open(selectedProject.github_url, '_blank')}
                    >
                      <Github className="w-4 h-4 mr-2" />
                      View Code
                    </Button>
                    {selectedProject.demo_url && selectedProject.demo_url !== '#' && (
                      <Button
                        variant="outline"
                        className="border-gray-600 text-gray-300 hover:bg-gray-800 flex-1 rounded-full"
                        onClick={() => window.open(selectedProject.demo_url, '_blank')}
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Live Demo
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
