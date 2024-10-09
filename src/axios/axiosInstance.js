
import axios from 'axios';

// Create the axios instance with a default baseURL and other configurations
const axiosInstance = axios.create({
  baseURL: 'http://localhost:8003/api/', // Default base URL
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to change the baseURL dynamically based on the request URL
axiosInstance.interceptors.request.use((config) => {
  // Check if the request URL includes 'user' or 'category'
  if (config.url.includes('/user')) {
    config.baseURL = 'http://localhost:8004/api/'; // Change base URL for user-related requests
  } else if (config.url.includes('/category')) {
    config.baseURL = 'http://localhost:8003/api/'; // Change base URL for category-related requests
  } else if (config.url.includes('/items')) {
    config.baseURL = 'http://localhost:8004/api/'; // Change base URL for category-related requests
  }

  // Always return the config object
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default axiosInstance;