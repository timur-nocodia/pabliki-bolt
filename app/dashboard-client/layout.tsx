'use client'

import { MainShell } from "@/components/shared/main-shell"
import { clientNavigationItems } from "@/config/client-navigation"

export default function DashboardClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <MainShell navigationItems={clientNavigationItems}>{children}</MainShell>
}