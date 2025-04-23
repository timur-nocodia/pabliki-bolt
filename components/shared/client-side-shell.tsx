'use client'

import { useState } from "react"

export function ClientSideShell({
  children
}: {
  children: (sidebarOpen: boolean, onToggle: () => void) => React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const onToggle = () => setSidebarOpen(!sidebarOpen)

  return <>{children(sidebarOpen, onToggle)}</>
}