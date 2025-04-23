import { 
  BarChart3,
  Bell,
  Calculator,
  FileText,
  Home,
  HelpCircle,
  Gift,
  MessageSquare,
  Settings
} from "lucide-react"
import { NavItem } from "@/types/nav"

export const clientNavigationItems = [
  {
    title: "ОСНОВНОЙ ФУНКЦИОНАЛ",
    items: [
      {
        title: "Главная",
        icon: Home,
        href: "/dashboard-client",
        active: true
      },
      {
        title: "Мои размещения",
        icon: FileText,
        href: "/dashboard-client/my-postings", 
        active: true
      },
      {
        title: "Статистика",
        icon: BarChart3,
        href: "/dashboard-client/statistics",
        active: false
      },
      {
        title: "Финансы",
        icon: Calculator,
        href: "/dashboard-client/finances",
        active: false
      },
      {
        title: "Уведомления",
        icon: Bell,
        href: "/dashboard-client/notifications",
        active: false
      },
      {
        title: "Сообщения",
        icon: MessageSquare,
        href: "/dashboard-client/messages",
        active: false
      },
      {
        title: "Настройки",
        icon: Settings,
        href: "/dashboard-client/settings",
        active: false
      },
      {
        title: "FAQ",
        icon: HelpCircle,
        href: "/dashboard-client/faq",
        active: false
      }
    ]
  }
]