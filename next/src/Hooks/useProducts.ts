import { Product } from '@/types/Product';
import { useEffect, useState } from 'react';
import { ProductService } from '@/services/ProductService';
import { useQuery } from '@tanstack/react-query';
// import { Product } from '@/types/product';
export const useProducts = () => {
    return useQuery({
        queryKey: ['products'],
        queryFn: () => ProductService.getAllProducts(),
        onError: (error: Error) => console.error('Erro ao buscar produtos:', error.message)
    });
};