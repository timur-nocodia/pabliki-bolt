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
import { toast } from "sonner"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"

const formSchema = z.object({
  email: z.string().email("Введите корректный email адрес"),
  password: z.string().min(8, "Пароль должен содержать минимум 8 символов"),
})

export default function LoginPage() {
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      // TODO: Implement login API call
      console.log(values)
      toast.success("Вход выполнен успешно")
      router.push("/dashboard")
    } catch (error) {
      toast.error("Ошибка при входе")
    }
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

        <div className="max-w-md mx-auto">
          <div className="bg-background rounded-lg border p-8">
            <div className="flex items-center justify-center mb-8">
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold">pabliki</span>
                <span className="rounded bg-blue-600 px-1.5 py-0.5 text-sm font-semibold text-white">.KZ</span>
              </div>
            </div>

            <h1 className="text-2xl font-bold text-center mb-2">
              Вход в личный кабинет
            </h1>
            <p className="text-muted-foreground text-center mb-6">
              Введите ваши данные для входа в систему
            </p>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Введите email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Пароль</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="Введите пароль" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full">
                  Войти
                </Button>
              </form>
            </Form>

            <div className="mt-6 text-center space-y-2">
              <p className="text-sm text-muted-foreground">
                Нет аккаунта?{" "}
                <Link href="/public-owners-registration" className="text-blue-600 hover:underline">
                  Зарегистрироваться
                </Link>
              </p>
              <Button variant="link" className="text-sm text-muted-foreground">
                Забыли пароль?
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}