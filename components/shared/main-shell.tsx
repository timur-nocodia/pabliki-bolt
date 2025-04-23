'use client'

import React from "react"
import { MainNav } from "./main-nav"
import { MainHeader } from "./main-header"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { navigationItems as defaultNavigationItems } from "@/config/navigation"
import { ClientSideShell } from "./client-side-shell"

export function MainShell({
  children,
  navigationItems = defaultNavigationItems
}: {
  children: React.ReactNode
  navigationItems?: any
}) {
  return (
    <ClientSideShell>
      {(sidebarOpen, onToggle) => (
        <div className="min-h-screen">
          <div className="flex flex-col">
            <MainHeader onToggle={onToggle} />
            <div className="flex">
              <nav className={cn(
                "fixed left-0 top-16 z-40 h-[calc(100vh-4rem)] w-72 border-r bg-background transition-transform duration-300",
                !sidebarOpen && "-translate-x-full"
              )}>
                <ScrollArea className="h-full">
                  <div className="space-y-6 p-4">
                    <MainNav items={navigationItems[0].items} />
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 rounded-lg border bg-muted p-4">
                    <div className="text-sm font-semibold">MS PABLIKI.KZ</div>
                    <div className="text-xs text-muted-foreground">Version: 1.0.0.00</div>
                  </div>
                </ScrollArea>
              </nav>
              <main className={cn(
                "flex-1 transition-all duration-300 p-6",
                sidebarOpen ? "ml-72" : "ml-0"
              )}>
                {children}
              </main>
            </div>
          </div>
        </div>
      )}
    </ClientSideShell>
  )
}