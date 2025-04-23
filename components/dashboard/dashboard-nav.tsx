"use client";

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { 
  BarChart3, 
  Bell, 
  Calculator, 
  ChevronDown,
  FileText, 
  Globe, 
  Home,
  Layout,
  Menu,
  MessageSquare,
  PenTool,
  PieChart,
  Settings,
  Users,
  Send,
  ListChecks,
  Megaphone
} from "lucide-react"

interface NavItem {
  title: string
  icon: React.ElementType
  href: string
  badge?: string
  disabled?: boolean
  items?: NavItem[]
}

const mainNavItems: NavItem[] = [
  {
    title: "Главная",
    icon: Home,
    href: "/dashboard"
  },
  {
    title: "Мои размещения",
    icon: FileText,
    href: "/dashboard/placements"
  },
  {
    title: "Статистика",
    icon: BarChart3,
    href: "/dashboard/statistics"
  },
  {
    title: "Финансы",
    icon: Calculator,
    href: "/dashboard/finances"
  },
  {
    title: "Уведомления",
    icon: Bell,
    href: "/dashboard/notifications"
  },
  {
    title: "Модерация заявок",
    icon: ListChecks,
    href: "/dashboard/moderation",
    badge: "100"
  },
  {
    title: "Запуск размещений",
    icon: Megaphone,
    href: "/dashboard/launch"
  },
  {
    title: "Push уведомления",
    icon: MessageSquare,
    href: "/dashboard/push",
    items: [
      {
        title: "Для клиентов",
        href: "/dashboard/push/clients"
      },
      {
        title: "Для пабликов",
        href: "/dashboard/push/publishers"
      }
    ]
  },
  {
    title: "Каталог пабликов",
    icon: FileText,
    href: "/dashboard/catalog"
  }
]

const serviceNavItems: NavItem[] = [
  {
    title: "Пользователи",
    icon: Users,
    href: "/dashboard/users"
  },
  {
    title: "Страницы",
    icon: Globe,
    href: "/dashboard/pages"
  },
  {
    title: "Модули",
    icon: Settings,
    href: "/dashboard/modules"
  },
  {
    title: "Внешний вид",
    icon: Layout,
    href: "/dashboard/appearance"
  },
  {
    title: "Маркетинг",
    icon: Megaphone,
    href: "/dashboard/marketing"
  },
  {
    title: "Аналитика",
    icon: PieChart,
    href: "/dashboard/analytics"
  },
  {
    title: "CRM - Система",
    icon: Users,
    href: "/dashboard/crm"
  },
  {
    title: "Кабинет клиентов",
    icon: FileText,
    href: "/dashboard/client-cabinet"
  },
  {
    title: "Кабинет пабликов",
    icon: FileText,
    href: "/dashboard/publisher-cabinet"
  },
  {
    title: "Planer Pabliki",
    icon: Send,
    href: "/dashboard/planer"
  }
]

export function DashboardNav({ 
  isOpen,
  onToggle 
}: { 
  isOpen: boolean
  onToggle: () => void
}) {
  const [expandedSections, setExpandedSections] = useState({
    main: true,
    service: true
  })

  return (
    <nav className={cn(
      "fixed left-0 top-16 z-40 h-[calc(100vh-4rem)] w-64 border-r bg-background transition-transform duration-300",
      !isOpen && "-translate-x-full"
    )}>
      <ScrollArea className="h-full">
        <div className="space-y-6 p-4">
          <div className="space-y-2">
            <Button
              variant="ghost"
              className="w-full justify-between text-muted-foreground font-medium hover:bg-blue-600 hover:text-white rounded-lg mr-2"
              onClick={() => setExpandedSections(prev => ({ ...prev, main: !prev.main }))}
            >
              ОСНОВНОЙ ФУНКЦИОНАЛ
              <ChevronDown className={cn(
                "h-4 w-4 transition-transform",
                expandedSections.main && "rotate-180"
              )} />
            </Button>
            <div className={cn(
              "space-y-1 overflow-hidden transition-all",
              expandedSections.main ? "max-h-[1000px]" : "max-h-0"
            )}>
              {mainNavItems.map((item, index) => (
                <NavItem key={index} item={item} />
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Button
              variant="ghost"
              className="w-full justify-between text-muted-foreground font-medium hover:bg-muted/50 hover:text-foreground"
              onClick={() => setExpandedSections(prev => ({ ...prev, service: !prev.service }))}
            >
              РАБОТА С СЕРВИСОМ
              <ChevronDown className={cn(
                "h-4 w-4 transition-transform",
                expandedSections.service && "rotate-180"
              )} />
            </Button>
            <div className={cn(
              "space-y-1 overflow-hidden transition-all",
              expandedSections.service ? "max-h-[1000px]" : "max-h-0"
            )}>
              {serviceNavItems.map((item, index) => (
                <NavItem key={index} item={item} />
              ))}
            </div>
          </div>
        </div>

        <div className="absolute bottom-4 left-4 right-4 rounded-lg border bg-muted p-4">
          <div className="text-sm font-semibold">MS PABLIKI.KZ</div>
          <div className="text-xs text-muted-foreground">Version: 1.0.0.00</div>
        </div>
      </ScrollArea>
    </nav>
  )
}

function NavItem({ item }: { item: NavItem }) {
  const [expanded, setExpanded] = useState(false)
  const isSelected = item.href === "/dashboard"

  const buttonClasses = cn(
    "w-full justify-start text-muted-foreground",
    "hover:bg-blue-600 hover:text-white rounded-lg mr-2",
    isSelected && "bg-blue-600 text-white hover:bg-blue-700 rounded-lg mr-2"
  )

  return (
    <div className="space-y-1">
      <Button
        variant="ghost"
        className={buttonClasses}
        disabled={item.disabled}
        onClick={() => item.items && setExpanded(!expanded)}
      >
        <item.icon className="mr-2 h-4 w-4" />
        {item.title}
        {item.badge && (
          <span className="ml-auto rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground">
            {item.badge}
          </span>
        )}
        {item.items && (
          <ChevronDown className={cn(
            "ml-auto h-4 w-4 transition-transform",
            expanded && "rotate-180"
          )} />
        )}
      </Button>
      {item.items && expanded && (
        <div className="ml-4 space-y-1 overflow-hidden transition-all">
          {item.items.map((subItem, index) => (
            <Button
              key={index}
              variant="ghost"
              className="w-full justify-start text-muted-foreground hover:bg-blue-600 hover:text-white pl-6 rounded-lg mr-2"
              disabled={subItem.disabled}
            >
              {subItem.title}
            </Button>
          ))}
        </div>
      )}
    </div>
  )
}