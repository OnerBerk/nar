import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

let clearingSessionAfter401 = false;

api.interceptors.response.use(
  (response) => response,
  async (error: unknown) => {
    if (!axios.isAxiosError(error) || error.response?.status !== 401) {
      return Promise.reject(error);
    }

    const path = error.config?.url ?? '';
    const isLoginOrRegisterFailure = path.includes('/auth/login') || path.includes('/auth/register');

    if (isLoginOrRegisterFailure) {
      return Promise.reject(error);
    }

    if (!localStorage.getItem('token')) {
      return Promise.reject(error);
    }

    if (clearingSessionAfter401) {
      return Promise.reject(error);
    }
    clearingSessionAfter401 = true;

    try {
      const {store} = await import('@/redux/stores');
      const {logout} = await import('@/redux/modules/auth/auth.actions');
      await store.dispatch(logout());
    } finally {
      clearingSessionAfter401 = false;
    }

    return Promise.reject(error);
  }
);
