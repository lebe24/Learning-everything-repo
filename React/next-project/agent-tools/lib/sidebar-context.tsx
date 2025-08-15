"use client"

import React, { createContext, useContext, useState, ReactNode } from 'react'

export type SidebarSection = 'dashboard' | 'agents' | 'canvas' | 'analytics' | 'projects' | 'team' | 'capture' | 'proposal' | 'prompts'

interface SidebarContextType {
  activeSection: SidebarSection
  setActiveSection: (section: SidebarSection) => void
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined)

export function SidebarProvider({ children }: { children: ReactNode }) {
  const [activeSection, setActiveSection] = useState<SidebarSection>('dashboard')

  return (
    <SidebarContext.Provider value={{ activeSection, setActiveSection }}>
      {children}
    </SidebarContext.Provider>
  )
}

export function useSidebarContext() {
  const context = useContext(SidebarContext)
  if (context === undefined) {
    throw new Error('useSidebarContext must be used within a SidebarProvider')
  }
  return context
}
