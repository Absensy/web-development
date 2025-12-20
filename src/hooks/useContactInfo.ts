"use client"

import { useState, useEffect } from 'react'

interface ContactInfo {
  id: number
  address: string
  phone: string
  email: string
  instagram?: string
  working_hours: string
  created_at: string
  updated_at: string
}

export const useContactInfo = () => {
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/contact')
        if (!response.ok) {
          throw new Error('Failed to fetch contact info')
        }
        const data = await response.json()
        setContactInfo(data)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
        // Fallback to default values if API fails
        setContactInfo({
          id: 1,
          address: 'пр. Янки Купалы 22а, цокольный этаж',
          phone: '+375 (29) 708-21-11',
          email: 'info@granit-grodno.by',
          instagram: 'granit.grodno',
          working_hours: 'Пн-Пт: 9:00 - 18:00, Сб-Вс: 10:00 - 16:00',
          created_at: '2024-01-01T00:00:00.000Z',
          updated_at: '2024-01-01T00:00:00.000Z'
        })
      } finally {
        setLoading(false)
      }
    }
    fetchContactInfo()
  }, [])

  return { contactInfo, loading, error }
}
