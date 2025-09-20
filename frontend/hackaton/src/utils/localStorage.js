export const safeLocalStorage = {
  getItem: (key) => {
    try {
      if (typeof window === 'undefined') return null;
      const item = localStorage.getItem(key);
      return item && item !== 'undefined' && item !== 'null' ? item : null;
    } catch (error) {
      console.error(`Error getting ${key} from localStorage:`, error);
      return null;
    }
  },

  setItem: (key, value) => {
    try {
      if (typeof window === 'undefined') return;
      localStorage.setItem(key, value);
    } catch (error) {
      console.error(`Error setting ${key} in localStorage:`, error);
    }
  },

  removeItem: (key) => {
    try {
      if (typeof window === 'undefined') return;
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing ${key} from localStorage:`, error);
    }
  },

  getJSON: (key) => {
    try {
      if (typeof window === 'undefined') return null;
      const item = localStorage.getItem(key);
      if (item && item !== 'undefined' && item !== 'null') {
        return JSON.parse(item);
      }
      return null;
    } catch (error) {
      console.error(`Error parsing ${key} from localStorage:`, error);
      this.removeItem(key);
      return null;
    }
  },

  setJSON: (key, value) => {
    try {
      if (typeof window === 'undefined') return;
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error stringifying ${key} for localStorage:`, error);
    }
  }
};