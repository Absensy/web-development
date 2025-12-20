import { useState, useEffect } from 'react';

interface ExampleWork {
  id: number;
  title: string;
  description?: string;
  image: string;
  dimensions: string;
  date: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export function useAdminExamplesWork() {
  const [examplesWork, setExamplesWork] = useState<ExampleWork[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchExamplesWork = async () => {
    try {
      setLoading(true);
      
      const response = await fetch('/api/admin/examples-work');
      if (!response.ok) {
        throw new Error('Failed to fetch examples work');
      }
      
      const examplesWork = await response.json();
      setExamplesWork(examplesWork);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка при загрузке примеров работ');
    } finally {
      setLoading(false);
    }
  };

  const createExampleWork = async (exampleWorkData: Omit<ExampleWork, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      setSaving(true);
      
      const response = await fetch('/api/admin/examples-work', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(exampleWorkData),
      });

      if (!response.ok) {
        throw new Error('Failed to create example work');
      }

      const newExampleWork = await response.json();
      
      // Refresh examples work list
      await fetchExamplesWork();
      
      return newExampleWork;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка при создании примера работы');
      throw err;
    } finally {
      setSaving(false);
    }
  };

  const updateExampleWork = async (id: number, exampleWorkData: Partial<ExampleWork>) => {
    try {
      setSaving(true);
      
      const response = await fetch(`/api/admin/examples-work/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(exampleWorkData),
      });

      if (!response.ok) {
        throw new Error('Failed to update example work');
      }

      const updatedExampleWork = await response.json();
      
      // Refresh examples work list
      await fetchExamplesWork();
      
      return updatedExampleWork;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка при обновлении примера работы');
      throw err;
    } finally {
      setSaving(false);
    }
  };

  const deleteExampleWork = async (id: number) => {
    try {
      setDeleting(true);
      
      const response = await fetch(`/api/admin/examples-work/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete example work');
      }
      
      // Refresh examples work list
      await fetchExamplesWork();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка при удалении примера работы');
      throw err;
    } finally {
      setDeleting(false);
    }
  };

  useEffect(() => {
    fetchExamplesWork();
  }, []);

  return {
    examplesWork,
    loading,
    saving,
    deleting,
    error,
    fetchExamplesWork,
    createExampleWork,
    updateExampleWork,
    deleteExampleWork,
  };
}
