import api from './authService';

export const userService = {
  // Получение профиля пользователя
  getProfile: async () => {
    const response = await api.get('/api/v1/user/profile');
    return response.data;
  },

  // Обновление профиля пользователя
  updateProfile: async (userData) => {
    const response = await api.put('/api/v1/user/profile', userData);
    return response.data;
  },

  // Обновление резюме
  updateResume: async (resumeData) => {
    const response = await api.put('/api/v1/user/resume', resumeData);
    return response.data;
  },

  // Получение резюме
  getResume: async () => {
    const response = await api.get('/api/v1/user/resume');
    return response.data;
  }
};