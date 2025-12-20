"use client"
import React, { createContext, useContext, ReactNode } from 'react'
import { useContactInfo } from '@/hooks/useContactInfo'

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

interface ContactContextType {
    contactInfo: ContactInfo | null
    loading: boolean
    error: string | null
}

interface ContactProviderProps {
    children: ReactNode
}

const ContactContext = createContext<ContactContextType | undefined>(undefined)

export const ContactProvider = ({ children }: ContactProviderProps) => {
    const contactContextValue = useContactInfo()

    return (
        <ContactContext.Provider value={contactContextValue}>
            {children}
        </ContactContext.Provider>
    )
}

export const useContactContext = () => {
    const context = useContext(ContactContext)
    if (context === undefined) {
        throw new Error('useContactContext must be used within a ContactProvider')
    }
    return context
}
