"use client"

import React from 'react'
import { ArrowLeft, Download, Edit, Archive } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { format } from "date-fns"
import { ru } from "date-fns/locale"
import { useRouter } from "next/navigation"
import { ContentPreview } from "@/components/shared/content-preview"
import type { Publication } from "@/app/dashboard/publications/[id]/page"

interface PublicationDetailProps {
  publication: Publication
}

export function PublicationDetail({ publication }: PublicationDetailProps) {
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
            onClick={() => router.push("/dashboard/publications")}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-3xl font-bold">
            {publication.company} - {publication.campaignId}
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Скачать отчет
          </Button>
          <Button variant="outline" className="gap-2">
            <Edit className="h-4 w-4" />
            Редактировать
          </Button>
          <Button variant="destructive" className="gap-2">
            <Archive className="h-4 w-4" />
            Архивировать
          </Button>
        </div>
      </div>

      <ContentPreview
        image={publication.content.images[0]}
        description={publication.content.text}
        metadata={[
          {
            label: "Компания",
            value: publication.company
          },
          {
            label: "Дата создания",
            value: format(publication.createdAt, "dd.MM.yyyy", { locale: ru })
          },
          {
            label: "Instagram",
            value: publication.client.instagram
          },
          {
            label: "Веб-сайт",
            value: publication.client.website
          }
        ]}
      />

      {/* Performance Stats */}
      <Card>
        <CardHeader>
          <CardTitle>Статистика размещения</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <div className="text-2xl font-bold">
                {new Intl.NumberFormat("ru-RU").format(publication.performance.totalSubscribers)}
              </div>
              <div className="text-sm text-muted-foreground">Общая база подписчиков</div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold">
                {new Intl.NumberFormat("ru-RU").format(publication.performance.monthlyReach)}
              </div>
              <div className="text-sm text-muted-foreground">Ежемесячный охват</div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold">
                {new Intl.NumberFormat("ru-RU").format(publication.performance.postReach)}
              </div>
              <div className="text-sm text-muted-foreground">Охват постов</div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold">
                {new Intl.NumberFormat("ru-RU").format(publication.performance.storyReach)}
              </div>
              <div className="text-sm text-muted-foreground">Охват сторис</div>
            </div>
          </div>

          <div className="border-t my-6" />

          <div className="grid grid-cols-3 md:grid-cols-6 gap-6">
            <div className="space-y-2">
              <div className="text-2xl font-bold">{publication.performance.likes}</div>
              <div className="text-sm text-muted-foreground">Лайки</div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold">{publication.performance.reposts}</div>
              <div className="text-sm text-muted-foreground">Репосты</div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold">{publication.performance.saves}</div>
              <div className="text-sm text-muted-foreground">Сохранения</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Publics Table */}
      <Card>
        <CardHeader>
          <CardTitle>Список пабликов</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4 p-4 bg-muted rounded-lg">
            <div className="text-sm text-muted-foreground">Всего пабликов в кампании</div>
            <div className="text-2xl font-bold">{publication.publics.reduce((acc, curr) => acc + curr.publications, 0)}</div>
          </div>
          <div className="rounded-lg border">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="h-12 px-4 text-left align-middle font-medium">Паблик</th>
                  <th className="h-12 px-4 text-left align-middle font-medium">Подписчики</th>
                  <th className="h-12 px-4 text-left align-middle font-medium">Публикации</th>
                  <th className="h-12 px-4 text-left align-middle font-medium">Охват</th>
                  <th className="h-12 px-4 text-left align-middle font-medium">Статус</th>
                </tr>
              </thead>
              <tbody>
                {publication.publics.map((public_) => (
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
                    <td className="p-4">{public_.publications}</td>
                    <td className="p-4">
                      {new Intl.NumberFormat("ru-RU").format(public_.reach)}
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