"use client"

import { Bell, ChevronDown, Menu, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface MainHeaderProps {
  onToggle: () => void
}

export function MainHeader({ onToggle }: MainHeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center px-4">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onToggle}
          className="mr-4 hover:bg-blue-600 hover:text-white text-muted-foreground"
        >
          <Menu className="h-5 w-5" />
        </Button>

        <div className="flex items-center gap-2">
          <span className="text-xl font-bold">pabliki</span>
          <span className="rounded bg-blue-600 px-1.5 py-0.5 text-sm font-semibold text-white">.KZ</span>
        </div>

        <h1 className="ml-8 text-lg font-semibold">Основная админ панель</h1>

        <div className="ml-auto flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon" 
            className="hover:bg-muted/50 hover:text-foreground text-muted-foreground"
          >
            <Bell className="h-5 w-5" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                className="flex items-center gap-2 hover:bg-muted/50 hover:text-foreground text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0"
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/avatar.jpg" />
                  <AvatarFallback>АД</AvatarFallback>
                </Avatar>
                <span>Менеджер</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel className="text-muted-foreground">Мой аккаунт</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="hover:bg-muted/50 hover:text-foreground">Настройки</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="hover:bg-muted/50 hover:text-foreground">Выйти</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}