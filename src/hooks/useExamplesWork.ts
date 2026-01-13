"use client"

import { useState, useEffect } from 'react'

export interface ExamplesWorkItem {
  id: number
  title: string
  image: string
  dimensions: string
  date: string
  description?: string
  is_active: boolean
  created_at: string
  updated_at: string
}

export const useExamplesWork = () => {
  const [examplesWork, setExamplesWork] = useState<ExamplesWorkItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchExamplesWork = async () => {
      try {
        setLoading(true)
        const { fetchWithFallback } = await import('@/lib/utils/api-fallback')
        const response = await fetchWithFallback('/api/examples-work')
        
        if (!response.ok) {
          throw new Error('Failed to fetch examples work')
        }
        
        const data = await response.json()
        setExamplesWork(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
        console.error('Error fetching examples work:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchExamplesWork()
  }, [])

  return { examplesWork, loading, error }
}
