import { notFound } from "next/navigation"
import { PublicationForm } from "@/components/admin-publications/publication-form"
import type { AdminPublication } from "@/components/admin-publications/admin-publications-table"

// Mock data fetching function - would be replaced with actual API call
async function getPublicationById(id: string): Promise<AdminPublication | null> {
  // This simulates an API call delay
  await new Promise(resolve => setTimeout(resolve, 100))

  const mockData: Record<string, AdminPublication> = {
    "1": {
      id: "1",
      campaignName: "Весенняя акция",
      type: "manual",
      createdBy: "Алеся",
      createdAt: new Date("2024-03-15T10:00:00"),
      targetDate: new Date("2024-03-20"),
      publicsCount: 25,
      status: "draft",
      content: {
        text: "Весенняя акция в сети магазинов. Скидки до 50% на весь ассортимент!",
        images: ["/public_demo.png"]
      },
      selectedPublics: [
        {
          id: "1",
          name: "Almaty News",
          logo: "/public_demo.png",
          subscribers: 856000,
          postCost: 80000,
          storyCost: 60000,
          selected: true
        },
        {
          id: "2",
          name: "Astana Life",
          logo: "/public_demo.png",
          subscribers: 320000,
          postCost: 60000,
          storyCost: 45000,
          selected: true
        }
      ]
    },
    "2": {
      id: "2", 
      campaignName: "Автопост выходного дня",
      type: "auto",
      createdBy: "Система",
      createdAt: new Date("2024-03-14T15:30:00"),
      targetDate: new Date("2024-03-16"),
      publicsCount: 50,
      status: "scheduled",
      content: {
        text: "Автоматическая публикация для выходного дня",
        images: ["/public_demo.png"],
        link: "https://example.com/weekend"
      },
      selectedPublics: [
        {
          id: "3",
          name: "Shymkent Today",
          logo: "/public_demo.png",
          subscribers: 450000,
          postCost: 70000,
          storyCost: 50000,
          selected: true
        }
      ]
    }
  }

  return mockData[id] || null
}

export default async function EditPublicationPage({ params }: { params: { id: string } }) {
  const publication = await getPublicationById(params.id)

  if (!publication) {
    notFound()
  }

  return <PublicationForm mode="edit" id={params.id} initialData={publication} />
}