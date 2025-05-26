import { useMutation } from '@tanstack/react-query';

import { ProductService } from '@/services/ProductService';
import { ProductCreate } from '@/types/Product';

export const useCreateProduct = () => {
    return useMutation({
        mutationFn: (product: ProductCreate) => ProductService.createProduct(product),
        onSuccess: () => {
            // Reset form ou redirecionamento
        },
        onError: (error: any) => {
            console.error('Erro na criação:', error);
        }
    });
};