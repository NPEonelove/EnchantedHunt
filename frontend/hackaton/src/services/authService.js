import axios from 'axios';

// Для разработки используем относительный путь (прокси)
// Для продакшена нужно будет изменить на абсолютный URL
const API_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-production-domain.com/api/v1/auth' 
  : '/api/v1/auth';

const api = axios.create({
  baseURL: API_URL,
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

// Интерцептор для обработки ошибок авторизации
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
    const response = await api.post('/sign-up', userData);
    return response.data;
  },

  // Вход
  signIn: async (credentials) => {
    const response = await api.post('/sign-in', credentials);
    return response.data;
  },

  // Обновление токена
  refreshToken: async (refreshToken) => {
    const response = await api.post('/refresh-access-token', {
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