const storage = {
  getItem: (key) => {
    return new Promise((resolve) => {
      if (typeof window !== 'undefined' && window.localStorage) {
        try {
          const value = window.localStorage.getItem(key);
          resolve(value);
        } catch (error) {
          resolve(null);
        }
      } else {
        resolve(null);
      }
    });
  },
  setItem: (key, value) => {
    return new Promise((resolve) => {
      if (typeof window !== 'undefined' && window.localStorage) {
        try {
          window.localStorage.setItem(key, value);
          resolve(true);
        } catch (error) {
          resolve(false);
        }
      } else {
        resolve(false);
      }
    });
  },
  removeItem: (key) => {
    return new Promise((resolve) => {
      if (typeof window !== 'undefined' && window.localStorage) {
        try {
          window.localStorage.removeItem(key);
          resolve(true);
        } catch (error) {
          resolve(false);
        }
      } else {
        resolve(false);
      }
    });
  },
};

export default storage;

