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
import { useRouter } from "next/navigation"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const statusOptions = [
  { value: "all", label: "Все статусы" },
  { value: "pending", label: "На рассмотрении" },
  { value: "scheduled", label: "Запланировано" },
  { value: "completed", label: "Завершено" },
  { value: "rejected", label: "Отклонено" }
]

export type PublicOwnerPosting = {
  id: string
  advertiser: string
  campaignId: string
  type: "post" | "story" | "carousel"
  submittedAt: Date
  targetDate: Date
  payment: number
  status: "pending" | "scheduled" | "completed" | "rejected"
}

const data: PublicOwnerPosting[] = [
  {
    id: "1",
    advertiser: "Respect Shoes",
    campaignId: "RS-2024-001",
    type: "post",
    submittedAt: new Date("2024-03-15T10:00:00"),
    targetDate: new Date("2024-03-20"),
    payment: 120000,
    status: "pending"
  },
  {
    id: "2",
    advertiser: "KMF",
    campaignId: "KMF-2024-002",
    type: "story",
    submittedAt: new Date("2024-03-14T15:30:00"),
    targetDate: new Date("2024-03-16"),
    payment: 85000,
    status: "scheduled"
  }
]

export const columns: ColumnDef<PublicOwnerPosting>[] = [
  {
    accessorKey: "advertiser",
    header: "Рекламодатель",
    cell: ({ row }) => <div className="font-medium">{row.getValue("advertiser")}</div>,
  },
  {
    accessorKey: "campaignId",
    header: "ID кампании",
    cell: ({ row }) => <div className="font-medium">{row.getValue("campaignId")}</div>,
  },
  {
    accessorKey: "type",
    header: "Тип",
    cell: ({ row }) => {
      const type = row.getValue("type") as string
      const typeMap = {
        post: "Пост",
        story: "Сторис",
        carousel: "Карусель"
      }
      return (
        <div className={cn(
          "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
          type === "post" ? "bg-blue-100 text-blue-800" : 
          type === "story" ? "bg-purple-100 text-purple-800" :
          "bg-green-100 text-green-800"
        )}>
          {typeMap[type]}
        </div>
      )
    },
  },
  {
    accessorKey: "submittedAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Дата заявки
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
    accessorKey: "targetDate",
    header: "Дата размещения",
    cell: ({ row }) => (
      <div>
        {format(row.getValue("targetDate"), "dd MMMM yyyy г.", { locale: ru })}
      </div>
    ),
  },
  {
    accessorKey: "payment",
    header: "Оплата",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("payment"))
      const formatted = new Intl.NumberFormat("ru-RU", {
        style: "currency",
        currency: "KZT",
        maximumFractionDigits: 0
      }).format(amount)
      return <div className="text-right font-medium">{formatted}</div>
    },
  },
  {
    accessorKey: "status",
    header: "Статус",
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      const statusMap = {
        pending: { label: "На рассмотрении", class: "bg-yellow-100 text-yellow-800" },
        scheduled: { label: "Запланировано", class: "bg-blue-100 text-blue-800" },
        completed: { label: "Завершено", class: "bg-green-100 text-green-800" },
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
      const posting = row.original

      return (
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
              onClick={() => navigator.clipboard.writeText(posting.id)}
            >
              Копировать ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Просмотр деталей</DropdownMenuItem>
            {posting.status === "pending" && (
              <>
                <DropdownMenuItem>Одобрить</DropdownMenuItem>
                <DropdownMenuItem className="text-red-600">Отклонить</DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

export function PublicOwnerPostingsTable() {
  const router = useRouter()
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
      <Tabs defaultValue="pending" className="space-y-4">
        <TabsList>
          <TabsTrigger value="pending">На рассмотрении</TabsTrigger>
          <TabsTrigger value="scheduled">Запланировано</TabsTrigger>
          <TabsTrigger value="history">История</TabsTrigger>
        </TabsList>

        <div className="flex flex-wrap items-center gap-4">
          <Input
            placeholder="Поиск по рекламодателю..."
            value={(table.getColumn("advertiser")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("advertiser")?.setFilterValue(event.target.value)
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
                    {row.getVisibleCells().map((cell) => {
                      // Special handling for checkbox cell
                      if (cell.column.id === "select") {
                        return (
                          <TableCell key={cell.id}>
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </TableCell>
                        )
                      }
                      
                      // All other cells are clickable and redirect
                      return (
                        <TableCell 
                          key={cell.id}
                          className="cursor-pointer hover:bg-muted/50"
                          onClick={() => router.push(`/dashboard-public/my-postings/${row.original.id}`)}
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      )
                    })}
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
      </Tabs>
    </div>
  )
}