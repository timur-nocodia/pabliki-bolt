"use client"

import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

const formSchema = z.object({
  publicName: z.string().min(2, "Название паблика обязательно"),
  publicLink: z.string().min(1, "Ссылка на паблик обязательна"),
  email: z.string().email("Введите корректный email адрес"),
  postReelsPrice: z.string().regex(/^\d+$/, "Введите число").transform(Number),
  storiesPrice: z.string().regex(/^\d+$/, "Введите число").transform(Number),
  postStoriesPrice: z.string().regex(/^\d+$/, "Введите число").transform(Number),
  password: z.string().min(8, "Пароль должен содержать минимум 8 символов"),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Пароли не совпадают",
  path: ["confirmPassword"],
})

export default function PublicOwnersRegistrationPage() {
  const router = useRouter()
  const [showSuccessModal, setShowSuccessModal] = React.useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      publicName: "",
      publicLink: "",
      email: "",
      postReelsPrice: "",
      storiesPrice: "",
      postStoriesPrice: "",
      password: "",
      confirmPassword: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      // TODO: Implement registration API call
      setShowSuccessModal(true)
    } catch (error) {
      toast.error("Ошибка при регистрации")
    }
  }

  const handleModalClose = () => {
    setShowSuccessModal(false)
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-muted/50">
      <div className="container py-10">
        <Button 
          variant="ghost" 
          className="mb-6"
          onClick={() => router.push("/")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Вернуться на главную
        </Button>

        <div className="max-w-2xl mx-auto">
          <div className="bg-background rounded-lg border p-8">
            <h1 className="text-2xl font-bold mb-2">
              Регистрация паблика
            </h1>
            <p className="text-muted-foreground mb-6">
              Заполните форму для регистрации вашего паблика в сервисе Pabliki.kz
            </p>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="publicName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Название паблика</FormLabel>
                        <FormControl>
                          <Input placeholder="Введите название" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="publicLink"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ссылка на паблик</FormLabel>
                        <FormControl>
                          <Input placeholder="Введите ссылку" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>EMAIL</FormLabel>
                        <FormControl>
                          <Input placeholder="Введите email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="postReelsPrice"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Стоимость размещения Пост/Reels</FormLabel>
                          <FormControl>
                            <Input placeholder="Введите стоимость" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="storiesPrice"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Стоимость размещения Stories</FormLabel>
                          <FormControl>
                            <Input placeholder="Введите стоимость" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="postStoriesPrice"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Стоимость размещения Пост + Stories</FormLabel>
                          <FormControl>
                            <Input placeholder="Введите стоимость" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>ПАРОЛЬ</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="Введите пароль" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Подтвердите пароль</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="Подтвердите пароль" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Button type="submit" className="w-full">
                  Зарегистрироваться
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>

      <Dialog open={showSuccessModal} onOpenChange={handleModalClose}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-xl">
              СПАСИБО ЗА РЕГИСТРАЦИЮ В СЕРВИСЕ PABLIKI.KZ
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4 text-center">
            <p>
              Данные для входа в личный кабинет уже отправлены на вашу почту
            </p>
            <p>
              После окончания регистрации вы будете автоматически добавлены в нашу базу
              пабликов и рекомендоваться в списке выбора пабликов нашим заказчикам
            </p>
            <Button 
              onClick={handleModalClose} 
              className="w-full"
            >
              Вернуться на главную
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}