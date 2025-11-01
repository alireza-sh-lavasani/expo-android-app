import axios from 'axios';
// import { BACKEND_URL } from '@env';
import axiosRetry from 'axios-retry';
import { EXPO_PUBLIC_BACKEND_URL } from '../utils/constants';

// Create an instance of Axios
export const appBackend = axios.create({
  baseURL: EXPO_PUBLIC_BACKEND_URL,
});

console.log(`EXPO_PUBLIC_BACKEND_URL: ${EXPO_PUBLIC_BACKEND_URL}`);

// Add retry configuration
axiosRetry(appBackend, {
  retries: 3, // Number of retries
  retryDelay: (retryCount, error) => {
    console.log(`Retry attempt: ${retryCount}`);
    return axiosRetry.exponentialDelay(retryCount, error, 2000); // Time between retries in milliseconds (2 seconds, 4 seconds, etc.)
  },
  retryCondition: (error: any) => {
    // If true, the request will be retried. Can be based on the error or request/response details.
    return error?.response?.status >= 500; // Retry only if the response status is >= 500 (server errors)
  },
});

// Add a request interceptor
appBackend.interceptors.request.use(
  config => {
    console.log(`Calling app backend on: ${EXPO_PUBLIC_BACKEND_URL}`);
    // const token = 'your-auth-token';
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  error => {
    // Handle request error
    console.error('Request error: ', error);
    return Promise.reject(error);
  }
);

// Add a response interceptor
appBackend.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    console.error('Response error: ', error?.response?.data?.message || error);
    return Promise.reject(error);
  }
);
