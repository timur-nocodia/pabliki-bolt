import { notFound } from "next/navigation"
import { ModerationDetail } from "@/components/moderation/moderation-detail"

export type ModerationDetailData = {
  id: string
  company: string
  campaignId: string
  submittedAt: Date
  targetDate: Date
  status: "in_progress" | "completed" | "action_needed"
  totalPublics: number
  approvedCount: number
  rejectedCount: number
  pendingCount: number
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

// Mock data fetching function - would be replaced with actual API call
async function getModerationById(id: string): Promise<ModerationDetailData | null> {
  // This simulates an API call delay
  await new Promise(resolve => setTimeout(resolve, 100))

  const mockData: Record<string, ModerationDetailData> = {
    "1": {
      id: "1",
      company: "Белорусские продукты",
      campaignId: "BP-2024-001",
      submittedAt: new Date("2024-03-15T10:00:00"),
      targetDate: new Date("2024-03-20"),
      status: "in_progress",
      totalPublics: 8,
      approvedCount: 5,
      rejectedCount: 1,
      pendingCount: 2,
      manager: "Алеся",
      client: {
        instagram: "@belorusprod",
        website: "https://belorus.kz",
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
        },
        {
          id: "3",
          name: "Астана Live",
          logo: "/public_demo.png",
          subscribers: 420000,
          payment: 40000,
          status: "rejected",
          rejectionReason: "Не соответствует тематике паблика"
        }
      ]
    },
    "2": {
      id: "2",
      company: "Respect интернет магазин",
      campaignId: "RIM-2024-002",
      submittedAt: new Date("2024-03-14T15:30:00"),
      targetDate: new Date("2024-03-19"),
      status: "completed",
      totalPublics: 12,
      approvedCount: 11,
      rejectedCount: 1,
      pendingCount: 0,
      manager: "Виалетта Никонова",
      client: {
        instagram: "@respect_shoes",
        website: "https://respect-shoes.kz",
        phone: "+7 777 456 78 90",
        placementDates: "20.03.2025, 15:00",
        notes: "Размещение в прайм-тайм"
      },
      content: {
        text: "Новая коллекция обуви Respect\nСкидки до 50%\nБесплатная доставка по всему Казахстану",
        images: ["/public_demo.png"]
      },
      publics: [
        {
          id: "4",
          name: "Almaty Today",
          logo: "/public_demo.png",
          subscribers: 520000,
          payment: 50000,
          status: "approved",
          responseDate: new Date("2024-03-15T10:30:00")
        },
        {
          id: "5",
          name: "Shymkent Life",
          logo: "/public_demo.png",
          subscribers: 380000,
          payment: 45000,
          status: "rejected",
          responseDate: new Date("2024-03-15T11:15:00"),
          rejectionReason: "Нет свободных слотов на указанную дату"
        }
      ]
    }
  }

  return mockData[id] || null
}

export default async function ModerationDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const moderation = await getModerationById(params.id)

  if (!moderation) {
    notFound()
  }

  return <ModerationDetail moderation={moderation} />
}