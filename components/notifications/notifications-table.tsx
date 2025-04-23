"use client"

import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, MoreHorizontal, CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { format } from "date-fns"
import { ru } from "date-fns/locale"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"

const statusOptions = [
  { value: "all", label: "Все статусы" },
  { value: "pending", label: "На рассмотрении" },
  { value: "processed", label: "Обработано" },
  { value: "rejected", label: "Отклонено" }
]

export type Notification = {
  id: string
  publicName: string
  handle: string
  ownerName: string
  audience: number
  requestedPostPrice: number
  requestedStoryPrice: number
  submittedAt: Date
  status: "pending" | "processed" | "rejected"
}

const data: Notification[] = [
  {
    id: "1",
    publicName: "Almaty News",
    handle: "@almaty_news",
    ownerName: "Алексей Петров",
    audience: 856000,
    requestedPostPrice: 80000,
    requestedStoryPrice: 60000,
    submittedAt: new Date("2024-03-15T10:00:00"),
    status: "pending"
  },
  {
    id: "2",
    publicName: "Astana Life",
    handle: "@astana_life",
    ownerName: "Мария Иванова",
    audience: 320000,
    requestedPostPrice: 60000,
    requestedStoryPrice: 45000,
    submittedAt: new Date("2024-03-14T15:30:00"),
    status: "pending"
  }
]

export const columns: ColumnDef<Notification>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "publicName",
    header: "Название паблика",
    cell: ({ row }) => (
      <div>
        <div className="font-medium">{row.getValue("publicName")}</div>
        <div className="text-sm text-muted-foreground">{row.original.handle}</div>
      </div>
    ),
  },
  {
    accessorKey: "ownerName",
    header: "Владелец",
  },
  {
    accessorKey: "audience",
    header: "Аудитория",
    cell: ({ row }) => (
      <div className="font-medium">
        {new Intl.NumberFormat("ru-RU").format(row.getValue("audience"))}
      </div>
    ),
  },
  {
    accessorKey: "requestedPrices",
    header: "Запрошенная цена (Пост/Stories)",
    cell: ({ row }) => (
      <div className="font-medium">
        {new Intl.NumberFormat("ru-RU", {
          style: "currency",
          currency: "KZT",
          maximumFractionDigits: 0
        }).format(row.original.requestedPostPrice)}
        {" / "}
        {new Intl.NumberFormat("ru-RU", {
          style: "currency",
          currency: "KZT",
          maximumFractionDigits: 0
        }).format(row.original.requestedStoryPrice)}
      </div>
    ),
  },
  {
    accessorKey: "submittedAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Дата подачи
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div>
        {format(row.getValue("submittedAt"), "dd MMMM yyyy г., HH:mm", { locale: ru })}
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Статус",
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      const statusMap = {
        pending: { label: "На рассмотрении", class: "bg-yellow-100 text-yellow-800" },
        processed: { label: "Обработано", class: "bg-green-100 text-green-800" },
        rejected: { label: "Отклонено", class: "bg-red-100 text-red-800" }
      }
      return (
        <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusMap[status].class}`}>
          {statusMap[status].label}
        </div>
      )
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const notification = row.original
      const [isProcessDialogOpen, setIsProcessDialogOpen] = React.useState(false)
      const [offeredPostPrice, setOfferedPostPrice] = React.useState(notification.requestedPostPrice)
      const [offeredStoryPrice, setOfferedStoryPrice] = React.useState(notification.requestedStoryPrice)

      const handleProcess = () => {
        // TODO: Implement API call
        toast.success("Предложение отправлено")
        setIsProcessDialogOpen(false)
      }

      const handleReject = () => {
        // TODO: Implement API call
        toast.success("Заявка отклонена")
      }

      return (
        <div className="flex items-center gap-2">
          <Dialog open={isProcessDialogOpen} onOpenChange={setIsProcessDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">Обработать</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Обработка заявки</DialogTitle>
              </DialogHeader>
              <div className="space-y-6 py-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="font-medium">{notification.publicName}</div>
                    <div className="text-sm text-muted-foreground">{notification.handle}</div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Аудитория: {new Intl.NumberFormat("ru-RU").format(notification.audience)}
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label>Запрошенная цена (Пост)</Label>
                    <div className="text-lg font-medium">
                      {new Intl.NumberFormat("ru-RU", {
                        style: "currency",
                        currency: "KZT",
                        maximumFractionDigits: 0
                      }).format(notification.requestedPostPrice)}
                    </div>
                  </div>
                  <div>
                    <Label>Предложить цену (Пост)</Label>
                    <Input
                      type="number"
                      value={offeredPostPrice}
                      onChange={(e) => setOfferedPostPrice(Number(e.target.value))}
                    />
                  </div>
                  <div>
                    <Label>Запрошенная цена (Stories)</Label>
                    <div className="text-lg font-medium">
                      {new Intl.NumberFormat("ru-RU", {
                        style: "currency",
                        currency: "KZT",
                        maximumFractionDigits: 0
                      }).format(notification.requestedStoryPrice)}
                    </div>
                  </div>
                  <div>
                    <Label>Предложить цену (Stories)</Label>
                    <Input
                      type="number"
                      value={offeredStoryPrice}
                      onChange={(e) => setOfferedStoryPrice(Number(e.target.value))}
                    />
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => setIsProcessDialogOpen(false)}
                  >
                    Отмена
                  </Button>
                  <Button
                    className="w-full"
                    onClick={handleProcess}
                  >
                    Отправить предложение
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <Button
            variant="ghost"
            size="sm"
            className="text-red-600 hover:text-red-700 hover:bg-red-50"
            onClick={handleReject}
          >
            Отклонить
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Открыть меню</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Действия</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(notification.id)}
              >
                Копировать ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Просмотр деталей</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )
    },
  },
]

export function NotificationsTable() {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
  const [dateRange, setDateRange] = React.useState<{
    from: Date | undefined
    to: Date | undefined
  }>({
    from: undefined,
    to: undefined
  })

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-4">
        <Input
          placeholder="Поиск по названию..."
          value={(table.getColumn("publicName")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("publicName")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        
        <Select
          onValueChange={(value) => 
            table.getColumn("status")?.setFilterValue(value === "all" ? "" : value)
          }
          defaultValue="all"
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Выберите статус" />
          </SelectTrigger>
          <SelectContent>
            {statusOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-[300px] justify-start text-left font-normal",
                !dateRange.from && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {dateRange.from ? (
                dateRange.to ? (
                  <>
                    {format(dateRange.from, "dd.MM.yyyy")} -{" "}
                    {format(dateRange.to, "dd.MM.yyyy")}
                  </>
                ) : (
                  format(dateRange.from, "dd.MM.yyyy")
                )
              ) : (
                "Выберите период"
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={dateRange.from}
              selected={{
                from: dateRange.from,
                to: dateRange.to,
              }}
              onSelect={(range) => {
                setDateRange(range || { from: undefined, to: undefined })
                if (range?.from && range?.to) {
                  table.getColumn("submittedAt")?.setFilterValue([range.from, range.to])
                } else {
                  table.getColumn("submittedAt")?.setFilterValue(undefined)
                }
              }}
              numberOfMonths={2}
              locale={ru}
            />
          </PopoverContent>
        </Popover>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Столбцы <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Нет результатов
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} из{" "}
          {table.getFilteredRowModel().rows.length} строк выбрано
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Назад
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Вперед
          </Button>
        </div>
      </div>
    </div>
  )
}