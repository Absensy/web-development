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
        // Фильтруем по категории на клиенте, если нужно
        const filteredData = categoryId 
          ? data.filter((p: Product) => p.category_id === categoryId)
          : data;
        setProducts(filteredData);
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
