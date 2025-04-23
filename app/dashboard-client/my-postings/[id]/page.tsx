import { ClientPostingDetail } from "@/components/client/client-posting-detail"
import { notFound } from "next/navigation"
import type { ClientPosting } from "@/components/client/client-postings-table"

export type DetailedClientPosting = ClientPosting & {
  company: string
  campaignId: string
  client: {
    instagram: string
    website: string
    phone: string
    placementDates: Date
    notes: string
  }
  content: {
    text: string
    images: string[]
  }
  metrics: {
    totalReach: number
    totalViews: number
    totalCost: number
    likes: number
    comments: number
    shares: number
  }
  publics: Array<{
    id: string
    name: string
    logo: string
    subscribers: number
    reach: number
    views: number
    cost: number
    status: "posted" | "scheduled"
    publishedAt: Date
  }>
}

async function getPostingById(id: string): Promise<DetailedClientPosting | null> {
  // This simulates an API call delay
  await new Promise(resolve => setTimeout(resolve, 100))

  const mockData: Record<string, DetailedClientPosting> = {
    "1": {
      id: "1",
      publicName: "Almaty News",
      reach: 856000,
      views: 125000,
      cost: 80000,
      status: "published",
      company: "Белорусские продукты",
      campaignId: "BP-2024-001",
      client: {
        instagram: "@belorusprod",
        website: "https://belorus.kz",
        phone: "+7 777 123 45 67",
        placementDates: new Date("2025-05-25T19:30:00"),
        notes: "Размещение в прайм-тайм"
      },
      content: {
        text: "РЕКЛАМА В СОТНЯХ ПОПУЛЯРНЫХ ПАБЛИКАХ\n\n1 100 новостных пабликов\n140 млн подписчиков\n80 городов и населенных пунктов по РК",
        images: ["/public_demo.png"]
      },
      metrics: {
        totalReach: 856000,
        totalViews: 125000,
        totalCost: 80000,
        likes: 2150,
        comments: 320,
        shares: 180
      },
      publics: [
        {
          id: "1",
          name: "Павлодар",
          logo: "/public_demo.png",
          subscribers: 856000,
          reach: 45000,
          views: 32000,
          cost: 80000,
          status: "posted",
          publishedAt: new Date("2024-03-15T12:30:00")
        }
      ]
    },
    "2": {
      id: "2",
      publicName: "Astana Life",
      reach: 320000,
      views: 45000,
      cost: 60000,
      status: "scheduled",
      company: "KMF",
      campaignId: "KMF-2024-002",
      client: {
        instagram: "@kmf_kz",
        website: "https://kmf.kz",
        phone: "+7 777 456 78 90",
        placementDates: new Date("2025-03-20T15:00:00"),
        notes: "Размещение в прайм-тайм"
      },
      content: {
        text: "Новая коллекция KMF\nСкидки до 50%\nБесплатная доставка по всему Казахстану",
        images: ["/public_demo.png"]
      },
      metrics: {
        totalReach: 320000,
        totalViews: 45000,
        totalCost: 60000,
        likes: 1580,
        comments: 240,
        shares: 120
      },
      publics: [
        {
          id: "2",
          name: "Astana Life",
          logo: "/public_demo.png",
          subscribers: 320000,
          reach: 28000,
          views: 22000,
          cost: 60000,
          status: "scheduled",
          publishedAt: new Date("2024-03-16T14:00:00")
        }
      ]
    }
  }

  return mockData[id] || null
}

export default async function ClientPostingDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const posting = await getPostingById(params.id)

  if (!posting) {
    notFound()
  }

  return <ClientPostingDetail posting={posting} />
}