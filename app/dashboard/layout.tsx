import { MainShell } from "@/components/shared/main-shell"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <MainShell>{children}</MainShell>
}