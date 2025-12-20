"use client"
import React, { createContext, useContext, ReactNode } from 'react'
import { useFilters, FilterData, FilterState } from '@/hooks/useFilters'

interface FilterContextType {
    filterData: FilterData | null
    filters: FilterState
    loading: boolean
    error: string | null
    updateFilter: (key: keyof FilterState, value: string | number | number[] | string[] | null) => void
    toggleCategory: (categoryId: number) => void
    toggleMaterial: (material: string) => void
    resetFilters: () => void
}

interface FilterProviderProps {
    children: ReactNode
    initialCategoryId?: number
}

const FilterContext = createContext<FilterContextType | undefined>(undefined)

export const FilterProvider = ({ children, initialCategoryId }: FilterProviderProps) => {
    const filterContextValue = useFilters(initialCategoryId)

    return (
        <FilterContext.Provider value={filterContextValue}>
            {children}
        </FilterContext.Provider>
    )
}

export const useFilterContext = () => {
    const context = useContext(FilterContext)
    if (context === undefined) {
        throw new Error('useFilterContext must be used within a FilterProvider')
    }
    return context
}
