import { useState, useEffect, useCallback } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

export interface FilterData {
  materials: string[]
  categories: Array<{ id: number; name: string }>
  priceRange: {
    min: number
    max: number
  }
  sortOptions: Array<{ value: string; label: string }>
}

export interface FilterState {
  search: string
  sortBy: string
  selectedCategories: number[]
  selectedMaterials: string[]
  priceMin: number | null
  priceMax: number | null
}

export const useFilters = (initialCategoryId?: number) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [filterData, setFilterData] = useState<FilterData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  // Initialize filters from URL parameters
  const getInitialFilters = useCallback((): FilterState => {
    const search = searchParams.get('search') || ''
    const sortBy = searchParams.get('sortBy') || 'price-asc'
    const categories = searchParams.get('categories')?.split(',').map(Number).filter(Boolean) || []
    const materials = searchParams.get('materials')?.split(',').filter(Boolean) || []
    const priceMin = searchParams.get('priceMin') ? Number(searchParams.get('priceMin')) : null
    const priceMax = searchParams.get('priceMax') ? Number(searchParams.get('priceMax')) : null

    return {
      search,
      sortBy,
      selectedCategories: initialCategoryId && !categories.length ? [initialCategoryId] : categories,
      selectedMaterials: materials,
      priceMin,
      priceMax
    }
  }, [searchParams, initialCategoryId])
  
  const [filters, setFilters] = useState<FilterState>(getInitialFilters)

  // Function to update URL parameters
  const updateURL = (newFilters: FilterState) => {
    const params = new URLSearchParams()
    
    if (newFilters.search) params.set('search', newFilters.search)
    if (newFilters.sortBy && newFilters.sortBy !== 'price-asc') params.set('sortBy', newFilters.sortBy)
    if (newFilters.selectedCategories.length > 0) {
      params.set('categories', newFilters.selectedCategories.join(','))
    }
    if (newFilters.selectedMaterials.length > 0) {
      params.set('materials', newFilters.selectedMaterials.join(','))
    }
    if (newFilters.priceMin !== null) params.set('priceMin', newFilters.priceMin.toString())
    if (newFilters.priceMax !== null) params.set('priceMax', newFilters.priceMax.toString())
    
    const newURL = params.toString() ? `?${params.toString()}` : window.location.pathname
    router.replace(newURL, { scroll: false })
  }

  useEffect(() => {
    const fetchFilterData = async () => {
      try {
        setLoading(true)
        const { fetchWithFallback } = await import('@/lib/utils/api-fallback')
        const response = await fetchWithFallback('/api/filters')
        
        if (!response.ok) {
          throw new Error('Failed to fetch filter data')
        }
        
        const data = await response.json()
        setFilterData(data)
        
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
        console.error('Error fetching filter data:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchFilterData()
  }, [])

  // Sync with URL changes (browser back/forward)
  useEffect(() => {
    const newFilters = getInitialFilters()
    setFilters(newFilters)
  }, [searchParams, getInitialFilters])

  const updateFilter = (key: keyof FilterState, value: string | number | number[] | string[] | null) => {
    const newFilters = {
      ...filters,
      [key]: value
    }
    setFilters(newFilters)
    updateURL(newFilters)
  }

  const toggleCategory = (categoryId: number) => {
    const newCategories = filters.selectedCategories.includes(categoryId)
      ? filters.selectedCategories.filter(id => id !== categoryId)
      : [...filters.selectedCategories, categoryId]
    
    const newFilters = {
      ...filters,
      selectedCategories: newCategories
    }
    setFilters(newFilters)
    updateURL(newFilters)
  }

  const toggleMaterial = (material: string) => {
    const newMaterials = filters.selectedMaterials.includes(material)
      ? filters.selectedMaterials.filter(m => m !== material)
      : [...filters.selectedMaterials, material]
    
    const newFilters = {
      ...filters,
      selectedMaterials: newMaterials
    }
    setFilters(newFilters)
    updateURL(newFilters)
  }

  const resetFilters = () => {
    const newFilters = {
      search: '',
      sortBy: 'price-asc',
      selectedCategories: [],
      selectedMaterials: [],
      priceMin: null,
      priceMax: null
    }
    setFilters(newFilters)
    updateURL(newFilters)
  }

  return {
    filterData,
    filters,
    loading,
    error,
    updateFilter,
    toggleCategory,
    toggleMaterial,
    resetFilters
  }
}
