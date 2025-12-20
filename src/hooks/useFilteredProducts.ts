import { useState, useEffect, useMemo } from 'react'
import { useProducts } from './useProducts'
import { FilterState } from './useFilters'

export const useFilteredProducts = (filters: FilterState) => {
  const { products, loading, error } = useProducts()
  const [filteredProducts, setFilteredProducts] = useState(products)

  const filtered = useMemo(() => {
    if (!products || products.length === 0) return []

    let result = [...products]

    // Поиск по названию
    if (filters.search) {
      result = result.filter(product =>
        product.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        product.short_description.toLowerCase().includes(filters.search.toLowerCase())
      )
    }

    // Фильтр по категориям
    if (filters.selectedCategories.length > 0) {
      result = result.filter(product =>
        product.category_id && filters.selectedCategories.includes(product.category_id)
      )
    }

    // Фильтр по материалам
    if (filters.selectedMaterials.length > 0) {
      result = result.filter(product => {
        // Разбиваем материалы товара на отдельные элементы
        const productMaterials = product.materials
          .split(',')
          .map(m => m.trim())
          .map(m => m.charAt(0).toUpperCase() + m.slice(1).toLowerCase())
        
        // Проверяем, есть ли пересечение с выбранными материалами
        return filters.selectedMaterials.some(selectedMaterial =>
          productMaterials.includes(selectedMaterial)
        )
      })
    }

    // Фильтр по цене
    if (filters.priceMin !== null) {
      result = result.filter(product => product.price >= filters.priceMin!)
    }
    if (filters.priceMax !== null) {
      result = result.filter(product => product.price <= filters.priceMax!)
    }

    // Сортировка
    switch (filters.sortBy) {
      case 'price-asc':
        result.sort((a, b) => (a.discounted_price || a.price) - (b.discounted_price || b.price))
        break
      case 'price-desc':
        result.sort((a, b) => (b.discounted_price || b.price) - (a.discounted_price || a.price))
        break
      case 'new':
        result = result.filter(product => product.is_new)
        break
      case 'discount':
        result = result.filter(product => product.discount && product.discount > 0)
        break
      case 'popular':
      default:
        // Сортируем по популярности: сначала популярные, потом остальные
        result.sort((a, b) => {
          if (a.is_popular && !b.is_popular) return -1
          if (!a.is_popular && b.is_popular) return 1
          return 0
        })
        break
    }

    return result
  }, [products, filters])

  useEffect(() => {
    setFilteredProducts(filtered)
  }, [filtered])

  return {
    products: filteredProducts,
    loading,
    error,
    totalCount: filteredProducts.length
  }
}
