import React, { useEffect, useRef, useState } from 'react';
import { X, ZoomIn, Image as ImageIcon } from 'lucide-react';

const Gallery = () => {
  const [visibleItems, setVisibleItems] = useState(new Set());
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');

  // Mock data - αντικατέστησε με τα δικά σου data
  const photos = [
    {
      url: '/images/2.png',
      title: 'Εκδήλωση Πληροφορικής',
      description: 'Συμμετοχή σε διαγωνισμό προγραμματισμού',
      tag: 'events',
    },
    {
      url: 'https://via.placeholder.com/600x400/f43f5e/ffffff?text=Photo+2',
      title: 'Μάθημα Αλγορίθμων',
      description: 'Διδασκαλία αλγορίθμων ταξινόμησης',
      tag: 'teaching',
    },
    {
      url: 'https://via.placeholder.com/600x400/ec4899/ffffff?text=Photo+3',
      title: 'Πανελλήνιες 2024',
      description: 'Επιτυχία στις εξετάσεις',
      tag: 'achievements',
    },
    {
      url: 'https://via.placeholder.com/600x400/f43f5e/ffffff?text=Photo+4',
      title: 'Coding Workshop',
      description: 'Εργαστήριο Python για αρχάριους',
      tag: 'teaching',
    },
    {
      url: 'https://via.placeholder.com/600x400/ec4899/ffffff?text=Photo+5',
      title: 'Hackathon',
      description: 'Συμμετοχή σε hackathon',
      tag: 'events',
    },
    {
      url: 'https://via.placeholder.com/600x400/f43f5e/ffffff?text=Photo+6',
      title: 'Βράβευση',
      description: 'Απονομή βραβείου για το technotesgr',
      tag: 'achievements',
    },
  ];

  // Get unique tags for filters
  const tags = ['all', ...new Set(photos.map((p) => p.tag).filter(Boolean))];

  // Filter photos based on active filter
  const filteredPhotos =
    activeFilter === 'all' ? photos : photos.filter((p) => p.tag === activeFilter);

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

    const items = document.querySelectorAll('.gallery-item');
    items.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, [filteredPhotos]);

  return (
    <>
      <style>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slide-in {
          from {
            transform: translateX(-20px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes scale-in {
          from {
            transform: scale(0.8);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes slide-up {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }

        .animate-slide-in {
          animation: slide-in 0.8s ease-out forwards;
        }

        .animate-scale-in {
          animation: scale-in 0.5s ease-out forwards;
        }

        .animate-slide-up {
          animation: slide-up 0.5s ease-out forwards;
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .delay-200 {
          animation-delay: 0.2s;
          animation-fill-mode: both;
        }

        .delay-300 {
          animation-delay: 0.3s;
          animation-fill-mode: both;
        }

        .delay-400 {
          animation-delay: 0.4s;
          animation-fill-mode: both;
        }
      `}</style>
      
      <section
      id="gallery"
      className="py-20 bg-gradient-to-b from-white via-pink-50/30 to-white dark:from-gray-900 dark:via-purple-900/20 dark:to-gray-900 relative overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-30 dark:opacity-20 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-pink-300 dark:bg-pink-600 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-3xl animate-blob" />
        <div
          className="absolute top-40 right-10 w-72 h-72 bg-purple-300 dark:bg-purple-600 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-3xl animate-blob animation-delay-2000"
        />
        <div
          className="absolute -bottom-8 left-1/2 w-72 h-72 bg-rose-300 dark:bg-rose-600 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-3xl animate-blob animation-delay-4000"
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-black tracking-tight bg-gradient-to-r from-pink-600 via-rose-500 to-red-500 bg-clip-text text-transparent mb-4 animate-slide-in">
            Η Γκαλερί μου 📸
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto animate-fade-in delay-200">
            Στιγμιότυπα από το ταξίδι μου στην εκπαίδευση και την πληροφορική
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-pink-600 to-rose-500 mx-auto mt-6 animate-scale-in delay-300" />
        </div>

        {/* Filter buttons */}
        {tags.length > 1 && (
          <div className="flex flex-wrap justify-center gap-3 mb-12 animate-fade-in delay-400">
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveFilter(tag)}
                className={`px-6 py-2.5 rounded-full font-semibold transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 active:scale-95 ${
                  activeFilter === tag
                    ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg shadow-pink-500/30 scale-105'
                    : 'bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 border-2 border-pink-200 dark:border-gray-700 hover:border-pink-400 dark:hover:border-pink-500'
                }`}
              >
                {tag === 'all'
                  ? 'Όλα'
                  : tag === 'events'
                    ? 'Εκδηλώσεις'
                    : tag === 'teaching'
                      ? 'Διδασκαλία'
                      : tag === 'achievements'
                        ? 'Επιτεύγματα'
                        : tag.charAt(0).toUpperCase() + tag.slice(1)}
              </button>
            ))}
          </div>
        )}

        {/* Gallery grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPhotos.map((photo, index) => (
            <div
              key={index}
              className={`gallery-item transition-all duration-700 ${
                visibleItems.has(index)
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
              data-index={index}
            >
              <div
                className="group relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden border border-gray-200/50 dark:border-gray-700/50 cursor-pointer h-full transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-2xl hover:shadow-pink-500/20"
                onClick={() => setSelectedPhoto(photo)}
              >
                {/* Image container */}
                <div className="relative w-full h-72 overflow-hidden">
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
                        {photo.title || 'Untitled'}
                      </h4>
                      {photo.description && (
                        <p className="text-gray-200 text-sm">{photo.description}</p>
                      )}
                    </div>
                  </div>

                  {/* Zoom icon indicator */}
                  <div className="absolute top-4 right-4 bg-pink-500/90 backdrop-blur-sm p-2 rounded-full opacity-0 group-hover:opacity-100 scale-0 group-hover:scale-100 transition-all duration-300">
                    <ZoomIn className="w-5 h-5 text-white" />
                  </div>
                </div>

                {/* Card content */}
                <div className="p-4 bg-gradient-to-b from-white/50 to-pink-50/50 dark:from-gray-800/50 dark:to-purple-900/30">
                  <div className="flex items-center justify-between">
                    <h4 className="text-gray-900 dark:text-white font-semibold flex items-center">
                      <ImageIcon className="w-4 h-4 mr-2 text-pink-500" />
                      {photo.title || 'Untitled'}
                    </h4>
                    {photo.tag && (
                      <span className="px-3 py-1 bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 text-xs font-semibold rounded-full border border-pink-200 dark:border-pink-700">
                        {photo.tag === 'events'
                          ? 'Εκδηλώσεις'
                          : photo.tag === 'teaching'
                            ? 'Διδασκαλία'
                            : photo.tag === 'achievements'
                              ? 'Επιτεύγματα'
                              : photo.tag}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty state */}
        {filteredPhotos.length === 0 && (
          <div className="text-center py-20 animate-fade-in">
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              Δεν βρέθηκαν φωτογραφίες σε αυτή την κατηγορία 📷
            </p>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelectedPhoto(null)}
        >
          <button
            onClick={() => setSelectedPhoto(null)}
            className="absolute top-4 right-4 text-white hover:text-pink-400 transition-all duration-300 bg-black/50 backdrop-blur-sm p-3 rounded-full z-10 group hover:scale-110 hover:rotate-90 active:scale-90"
          >
            <X className="w-8 h-8" />
          </button>

          <div
            className="relative max-w-6xl w-full max-h-[90vh] animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedPhoto.url}
              alt={selectedPhoto.title}
              className="w-full h-full object-contain rounded-2xl shadow-2xl shadow-pink-500/20"
            />

            {/* Image info overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-6 rounded-b-2xl animate-slide-up delay-300">
              <h3 className="text-white text-2xl md:text-3xl font-bold mb-2 flex items-center">
                <ImageIcon className="w-6 h-6 mr-3 text-pink-400" />
                {selectedPhoto.title || 'Untitled'}
              </h3>
              {selectedPhoto.description && (
                <p className="text-gray-200 text-lg mb-3">{selectedPhoto.description}</p>
              )}
              {selectedPhoto.tag && (
                <span className="inline-block px-4 py-2 bg-pink-500/20 text-pink-300 border border-pink-400/30 rounded-full text-sm font-semibold backdrop-blur-sm">
                  {selectedPhoto.tag === 'events'
                    ? '🎉 Εκδηλώσεις'
                    : selectedPhoto.tag === 'teaching'
                      ? '👩‍🏫 Διδασκαλία'
                      : selectedPhoto.tag === 'achievements'
                        ? '🏆 Επιτεύγματα'
                        : selectedPhoto.tag}
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
    </>
  );
};

export default Gallery;