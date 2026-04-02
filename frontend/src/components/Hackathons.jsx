import React, { useRef, useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Trophy, Building2, Calendar, ExternalLink } from "lucide-react";
import { useHackathons } from "./hooks/usePortfolioData";
import LoadingSpinner from "./LoadingSpinner";
import ErrorMessage from "./ErrorMessage";

const Hackathons = () => {
  const [visibleItems, setVisibleItems] = useState(new Set());
  const sectionRef = useRef(null);
  const { hackathons, loading, error } = useHackathons();

  useEffect(() => {
    if (!hackathons?.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.dataset.index, 10);
            setVisibleItems((prev) => new Set([...prev, index]));
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px 25% 0px" }
    );

    document.querySelectorAll(".hackathon-item").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [hackathons]);

  if (loading) {
    return (
      <section
        id="hackathons"
        ref={sectionRef}
        className="py-20 md:py-28 bg-gradient-to-b from-zinc-950 via-black to-zinc-950 relative overflow-hidden"
      >
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 relative z-10">
          <LoadingSpinner size="large" text="Loading hackathons..." />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section
        id="hackathons"
        ref={sectionRef}
        className="py-20 md:py-28 bg-gradient-to-b from-zinc-950 via-black to-zinc-950 relative overflow-hidden"
      >
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 relative z-10">
          <ErrorMessage
            message={error || "Failed to load hackathons"}
            onRetry={() => window.location.reload()}
          />
        </div>
      </section>
    );
  }

  if (!hackathons?.length) {
    return null;
  }

  return (
    <section
      id="hackathons"
      ref={sectionRef}
      className="py-20 md:py-28 bg-gradient-to-b from-zinc-950 via-black to-zinc-950 relative overflow-hidden"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-24 right-10 w-2 h-2 bg-violet-400/40 rounded-full motion-safe:animate-ping" />
        <div className="absolute bottom-32 left-12 w-1.5 h-1.5 bg-zinc-500 rounded-full motion-safe:animate-pulse" />
      </div>

      <div className="container mx-auto max-w-6xl px-4 sm:px-6 relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            Hackathons &{" "}
            <span className="bg-gradient-to-r from-violet-200 to-white bg-clip-text text-transparent">
              competitions
            </span>
          </h2>
          <p className="text-zinc-500 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Intensive builds, bilateral programmes, and innovation challenges — from MVP definition to demo and awards.
          </p>
          <div className="w-20 h-px bg-gradient-to-r from-transparent via-violet-500/60 to-transparent mx-auto mt-6" />
        </div>

        <div className="max-w-4xl mx-auto space-y-10 md:space-y-12">
          {hackathons.map((item, index) => (
            <div
              key={item.id}
              data-index={index}
              className={`hackathon-item transition-all duration-700 ${
                visibleItems.has(index)
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 120}ms` }}
            >
              <Card className="bg-gradient-to-br from-zinc-900/90 to-black/90 border-zinc-700/80 hover:border-violet-500/30 transition-all duration-500 backdrop-blur-sm hover:shadow-xl hover:shadow-violet-950/20">
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-3">
                    <CardTitle className="text-xl font-bold text-white leading-snug pr-2">
                      {item.title}
                    </CardTitle>
                    {item.highlight && (
                      <Badge
                        variant="secondary"
                        className="bg-violet-950/60 text-violet-200 border border-violet-800/50 w-fit max-w-full sm:max-w-md shrink-0 whitespace-normal text-left inline-flex items-start gap-1.5 py-2 px-3 text-xs sm:text-sm leading-snug"
                      >
                        <Trophy className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                        <span>{item.highlight}</span>
                      </Badge>
                    )}
                  </div>
                  <div className="space-y-2 text-zinc-400 text-sm">
                    <div className="flex items-start gap-2">
                      <Building2 className="w-4 h-4 mt-0.5 shrink-0" />
                      <span>{item.organizer}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 shrink-0" />
                      <span>{item.period}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-zinc-300 leading-relaxed text-sm sm:text-base">
                    {item.description}
                  </p>
                  {item.skills?.length > 0 && (
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wider text-zinc-500 mb-2">
                        Skills & focus
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {item.skills.map((skill) => (
                          <Badge
                            key={skill}
                            variant="secondary"
                            className="bg-zinc-800/90 border border-zinc-700/60 text-zinc-200 text-xs"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  {item.linkUrl && (
                    <a
                      href={item.linkUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-violet-300 hover:text-white transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      {item.linkLabel || "Open link"}
                    </a>
                  )}
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hackathons;
