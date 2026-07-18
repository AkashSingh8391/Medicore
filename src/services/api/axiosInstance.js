import axios from 'axios';
import { getAccessToken, getRefreshToken, setTokens, clearTokens } from '../../utils/tokenStorage';
import { ENDPOINTS } from '../../constants/endpoints';

// Base URL comes from env so switching from mock -> Spring Boot is a one-line change.
// Example prod value: VITE_API_BASE_URL=https://api.yourhospital.com/api/v1
const baseURL = import.meta.env.VITE_API_BASE_URL || '/api/v1';

export const axiosInstance = axios.create({
  baseURL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach JWT access token to every outgoing request.
axiosInstance.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Transparent access-token refresh on 401, with a single in-flight refresh
// so concurrent failed requests don't each trigger their own refresh call.
let isRefreshing = false;
let pendingQueue = [];

const resolvePending = (error, token = null) => {
  pendingQueue.forEach(({ resolve, reject }) => {
    if (error) reject(error);
    else resolve(token);
  });
  pendingQueue = [];
};

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // Queue this request until the in-flight refresh resolves.
        return new Promise((resolve, reject) => {
          pendingQueue.push({ resolve, reject });
        }).then((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return axiosInstance(originalRequest);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = getRefreshToken();
        if (!refreshToken) throw new Error('No refresh token available');

        const { data } = await axios.post(`${baseURL}${ENDPOINTS.AUTH.REFRESH_TOKEN}`, {
          refreshToken,
        });

        setTokens({ accessToken: data.accessToken, refreshToken: data.refreshToken });
        resolvePending(null, data.accessToken);
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        resolvePending(refreshError, null);
        clearTokens();
        window.location.href = '/login';
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);
