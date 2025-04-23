"use client"

import React from 'react'
import { ArrowLeft, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { format } from "date-fns"
import { ru } from "date-fns/locale"
import { useRouter } from "next/navigation"
import { ContentPreview } from "@/components/shared/content-preview"
import type { DetailedClientPosting } from "@/app/dashboard-client/my-postings/[id]/page"

interface ClientPostingDetailProps {
  posting: DetailedClientPosting
}

export function ClientPostingDetail({ posting }: ClientPostingDetailProps) {
  const router = useRouter()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon" 
            className="hover:bg-muted/50"
            onClick={() => router.push("/dashboard-client/my-postings")}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-3xl font-bold">
            {posting.publicName} - {posting.campaignId}
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Скачать статистику
          </Button>
        </div>
      </div>

      <ContentPreview
        image={posting.content.images[0]}
        description={posting.content.text}
        metadata={[
          {
            label: "Компания",
            value: posting.company
          },
          {
            label: "Дата создания",
            value: format(posting.client.placementDates, "dd.MM.yyyy", { locale: ru })
          },
          {
            label: "Instagram",
            value: posting.client.instagram
          },
          {
            label: "Веб-сайт",
            value: posting.client.website
          }
        ]}
      />

      {/* Performance Stats */}
      <Card>
        <CardHeader>
          <CardTitle>Статистика размещения</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 lg:grid-cols-6 gap-2">
            <div className="space-y-2">
              <div className="text-lg font-bold">
                {new Intl.NumberFormat("ru-RU").format(posting.metrics.totalReach)}
              </div>
              <div className="text-xs text-muted-foreground">Общий охват</div>
            </div>
            <div className="space-y-2">
              <div className="text-lg font-bold">
                {new Intl.NumberFormat("ru-RU").format(posting.metrics.totalViews)}
              </div>
              <div className="text-xs text-muted-foreground">Показы</div>
            </div>
            <div className="space-y-2">
              <div className="text-lg font-bold">
                {new Intl.NumberFormat("ru-RU", {
                  style: "currency",
                  currency: "KZT",
                  maximumFractionDigits: 0
                }).format(posting.metrics.totalCost)}
              </div>
              <div className="text-xs text-muted-foreground">Общая стоимость</div>
            </div>
            <div className="space-y-2">
              <div className="text-lg font-bold">{posting.metrics.likes}</div>
              <div className="text-xs text-muted-foreground">Лайки</div>
            </div>
            <div className="space-y-2">
              <div className="text-lg font-bold">{posting.metrics.comments}</div>
              <div className="text-xs text-muted-foreground">Комментарии</div>
            </div>
            <div className="space-y-2">
              <div className="text-lg font-bold">{posting.metrics.shares}</div>
              <div className="text-xs text-muted-foreground">Репосты</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Publics Table */}
      <Card>
        <CardHeader>
          <CardTitle>Размещение в пабликах</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="h-12 px-4 text-left align-middle font-medium">Паблик</th>
                  <th className="h-12 px-4 text-left align-middle font-medium">Подписчики</th>
                  <th className="h-12 px-4 text-left align-middle font-medium">Охват</th>
                  <th className="h-12 px-4 text-left align-middle font-medium">Показы</th>
                  <th className="h-12 px-4 text-left align-middle font-medium">Стоимость</th>
                  <th className="h-12 px-4 text-left align-middle font-medium">Статус</th>
                  <th className="h-12 px-4 text-left align-middle font-medium">Дата публикации</th>
                </tr>
              </thead>
              <tbody>
                {posting.publics.map((public_) => (
                  <tr key={public_.id} className="border-b">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                          <AvatarImage src={public_.logo} alt={public_.name} />
                          <AvatarFallback>{public_.name[0]}</AvatarFallback>
                        </Avatar>
                        <div className="font-medium">{public_.name}</div>
                      </div>
                    </td>
                    <td className="p-4">
                      {new Intl.NumberFormat("ru-RU").format(public_.subscribers)}
                    </td>
                    <td className="p-4">
                      {new Intl.NumberFormat("ru-RU").format(public_.reach)}
                    </td>
                    <td className="p-4">
                      {new Intl.NumberFormat("ru-RU").format(public_.views)}
                    </td>
                    <td className="p-4">
                      {new Intl.NumberFormat("ru-RU", {
                        style: "currency",
                        currency: "KZT",
                        maximumFractionDigits: 0
                      }).format(public_.cost)}
                    </td>
                    <td className="p-4">
                      <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        public_.status === "posted" 
                          ? "bg-green-100 text-green-800" 
                          : "bg-blue-100 text-blue-800"
                      }`}>
                        {public_.status === "posted" ? "Опубликовано" : "Запланировано"}
                      </div>
                    </td>
                    <td className="p-4">
                      {format(public_.publishedAt, "dd.MM.yyyy HH:mm", { locale: ru })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}