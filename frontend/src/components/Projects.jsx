import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Github, ExternalLink, Code, Zap } from 'lucide-react';
import { useProjects } from './hooks/usePortfolioData';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [visibleCards, setVisibleCards] = useState(new Set());
  const sectionRef = useRef(null);
  const { projects, loading, error } = useProjects();

  useEffect(() => {
    if (!projects || projects.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.dataset.index);
            if (!isNaN(index)) {
              setVisibleCards(prev => new Set([...prev, index]));
            }
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    const timer = setTimeout(() => {
      const cards = document.querySelectorAll('.project-card');
      cards.forEach(card => observer.observe(card));
    }, 100);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [projects]);

  if (loading) {
    return (
      <section id="projects" ref={sectionRef} className="py-20 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <LoadingSpinner size="large" text="Loading projects..." />
        </div>
      </section>
    );
  }

  if (error || !projects) {
    return (
      <section id="projects" ref={sectionRef} className="py-20 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <ErrorMessage 
            message={error || "Failed to load projects"} 
            onRetry={() => window.location.reload()} 
          />
        </div>
      </section>
    );
  }

  const ProjectCard = ({ project, index }) => {
    const isVisible = visibleCards.has(index);
    
    return (
      <Card 
        className={`project-card bg-gradient-to-br from-gray-900/90 to-black/90 border-gray-700 hover:border-gray-500 transition-all duration-500 transform hover:scale-[1.02] hover:-translate-y-2 hover:shadow-2xl hover:shadow-white/20 group cursor-pointer backdrop-blur-sm ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
        style={{ transitionDelay: `${index * 150}ms` }}
        data-index={index}
        onClick={() => setSelectedProject(project)}
      >
        <CardHeader className="pb-4">
          <div className="flex items-start justify-between mb-2">
            <CardTitle className="text-xl font-bold text-white group-hover:text-gray-300 transition-colors">
              {project.title}
            </CardTitle>
            <div className="flex space-x-2">
              {project.status === 'completed' ? (
                <Zap className="w-5 h-5 text-green-400" />
              ) : (
                <Code className="w-5 h-5 text-yellow-400" />
              )}
            </div>
          </div>
          
          <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors">
            {project.description}
          </p>
        </CardHeader>

        <CardContent className="pt-0">
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {project.technologies.slice(0, 4).map((tech) => (
                <Badge 
                  key={tech}
                  variant="secondary"
                  className="bg-gray-800 text-gray-300 hover:bg-gray-700 transition-colors text-xs"
                >
                  {tech}
                </Badge>
              ))}
              {project.technologies.length > 4 && (
                <Badge variant="secondary" className="bg-gray-800 text-gray-300 text-xs">
                  +{project.technologies.length - 4}
                </Badge>
              )}
            </div>
          </div>

          <div className="flex space-x-3">
            <Button
              size="sm"
              variant="outline"
              className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white flex-1 group-hover:border-gray-400 transition-all"
              onClick={(e) => {
                e.stopPropagation();
                window.open(project.github_url, '_blank');
              }}
            >
              <Github className="w-4 h-4 mr-2" />
              Code
            </Button>
          </div>
        </CardContent>

        {/* Hover effect overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg pointer-events-none"></div>
      </Card>
    );
  };

  return (
    <section id="projects" ref={sectionRef} className="py-20 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-gray-600 to-transparent animate-pulse"></div>
        <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-gray-600 to-transparent animate-pulse delay-1000"></div>
        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent animate-pulse delay-500"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-white mb-4">
            My <span className="bg-gradient-to-r from-gray-300 to-white bg-clip-text text-transparent">Projects</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Here are some of the projects I've built during my journey as a computer science student.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-gray-600 to-white mx-auto mt-4"></div>
        </div>

        {/* Vertical stack layout - one below another */}
        <div className="flex flex-col gap-6 max-w-4xl mx-auto">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* Project Details Modal */}
        {selectedProject && (
          <div 
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedProject(null)}
          >
            <Card 
              className="bg-gradient-to-br from-gray-900 to-black border-gray-600 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-white mb-2">
                  {selectedProject.title}
                </CardTitle>
                <p className="text-gray-300 leading-relaxed">
                  {selectedProject.description}
                </p>
              </CardHeader>

              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h4 className="text-white font-semibold mb-3">Key Features</h4>
                    <ul className="space-y-2">
                      {selectedProject.features.map((feature, index) => (
                        <li key={index} className="text-gray-300 flex items-center">
                          <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-white font-semibold mb-3">Technologies Used</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.technologies.map((tech) => (
                        <Badge 
                          key={tech}
                          variant="secondary"
                          className="bg-gray-800 text-gray-300"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex space-x-4 pt-4">
                    <Button
                      className="bg-white text-black hover:bg-gray-200 flex-1"
                      onClick={() => window.open(selectedProject.github_url, '_blank')}
                    >
                      <Github className="w-4 h-4 mr-2" />
                      View Code
                    </Button>
                    <Button
                      variant="outline"
                      className="border-gray-600 text-gray-300 hover:bg-gray-800 flex-1"
                      onClick={() => window.open(selectedProject.demo_url, '_blank')}
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Live Demo
                    </Button>
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

export default Projects;3