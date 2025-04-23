"use client"

import { Instagram, Facebook, Twitter, Youtube, Phone, Clock } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const socialLinks = [
  { icon: Instagram, href: "#" },
  { icon: Facebook, href: "#" },
  { icon: Twitter, href: "#" },
  { icon: Youtube, href: "#" },
]

export function FooterSection() {
  return (
    <footer className="bg-muted">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg">Связаться с нами по любым вопросам</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <a href="tel:+77770698292" className="hover:underline">+7 777 069 82 92</a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <a href="tel:+77771516186" className="hover:underline">+7 777 151 61 86</a>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>Время работы 24/7</span>
              </div>
            </div>
          </div>

          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg">О компании</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="hover:underline">
                  Адреса и контакты
                </Link>
              </li>
            </ul>
          </div>

          {/* Partnership Info */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg">Партнерство</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/public-owners-registration" className="hover:underline">
                  Для администраторов пабликов
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Для агенств
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Для маркетологов
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg">Мы в социальных сетях</h3>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <Link
                  key={index}
                  href={social.href}
                  className="h-10 w-10 rounded-full bg-background flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  <social.icon className="h-5 w-5" />
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Payment & Apps */}
        <div className="grid md:grid-cols-2 gap-8 py-8 border-t border-b">
          <div className="space-y-4">
            <p className="font-medium">Мы принимаем оплату</p>
            <div className="flex gap-4">
              <img src="/visa.svg" alt="Visa" className="h-8" />
              <img src="/mastercard.svg" alt="Mastercard" className="h-8" />
            </div>
          </div>
          <div className="space-y-4">
            <p className="font-medium">
              Скачивай мобильное приложение и запускай рекламу прямо с мобильного устройства
            </p>
            <div className="flex gap-4">
              <Link href="#">
                <img src="/app-store.svg" alt="App Store" className="h-10" />
              </Link>
              <Link href="#">
                <img src="/google-play.svg" alt="Google Play" className="h-10" />
              </Link>
            </div>
          </div>
        </div>

        {/* Legal & Copyright */}
        <div className="pt-8 space-y-8">
          <div className="flex flex-wrap gap-4">
            <Link href="#" className="text-sm hover:underline">
              Пользовательское соглашение
            </Link>
            <Link href="#" className="text-sm hover:underline">
              Политика конфиденциальности
            </Link>
          </div>

          <div className="space-y-4 text-sm text-muted-foreground">
            <p>© Pabliki.kz Все права защищены 2025</p>
            <p className="max-w-3xl">
              Для повышения удобства работы с сайтом (с) Pabliki.kz использует файлы cookie. 
              Продолжая использовать наш сайт, вы принимаете условия Пользовательского соглашения. 
              Если вы не хотите чтобы Ваши данные обрабатывались, отключите cookie в настройках браузера.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}