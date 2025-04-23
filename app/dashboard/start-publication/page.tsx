import { AdminPublicationsTable } from "@/components/admin-publications/admin-publications-table"

export default function AdminPublicationsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Размещения</h1>
      </div>
      <AdminPublicationsTable />
    </div>
  )
}