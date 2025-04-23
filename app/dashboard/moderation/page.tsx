import { ModerationTable } from "@/components/moderation/moderation-table"

export default function ModerationPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Модерация заявок</h1>
      </div>
      <ModerationTable />
    </div>
  )
}