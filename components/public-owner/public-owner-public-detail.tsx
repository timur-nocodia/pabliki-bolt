"use client"

import React from 'react'
import { ArrowLeft, Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { format } from "date-fns"
import { ru } from "date-fns/locale"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { type PublicOwnerPublic } from "@/components/public-owner/public-owner-publics-table"

interface PublicOwnerPublicDetailProps {
  public_: PublicOwnerPublic
}

export function PublicOwnerPublicDetail({ public_ }: PublicOwnerPublicDetailProps) {
  const router = useRouter()

  const handleAcceptCounterOffer = async () => {
    try {
      // TODO: Implement API call
      toast.success("Предложение принято")
    } catch (error) {
      toast.error("Ошибка при принятии предложения")
    }
  }

  const handleRejectCounterOffer = async () => {
    try {
      // TODO: Implement API call
      toast.success("Предложение отклонено")
    } catch (error) {
      toast.error("Ошибка при отклонении предложения")
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon" 
            className="hover:bg-muted/50"
            onClick={() => router.push("/dashboard-public/my-publics")}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src="/public_demo.png" alt={public_.name} />
              <AvatarFallback>{public_.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold">{public_.name}</h1>
              <p className="text-muted-foreground">{public_.handle}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Public Info */}
        <Card>
          <CardHeader>
            <CardTitle>Информация о паблике</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">Описание</div>
                <p>Информационный паблик {public_.name}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-muted-foreground">Подписчики</div>
                  <div className="font-medium">
                    {new Intl.NumberFormat("ru-RU").format(public_.subscribers)}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Вовлеченность</div>
                  <div className="font-medium">4.2%</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Pricing Info */}
        <Card>
          <CardHeader>
            <CardTitle>Ценовое предложение</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <div className="text-sm text-muted-foreground mb-2">Запрошенная цена</div>
                <div className="grid grid-cols-2 gap-4 p-4 bg-muted rounded-lg">
                  <div>
                    <div className="text-sm text-muted-foreground">Пост</div>
                    <div className="text-xl font-bold">
                      {new Intl.NumberFormat("ru-RU", {
                        style: "currency",
                        currency: "KZT",
                        maximumFractionDigits: 0
                      }).format(public_.requestedPostPrice)}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Сторис</div>
                    <div className="text-xl font-bold">
                      {new Intl.NumberFormat("ru-RU", {
                        style: "currency",
                        currency: "KZT",
                        maximumFractionDigits: 0
                      }).format(public_.requestedStoryPrice)}
                    </div>
                  </div>
                </div>
              </div>

              {public_.approvedPostPrice && (
                <div>
                  <div className="text-sm text-muted-foreground mb-2">Контрпредложение</div>
                  <div className="grid grid-cols-2 gap-4 p-4 bg-blue-50 rounded-lg">
                    <div>
                      <div className="text-sm text-muted-foreground">Пост</div>
                      <div className="text-xl font-bold">
                        {new Intl.NumberFormat("ru-RU", {
                          style: "currency",
                          currency: "KZT",
                          maximumFractionDigits: 0
                        }).format(public_.approvedPostPrice)}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Сторис</div>
                      <div className="text-xl font-bold">
                        {new Intl.NumberFormat("ru-RU", {
                          style: "currency",
                          currency: "KZT",
                          maximumFractionDigits: 0
                        }).format(public_.approvedStoryPrice)}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button
                      variant="outline"
                      className="w-full text-red-600 hover:text-red-700 hover:bg-red-50"
                      onClick={handleRejectCounterOffer}
                    >
                      <X className="mr-2 h-4 w-4" />
                      Отклонить
                    </Button>
                    <Button
                      className="w-full bg-green-600 hover:bg-green-700"
                      onClick={handleAcceptCounterOffer}
                    >
                      <Check className="mr-2 h-4 w-4" />
                      Принять
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Statistics */}
      <Card>
        <CardHeader>
          <CardTitle>Статистика паблика</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <div className="text-2xl font-bold">
                {new Intl.NumberFormat("ru-RU").format(5200)}
              </div>
              <div className="text-sm text-muted-foreground">Среднее кол-во лайков</div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold">
                {new Intl.NumberFormat("ru-RU").format(320)}
              </div>
              <div className="text-sm text-muted-foreground">Среднее кол-во комментариев</div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold">
                {new Intl.NumberFormat("ru-RU").format(180)}
              </div>
              <div className="text-sm text-muted-foreground">Среднее кол-во сохранений</div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold">4.2%</div>
              <div className="text-sm text-muted-foreground">Вовлеченность</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Moderation Status */}
      <Card>
        <CardHeader>
          <CardTitle>Статус модерации</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                public_.status === "pending_review" 
                  ? "bg-yellow-100 text-yellow-800"
                  : public_.status === "action_required"
                  ? "bg-blue-100 text-blue-800"
                  : public_.status === "approved"
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}>
                {public_.status === "pending_review" && "На рассмотрении"}
                {public_.status === "action_required" && "Требуется действие"}
                {public_.status === "approved" && "Одобрен"}
                {public_.status === "rejected" && "Отклонен"}
              </div>
              <div className="text-sm text-muted-foreground">
                Последнее обновление: {format(public_.lastUpdated, "dd MMMM yyyy г.", { locale: ru })}
              </div>
            </div>

            <ScrollArea className="h-24 rounded-lg border p-4">
              <div className="text-sm">
                {public_.status === "pending_review" && "Паблик находится на рассмотрении. Ожидайте ответа модератора."}
                {public_.status === "action_required" && "Требуется ваш ответ на предложенные условия."}
                {public_.status === "approved" && "Паблик одобрен и готов к работе."}
                {public_.status === "rejected" && "Паблик не соответствует требованиям."}
              </div>
            </ScrollArea>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}