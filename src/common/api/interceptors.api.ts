import { apiWithAuth } from './instances.api';
import { errorCatch } from './error.api';
import { authService, getAccessToken, removeFromStorage } from '../services/auth';

apiWithAuth.interceptors.request.use((config) => {
  const accessToken = getAccessToken();

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

apiWithAuth.interceptors.response.use(
  (config) => config,
  async (error) => {
    const originalRequest = error.config;

    if (
      (error.response?.status === 401 ||
        errorCatch(error) === 'jwt expired' ||
        errorCatch(error) === 'jwt must be provided') &&
      !originalRequest._isRetry
    ) {
      originalRequest._isRetry = true;

      try {
        await authService.getNewTokens();
        return apiWithAuth.request(originalRequest);
      } catch (err) {
        if (errorCatch(error) === 'Unauthorized') {
          removeFromStorage();
          throw err;
        }
      }
    }

    throw error;
  }
);
