// src/utils/request.ts
import axios from 'axios';
import { message } from 'ant-design-vue';
import router from '@/router';

const request = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api/v1',
  timeout: 15000,
});

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
request.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (error.response?.status === 401) {
      message.error('登录已过期，请重新登录');
      localStorage.removeItem('access_token');
      router.push('/login');
    } else if (error.response?.status === 403) {
      message.error('权限不足');
    } else {
      message.error(error.response?.data?.detail || '未知错误');
    }
    return Promise.reject(error);
  }
);

export default request;