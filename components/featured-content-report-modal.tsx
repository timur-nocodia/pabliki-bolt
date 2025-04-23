"use client"

import * as React from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Instagram, Users, Heart, MessageCircle, Send, Megaphone } from "lucide-react"
import { format } from "date-fns"
import { ru } from "date-fns/locale"

interface FeaturedContentReportModalProps {
  trigger?: React.ReactNode
  data: {
    company: string
    campaignId: string
    dateRange: {
      from: Date
      to: Date
    }
    content: {
      type: "reel" | "story" | "post"
      description: string
      image: string
    }
    instagram: string
    regions: {
      name: string
      storiesReach: number
    }[]
    statistics: {
      totalPublics: number
      totalAudience: number
      storiesReach: number
      newSubscribers: number
      likes: number
      reposts: number
      comments: number
      pollResponses: number
    }
  } | null
}

export function FeaturedContentReportModal({
  trigger,
  data
}: FeaturedContentReportModalProps) {
  const [open, setOpen] = React.useState(false)

  if (!data) {
    return null
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || <Button>Открыть отчет</Button>}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            Заключительный отчет по размещению в пабликах
          </DialogTitle>
          <div className="mt-2 space-y-1">
            <div className="text-lg">
              КОМПАНИЯ: {data.company}
            </div>
            <div className="text-muted-foreground">
              Дата размещения: {format(data.dateRange.from, "dd.MM.yy", { locale: ru })} - {format(data.dateRange.to, "dd.MM.yy", { locale: ru })}
            </div>
          </div>
        </DialogHeader>

        <div className="grid grid-cols-3 gap-8">
          {/* Content Column */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">КОНТЕНТ</h3>
            <div className="aspect-[9/16] bg-muted rounded-lg overflow-hidden">
              <img 
                src={data.content.image} 
                alt="Content Preview" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-sm">
              Репост рилса в сториз с отметкой аккаунта {data.instagram}
            </div>
          </div>

          {/* Regions Column */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">ГОРОДА И РЕГИОНЫ</h3>
            <div className="space-y-2">
              {data.regions.map((region, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="font-medium">{region.name}</div>
                    <div className="text-sm text-muted-foreground">
                      Охват Stories: {new Intl.NumberFormat("ru-RU").format(region.storiesReach)}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Statistics Column */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">СТАТИСТИКА</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                  <Users className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">КОЛ-ВО ПАБЛИКОВ</div>
                  <div className="font-bold">{data.statistics.totalPublics}</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
                  <Users className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">АУДИТОРИЯ</div>
                  <div className="font-bold">
                    {new Intl.NumberFormat("ru-RU").format(data.statistics.totalAudience)}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center">
                  <Instagram className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">ОХВАТ STORIES</div>
                  <div className="font-bold">
                    {new Intl.NumberFormat("ru-RU").format(data.statistics.storiesReach)}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center">
                  <Users className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">НОВЫЕ ПОДПИСЧИКИ</div>
                  <div className="font-bold">
                    {new Intl.NumberFormat("ru-RU").format(data.statistics.newSubscribers)}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center">
                  <Heart className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">КОЛ-ВО ЛАЙКОВ</div>
                  <div className="font-bold">
                    {new Intl.NumberFormat("ru-RU").format(data.statistics.likes)}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                  <Send className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">КОЛ-ВО РЕПОСТОВ</div>
                  <div className="font-bold">
                    {new Intl.NumberFormat("ru-RU").format(data.statistics.reposts)}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center">
                  <MessageCircle className="h-5 w-5 text-indigo-600" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">НОВЫЕ КОММЕНТАРИИ</div>
                  <div className="font-bold">
                    {new Intl.NumberFormat("ru-RU").format(data.statistics.comments)}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-cyan-100 flex items-center justify-center">
                  <Megaphone className="h-5 w-5 text-cyan-600" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">ОТВЕТОВ ГОЛОСОВАТЬ</div>
                  <div className="font-bold">
                    {new Intl.NumberFormat("ru-RU").format(data.statistics.pollResponses)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}