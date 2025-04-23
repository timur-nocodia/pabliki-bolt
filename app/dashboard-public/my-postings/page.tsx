import { PublicOwnerPostingsTable } from "@/components/public-owner/public-owner-postings-table"

export default function PublicOwnerPostingsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Мои размещения</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-lg border bg-card p-4">
          <div className="text-sm text-muted-foreground">Ожидают ответа</div>
          <div className="text-2xl font-bold">12</div>
        </div>
        <div className="rounded-lg border bg-card p-4">
          <div className="text-sm text-muted-foreground">Запланировано на месяц</div>
          <div className="text-2xl font-bold">45</div>
        </div>
        <div className="rounded-lg border bg-card p-4">
          <div className="text-sm text-muted-foreground">Заработок за месяц</div>
          <div className="text-2xl font-bold">1 250 000 ₸</div>
        </div>
      </div>
      <PublicOwnerPostingsTable />
    </div>
  )
}