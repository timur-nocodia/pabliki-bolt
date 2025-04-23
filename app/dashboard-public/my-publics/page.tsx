import { PublicOwnerPublicsTable, type PublicOwnerPublic } from "@/components/public-owner/public-owner-publics-table"
import { Button } from "@/components/ui/button"
import Link from "next/link"

async function getPublics(): Promise<PublicOwnerPublic[]> {
  // This would be replaced with an actual API call
  return [
    {
      id: "1",
      name: "Almaty News",
      handle: "@almaty_news",
      subscribers: 856000,
      requestedPostPrice: 80000,
      requestedStoryPrice: 60000,
      approvedPostPrice: null,
      approvedStoryPrice: null,
      status: "pending_review",
      lastUpdated: new Date("2024-03-15T10:00:00")
    },
    {
      id: "2",
      name: "Astana Life",
      handle: "@astana_life",
      subscribers: 320000,
      requestedPostPrice: 60000,
      requestedStoryPrice: 45000,
      approvedPostPrice: 50000,
      approvedStoryPrice: 35000,
      status: "action_required",
      lastUpdated: new Date("2024-03-14T15:30:00")
    },
    {
      id: "3",
      name: "Shymkent Today",
      handle: "@shymkent_today",
      subscribers: 450000,
      requestedPostPrice: 70000,
      requestedStoryPrice: 50000,
      approvedPostPrice: 65000,
      approvedStoryPrice: 45000,
      status: "approved",
      lastUpdated: new Date("2024-03-13T09:15:00")
    },
    {
      id: "4",
      name: "Karaganda Online",
      handle: "@krg_online",
      subscribers: 280000,
      requestedPostPrice: 55000,
      requestedStoryPrice: 40000,
      approvedPostPrice: null,
      approvedStoryPrice: null,
      status: "pending_review",
      lastUpdated: new Date("2024-03-12T14:20:00")
    },
    {
      id: "5",
      name: "Aktobe Info",
      handle: "@aktobe_info",
      subscribers: 195000,
      requestedPostPrice: 45000,
      requestedStoryPrice: 35000,
      approvedPostPrice: 40000,
      approvedStoryPrice: 30000,
      status: "approved",
      lastUpdated: new Date("2024-03-11T11:45:00")
    },
    {
      id: "6",
      name: "Pavlodar Live",
      handle: "@pavlodar_live",
      subscribers: 165000,
      requestedPostPrice: 40000,
      requestedStoryPrice: 30000,
      approvedPostPrice: null,
      approvedStoryPrice: null,
      status: "rejected",
      lastUpdated: new Date("2024-03-10T16:30:00")
    },
    {
      id: "7",
      name: "Kostanay Today",
      handle: "@kst_today",
      subscribers: 145000,
      requestedPostPrice: 35000,
      requestedStoryPrice: 25000,
      approvedPostPrice: 32000,
      approvedStoryPrice: 22000,
      status: "approved",
      lastUpdated: new Date("2024-03-09T13:20:00")
    },
    {
      id: "8",
      name: "Taraz News",
      handle: "@taraz_news",
      subscribers: 180000,
      requestedPostPrice: 42000,
      requestedStoryPrice: 32000,
      approvedPostPrice: null,
      approvedStoryPrice: null,
      status: "pending_review",
      lastUpdated: new Date("2024-03-08T10:15:00")
    },
    {
      id: "9",
      name: "Semey Life",
      handle: "@semey_life",
      subscribers: 135000,
      requestedPostPrice: 35000,
      requestedStoryPrice: 25000,
      approvedPostPrice: null,
      approvedStoryPrice: null,
      status: "action_required",
      lastUpdated: new Date("2024-03-07T15:45:00")
    },
    {
      id: "10",
      name: "Atyrau Info",
      handle: "@atyrau_info",
      subscribers: 175000,
      requestedPostPrice: 40000,
      requestedStoryPrice: 30000,
      approvedPostPrice: 38000,
      approvedStoryPrice: 28000,
      status: "approved",
      lastUpdated: new Date("2024-03-06T09:30:00")
    }
  ]
}

export default async function PublicOwnerPublicsPage() {
  const publics = await getPublics()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Мои паблики</h1>
        <Button
          asChild
          className="bg-blue-600 text-white hover:bg-blue-700"
        >
          <Link href="/dashboard-public/my-publics/new">
            <svg
              className="mr-2 h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14" />
              <path d="M12 5v14" />
            </svg>
            Добавить паблик
          </Link>
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-lg border bg-card p-4">
          <div className="text-sm text-muted-foreground">Всего пабликов</div>
          <div className="text-2xl font-bold">{publics.length}</div>
        </div>
        <div className="rounded-lg border bg-card p-4">
          <div className="text-sm text-muted-foreground">Активных</div>
          <div className="text-2xl font-bold">
            {publics.filter(p => p.status === "approved").length}
          </div>
        </div>
        <div className="rounded-lg border bg-card p-4">
          <div className="text-sm text-muted-foreground">На модерации</div>
          <div className="text-2xl font-bold">
            {publics.filter(p => p.status === "pending_review").length}
          </div>
        </div>
      </div>
      <PublicOwnerPublicsTable initialData={publics} />
    </div>
  )
}