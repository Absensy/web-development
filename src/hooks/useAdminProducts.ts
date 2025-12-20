import { useState, useEffect } from 'react';

interface Product {
  id: number;
  name: string;
  short_description: string;
  full_description: string;
  materials: string;
  production_time: string;
  price: number;
  discount?: number;
  discounted_price?: number;
  image: string;
  category_id?: number;
  is_new: boolean;
  is_popular: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  category?: {
    id: number;
    name: string;
  };
}

export function useAdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async (search?: string, categoryId?: number) => {
    try {
      setLoading(true);
      
      let url = '/api/admin/products';
      const params = new URLSearchParams();
      
      if (search) params.append('search', search);
      if (categoryId) params.append('categoryId', categoryId.toString());
      
      if (params.toString()) {
        url += `?${params.toString()}`;
      }
      
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      
      const products = await response.json();
      setProducts(products);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка при загрузке товаров');
    } finally {
      setLoading(false);
    }
  };

  const createProduct = async (productData: Omit<Product, 'id' | 'created_at' | 'updated_at' | 'category'>) => {
    try {
      setSaving(true);
      
      const response = await fetch('/api/admin/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });

      if (!response.ok) {
        throw new Error('Failed to create product');
      }

      const newProduct = await response.json();
      
      // Refresh products list
      await fetchProducts();
      
      return newProduct;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка при создании товара');
      throw err;
    } finally {
      setSaving(false);
    }
  };

  const updateProduct = async (id: number, productData: Partial<Product>) => {
    try {
      setSaving(true);
      
      const response = await fetch(`/api/admin/products/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });

      if (!response.ok) {
        throw new Error('Failed to update product');
      }

      const updatedProduct = await response.json();
      
      // Refresh products list
      await fetchProducts();
      
      return updatedProduct;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка при обновлении товара');
      throw err;
    } finally {
      setSaving(false);
    }
  };

  const deleteProduct = async (id: number) => {
    try {
      setDeleting(true);
      
      const response = await fetch(`/api/admin/products/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete product');
      }
      
      // Refresh products list
      await fetchProducts();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка при удалении товара');
      throw err;
    } finally {
      setDeleting(false);
    }
  };

  const deleteProducts = async (ids: number[]) => {
    try {
      setDeleting(true);
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));

      const savedProducts = localStorage.getItem('adminProducts');
      const currentProducts: Product[] = savedProducts ? JSON.parse(savedProducts) : [];

      const updatedProducts = currentProducts.filter(product => !ids.includes(product.id));
      localStorage.setItem('adminProducts', JSON.stringify(updatedProducts));
      setProducts(updatedProducts);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка при удалении товаров');
      throw err;
    } finally {
      setDeleting(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return {
    products,
    loading,
    saving,
    deleting,
    error,
    fetchProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    deleteProducts,
  };
}
