import axios, { AxiosRequestConfig } from 'axios';

const http = axios.create({
  //   baseURL: process.env.BASE_URL,
  baseURL: 'http://localhost:5002',
});

http.interceptors.request.use((config) => {
  config.headers['Content-Type'] = 'application/json';
  // config.headers['Accept'] = 'application/json';
  return config;
});

http.interceptors.response.use(
  (res) => res,
  (error) => {
    console.error(error.response);
  },
);

export default http;
