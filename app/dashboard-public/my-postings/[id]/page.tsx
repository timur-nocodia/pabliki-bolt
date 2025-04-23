import { notFound } from "next/navigation"
import { PublicOwnerPostingDetail } from "@/components/public-owner/public-owner-posting-detail"
import { type PublicOwnerPosting } from "@/components/public-owner/public-owner-postings-table"

export type DetailedPosting = PublicOwnerPosting & {
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
  publics: Array<{
    id: string
    name: string
    logo: string
    subscribers: number
    payment: number
    status: "pending" | "approved" | "rejected"
    responseDate?: Date
    rejectionReason?: string
  }>
}

async function getPostingById(id: string): Promise<DetailedPosting | null> {
  // This simulates an API call delay
  await new Promise(resolve => setTimeout(resolve, 100))

  const mockData: Record<string, DetailedPosting> = {
    "1": {
      id: "1",
      advertiser: "Respect Shoes",
      campaignId: "RS-2024-001",
      type: "post",
      submittedAt: new Date("2024-03-15T10:00:00"),
      targetDate: new Date("2024-03-20"),
      payment: 120000,
      status: "pending",
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
      },
      publics: [
        {
          id: "1",
          name: "Павлодар",
          logo: "/public_demo.png",
          subscribers: 856000,
          payment: 45000,
          status: "pending"
        },
        {
          id: "2",
          name: "Это Кокшетау Детка",
          logo: "/public_demo.png",
          subscribers: 320000,
          payment: 35000,
          status: "approved"
        }
      ]
    },
    "2": {
      id: "2",
      advertiser: "KMF",
      campaignId: "KMF-2024-002",
      type: "story",
      submittedAt: new Date("2024-03-14T15:30:00"),
      targetDate: new Date("2024-03-16"),
      payment: 85000,
      status: "scheduled",
      client: {
        instagram: "@kmf_kz",
        website: "https://kmf.kz",
        phone: "+7 777 456 78 90",
        placementDates: "20.03.2025, 15:00",
        notes: "Размещение в прайм-тайм"
      },
      content: {
        text: "Новая коллекция обуви KMF\nСкидки до 50%\nБесплатная доставка по всему Казахстану",
        images: ["/public_demo.png"]
      },
      publics: [
        {
          id: "3",
          name: "Almaty Today",
          logo: "/public_demo.png",
          subscribers: 520000,
          payment: 50000,
          status: "approved",
          responseDate: new Date("2024-03-15T10:30:00")
        }
      ]
    }
  }

  return mockData[id] || null
}

export default async function PublicOwnerPostingDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const posting = await getPostingById(params.id)

  if (!posting) {
    notFound()
  }

  return <PublicOwnerPostingDetail posting={posting} />
}