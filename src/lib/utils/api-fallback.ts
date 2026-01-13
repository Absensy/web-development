/**
 * Утилита для переключения между API и статическими JSON файлами
 * В режиме статического экспорта использует JSON файлы из public/data/
 */

// Определяем, находимся ли мы в статическом режиме
// Проверяем GitHub Pages домен
function checkIsStaticMode(): boolean {
  if (cachedIsStatic !== null) {
    return cachedIsStatic;
  }
  
  if (typeof window === 'undefined') {
    cachedIsStatic = false;
    return false;
  }
  
  // Проверяем домен GitHub Pages
  if (window.location.hostname.includes('github.io')) {
    cachedIsStatic = true;
    return true;
  }
  
  // В production режиме без localhost/127.0.0.1 считаем статическим
  // (для случаев, когда сайт развернут на другом статическом хостинге)
  const hostname = window.location.hostname;
  const isLocalhost = hostname.includes('localhost') || hostname.includes('127.0.0.1');
  
  // Если не localhost и не dev сервер, вероятно статический хостинг
  cachedIsStatic = !isLocalhost && hostname !== '';
  return cachedIsStatic;
}

// Кэшируем результат проверки для производительности
let cachedIsStatic: boolean | null = null;

/**
 * Получить basePath из текущего URL
 */
function getBasePathFromUrl(): string {
  if (typeof window === 'undefined') {
    return '';
  }
  
  const pathname = window.location.pathname;
  
  // Если это GitHub Pages (github.io), извлекаем basePath
  if (window.location.hostname.includes('github.io')) {
    const parts = pathname.split('/').filter(Boolean);
    if (parts.length > 0 && parts[0] !== '') {
      const firstPart = parts[0];
      if (!firstPart.includes('.') && firstPart !== 'api') {
        return `/${firstPart}`;
      }
    }
  }
  
  return '';
}

/**
 * Маппинг API endpoints на JSON файлы
 */
const apiToJsonMap: Record<string, string> = {
  '/api/products': '/data/products.json',
  '/api/categories': '/data/categories.json',
  '/api/examples-work': '/data/examples-work.json',
  '/api/contact': '/data/contact.json',
  '/api/content/about-company': '/data/content.json',
  '/api/content/footer': '/data/content.json',
  '/api/content/our-services': '/data/content.json',
  '/api/filters': '/data/filters.json',
};

/**
 * Получить JSON путь для API endpoint
 */
function getJsonPath(apiPath: string): string | null {
  const basePath = getBasePathFromUrl();
  
  // Для фильтров создаем динамически из категорий и продуктов
  if (apiPath === '/api/filters') {
    return null; // Будет обработан отдельно
  }
  
  // Для контента нужно извлекать конкретную секцию
  if (apiPath.startsWith('/api/content/')) {
    return `${basePath}/data/content.json`;
  }
  
  const jsonPath = apiToJsonMap[apiPath];
  return jsonPath ? `${basePath}${jsonPath}` : null;
}

/**
 * Загрузить данные из JSON файла
 */
