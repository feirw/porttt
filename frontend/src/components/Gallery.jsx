import React, { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Image as ImageIcon, X, ZoomIn } from "lucide-react";
import LoadingSpinner from "./LoadingSpinner";
import ErrorMessage from "./ErrorMessage";
import { useGallery } from "./hooks/usePortfolioData";

const Gallery = ({ photos = [], loading, error }) => {
  const sectionRef = useRef(null);
  const [visibleItems, setVisibleItems] = useState(new Set());
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [activeFilter, setActiveFilter] = useState("all");
  const { photos: fetchedPhotos, loading: fetchedLoading, error: fetchedError } = useGallery();
  
  // Get unique tags for filters
  const tags = ["all", ...new Set(photos.map(p => p.tag).filter(Boolean))]
  
  // Filter photos based on active filter
  const filteredPhotos = activeFilter === "all" 
    ? photos 
    : photos.filter(p => p.tag === activeFilter);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.dataset.index);
            setVisibleItems((prev) => new Set([...prev, index]));
          }
        });
      },
      { threshold: 0.2 }
    );

    const items = document.querySelectorAll(".gallery-item");
    items.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, [filteredPhotos]);

  if (loading) {
    return (
      <section
        id="gallery"
        ref={sectionRef}
        className="py-20 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden"
      >
        <div className="container mx-auto px-6 relative z-10">
          <LoadingSpinner size="large" text="Loading photos..." />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section
        id="gallery"
        ref={sectionRef}
        className="py-20 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden"
      >
        <div className="container mx-auto px-6 relative z-10">
          <ErrorMessage
            message={error || "Failed to load gallery"}
            onRetry={() => window.location.reload()}
          />
        </div>
      </section>
    );
  }

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="py-20 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-2 h-2 bg-white rounded-full animate-ping"></div>
        <div className="absolute top-40 right-20 w-1 h-1 bg-gray-400 rounded-full animate-ping" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-20 left-1/3 w-1.5 h-1.5 bg-gray-300 rounded-full animate-ping" style={{animationDelay: '2s'}}></div>
        
        {/* Gradient orbs */}
        <div className="absolute top-40 right-1/4 w-64 h-64 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-1/4 w-96 h-96 bg-gray-400/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1.5s'}}></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-white mb-4">
            My <span className="bg-gradient-to-r from-gray-300 to-white bg-clip-text text-transparent">Gallery</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            A collection of moments and highlights captured in photos.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-gray-600 to-white mx-auto mt-4"></div>
        </div>

        {/* Filter buttons */}
        {tags.length > 1 && (
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveFilter(tag)}
                className={`px-6 py-2 rounded-full transition-all duration-300 ${
                  activeFilter === tag
                    ? "bg-white text-black shadow-lg shadow-white/20 scale-105"
                    : "bg-gray-800/50 text-gray-300 hover:bg-gray-700 hover:scale-105"
                }`}
              >
                {tag.charAt(0).toUpperCase() + tag.slice(1)}
              </button>
            ))}
          </div>
        )}

        {/* Gallery grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPhotos.map((photo, index) => (
            <div
              key={index}
              className={`gallery-item relative transition-all duration-700 ${
                visibleItems.has(index)
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
              data-index={index}
            >
              <Card className="overflow-hidden bg-gradient-to-br from-gray-900/90 to-black/90 border-gray-700 hover:border-white/30 transition-all duration-500 backdrop-blur-sm group cursor-pointer h-full">
                <div 
                  className="relative w-full h-72 overflow-hidden"
                  onClick={() => setSelectedPhoto(photo)}
                >
                  <img
                    src={photo.url}
                    alt={photo.title || `Photo ${index + 1}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end p-6">
                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <h4 className="text-white font-bold text-lg mb-2 flex items-center">
                        <ZoomIn className="w-5 h-5 mr-2" />
                        {photo.title || "Untitled"}
                      </h4>
                      {photo.description && (
                        <p className="text-gray-300 text-sm">{photo.description}</p>
                      )}
                    </div>
                  </div>

                  {/* Zoom icon indicator */}
                  <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ZoomIn className="w-5 h-5 text-white" />
                  </div>
                </div>

                <CardContent className="p-4 bg-gradient-to-b from-gray-900/50 to-black/50">
                  <div className="flex items-center justify-between">
                    <h4 className="text-white font-semibold flex items-center">
                      <ImageIcon className="w-4 h-4 mr-2" />
                      {photo.title || "Untitled"}
                    </h4>
                    {photo.tag && (
                      <Badge className="bg-white/10 text-gray-300 text-xs border border-white/20">
                        {photo.tag}
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {filteredPhotos.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">Coming Soon</p>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 animate-in fade-in duration-300"
          onClick={() => setSelectedPhoto(null)}
        >
          <button
            onClick={() => setSelectedPhoto(null)}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors bg-black/50 backdrop-blur-sm p-2 rounded-full z-10"
          >
            <X className="w-8 h-8" />
          </button>

          <div
            className="relative max-w-6xl w-full max-h-[90vh] animate-in zoom-in duration-500"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedPhoto.url}
              alt={selectedPhoto.title}
              className="w-full h-full object-contain rounded-lg shadow-2xl shadow-white/20"
            />
            
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-6 rounded-b-lg">
              <h3 className="text-white text-2xl font-bold mb-2">
                {selectedPhoto.title || "Untitled"}
              </h3>
              {selectedPhoto.description && (
                <p className="text-gray-300 mb-3">{selectedPhoto.description}</p>
              )}
              {selectedPhoto.tag && (
                <Badge className="bg-white/20 text-white border border-white/30">
                  {selectedPhoto.tag}
                </Badge>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;