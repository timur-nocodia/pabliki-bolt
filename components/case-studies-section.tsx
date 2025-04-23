"use client"

import { FileText, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { FeaturedContentReportModal } from "@/components/featured-content-report-modal"

const cases = [
  {
    title: "KIA",
    type: "Stories",
    image: "/public_demo.png",
    className: "translate-y-4",
    report: {
      company: "KIA",
      campaignId: "KIA-2024-001",
      dateRange: {
        from: new Date("2024-03-05"),
        to: new Date("2024-03-08")
      },
      content: {
        type: "story",
        description: "Репост рилса в сториз с отметкой аккаунта @kia_kazakhstan",
        image: "/public_demo.png"
      },
      instagram: "@kia_kazakhstan",
      regions: [
        { name: "Алматы", storiesReach: 118000 },
        { name: "Астана", storiesReach: 95000 },
        { name: "Шымкент", storiesReach: 72000 }
      ],
      statistics: {
        totalPublics: 412,
        totalAudience: 40700000,
        storiesReach: 1356000,
        newSubscribers: 9300,
        likes: 9800,
        reposts: 26000,
        comments: 218,
        pollResponses: 3116
      }
    }
  },
  {
    title: "DIZZY",
    type: "Reels",
    image: "/public_demo.png",
    className: "-translate-y-6",
    report: null
  },
  {
    title: "TAS GROUP",
    type: "Post",
    image: "/public_demo.png",
    className: "translate-y-8",
    report: null
  },
  {
    title: "WOW-Qoldau",
    type: "Stories",
    image: "/public_demo.png",
    className: "-translate-y-4",
    report: null
  },
  {
    title: "Доктор ОСТ",
    type: "Carousel",
    image: "/public_demo.png",
    className: "translate-y-6",
    report: null
  },
  {
    title: "Синдром сухого глаза",
    type: "Stories",
    image: "/public_demo.png",
    className: "-translate-y-8",
    report: null
  },
  {
    title: "Греция - Черногория",
    type: "Post",
    image: "/public_demo.png",
    className: "translate-y-4",
    report: null
  },
  {
    title: "Аутизм",
    type: "Stories",
    image: "/public_demo.png",
    className: "-translate-y-6",
    report: null
  },
  {
    title: "К 30 годам",
    type: "Reels",
    image: "/public_demo.png",
    className: "translate-y-8",
    report: null
  },
  {
    title: "Green Market",
    type: "Post",
    image: "/public_demo.png",
    className: "-translate-y-4",
    report: null
  },
  {
    title: "Fitness Club",
    type: "Stories",
    image: "/public_demo.png",
    className: "translate-y-6",
    report: null
  },
  {
    title: "Beauty Salon",
    type: "Post",
    image: "/public_demo.png",
    className: "-translate-y-8",
    report: null
  },
  {
    title: "Coffee Shop",
    type: "Reels",
    image: "/public_demo.png",
    className: "translate-y-4",
    report: null
  },
  {
    title: "Restaurant",
    type: "Stories",
    image: "/public_demo.png",
    className: "-translate-y-6",
    report: null
  },
  {
    title: "Tech Store",
    type: "Post",
    image: "/public_demo.png",
    className: "translate-y-8",
    report: null
  }
]

export function CaseStudiesSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-blue-100/50 to-blue-50" />
      
      <div className="container relative">
        <h2 className="text-4xl font-bold text-center mb-16">
          НАШИ КЕЙСЫ ПО РАЗМЕЩЕНИЯМ
        </h2>

        {/* Floating Posts Grid */}
        <div className="grid grid-cols-5 gap-y-16 mb-16 -mx-2">
          {cases.map((case_, index) => (
            <div
              key={index}
              className={`transform transition-all duration-500 hover:scale-105 ${case_.className} w-[200px] mx-auto`}
              onClick={(e) => e.stopPropagation()}
            >
              {case_.report ? (
                <FeaturedContentReportModal
                  data={case_.report}
                  trigger={
                    <div className="cursor-pointer">
                      <AspectRatio ratio={9/16} className="rounded-lg overflow-hidden shadow-md">
                        <img
                          src={case_.image}
                          alt={`${case_.title} - ${case_.type}`}
                          className="w-full h-full object-cover"
                        />
                      </AspectRatio>
                    </div>
                  }
                />
              ) : (
                <div className="cursor-not-allowed">
                  <AspectRatio ratio={9/16} className="rounded-lg overflow-hidden shadow-md">
                    <img
                      src={case_.image}
                      alt={`${case_.title} - ${case_.type}`}
                      className="w-full h-full object-cover"
                    />
                  </AspectRatio>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Price Download Button */}
        <div className="text-center mb-24">
          <Button
            size="lg"
            variant="primary"
            className="bg-blue-500 hover:bg-blue-600 text-white gap-2"
            asChild
          >
            <a href="/price.pdf" download>
              <Download className="w-4 h-4" />
              Скачать прайс
            </a>
          </Button>
        </div>

        {/* Rich Man CTA Section */}
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-blue-600 to-blue-400 text-white p-12 h-[300px]">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h3 className="text-3xl font-bold">
                ХОЧЕШЬ БЫТЬ В ЧИСЛЕ ФАВОРИТОВ?
              </h3>
              <p className="text-lg text-blue-50">
                Начни свое размещение и получай результат, который обеспечит твой успех!
              </p>
              <Button
                size="lg"
                variant="secondary"
                className="bg-white text-blue-600 hover:bg-blue-50"
              >
                начать размещение
              </Button>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center justify-center">
              <img
                src="/rich_man.png"
                alt="Успешный предприниматель"
                className="h-[120%] object-contain"
              />
            </div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-300 rounded-full opacity-20 blur-2xl" />
          </div>
        </div>
      </div>
    </section>
  )
}