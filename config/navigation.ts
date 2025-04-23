import { 
  BarChart3, 
  Bell, 
  Calculator, 
  FileText, 
  Globe, 
  Home,
  Layout,
  MessageSquare,
  PieChart,
  Settings,
  Users,
  Send,
  ListChecks,
  Megaphone
} from "lucide-react"
import { NavItem } from "@/types/nav"

const mainNavItems: NavItem[] = [
  {
    title: "Главная",
    icon: Home,
    href: "/dashboard",
    active: true
  },
  {
    title: "Мои размещения",
    icon: FileText,
    href: "/dashboard/publications",
    active: true
  },
  {
    title: "Статистика",
    icon: BarChart3,
    href: "/dashboard/statistics",
    active: false
  },
  {
    title: "Финансы",
    icon: Calculator,
    href: "/dashboard/finances",
    active: false
  },
  {
    title: "Уведомления",
    icon: Bell,
    href: "/dashboard/notifications",
    active: true
  },
  {
    title: "Модерация заявок",
    icon: ListChecks,
    href: "/dashboard/moderation",
    active: true
  },
  {
    title: "Запуск размещений",
    icon: Megaphone,
    href: "/dashboard/start-publication",
    active: true
  },
  {
    title: "Push уведомления",
    icon: MessageSquare,
    href: "/dashboard/push",
    active: false,
    items: [
      {
        title: "Для клиентов",
        href: "/dashboard/push/clients",
        active: false
      },
      {
        title: "Для пабликов",
        href: "/dashboard/push/publishers",
        active: false
      }
    ]
  },
  {
    title: "Каталог пабликов",
    icon: FileText,
    href: "/dashboard/catalog",
    active: false
  }
]

const serviceNavItems: NavItem[] = [
  {
    title: "Пользователи",
    icon: Users,
    href: "/dashboard/users",
    active: false
  },
  {
    title: "Страницы",
    icon: Globe,
    href: "/dashboard/pages",
    active: false
  },
  {
    title: "Модули",
    icon: Settings,
    href: "/dashboard/modules",
    active: false
  },
  {
    title: "Внешний вид",
    icon: Layout,
    href: "/dashboard/appearance",
    active: false
  },
  {
    title: "Маркетинг",
    icon: Megaphone,
    href: "/dashboard/marketing",
    active: false
  },
  {
    title: "Аналитика",
    icon: PieChart,
    href: "/dashboard/analytics",
    active: false
  },
  {
    title: "CRM - Система",
    icon: Users,
    href: "/dashboard/crm",
    active: false
  },
  {
    title: "Кабинет клиентов",
    icon: FileText,
    href: "/dashboard/client-cabinet",
    active: false
  },
  {
    title: "Кабинет пабликов",
    icon: FileText,
    href: "/dashboard/publisher-cabinet",
    active: false
  },
  {
    title: "Planer Pabliki",
    icon: Send,
    href: "/dashboard/planer",
    active: false
  }
]

export const navigationItems = [
  {
    title: "ОСНОВНОЙ ФУНКЦИОНАЛ",
    items: mainNavItems
  },
  {
    title: "РАБОТА С СЕРВИСОМ",
    items: serviceNavItems
  }
]