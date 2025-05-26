import axios from 'axios';
import { QueryClient } from '@tanstack/react-query';

// Configuração global do Axios
export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Interceptores para tratamento global
api.interceptors.response.use(
    (response) => response.data,
    (error) => {
        const message = error.response?.data?.message || 'Erro na requisição';
        return Promise.reject(new Error(message));
    }
);

// Query Client
export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 5 * 60 * 1000,
            retry: (failureCount, error) => {
                if (error.message.includes('401')) return true;
                return failureCount < 2;
            }
        }
    }
});