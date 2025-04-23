import { PublicationsTable } from "@/components/publications/publications-table"

export default function PublicationsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Публикации</h1>
      </div>
      <PublicationsTable />
    </div>
  )
}