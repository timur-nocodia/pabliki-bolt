"use client"

import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { AspectRatio } from "@/components/ui/aspect-ratio"

interface CityPublic {
  id: string
  name: string
  handle: string
  subscribers: number
  postPrice: number
  storyPrice: number
  logo: string
}

interface CityPublicsModalProps {
  city: string
  image: string
  publics: CityPublic[]
  totalSubscribers: number
  totalPrice: number
}

export function CityPublicsModal({ city, image, publics = [], totalSubscribers, totalPrice }: CityPublicsModalProps) {
  const [open, setOpen] = React.useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full" size="lg">
          ОТКРЫТЬ
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>ТЕМАТИЧЕСКИЙ ПАКЕТ РАЗМЕЩЕНИЯ К ПРАЗДНИКУ НАУРЫЗ</DialogTitle>
          <p className="text-muted-foreground">Аудитория г. {city}</p>
        </DialogHeader>

        <AspectRatio ratio={16 / 9} className="mb-4 rounded-md overflow-hidden">
          <img src={image} alt={city} className="object-cover w-full h-full" />
        </AspectRatio>

        <h2 className="text-2xl font-bold mb-4">ПАБЛИКИ</h2>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Public</TableHead>
                <TableHead className="text-right">Кол-во подписчиков</TableHead>
                <TableHead className="text-right">Цена (Пост + Сторис)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {publics.length > 0 ? (
                publics.map((public_) => (
                  <TableRow key={public_.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-5 w-5">
                          <AvatarImage src={public_.logo} alt={public_.name} />
                          <AvatarFallback>{public_.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{public_.name}</div>
                          <div className="text-sm text-muted-foreground">{public_.handle}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      {new Intl.NumberFormat("ru-RU").format(public_.subscribers)}
                    </TableCell>
                    <TableCell className="text-right">
                      {new Intl.NumberFormat("ru-RU", {
                        style: "currency",
                        currency: "KZT",
                        maximumFractionDigits: 0
                      }).format(public_.postPrice + public_.storyPrice)}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} className="text-center py-4 text-muted-foreground">
                    Список пабликов пока не доступен
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <div className="mt-4 p-4 bg-muted rounded-md">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <div className="text-sm text-muted-foreground">Кол-во пабликов</div>
              <div className="font-bold">{publics.length}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Кол-во подписчиков</div>
              <div className="font-bold">{new Intl.NumberFormat("ru-RU").format(totalSubscribers)}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Цена размещения</div>
              <div className="font-bold">
                {new Intl.NumberFormat("ru-RU", {
                  style: "currency",
                  currency: "KZT",
                  maximumFractionDigits: 0
                }).format(totalPrice)}
              </div>
            </div>
          </div>
        </div>

        <Button className="w-full mt-4" size="lg">
          ОТПРАВИТЬ ЗАЯВКУ НА МОДЕРАЦИЮ
        </Button>
      </DialogContent>
    </Dialog>
  )
}