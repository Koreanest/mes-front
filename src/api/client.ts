// src/api/client.ts
import axios, {AxiosHeaders} from "axios";

// 백엔드 주소 설정
// Vite 환경변수에 VITE_API_BASE_URL 넣어두면 거기 우선 사용
// ex) http://localhost:8383
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "",
});

// 요청 인터셉터: 매 요청마다 Authorization 헤더에 JWT 추가
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      // 이미 Authorization 있으면 덮어쓰지 않음 (필요 시 덮어써도 됨)
      if (!config.headers) {
        config.headers = new AxiosHeaders();
      }
      if (!config.headers["Authorization"]) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

console.log("API BASE:", import.meta.env.VITE_API_BASE_URL);

// (옵션) 응답 인터셉터: 401 나오면 로그인 페이지로 보내고 싶으면 나중에 추가 가능
// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       // 예: localStorage.clear(); window.location.href = "/login";
//     }
//     return Promise.reject(error);
//   }
// );

export default api;
