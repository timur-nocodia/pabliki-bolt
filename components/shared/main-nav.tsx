'use client'

import { NavItem } from "@/types/nav"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"
import Link from "next/link"

interface MainNavProps {
  items: NavItem[]
}

export function MainNav({ items }: MainNavProps) {
  const pathname = usePathname()
  const [expanded, setExpanded] = useState<Record<string, boolean>>(() => {
    // Initialize all sections as expanded
    return items.reduce((acc, item) => ({
      ...acc,
      [item.title]: true
    }), {})
  })

  const toggleExpanded = (title: string) => {
    setExpanded(prev => ({ ...prev, [title]: !prev[title] }))
  }

  useEffect(() => {
    // Ensure all sections stay expanded when items change
    setExpanded(prev => ({
      ...prev,
      ...items.reduce((acc, item) => ({
        ...acc,
        [item.title]: true
      }), {})
    }))
  }, [items])

  return (
    <div className="space-y-1">
      {items.map((item) => {
        const isActive = pathname === item.href
        const isExpanded = expanded[item.title]

        return (
          <div key={item.title} className="space-y-1">
            <Button
              variant="ghost"
              asChild={!item.items && item.active !== false}
              className={cn(
                "w-full justify-start text-muted-foreground",
                "hover:bg-blue-600 hover:text-white rounded-lg mr-2",
                isActive && "bg-blue-600 text-white hover:bg-blue-700",
                item.active === false && "opacity-50 cursor-not-allowed hover:bg-transparent hover:text-muted-foreground"
              )}
              onClick={() => item.items && item.active !== false && toggleExpanded(item.title)}
              disabled={item.active === false}
            >
              {item.items || item.active === false ? (
                <div className="flex items-center w-full">
                  {item.icon && <span className="mr-2"><item.icon className="h-4 w-4" /></span>}
                  <span>{item.title}</span>
                  {item.badge && (
                    <span className="ml-auto rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground">
                      {item.badge}
                    </span>
                  )}
                  {item.items && (
                    <ChevronDown className={cn(
                      "ml-auto h-4 w-4 transition-transform",
                      isExpanded && "rotate-180"
                    )} />
                  )}
                </div>
              ) : (
                <Link href={item.href} className="flex items-center w-full">
                  {item.icon && <span className="mr-2"><item.icon className="h-4 w-4" /></span>}
                  <span>{item.title}</span>
                  {item.badge && (
                    <span className="ml-auto rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground">
                      {item.badge}
                    </span>
                  )}
                </Link>
              )}
            </Button>

            {item.items && isExpanded && (
              <div className="ml-4 space-y-1">
                {item.items.map((subItem) => (
                  <Button
                    key={subItem.title}
                    variant="ghost"
                    asChild={subItem.active !== false}
                    onClick={(e) => subItem.active === false && e.preventDefault()}
                    className={cn(
                      "w-full justify-start text-muted-foreground pl-6 rounded-lg mr-2",
                      "hover:bg-blue-600 hover:text-white",
                      subItem.active === false && "opacity-50 cursor-not-allowed hover:bg-transparent hover:text-muted-foreground"
                    )}
                    disabled={subItem.active === false}
                  >
                    {subItem.active === false ? (
                      <div className="flex items-center w-full">
                        {subItem.icon && <span className="mr-2"><subItem.icon className="h-4 w-4" /></span>}
                        <span>{subItem.title}</span>
                      </div>
                    ) : (
                      <Link href={subItem.href} className="flex items-center w-full">
                        {subItem.icon && <span className="mr-2"><subItem.icon className="h-4 w-4" /></span>}
                        <span>{subItem.title}</span>
                      </Link>
                    )}
                  </Button>
                ))}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}