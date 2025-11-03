// src/api/request.ts
import axios from 'axios';
import { message } from 'ant-design-vue';

const request = axios.create({
  baseURL: '/api/v1',
  timeout: 10000,
});

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

request.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    message.error(error.response?.data?.message || '请求失败');
    return Promise.reject(error);
  }
);

export default request;