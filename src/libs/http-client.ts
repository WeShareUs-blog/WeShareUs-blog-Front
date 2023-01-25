import axios, { AxiosRequestConfig } from 'axios';

const isDev = process.env.NODE_ENV !== 'production';
export const httpClient = (() => {
  const instance = axios.create({
    baseURL: isDev ? 'http://localhost:4000' : process.env.REACT_APP_HOST_NAME,
  });

  instance.interceptors.response.use(
    (res) => res,
    (err) => {
      if (err?.response?.data?.errorMessage) {
        // TODO: 나중에 빌드 한번하면 삭제
        // eslint-disable-next-line
        err.message = err.response.data.errorMessage || err.message;
      }
      return Promise.reject(err);
    },
  );

  return {
    async post<T>(url: string, data?: any, config?: AxiosRequestConfig) {
      const response = await instance.post(url, data, config);
      return response.data.data as T;
    },

    async get<T>(url: string, config?: AxiosRequestConfig) {
      const response = await instance.get(url, config);
      return response.data.data as T;
    },

    async patch<T>(url: string, data?: any, config?: AxiosRequestConfig) {
      const response = await instance.patch(url, data, config);
      return response.data.data as T;
    },
  };
})();
