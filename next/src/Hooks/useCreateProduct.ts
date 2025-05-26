

import { queryClient } from '@/lib/api';
import { ProductService } from '@/services/ProductService';
import { ProductCreate } from '@/types/Product';
import { useMutation } from '@tanstack/react-query';

export const useCreateProduct = () => {
    return useMutation({
        mutationFn: ProductService.createProduct,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['products'] })
    });
};