// services/products.ts
import api from "@/lib/api";

export const ProductService = {
    async getAllProducts() {
        const response = await api.get("/produtos");
        return response.data;
    },

    async getProduct(id: string) {
        const response = await api.get(`/produtos/${id}`);
        return response.data;
    },

    async createProduct(data: any) {
        const response = await api.post("/produtos", data);
        return response.data;
    },

    async updateProduct(id: string, data: any) {
        const response = await api.put(`/produtos/${id}`, data);
        return response.data;
    },

    async deleteProduct(id: string) {
        const response = await api.delete(`/produtos/${id}`);
        return response.data;
    }
}

