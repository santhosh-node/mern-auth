import axios, { AxiosRequestConfig } from 'axios';
import { redirect } from 'next/navigation';

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:8000';

const options: AxiosRequestConfig = {
  baseURL: `${BACKEND_URL}/api/v1`,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
};

export const tokenRefreshClient = axios.create(options);
export const axiosClient = axios.create(options);

tokenRefreshClient.interceptors.response.use((response) => response.data);

axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { config, response } = error;
    const { status, data } = response || {};

    if (status === 401 && data?.errorCode === 'UNAUTHORIZED') {
      if (!config._retry) {
        config._retry = true;
        try {
          await tokenRefreshClient.post('/auth/refresh-token');
          return axiosClient.request(config);
        } catch (refreshError) {
          redirect('/sign-in');
        }
      }
    }

    return Promise.reject({
      status: status || 500,
      message: data?.message || 'Unknown error occurred',
      errorCode: data?.errorCode,
    });
  }
);
