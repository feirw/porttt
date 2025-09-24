import { useState, useEffect } from 'react';
import { portfolioData } from '../data/mock';

// Helper function to simulate API latency
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

// Custom hook for contact form submission
export const useContactForm = () => {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const submitForm = async (formData) => {
    return new Promise((resolve) => {
      setSubmitting(true);
      setError(null);
      console.log('Simulating form submission with data:', formData);
      
      // Simulate network delay
      setTimeout(() => {
        setSubmitting(false);
        // Simulate a successful response
        resolve({ message: 'Message sent successfully!' });
      }, 1000);
    });
  };

  return { submitForm, submitting, error };
};