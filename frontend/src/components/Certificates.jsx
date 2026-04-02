import React, { useRef, useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Award, Link as LinkIcon } from "lucide-react";
import { useCertificates } from "./hooks/usePortfolioData";
import LoadingSpinner from "./LoadingSpinner";
import ErrorMessage from "./ErrorMessage";

const Certificates = () => {
  const [visibleItems, setVisibleItems] = useState(new Set());
  const sectionRef = useRef(null);
  const { certificates, loading, error } = useCertificates();

  // animation για fade-in με intersection observer
  useEffect(() => {
    if (!certificates || certificates.length === 0) return;

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

    const items = document.querySelectorAll(".certificate-item");
    items.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, [certificates]);

  if (loading) {
    return (
      <section
        id="certificates"
        ref={sectionRef}
        className="py-20 md:py-28 bg-gradient-to-b from-black via-zinc-950 to-zinc-900 relative overflow-hidden"
      >
        <div className="container mx-auto px-6 relative z-10">
          <LoadingSpinner size="large" text="Loading certificates..." />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section
        id="certificates"
        ref={sectionRef}
        className="py-20 md:py-28 bg-gradient-to-b from-black via-zinc-950 to-zinc-900 relative overflow-hidden"
      >
        <div className="container mx-auto px-6 relative z-10">
          <ErrorMessage
            message={error || "Failed to load certificates"}
            onRetry={() => window.location.reload()}
          />
        </div>
      </section>
    );
  }

  return (
    <section
      id="certificates"
      ref={sectionRef}
      className="py-20 md:py-28 bg-gradient-to-b from-black via-zinc-950 to-zinc-900 relative overflow-hidden"
    >
      {/* Animated background dots */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-2 h-2 bg-white rounded-full animate-ping"></div>
        <div className="absolute top-40 right-20 w-1 h-1 bg-gray-400 rounded-full animate-ping delay-1000"></div>
        <div className="absolute bottom-20 left-1/3 w-1.5 h-1.5 bg-gray-300 rounded-full animate-ping delay-2000"></div>
      </div>

      <div className="container mx-auto max-w-6xl px-4 sm:px-6 relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            Certificates &{" "}
            <span className="bg-gradient-to-r from-zinc-200 to-white bg-clip-text text-transparent">
              licenses
            </span>
          </h2>
          <p className="text-zinc-500 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Courses and credentials that shaped my technical and professional skills.
          </p>
          <div className="w-20 h-px bg-gradient-to-r from-transparent via-zinc-500 to-transparent mx-auto mt-6" />
        </div>

        <div className="max-w-4xl mx-auto space-y-12">
          {Array.isArray(certificates) &&
            certificates.map((cert, index) => (
              <div
                key={cert.id}
                className={`certificate-item relative transition-all duration-700 ${
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
                        {cert.title}
                      </CardTitle>
                      <Badge
                        variant="secondary"
                        className={
                          cert.id === 13
                            ? "bg-gray-800 text-gray-200 w-fit mt-2 md:mt-0 text-sm sm:text-base px-3.5 py-2 font-medium tracking-tight shrink-0"
                            : "bg-gray-800 text-gray-300 w-fit mt-2 md:mt-0"
                        }
                      >
                        {cert.date}
                      </Badge>
                    </div>
                    
                    <div className="space-y-2 text-gray-400">
                      <div className="flex items-center">
                        <Award className="w-4 h-4 mr-2" />
                        <span>{cert.issuer}</span>
                      </div>
                      {cert.certificatePdf && (
                        <button
                          type="button"
                          onClick={() => window.open(cert.certificatePdf, "_blank")}
                          className="flex items-center text-gray-400 hover:text-white transition-colors duration-300"
                        >
                          <LinkIcon className="w-4 h-4 mr-2" />
                          View certificate (PDF)
                        </button>
                      )}
                      {cert.link && (
                        <a
                          href={cert.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-gray-400 hover:text-white transition-colors duration-300 text-sm"
                        >
                          <LinkIcon className="w-4 h-4 mr-2 shrink-0" />
                          Issuer / programme
                        </a>
                      )}
                    </div>

                    
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300 leading-relaxed">
                      {cert.description}
                    </p>
                  </CardContent>
                </Card>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Certificates;