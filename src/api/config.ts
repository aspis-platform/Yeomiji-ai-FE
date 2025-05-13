import axios from 'axios';

// API 기본 URL 설정
const API_BASE_URL = 'http://localhost:8000';

// axios 인스턴스 생성
export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터 설정 (필요시 토큰 추가)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터 설정 (에러 핸들링)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      //localStorage.removeItem('token');
      //window.location.href = '/login';
      alert("API Failed To Auth")
    }
    return Promise.reject(error);
  }
);
