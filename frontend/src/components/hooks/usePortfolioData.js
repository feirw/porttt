import { useState, useEffect } from 'react';
import { portfolioData } from '../data/mock';
import emailjs from '@emailjs/browser';

// Helper function to simulate API latency for mock data
const useMockData = (data) => {
  const [state, setState] = useState({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setState({
        data,
        loading: false,
        error: null,
      });
    }, 500); // 500ms delay to simulate loading

    return () => clearTimeout(timer);
  }, [data]);

  return state;
};


// Custom hook for personal info
export const usePersonalInfo = () => {
  const { data, loading, error } = useMockData(portfolioData.personal);
  return { personalInfo: data, loading, error };
};

// Custom hook for projects
export const useProjects = () => {
  const { data, loading, error } = useMockData(portfolioData.projects);
  return { projects: data, loading, error };
};

// Custom hook for skills
export const useSkills = () => {
  const { data, loading, error } = useMockData(portfolioData.skills);
  return { skills: data, loading, error };
};

export const useSoftSkills = () => {
  const { data, loading, error } = useMockData(portfolioData.softskills);
  return { softskills: data, loading, error };
}

// Custom hook for experience
export const useExperience = () => {
  const { data, loading, error } = useMockData(portfolioData.experience);
  return { experience: data, loading, error };
};

// Custom hook for education
export const useEducation = () => {
  const { data, loading, error } = useMockData(portfolioData.education);
  return { education: data, loading, error };
};

export const useCertificates = () => {
  const { data, loading, error } = useMockData(portfolioData.certificates);
  return { certificates: data, loading, error };
}

export const useVolunteer = () => {
  const { data, loading, error } = useMockData(portfolioData.volunteer);
  return { volunteer: data, loading, error };
}

export const useGallery = () => {
  const { data, loading, error } = useMockData(portfolioData.gallery);
  return { photos: data, loading, error };
}


export const useContactForm = () => {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const submitForm = async (formData) => {
    setSubmitting(true);
    setError(null);

    // Fetch credentials from environment variables
    const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID;
    const templateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

    // Validate that environment variables are set
    if (!serviceId || !templateId || !publicKey) {
      const errorMessage = "EmailJS credentials are not configured in the .env file.";
      console.error(errorMessage);
      setError(errorMessage);
      setSubmitting(false);
      throw new Error(errorMessage);
    }
    
    try {
      // Send the email using EmailJS
      await emailjs.send(serviceId, templateId, formData, publicKey);
      setSubmitting(false);
    } catch (err) {
      console.error('EmailJS submission failed:', err);
      const errorMessage = 'Failed to send the message. Please try again later.';
      setError(errorMessage);
      setSubmitting(false);
      // Re-throw the error so the component can catch it
      throw err; 
    }
  };

  return { submitForm, submitting, error };
};