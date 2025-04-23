"use client"

import React from 'react'
import { ArrowLeft, Download, Send, Ban } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { format } from "date-fns"
import { ru } from "date-fns/locale"
import { useRouter } from "next/navigation"
import type { ModerationDetailData } from "@/app/dashboard/moderation/[id]/page"
import { ContentPreview } from "@/components/shared/content-preview"
import { cn } from "@/lib/utils"
import { toast } from "sonner"

interface ModerationDetailProps {
  moderation: ModerationDetailData
}

export function ModerationDetail({ moderation }: ModerationDetailProps) {
  const router = useRouter()
  
  // Calculate progress based on actual publics responses
  const completedCount = moderation.publics.filter(p => p.status === "approved" || p.status === "rejected").length
  const progress = (completedCount / moderation.publics.length) * 100
  
  // Calculate counts for display
  const approvedCount = moderation.approvedCount
  const rejectedCount = moderation.rejectedCount
  const pendingCount = moderation.pendingCount

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon" 
            className="hover:bg-muted/50"
            onClick={() => router.push("/dashboard/moderation")}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-3xl font-bold">
            {moderation.company} - {moderation.campaignId}
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2">
            <Send className="h-4 w-4" />
            Отправить заказчику
          </Button>
          <Button variant="destructive" className="gap-2">
            <Ban className="h-4 w-4" />
            Отменить модерацию
          </Button>
        </div>
      </div>

      <ContentPreview
        image={moderation.content.images[0]}
        description={moderation.content.text}
        metadata={[
          {
            label: "Компания",
            value: moderation.company
          },
          {
            label: "Дата подачи",
            value: format(moderation.submittedAt, "dd.MM.yyyy", { locale: ru })
          },
          {
            label: "Instagram",
            value: moderation.client.instagram
          },
          {
            label: "Веб-сайт",
            value: moderation.client.website
          }
        ]}
      />

      {/* Moderation Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Прогресс модерации</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="space-y-2">
              <Progress 
                value={Math.round(progress)} 
                max={100} 
                className="h-2 w-full bg-muted"
                style={{
                  ['--progress-background' as string]: 'hsl(var(--primary))',
                }}
              />
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">
                  Всего пабликов: {moderation.totalPublics}
                </span>
                <span className="font-medium">{Math.round(progress)}% обработано</span>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <div className="text-2xl font-bold">
                  {moderation.totalPublics}
                </div>
                <div className="text-sm text-muted-foreground">Всего пабликов</div>
              </div>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-green-600">
                  {approvedCount}
                </div>
                <div className="text-sm text-muted-foreground">Одобрено</div>
              </div>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-red-600">
                  {rejectedCount}
                </div>
                <div className="text-sm text-muted-foreground">Отклонено</div>
              </div>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-yellow-600">
                  {pendingCount}
                </div>
                <div className="text-sm text-muted-foreground">Ожидает</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Publics Table */}
      <Card>
        <CardHeader>
          <CardTitle>Статус модерации по пабликам</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="h-12 px-4 text-left align-middle font-medium">Паблик</th>
                  <th className="h-12 px-4 text-left align-middle font-medium">Подписчики</th>
                  <th className="h-12 px-4 text-left align-middle font-medium">Стоимость (Пост)</th>
                  <th className="h-12 px-4 text-left align-middle font-medium">Стоимость (Сторис)</th>
                  <th className="h-12 px-4 text-left align-middle font-medium">Статус</th>
                  <th className="h-12 px-4 text-left align-middle font-medium">Дата ответа</th>
                </tr>
              </thead>
              <tbody>
                {moderation.publics.map((public_) => (
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
                      {new Intl.NumberFormat("ru-RU", {
                        style: "currency",
                        currency: "KZT",
                        maximumFractionDigits: 0
                      }).format(public_.postCost)}
                    </td>
                    <td className="p-4">
                      {new Intl.NumberFormat("ru-RU", {
                        style: "currency",
                        currency: "KZT",
                        maximumFractionDigits: 0
                      }).format(public_.storyCost)}
                    </td>
                    <td className="p-4">
                      <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        public_.status === "approved" 
                          ? "bg-green-100 text-green-800"
                          : public_.status === "rejected"
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}>
                        {public_.status === "approved" 
                          ? "Одобрено" 
                          : public_.status === "rejected"
                          ? "Отклонено"
                          : "Ожидает"}
                      </div>
                    </td>
                    <td className="p-4">
                      {public_.responseDate 
                        ? format(public_.responseDate, "dd.MM.yyyy HH:mm", { locale: ru })
                        : "—"}
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