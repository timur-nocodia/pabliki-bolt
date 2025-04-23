"use client"

import React from 'react'
import { ArrowLeft, Download, Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { ScrollArea } from "@/components/ui/scroll-area"
import { format } from "date-fns"
import { ru } from "date-fns/locale"
import { useRouter } from "next/navigation"
import { ContentPreview } from "@/components/shared/content-preview"
import { cn } from "@/lib/utils"
import { toast } from "sonner"

const postingData = {
  id: "1",
  advertiser: "Respect Shoes",
  campaignId: "RS-2024-001",
  submittedAt: new Date("2024-03-15T10:00:00"),
  status: "pending",
  targetPublics: ["@almaty_city", "@heodenist", "@almaty_news"],
  payment: 120000,
  manager: "Алеся",
  publics: [
    {
      id: "1",
      name: "@almaty_city",
      logo: "/public_demo.png",
      subscribers: 856000,
      payment: 45000,
      status: "pending"
    },
    {
      id: "2",
      name: "@heodenist",
      logo: "/public_demo.png",
      subscribers: 320000,
      payment: 35000,
      status: "approved"
    },
    {
      id: "3",
      name: "@almaty_news",
      logo: "/public_demo.png",
      subscribers: 420000,
      payment: 40000,
      status: "rejected",
      rejectionReason: "Не соответствует тематике паблика"
    }
  ],
  client: {
    instagram: "@respect_shoes",
    website: "https://respect-shoes.kz",
    phone: "+7 777 123 45 67",
    placementDates: "25.05.2025, 19:30",
    notes: "Размещение в прайм-тайм"
  },
  content: {
    text: "РЕКЛАМА В СОТНЯХ ПОПУЛЯРНЫХ ПАБЛИКАХ\n\n1 100 новостных пабликов\n140 млн подписчиков\n80 городов и населенных пунктов по РК",
    images: ["/public_demo.png"]
  }
}

export function PublicOwnerPostingDetail() {
  const router = useRouter()

  const handleApprove = async (publicId: string) => {
    try {
      // TODO: Implement API call to approve public
      toast.success("Паблик успешно одобрен")
    } catch (error) {
      toast.error("Ошибка при одобрении паблика")
    }
  }

  const handleReject = async (publicId: string) => {
    try {
      // TODO: Implement API call to reject public
      toast.success("Паблик отклонен")
    } catch (error) {
      toast.error("Ошибка при отклонении паблика")
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
            onClick={() => router.push("/dashboard-public/my-postings")}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-3xl font-bold">
            Заявка № {postingData.campaignId}
          </h1>
        </div>
      </div>

      {/* Request Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Информация о заявке</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <div className="text-sm text-muted-foreground">Рекламодатель</div>
              <div className="font-medium">{postingData.advertiser}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Дата заявки</div>
              <div className="font-medium">
                {format(postingData.submittedAt, "dd.MM.yyyy", { locale: ru })}
              </div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Instagram</div>
              <div className="font-medium">{postingData.client.instagram}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Веб-сайт</div>
              <div className="font-medium">{postingData.client.website}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <ContentPreview
        title="Контент к размещению"
        image={postingData.content.images[0]}
        description={postingData.content.text}
        metadata={[
          {
            label: "Дата размещения",
            value: postingData.client.placementDates
          },
          {
            label: "Оплата",
            value: new Intl.NumberFormat("ru-RU", {
              style: "currency",
              currency: "KZT",
              maximumFractionDigits: 0
            }).format(postingData.payment)
          }
        ]}
      />

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
                  <th className="h-12 px-4 text-left align-middle font-medium">Оплата</th>
                  <th className="h-12 px-4 text-left align-middle font-medium">Статус</th>
                  <th className="h-12 px-4 text-right align-middle font-medium">Действия</th>
                </tr>
              </thead>
              <tbody>
                {postingData.publics.map((public_) => (
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
                      }).format(public_.payment)}
                    </td>
                    <td className="p-4">
                      <div className={cn(
                        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
                        public_.status === "approved" && "bg-green-100 text-green-800",
                        public_.status === "rejected" && "bg-red-100 text-red-800",
                        public_.status === "pending" && "bg-yellow-100 text-yellow-800"
                      )}>
                        {public_.status === "approved" && "Одобрено"}
                        {public_.status === "rejected" && "Отклонено"}
                        {public_.status === "pending" && "Ожидает"}
                      </div>
                    </td>
                    <td className="p-4 text-right">
                      {public_.status === "pending" && (
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 px-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                            onClick={() => handleReject(public_.id)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 px-2 text-green-600 hover:text-green-700 hover:bg-green-50"
                            onClick={() => handleApprove(public_.id)}
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 p-4 bg-muted rounded-lg">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <div className="text-2xl font-bold">
                  {postingData.publics.length}
                </div>
                <div className="text-sm text-muted-foreground">Всего пабликов</div>
              </div>
              <div className="space-y-2">
                <div className="text-2xl font-bold">
                  {postingData.publics.filter(p => p.status === "approved").length}
                </div>
                <div className="text-sm text-muted-foreground">Одобрено</div>
              </div>
              <div className="space-y-2">
                <div className="text-2xl font-bold">
                  {postingData.publics.filter(p => p.status === "pending").length}
                </div>
                <div className="text-sm text-muted-foreground">Ожидает</div>
              </div>
              <div className="space-y-2">
                <div className="text-2xl font-bold">
                  {new Intl.NumberFormat("ru-RU", {
                    style: "currency",
                    currency: "KZT",
                    maximumFractionDigits: 0
                  }).format(
                    postingData.publics
                      .filter(p => p.status === "approved")
                      .reduce((acc, curr) => acc + curr.payment, 0)
                  )}
                </div>
                <div className="text-sm text-muted-foreground">Общая оплата</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Important Notes */}
      <Card>
        <CardHeader>
          <CardTitle>Важная информация</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 text-sm text-muted-foreground">
            <p>
              Контент будет размещен автоматически в вашем аккаунте (ax): {postingData.targetPublics.join(", ")} в указанную дату и время.
            </p>
            <p>
              Оплата будет перечислена на Ваш счёт в личном кабинете в течении 3х рабочих дней.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}