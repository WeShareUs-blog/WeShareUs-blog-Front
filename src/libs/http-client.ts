import axios from 'axios';

const isDev = process.env.NODE_ENV !== 'production';
export const httpClient = (() => {
  const instance = axios.create({
    baseURL: isDev ? 'http://localhost:4000' : process.env.REACT_APP_HOST_NAME,
    headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
  });

  instance.interceptors.response.use(
    (res) => res,
    (config) => {
      config.message = config.response.data.errorMessage;
      return Promise.reject(config);
    },
  );
  return {
    async get<T>(url: string, config?: { params?: any }) {
      const response = await instance.get<{ data: T }>(url, config);
      return response.data.data;
    },
    async post<T>(url: string, data?: any) {
      const response = await instance.post<{ data: T }>(url, data);
      return response.data.data;
    },
    async patch<T>(url: string, data?: any) {
      const response = await instance.patch<{ data: T }>(url, data);
      return response.data.data;
    },
  };
})();
