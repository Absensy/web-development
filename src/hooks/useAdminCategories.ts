import { useState, useEffect } from 'react';

interface Category {
  id: number;
  name: string;
  price_from: number;
  photo: string;
  discount?: number;
  discounted_price?: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  productsCount: number;
}

export function useAdminCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      
      const response = await fetch('/api/admin/categories');
      if (!response.ok) {
        throw new Error('Failed to fetch categories');
      }
      
      const categories = await response.json();
      setCategories(categories);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка при загрузке категорий');
    } finally {
      setLoading(false);
    }
  };

  const createCategory = async (categoryData: Omit<Category, 'id' | 'created_at' | 'updated_at' | 'productsCount'>) => {
    try {
      setSaving(true);
      
      const response = await fetch('/api/admin/categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(categoryData),
      });

      if (!response.ok) {
        throw new Error('Failed to create category');
      }

      const newCategory = await response.json();
      
      // Refresh categories list
      await fetchCategories();
      
      return newCategory;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка при создании категории');
      throw err;
    } finally {
      setSaving(false);
    }
  };

  const updateCategory = async (id: number, categoryData: Partial<Category>) => {
    try {
      setSaving(true);
      
      const response = await fetch(`/api/admin/categories/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(categoryData),
      });

      if (!response.ok) {
        throw new Error('Failed to update category');
      }

      const updatedCategory = await response.json();
      
      // Refresh categories list
      await fetchCategories();
      
      return updatedCategory;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка при обновлении категории');
      throw err;
    } finally {
      setSaving(false);
    }
  };

  const deleteCategory = async (id: number) => {
    try {
      setDeleting(true);
      
      const response = await fetch(`/api/admin/categories/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete category');
      }
      
      // Refresh categories list
      await fetchCategories();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка при удалении категории');
      throw err;
    } finally {
      setDeleting(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return {
    categories,
    loading,
    saving,
    deleting,
    error,
    fetchCategories,
    createCategory,
    updateCategory,
    deleteCategory,
  };
}
