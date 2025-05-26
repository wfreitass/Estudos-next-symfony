// lib/api.ts
import axios from "axios";

const api = axios.create({
    baseURL: "http://127.0.0.1:8000/api/", // ou process.env.NEXT_PUBLIC_API_URL
    // baseURL: "https://sua-api.com/api", // ou process.env.NEXT_PUBLIC_API_URL
});

export default api;