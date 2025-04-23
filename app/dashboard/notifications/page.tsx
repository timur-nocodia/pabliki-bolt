import { NotificationsTable } from "@/components/notifications/notifications-table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function NotificationsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Входящие уведомления</h1>
      </div>

      <Tabs defaultValue="publics" className="space-y-6">
        <TabsList>
          <TabsTrigger value="publics">ПАБЛИКИ</TabsTrigger>
          <TabsTrigger value="clients" disabled>КЛИЕНТЫ</TabsTrigger>
          <TabsTrigger value="others" disabled>ОСТАЛЬНЫЕ</TabsTrigger>
        </TabsList>

        <TabsContent value="publics">
          <NotificationsTable />
        </TabsContent>
      </Tabs>
    </div>
  )
}