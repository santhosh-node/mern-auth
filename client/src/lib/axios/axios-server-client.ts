import axios from 'axios';
import { cookies } from 'next/headers';

export const axiosServerClient = axios.create({
  baseURL: 'http://localhost:8000/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export const createAxiosClient = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000/api/v1',
    headers: {
      'Content-Type': 'application/json',
      ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
    },
    withCredentials: true,
  });

  return axiosInstance;
};