async function loadFromJson(jsonPath: string): Promise<unknown> {
  try {
    const response = await fetch(jsonPath);
    if (!response.ok) {
      throw new Error(`Failed to load ${jsonPath}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error loading JSON from ${jsonPath}:`, error);
    throw error;
  }
}

interface Product {
  materials?: string | string[];
  price?: number;
}

interface Category {
  id: number;
  name: string;
}

interface FiltersData {
  categories: Category[];
  materials: string[];
  priceRange: {
    min: number;
    max: number;
  };
}

/**
 * Создать данные фильтров из категорий и продуктов
 */
async function createFiltersData(): Promise<FiltersData> {
  const basePath = getBasePathFromUrl();
  try {
    const [categories, products] = await Promise.all([
      loadFromJson(`${basePath}/data/categories.json`) as Promise<Category[]>,
      loadFromJson(`${basePath}/data/products.json`) as Promise<Product[]>
    ]);
    
    // Извлекаем уникальные материалы из продуктов
    const allMaterials = new Set<string>();
    products.forEach((p: Product) => {
      if (p.materials) {
        try {
          const parsed = typeof p.materials === 'string' ? JSON.parse(p.materials) : p.materials;
          if (Array.isArray(parsed)) {
            parsed.forEach((m: string) => {
              if (m && m.trim() !== '') {
                allMaterials.add(m.trim());
              }
            });
          } else if (typeof parsed === 'string' && parsed.trim() !== '') {
            allMaterials.add(parsed.trim());
          }
        } catch {
          if (typeof p.materials === 'string' && p.materials.trim() !== '') {
            allMaterials.add(p.materials.trim());
          }
        }
      }
    });
    const materials = Array.from(allMaterials).sort();
    
    // Извлекаем диапазон цен
    const prices = products
      .map((p: Product) => p.price)
      .filter((p: number | undefined): p is number => p != null && !isNaN(p));
    
    const minPrice = prices.length > 0 ? Math.min(...prices) : 0;
    const maxPrice = prices.length > 0 ? Math.max(...prices) : 100000;
    
    return {
      categories: categories || [],
      materials: materials || [],
      priceRange: {
        min: minPrice,
        max: maxPrice
      }
    };
  } catch (error) {
    console.error('Error creating filters data:', error);
    return {
      categories: [],
      materials: [],
      priceRange: { min: 0, max: 100000 }
    };
  }
}

/**
 * Извлечь секцию контента из общего JSON
 */
function extractContentSection(data: Record<string, unknown>, section: string): unknown {
  if (!data || typeof data !== 'object') {
    return null;
  }
  
  const sectionMap: Record<string, string> = {
    '/api/content/about-company': 'about-company',
    '/api/content/footer': 'footer',
    '/api/content/our-services': 'our-services',
  };
  
  const sectionKey = sectionMap[section];
  return sectionKey ? data[sectionKey] : null;
}

/**
 * Fetch с автоматическим fallback на JSON файлы
 * Для продуктов всегда приоритет у JSON файла
 */
export async function fetchWithFallback(
  apiPath: string,
  options?: RequestInit
): Promise<Response> {
  // Для POST/PUT/DELETE запросов используем только API
  if (options?.method && options.method !== 'GET') {
    return fetch(apiPath, options);
  }
  
  // Для продуктов всегда приоритет у JSON файла
  const isProductsRequest = apiPath.startsWith('/api/products') && !apiPath.includes('/admin');
  
  // Используем JSON fallback
  const jsonPath = getJsonPath(apiPath);
  
  // Если есть JSON файл, пробуем загрузить его первым
  if (jsonPath) {
    try {
      const data = await loadFromJson(jsonPath);
      
      // Для контента извлекаем нужную секцию
      let responseData = data;
      if (apiPath.startsWith('/api/content/')) {
        if (data && typeof data === 'object' && !Array.isArray(data)) {
          responseData = extractContentSection(data as Record<string, unknown>, apiPath);
          if (!responseData) {
            throw new Error(`Section not found in content.json for ${apiPath}`);
          }
        } else {
          throw new Error(`Invalid content.json format for ${apiPath}`);
        }
      }
      
      // Для продуктов фильтруем по category_id, если указан
      if (isProductsRequest && responseData && Array.isArray(responseData)) {
        const urlParams = new URLSearchParams(apiPath.split('?')[1] || '');
        const categoryId = urlParams.get('category_id');
        if (categoryId) {
          responseData = (responseData as unknown[]).filter(
            (p: unknown) => {
              const product = p as { category_id?: number | null };
              return product.category_id === Number(categoryId);
            }
          );
        }
      }
      
      return new Response(JSON.stringify(responseData), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    } catch (error) {
      console.warn(`JSON file not found or invalid for ${apiPath}, trying API:`, error);
      // Если JSON недоступен, пробуем API
    }
  }
  
  // Специальная обработка для фильтров
  if (apiPath === '/api/filters') {
    const basePath = getBasePathFromUrl();
    // Сначала пробуем загрузить готовый файл
    try {
      const filtersData = await loadFromJson(`${basePath}/data/filters.json`);
      return new Response(JSON.stringify(filtersData), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    } catch {
      // Если файла нет, создаем динамически
      try {
        const data = await createFiltersData();
        return new Response(JSON.stringify(data), {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        });
      } catch {
        // В крайнем случае пробуем API
      }
    }
  }
  
  // Если нет JSON или он недоступен, пробуем API
  try {
    const response = await fetch(apiPath, options);
    if (response.ok) {
      return response;
    }
  } catch (error) {
    console.error(`API request failed for ${apiPath}:`, error);
  }
  
  // Если все не удалось, возвращаем ошибку
  return new Response(JSON.stringify({ error: 'Failed to fetch data' }), {
    status: 500,
    headers: { 'Content-Type': 'application/json' }
  });
}

/**
 * Проверка, используется ли статический экспорт
 */
export function isStaticMode(): boolean {
  return checkIsStaticMode();
}

// Сбрасываем кэш при изменении страницы (для SPA навигации)
if (typeof window !== 'undefined') {
  window.addEventListener('popstate', () => {
    cachedIsStatic = null;
  });
}

