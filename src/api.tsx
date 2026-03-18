import axios from 'axios';


const API_BASE = 'http://localhost:9500' //스프링부트 서버주소

export const getProductionStatus = () => axios.get(`${API_BASE}/production`);
export const getWorkOrders = () => axios.get(`${API_BASE}/work-orders`);
export const getEquipmentStatus = () => axios.get(`${API_BASE}/equipment`);
export const getInventoryStatus = () => axios.get(`${API_BASE}/inventory`);

const api = axios.create({
  baseURL: "http://localhost:9500",
  withCredentials: true, // 선택 (JWT면 없어도 됨)
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;