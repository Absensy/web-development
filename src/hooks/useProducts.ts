import { useState, useEffect } from 'react';
import { Product } from '@/lib/db';
import { fetchWithFallback } from '@/lib/utils/api-fallback';

export const useProducts = (categoryId?: number) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const url = categoryId 
          ? `/api/products?category_id=${categoryId}`
          : '/api/products';
        
        const response = await fetchWithFallback(url);
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        
        const data = await response.json();
        // Данные уже отфильтрованы в fetchWithFallback, если указан category_id
        setProducts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryId]);

  return { products, loading, error };
};
