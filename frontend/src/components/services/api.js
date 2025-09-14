import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for logging
apiClient.interceptors.request.use(
  (config) => {
    console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => {
    console.log(`API Response: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error('API Response Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// API service functions
export const portfolioApi = {
  // Health check
  healthCheck: async () => {
    const response = await apiClient.get('/');
    return response.data;
  },

  // Personal info
  getPersonalInfo: async () => {
    const response = await apiClient.get('/personal');
    return response.data;
  },

  // Projects
  getProjects: async () => {
    const response = await apiClient.get('/projects');
    return response.data;
  },

  // Skills
  getSkills: async () => {
    const response = await apiClient.get('/skills');
    return response.data;
  },

  // Experience
  getExperience: async () => {
    const response = await apiClient.get('/experience');
    return response.data;
  },

  // Education
  getEducation: async () => {
    const response = await apiClient.get('/education');
    return response.data;
  },

  // Contact
  submitContactForm: async (contactData) => {
    const response = await apiClient.post('/contact', contactData);
    return response.data;
  },

  // Get all contact messages (admin)
  getContactMessages: async () => {
    const response = await apiClient.get('/contact');
    return response.data;
  },

  // Initialize default data
  initializeData: async () => {
    const response = await apiClient.post('/initialize-data');
    return response.data;
  }
};

export default portfolioApi;