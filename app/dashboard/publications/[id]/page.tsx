import { notFound } from "next/navigation"
import { PublicationDetail } from "@/components/publications/publication-detail"

export type Publication = {
  id: string
  company: string
  campaignId: string
  createdAt: Date
  status: "active" | "scheduled" | "completed" | "draft" | "archived"
  publicsCount: number
  budget: number
  manager: string
  client: {
    instagram: string
    website: string
    phone: string
    placementDates: string
    notes: string
  }
  content: {
    text: string
    images: string[]
  }
  performance: {
    totalSubscribers: number
    monthlyReach: number
    postReach: number
    storyReach: number
    likes: number
    reposts: number
    saves: number
    price: number
  }
  publics: Array<{
    id: string
    name: string
    logo: string
    subscribers: number
    publications: number
    reach: number
    status: "posted" | "scheduled"
  }>
}

// Mock data fetching function - would be replaced with actual API call
async function getPublicationById(id: string): Promise<Publication | null> {
  // This simulates an API call delay
  await new Promise(resolve => setTimeout(resolve, 100))

  const mockPublications: Record<string, Publication> = {
    "1": {
      id: "1",
      company: "Белорусские продукты",
      campaignId: "BP-2024-001",
      createdAt: new Date("2024-07-03T19:10:00"),
      status: "active",
      publicsCount: 129,
      budget: 925000,
      manager: "Алеся",
      client: {
        instagram: "@belorusprod",
        website: "https://belorus.kz",
        phone: "+7 777 123 45 67",
        placementDates: "16.03.2025 - 20.03.2025",
        notes: "Клиент предпочитает размещение в утреннее время"
      },
      content: {
        text: "РЕКЛАМА В СОТНЯХ ПОПУЛЯРНЫХ ПАБЛИКАХ\n\n1 100 новостных пабликов\n140 млн подписчиков\n80 городов и населенных пунктов по РК",
        images: ["/public_demo.png"]
      },
      performance: {
        totalSubscribers: 4852000,
        monthlyReach: 6320000,
        postReach: 22802,
        storyReach: 17231,
        likes: 61,
        reposts: 11,
        saves: 10,
        price: 1125000
      },
      publics: [
        {
          id: "1",
          name: "Павлодар",
          logo: "/public_demo.png",
          subscribers: 856000,
          publications: 2,
          reach: 45000,
          status: "posted"
        },
        {
          id: "2",
          name: "Это Кокшетау Детка",
          logo: "/public_demo.png",
          subscribers: 140000,
          publications: 1,
          reach: 12000,
          status: "scheduled"
        }
      ]
    },
    "2": {
      id: "2",
      company: "Respect интернет магазин",
      campaignId: "RIM-2024-002",
      createdAt: new Date("2024-07-02T15:30:00"),
      status: "scheduled",
      publicsCount: 85,
      budget: 650000,
      manager: "Виалетта Никонова",
      client: {
        instagram: "@respect_shoes",
        website: "https://respect-shoes.kz",
        phone: "+7 777 456 78 90",
        placementDates: "20.03.2025 - 25.03.2025",
        notes: "Размещение в прайм-тайм"
      },
      content: {
        text: "Новая коллекция обуви Respect\nСкидки до 50%\nБесплатная доставка по всему Казахстану",
        images: ["/public_demo.png"]
      },
      performance: {
        totalSubscribers: 3250000,
        monthlyReach: 4180000,
        postReach: 15600,
        storyReach: 12400,
        likes: 45,
        reposts: 8,
        saves: 15,
        price: 850000
      },
      publics: [
        {
          id: "3",
          name: "Алматы Today",
          logo: "/public_demo.png",
          subscribers: 520000,
          publications: 1,
          reach: 28000,
          status: "scheduled"
        }
      ]
    }
  }

  return mockPublications[id] || null
}

export default async function PublicationDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const publication = await getPublicationById(params.id)

  if (!publication) {
    notFound()
  }

  return <PublicationDetail publication={publication} />
}