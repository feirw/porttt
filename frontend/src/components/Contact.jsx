import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Mail, MapPin, Github, Linkedin, Send, InstagramIcon } from 'lucide-react';
import { useToast } from './hooks/use-toast';
import { usePersonalInfo, useContactForm } from './hooks/usePortfolioData';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const { toast } = useToast();
  
  const { personalInfo, loading: personalLoading, error: personalError } = usePersonalInfo();
  const { submitForm, submitting, error: submitError } = useContactForm();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    const currentSectionRef = sectionRef.current;
    if (currentSectionRef) {
      observer.observe(currentSectionRef);
    }

    return () => {
      if (currentSectionRef) {
        observer.unobserve(currentSectionRef);
      }
    };
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await submitForm(formData);
      toast({
        title: "Message sent successfully!",
        description: "Thank you for reaching out. I'll get back to you soon.",
      });
      // Reset form after successful submission
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      toast({
        title: "Error sending message",
        description: submitError || "Please try again later.",
        variant: "destructive"
      });
    }
  };

  if (personalLoading) {
    return (
      <section 
        id="contact" 
        ref={sectionRef}
        className="py-20 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden"
      >
        <div className="container mx-auto px-6 relative z-10">
          <LoadingSpinner size="large" text="Loading contact information..." />
        </div>
      </section>
    );
  }

  if (personalError || !personalInfo) {
    return (
      <section 
        id="contact" 
        ref={sectionRef}
        className="py-20 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden"
      >
        <div className="container mx-auto px-6 relative z-10">
          <ErrorMessage 
            message={personalError || "Failed to load contact information"} 
            onRetry={() => window.location.reload()} 
          />
        </div>
      </section>
    );
  }

  return (
    <section 
      id="contact" 
      ref={sectionRef}
      className="py-20 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden"
    >
      {/* Background Animation */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-5xl font-bold text-white mb-4">
            Get In <span className="bg-gradient-to-r from-gray-300 to-white bg-clip-text text-transparent">Touch</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            I'm always open to discussing new opportunities, interesting projects, or just having a chat about technology.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-gray-600 to-white mx-auto mt-4"></div>
        </div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className={`space-y-8 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <Card className="bg-gradient-to-br from-gray-900/90 to-black/90 border-gray-700 hover:border-gray-500 transition-all duration-500 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-white">Let's Connect</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-4 p-4 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 transition-colors cursor-pointer">
                  <div className="p-3 bg-gray-700 rounded-full">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">Email</h4>
                    <p className="text-gray-400">{personalInfo.email}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-4 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 transition-colors cursor-pointer">
                  <div className="p-3 bg-gray-700 rounded-full">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">Location</h4>
                    <p className="text-gray-400">{personalInfo.location}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Social Links */}
            <Card className="bg-gradient-to-br from-gray-900/90 to-black/90 border-gray-700 hover:border-gray-500 transition-all duration-500 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-white">Social Media</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-4">
                  <a
                    href={personalInfo.social_links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 group"
                  >
                    <Github className="w-6 h-6 text-gray-300 group-hover:text-white" />
                  </a>
                  <a
                    href={personalInfo.social_links.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 group"
                  >
                    <Linkedin className="w-6 h-6 text-gray-300 group-hover:text-white" />
                  </a>
                  <a
                    href={personalInfo.social_links.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 group"
                  >
                    <InstagramIcon className="w-6 h-6 text-gray-300 group-hover:text-white" />
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className={`transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <Card className="bg-gradient-to-br from-gray-900/90 to-black/90 border-gray-700 hover:border-gray-500 transition-all duration-500 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-white">Send Message</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-gray-300 font-semibold mb-2">Name</label>
                    <Input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Your Name"
                      required
                      className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-gray-400 focus:ring-gray-400"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 font-semibold mb-2">Email</label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your.email@example.com"
                      required
                      className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-gray-400 focus:ring-gray-400"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 font-semibold mb-2">Message</label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Your message..."
                      rows={5}
                      required
                      className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-gray-400 focus:ring-gray-400 resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-white text-black hover:bg-gray-200 py-3 text-lg font-semibold transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {submitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black mr-2"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;