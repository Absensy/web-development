import { useState, useEffect } from 'react';

interface AboutCompanyData {
  title: string;
  description: string;
  image: string;
  advantages: string[];
  statistics: Array<{
    value: string;
    label: string;
  }>;
}

interface Service {
  id: number;
  name: string;
  subtext: string;
  image: string;
}

interface OurServicesData {
  ourServices: Service[];
}

export function useAboutCompanyContent() {
  const [data, setData] = useState<AboutCompanyData>({
    title: 'О нашей компании',
    description: 'Более 15 лет мы создаем памятники, которые хранят память о ваших близких...',
    image: '/images/ded.png',
    advantages: [
      'Качество материалов',
      'Индивидуальный подход', 
      'Гарантия и надёжность'
    ],
    statistics: [
      { value: '10+', label: 'лет опыта' },
      { value: '2000+', label: 'памятников' },
      { value: '100%', label: 'гарантия' }
    ]
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const { fetchWithFallback } = await import('@/lib/utils/api-fallback');
      const response = await fetchWithFallback('/api/content/about-company');
      
      if (!response.ok) {
        throw new Error('Failed to fetch content');
      }
      
      const contentData = await response.json();
      setData(contentData);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка при загрузке контента');
      // Оставляем дефолтные значения при ошибке
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    data,
    loading,
    error,
    refetch: fetchData
  };
}

interface FooterData {
  slogan: string;
  unp_number: string;
  copyright_text: string;
  company_full_name: string;
}

export function useFooterContent() {
  const [data, setData] = useState<FooterData>({
    slogan: 'Сохраняем память о ваших близких в граните на века',
    unp_number: '1234567890',
    copyright_text: '© 2024 Гранит памяти. Все права защищены.',
    company_full_name: 'ООО "Гранит Памяти"'
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const { fetchWithFallback } = await import('@/lib/utils/api-fallback');
      const response = await fetchWithFallback('/api/content/footer');
      
      if (!response.ok) {
        throw new Error('Failed to fetch footer content');
      }
      
      const footerData = await response.json();
      setData(footerData);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка при загрузке контента футера');
      // Оставляем дефолтные значения при ошибке
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    data,
    loading,
    error,
    refetch: fetchData
  };
}

export function useOurServicesContent() {
  const [data, setData] = useState<OurServicesData>({
    ourServices: [
      {
        id: 1,
        name: 'Изготовление памятников',
        subtext: 'Индивидуальные памятники из гранита и мрамора',
        image: '/images/memorialMonument.jpg'
      },
      {
        id: 2,
        name: 'Установка памятников',
        subtext: 'Профессиональная установка на кладбище',
        image: '/images/doubleMonument.jpg'
      },
      {
        id: 3,
        name: 'Благоустройство могил',
        subtext: 'Ограды, цветники и другие элементы',
        image: '/images/GrneyMonument.jpg'
      }
    ]
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const { fetchWithFallback } = await import('@/lib/utils/api-fallback');
      const response = await fetchWithFallback('/api/content/our-services');
      
      if (!response.ok) {
        throw new Error('Failed to fetch our services content');
      }
      
      const servicesData = await response.json();
      setData(servicesData);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка при загрузке контента услуг');
      // Оставляем дефолтные значения при ошибке
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    data,
    loading,
    error,
    refetch: fetchData
  };
}