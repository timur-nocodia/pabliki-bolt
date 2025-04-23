export interface NavItem {
  title: string
  icon?: React.ElementType
  href: string
  badge?: string
  active?: boolean
  items?: NavItem[]
}