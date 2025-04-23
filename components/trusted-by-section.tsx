"use client"

import { Instagram } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const clients = [
  { name: "KMF", logo: "/clients_logos/noro4ot.png.webp" },
  { name: "KAZTOUR", logo: "/clients_logos/noro4ot.png.webp" },
  { name: "TASCREDIT", logo: "/clients_logos/noro4ot.png.webp" },
  { name: "GEONA", logo: "/clients_logos/noro4ot.png.webp" },
  { name: "MIR POLA", logo: "/clients_logos/noro4ot.png.webp" },
  { name: "dizzy", logo: "/clients_logos/noro4ot.png.webp" },
  { name: "Доктор Ост", logo: "/clients_logos/noro4ot.png.webp" },
  { name: "ДЕТИ ИНДИГО", logo: "/clients_logos/noro4ot.png.webp" },
  { name: "МЕДОПТИК", logo: "/clients_logos/noro4ot.png.webp" },
  { name: "KAZANTSEV GROUP", logo: "/clients_logos/noro4ot.png.webp" },
  { name: "DOSCAR", logo: "/clients_logos/noro4ot.png.webp" },
  { name: "SAIA HOME", logo: "/clients_logos/noro4ot.png.webp" },
  { name: "aztorg", logo: "/clients_logos/noro4ot.png.webp" },
  { name: "ЧИСТО", logo: "/clients_logos/noro4ot.png.webp" },
  { name: "shark", logo: "/clients_logos/noro4ot.png.webp" }
]

export function TrustedBySection() {
  return (
    <section className="py-24">
      <div className="container">
        <h2 className="text-4xl font-bold text-center mb-16">
          НАМ ДОВЕРЯЮТ ЛИДЕРЫ РЫНКА
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-16">
          {clients.map((client) => (
            <div
              key={client.name}
              className="aspect-[3/2] flex items-center justify-center p-6 bg-card rounded-lg border transition-all hover:scale-105"
            >
              <img
                src={client.logo}
                alt={client.name}
                className="max-w-full max-h-full object-contain opacity-75 hover:opacity-100 transition-opacity"
              />
            </div>
          ))}
        </div>

        <Card className="overflow-hidden">
          <CardContent className="p-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <img
                  src="/kmf.svg"
                  alt="KMF"
                  className="h-12 mb-6"
                />
                <div className="flex gap-4 mb-6">
                  <Button variant="outline" size="sm">
                    <Instagram className="h-4 w-4 mr-2" />
                    kmf_kz
                  </Button>
                  <Button variant="outline" size="sm">
                    <Instagram className="h-4 w-4 mr-2" />
                    kmf_kz
                  </Button>
                </div>
                <p className="text-muted-foreground">
                  Микрофинансовая организация KMF (ТМ KMF) — казахстанская микрофинансовая организация. 
                  Головной офис находится в Алматы. По состоянию на 31 декабря 2018 года, является 
                  крупнейшей МФО Казахстана с кредитным портфелем в 122,7 млрд тг.
                </p>
              </div>
              <div className="relative aspect-video rounded-lg overflow-hidden">
                <img
                  src="/kmf-office.jpg"
                  alt="KMF Office"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}