import { useState, useEffect } from 'react';
import { portfolioApi } from '../services/api';

// Custom hook for personal info
export const usePersonalInfo = () => {
  const [personalInfo, setPersonalInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPersonalInfo = async () => {
      try {
        setLoading(true);
        const data = await portfolioApi.getPersonalInfo();
        setPersonalInfo(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching personal info:', err);
        setError('Failed to load personal information');
      } finally {
        setLoading(false);
      }
    };

    fetchPersonalInfo();
  }, []);

  return { personalInfo, loading, error };
};

// Custom hook for projects
export const useProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const data = await portfolioApi.getProjects();
        setProjects(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching projects:', err);
        setError('Failed to load projects');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return { projects, loading, error };
};

// Custom hook for skills
export const useSkills = () => {
  const [skills, setSkills] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        setLoading(true);
        const data = await portfolioApi.getSkills();
        setSkills(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching skills:', err);
        setError('Failed to load skills');
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  return { skills, loading, error };
};

// Custom hook for experience
export const useExperience = () => {
  const [experience, setExperience] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        setLoading(true);
        const data = await portfolioApi.getExperience();
        setExperience(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching experience:', err);
        setError('Failed to load experience');
      } finally {
        setLoading(false);
      }
    };

    fetchExperience();
  }, []);

  return { experience, loading, error };
};

// Custom hook for education
export const useEducation = () => {
  const [education, setEducation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEducation = async () => {
      try {
        setLoading(true);
        const data = await portfolioApi.getEducation();
        setEducation(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching education:', err);
        setError('Failed to load education');
      } finally {
        setLoading(false);
      }
    };

    fetchEducation();
  }, []);

  return { education, loading, error };
};

// Custom hook for contact form submission
export const useContactForm = () => {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const submitForm = async (formData) => {
    try {
      setSubmitting(true);
      setError(null);
      const result = await portfolioApi.submitContactForm(formData);
      setSubmitting(false);
      return result;
    } catch (err) {
      console.error('Error submitting contact form:', err);
      setError('Failed to send message. Please try again.');
      setSubmitting(false);
      throw err;
    }
  };

  return { submitForm, submitting, error };
};