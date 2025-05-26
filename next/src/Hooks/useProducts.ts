import { Product } from '@/types/Product';
import { useEffect, useState } from 'react';
import { ProductService } from '@/services/ProductService';
// import { Product } from '@/types/product';

export const useProducts = () => {
    const [listpProducts, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await ProductService.getAllProducts();
                setProducts(data.items);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to load products');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    return { listpProducts, loading, error };
};