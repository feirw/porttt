import React, { useRef, useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { MapPin, Users } from "lucide-react";
import { useVolunteer } from "./hooks/usePortfolioData";
import LoadingSpinner from "./LoadingSpinner";
import ErrorMessage from "./ErrorMessage";

const Volunteer = () => {
  const [visibleItems, setVisibleItems] = useState(new Set());
  const sectionRef = useRef(null);
  const { volunteer, loading, error } = useVolunteer();

  // Animation on scroll
  useEffect(() => {
    if (!volunteer || volunteer.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.dataset.index, 10);
            setVisibleItems((prev) => new Set([...prev, index]));
          }
        });
      },
      { threshold: 0.3 }
    );

    const items = document.querySelectorAll(".volunteer-item");
    items.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, [volunteer]);

  if (loading) {
    return (
      <section
        id="volunteer"
        ref={sectionRef}
        className="py-20 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden"
      >
        <div className="container mx-auto px-6 relative z-10">
          <LoadingSpinner size="large" text="Loading volunteer work..." />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section
        id="volunteer"
        ref={sectionRef}
        className="py-20 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden"
      >
        <div className="container mx-auto px-6 relative z-10">
          <ErrorMessage
            message={error || "Failed to load volunteer work"}
            onRetry={() => window.location.reload()}
          />
        </div>
      </section>
    );
  }

  return (
    <section
      id="volunteer"
      ref={sectionRef}
      className="py-20 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden"
    >
      {/* Animated dots */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-2 h-2 bg-white rounded-full animate-ping"></div>
        <div className="absolute top-40 right-20 w-1 h-1 bg-gray-400 rounded-full animate-ping delay-1000"></div>
        <div className="absolute bottom-20 left-1/3 w-1.5 h-1.5 bg-gray-300 rounded-full animate-ping delay-2000"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-white mb-4">
            Volunteer <span className="bg-gradient-to-r from-gray-300 to-white bg-clip-text text-transparent">Work</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Giving back to the community through volunteer activities and mentoring.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-gray-600 to-white mx-auto mt-4"></div>
        </div>

        <div className="max-w-4xl mx-auto space-y-12">
          {Array.isArray(volunteer) &&
            volunteer.map((vol, index) => (
              <div
                key={vol.id}
                className={`volunteer-item relative transition-all duration-700 ${
                  visibleItems.has(index)
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-10"
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
                data-index={index}
              >
                <Card className="bg-gradient-to-br from-gray-900/90 to-black/90 border-gray-700 hover:border-gray-500 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-white/10 backdrop-blur-sm">
                  <CardHeader>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <CardTitle className="text-xl font-bold text-white group-hover:text-gray-300 transition-colors">
                        {vol.role}
                      </CardTitle>
                      <Badge
                        variant="secondary"
                        className="bg-gray-800 text-gray-300 w-fit mt-2 md:mt-0"
                      >
                        {vol.duration}
                      </Badge>
                    </div>
                    <div className="space-y-2 text-gray-400">
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-2" />
                        <span>{vol.organization}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2" />
                        <span>{vol.location}</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300 leading-relaxed mb-4">
                      {vol.description}
                    </p>
                    {vol.achievements?.length > 0 && (
                      <ul className="space-y-2">
                        {vol.achievements.map((ach, idx) => (
                          <li key={idx} className="text-gray-300 flex items-start">
                            <div className="w-2 h-2 bg-white rounded-full mr-3 mt-2 flex-shrink-0"></div>
                            <span>{ach}</span>
                          </li>
                        ))}
                      </ul>
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

export default Volunteer;
