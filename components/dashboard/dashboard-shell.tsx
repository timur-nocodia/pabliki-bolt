'use client'

import React, { useState } from "react"
import { DashboardNav } from "./dashboard-nav"
import { cn } from "@/lib/utils"

export function DashboardShell({
  children
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const onToggle = () => setSidebarOpen(!sidebarOpen)

  return (
    <div className="min-h-screen">
      <div className="flex flex-col">
        {React.cloneElement(children[0] as React.ReactElement, { onToggle })} {/* Header with onToggle prop */}
        <div className="flex">
          <DashboardNav 
            isOpen={sidebarOpen} 
            onToggle={onToggle}
          />
          <main className={cn(
            "flex-1 transition-all duration-300",
            sidebarOpen ? "ml-64" : "ml-0"
          )}>
            {children.slice(1)} {/* Content */}
          </main>
        </div>
      </div>
    </div>
  )
}