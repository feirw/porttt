import React, { useState, useRef, useEffect, useLayoutEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Github, Code, Zap, X, Youtube, Instagram, Linkedin } from 'lucide-react';

const TikTokGlyph = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>
);
import { useProjects } from './hooks/usePortfolioData';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [visibleCards, setVisibleCards] = useState(new Set());
  const sectionRef = useRef(null);
  const { projects, loading, error } = useProjects();

  const closeModal = useCallback(() => setSelectedProject(null), []);

  useLayoutEffect(() => {
    if (!projects?.length) return undefined;
    const node = sectionRef.current;

    const revealAll = () => {
      setVisibleCards(new Set(projects.map((_, i) => i)));
    };

    if (!node) {
      revealAll();
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) revealAll();
      },
      { threshold: 0.05, rootMargin: '0px 0px 40% 0px' }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [projects]);

  useEffect(() => {
    if (!selectedProject) return undefined;

    const onKeyDown = (e) => {
      if (e.key === 'Escape') closeModal();
    };
    document.addEventListener('keydown', onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [selectedProject, closeModal]);

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
    
    const openDetails = () => setSelectedProject(project);

    return (
      <Card
        className={`project-card relative overflow-hidden bg-gradient-to-br from-gray-900/90 to-black/90 border-zinc-700/80 hover:border-zinc-500/90 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/40 group cursor-pointer backdrop-blur-sm ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
        style={{ transitionDelay: `${index * 200}ms` }}
        data-index={index}
        onClick={openDetails}
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

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
            <Button
              size="sm"
              variant="outline"
              className="border-zinc-600 text-zinc-300 hover:bg-zinc-800 hover:text-white flex-1 group-hover:border-zinc-500 transition-all min-h-[44px]"
              onClick={(e) => {
                e.stopPropagation();
                window.open(project.github_url, '_blank');
              }}
            >
              <Github className="w-4 h-4 mr-2" />
              Code
            </Button>
            <Button
              type="button"
              size="sm"
              variant="ghost"
              className="text-zinc-500 hover:text-white hover:bg-white/5 flex-1 sm:flex-none min-h-[44px]"
              onClick={(e) => {
                e.stopPropagation();
                openDetails();
              }}
            >
              Details
            </Button>
          </div>
        </CardContent>

        {/* Hover effect overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg pointer-events-none"></div>
      </Card>
    );
  };

  return (
    <section id="projects" ref={sectionRef} className="py-20 md:py-28 bg-gradient-to-b from-zinc-950 via-black to-black relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-zinc-700/40 to-transparent motion-safe:animate-pulse" />
        <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-zinc-700/40 to-transparent motion-safe:animate-pulse delay-1000" />
      </div>

      <div className="container mx-auto max-w-6xl px-4 sm:px-6 relative z-10">
        <div className="text-center mb-8 md:mb-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 tracking-tight">
            My <span className="bg-gradient-to-r from-zinc-200 to-white bg-clip-text text-transparent">passion project</span>
          </h2>
          <p className="text-lg sm:text-xl font-medium tracking-wide text-zinc-400 mb-2">
            technotesgr
          </p>
          <div className="w-20 h-px bg-gradient-to-r from-transparent via-zinc-500 to-transparent mx-auto mt-5" />
        </div>

        {projects[0]?.technotesgr_social && (
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-10 md:mb-12">
            {[
              {
                href: projects[0].technotesgr_social.youtube,
                label: 'TechNotesGR on YouTube',
                Icon: Youtube,
              },
              {
                href: projects[0].technotesgr_social.instagram,
                label: 'TechNotesGR on Instagram',
                Icon: Instagram,
              },
              {
                href: projects[0].technotesgr_social.tiktok,
                label: 'TechNotesGR on TikTok',
                Icon: TikTokGlyph,
                isCustom: true,
              },
              {
                href: projects[0].technotesgr_social.linkedin,
                label: 'TechNotesGR on LinkedIn',
                Icon: Linkedin,
              },
            ].map(({ href, label, Icon, isCustom }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-800/90 text-zinc-300 ring-1 ring-zinc-700/80 transition-all hover:bg-zinc-700 hover:text-white hover:ring-zinc-500/60"
              >
                {isCustom ? (
                  <Icon className="h-5 w-5" />
                ) : (
                  <Icon className="h-5 w-5" strokeWidth={1.75} />
                )}
              </a>
            ))}
          </div>
        )}

        <div
          id="projects-grid"
          className="grid grid-cols-1 gap-6 md:gap-8 max-w-xl mx-auto"
        >
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* Project Details Modal */}
        {selectedProject && (
          <div
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-md"
            onClick={closeModal}
            role="presentation"
          >
            <Card
              role="dialog"
              aria-modal="true"
              aria-labelledby="project-dialog-title"
              className="relative bg-gradient-to-br from-zinc-900 to-black border border-zinc-600/80 max-w-2xl w-full max-h-[min(85vh,720px)] overflow-y-auto shadow-2xl shadow-black/50 rounded-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={closeModal}
                className="absolute right-3 top-3 z-10 h-10 w-10 rounded-full text-zinc-400 hover:text-white hover:bg-white/10"
                aria-label="Close project details"
              >
                <X className="h-5 w-5" />
              </Button>
              <CardHeader className="pr-14">
                <CardTitle
                  id="project-dialog-title"
                  className="text-xl sm:text-2xl font-bold text-white mb-3 leading-snug"
                >
                  {selectedProject.title}
                </CardTitle>
                <p className="text-zinc-400 leading-relaxed text-sm sm:text-base">
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

                  <div className="pt-4">
                    <Button
                      className="w-full bg-white text-black hover:bg-gray-200 sm:w-auto"
                      onClick={() => window.open(selectedProject.github_url, '_blank')}
                    >
                      <Github className="w-4 h-4 mr-2" />
                      View Code
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

export default Projects;