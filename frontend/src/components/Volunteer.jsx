import React, { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Heart, MapPin, Calendar, Building2, ChevronDown, ChevronUp } from 'lucide-react';
import { portfolioData } from '../data/mockData';

const Volunteer = () => {
  const { volunteer } = portfolioData;
  const [showAll, setShowAll] = useState(false);

  const displayedVolunteer = showAll ? volunteer : volunteer.slice(0, 4);

  return (
    <section id="volunteer" className="py-24 bg-black relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/3 w-px h-full bg-gradient-to-b from-transparent via-gray-800 to-transparent opacity-50" />
        <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-gray-800 to-transparent opacity-50" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-gray-500 text-sm tracking-[0.3em] uppercase mb-4">
            Giving Back
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Volunteer Work
          </h2>
          <div className="w-24 h-1 bg-white mx-auto" />
        </div>

        {/* Volunteer Grid */}
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {displayedVolunteer.map((vol, index) => (
            <Card
              key={vol.id}
              className="bg-gray-900/80 border-gray-800 hover:border-gray-700 transition-all hover:transform hover:-translate-y-1 backdrop-blur-sm"
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                      <Heart size={22} className="text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-white mb-1">
                      {vol.role}
                    </h3>

                    <div className="flex items-center gap-2 mb-3">
                      <Building2 size={14} className="text-gray-500" />
                      <span className="text-gray-400 text-sm">{vol.organization}</span>
                    </div>

                    <div className="flex flex-wrap gap-4 mb-3">
                      <div className="flex items-center gap-1.5 text-gray-500 text-sm">
                        <Calendar size={14} />
                        <span>{vol.duration}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-gray-500 text-sm">
                        <MapPin size={14} />
                        <span>{vol.location}</span>
                      </div>
                    </div>

                    <p className="text-gray-400 text-sm leading-relaxed">
                      {vol.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Show More Button */}
        {volunteer.length > 4 && (
          <div className="text-center mt-10">
            <Button
              variant="outline"
              className="border-gray-700 text-gray-300 hover:bg-white hover:text-black hover:border-white rounded-full px-8 transition-all"
              onClick={() => setShowAll(!showAll)}
            >
              {showAll ? (
                <>
                  <ChevronUp size={18} className="mr-2" />
                  Show Less
                </>
              ) : (
                <>
                  <ChevronDown size={18} className="mr-2" />
                  Show All ({volunteer.length})
                </>
              )}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Volunteer;
