import { 
  BarChart3,
  Bell,
  Calculator,
  FileText,
  Home,
  HelpCircle,
  Gift
} from "lucide-react"
import { NavItem } from "@/types/nav"

export const publicOwnerNavigationItems = [
  {
    title: "ОСНОВНОЙ ФУНКЦИОНАЛ",
    items: [
      {
        title: "Главная",
        icon: Home,
        href: "/dashboard-public"
      },
      {
        title: "Мои паблики",
        icon: Home,
        href: "/dashboard-public/my-publics"
      },
      {
        title: "Мои размещения",
        icon: FileText,
        href: "/dashboard-public/my-postings"
      },
      {
        title: "Статистика",
        icon: BarChart3,
        href: "/dashboard-public/statistics",
        active: false
      },
      {
        title: "Финансы",
        icon: Calculator,
        href: "/dashboard-public/finances",
        active: false
      },
      {
        title: "Уведомления",
        icon: Bell,
        href: "/dashboard-public/notifications",
        active: false
      },
      {
        title: "Актуальные подборки",
        icon: Gift,
        href: "/dashboard-public/collections",
        active: false
      },
      {
        title: "FAQ",
        icon: HelpCircle,
        href: "/dashboard-public/faq",
        active: false
      }
    ]
  }
]