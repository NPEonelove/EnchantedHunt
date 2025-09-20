import axios from 'axios';

// Для разработки используем прокси, для продакшена - абсолютный URL
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-production-domain.com/api/v1'
  : '/api/v1';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Интерцептор для добавления токена к запросам
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Интерцептор для обработки ошибок
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Токен истек или невалиден
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authService = {
  // Регистрация
  signUp: async (userData) => {
    const response = await api.post('/auth/sign-up', userData);
    return response.data;
  },

  // Вход
  signIn: async (credentials) => {
    const response = await api.post('/auth/sign-in', credentials);
    return response.data;
  },

  // Обновление токена
  refreshToken: async (refreshToken) => {
    const response = await api.post('/auth/refresh-access-token', {
      refreshToken: refreshToken
    });
    return response.data;
  },

  // Выход
  logout: async () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
  }
};

export default api;