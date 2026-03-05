import { API_ENDPOINTS } from '@/constant/api-endpoints';
import { globalConfig } from '@/constant/global-config';
import type {
  AxiosInstance,
  AxiosError,
  InternalAxiosRequestConfig,
  AxiosRequestHeaders,
  AxiosHeaders,
} from 'axios';
import axios from 'axios';
import Cookies from 'js-cookie';
import { toast } from 'sonner';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  withCredentials: true,
  timeout: 10000,
});

//  GLOBAL LOCK + QUEUE
let isRefreshing = false;
let isLogoutHandled = false;

type FailedQueueItem = {
  resolve: (token: string) => void;
  reject: (error: AxiosError | null) => void;
};
let failedQueue: FailedQueueItem[] = [];

const processQueue = (error: AxiosError | null, token: string = '') => {
  failedQueue.forEach((p) => {
    if (error) p.reject(error);
    else p.resolve(token);
  });
  failedQueue = [];
};

const handleLogout = async () => {
  if (isLogoutHandled) return;
  isLogoutHandled = true;
  try {
    await axiosInstance.post(API_ENDPOINTS.LOGOUT);
  } catch (e) {
    console.error('Error during logout:', e);
  }
  Cookies.remove(globalConfig.ACCESS_TOKEN);
  toast.error('Session expired. Please login again.');
  window.location.replace('/');
};

axiosInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = Cookies.get(globalConfig.ACCESS_TOKEN);
  if (!config.headers) config.headers = {} as AxiosRequestHeaders;

  if (token && !config.url?.includes(API_ENDPOINTS.REFRESH_TOKEN)) {
    (config.headers as AxiosHeaders).Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (res) => res,
  async (error: AxiosError) => {
    const orig = error.config as InternalAxiosRequestConfig & { _retry?: boolean };
    const access_token = Cookies.get(globalConfig.ACCESS_TOKEN);
    if (
      error.response?.status === 401 &&
      !orig._retry &&
      access_token &&
      !orig.url?.includes(API_ENDPOINTS.REFRESH_TOKEN)
    ) {
      orig._retry = true;

      //  If a refresh request is already running → queue this request
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: (newToken: string) => {
              if (!orig.headers) orig.headers = {} as AxiosRequestHeaders;
              (orig.headers as AxiosHeaders).Authorization = `Bearer ${newToken}`;
              resolve(axiosInstance(orig));
            },
            reject,
          });
        });
      }
      isRefreshing = true;
      try {
        const refreshResponse = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}${API_ENDPOINTS.REFRESH_TOKEN}`,
          {},
          {
            withCredentials: true,
            headers: {
              accept: '*/*',
            },
          },
        );
        const res = refreshResponse.data?.data || refreshResponse.data;
        const newAccess = res?.access_token;
        Cookies.set(globalConfig.ACCESS_TOKEN, newAccess, {
          sameSite: 'lax',
          secure: process.env.NODE_ENV === 'production',
        });
        processQueue(null, newAccess);
        isRefreshing = false;
        if (!orig.headers) orig.headers = {} as AxiosRequestHeaders;
        (orig.headers as AxiosHeaders).Authorization = `Bearer ${newAccess}`;
        return axiosInstance(orig);
      } catch (e) {
        processQueue(e as AxiosError, '');
        isRefreshing = false;
        await handleLogout();
        return Promise.reject(e);
      } finally {
        isRefreshing = false;
      }
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
