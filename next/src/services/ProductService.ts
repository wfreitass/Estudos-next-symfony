import { api } from "@/lib/api";
import { Product, ProductCreate } from "@/types/Product";



export const ProductService = {
    async getAllProducts(): Promise<Product[]> {
        return api.get('/products');
    },

    async getProduct(id: string): Promise<Product> {
        return api.get(`/products/${id}`);
    },

    async createProduct(data: ProductCreate): Promise<Product> {
        return api.post('/products', data);
    },

    async updateProduct(id: string, data: Partial<ProductCreate>): Promise<Product> {
        return api.patch(`/products/${id}`, data);
    }
};