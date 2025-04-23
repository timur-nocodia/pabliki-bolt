'use client'

import { MainShell } from "@/components/shared/main-shell"
import { publicOwnerNavigationItems } from "@/config/public-owner-navigation"

export default function DashboardPublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <MainShell navigationItems={publicOwnerNavigationItems}>{children}</MainShell>
}