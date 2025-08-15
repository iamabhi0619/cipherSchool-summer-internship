// src/api.js
import axios from "axios";

const API_BASE_URL = "/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  // You can add default headers here if needed
});

export default api;
export { API_BASE_URL };
