import { useState, useEffect } from 'react';

interface ContactInfo {
  id: number;
  address: string;
  phone: string;
  email: string;
  instagram?: string;
  working_hours: string;
  created_at: string;
  updated_at: string;
}

export function useAdminContacts() {
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchContactInfo = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/contacts');
      if (!response.ok) {
        throw new Error('Failed to fetch contact info');
      }
      const data = await response.json();
      setContactInfo(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка при загрузке контактов');
      console.error('Error fetching contact info:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateContactInfo = async (contactData: Partial<ContactInfo>) => {
    try {
      setSaving(true);

      const response = await fetch('/api/admin/contacts', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactData),
      });

      if (!response.ok) {
        throw new Error('Failed to update contact info');
      }

      const updatedContactInfo = await response.json();
      setContactInfo(updatedContactInfo);
      setError(null);

      return updatedContactInfo;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка при обновлении контактов');
      throw err;
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    fetchContactInfo();
  }, []);

  return {
    contactInfo,
    loading,
    saving,
    error,
    fetchContactInfo,
    updateContactInfo,
  };
}
