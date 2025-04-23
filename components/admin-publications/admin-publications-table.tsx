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
import { ArrowUpDown, ChevronDown, MoreHorizontal, CalendarIcon, Plus } from "lucide-react"
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
import { useRouter } from "next/navigation"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const statusOptions = [
  { value: "all", label: "Все статусы" },
  { value: "draft", label: "Черновик" },
  { value: "moderation", label: "На модерации" },
  { value: "scheduled", label: "Запланировано" },
  { value: "published", label: "Опубликовано" },
  { value: "error", label: "Ошибка" }
]

export type AdminPublication = {
  id: string
  campaignName: string
  type: "manual" | "auto"
  createdBy: string
  createdAt: Date
  targetDate: Date
  publicsCount: number
  status: "draft" | "moderation" | "scheduled" | "published" | "error"
  content?: {
    text: string
    images: string[]
    link?: string
  }
  selectedPublics?: Array<{
    id: string
    name: string
    logo: string
    subscribers: number
    postCost: number
    storyCost: number
    selected: boolean
  }>
}

const data: AdminPublication[] = [
  {
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
  {
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
]

export const columns: ColumnDef<AdminPublication>[] = [
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
    accessorKey: "campaignName",
    header: "Campaign Name",
    cell: ({ row }) => <div className="font-medium">{row.getValue("campaignName")}</div>,
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => {
      const type = row.getValue("type") as string
      return (
        <div className={cn(
          "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
          type === "auto" ? "bg-blue-100 text-blue-800" : "bg-purple-100 text-purple-800"
        )}>
          {type === "auto" ? "Auto Launch" : "Manual Launch"}
        </div>
      )
    },
  },
  {
    accessorKey: "createdBy",
    header: "Created By",
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Creation Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div>
        {format(row.getValue("createdAt"), "dd MMMM yyyy г., HH:mm", { locale: ru })}
      </div>
    ),
  },
  {
    accessorKey: "targetDate",
    header: "Target Date",
    cell: ({ row }) => (
      <div>
        {format(row.getValue("targetDate"), "dd MMMM yyyy г.", { locale: ru })}
      </div>
    ),
  },
  {
    accessorKey: "publicsCount",
    header: "Publics",
    cell: ({ row }) => <div className="text-right">{row.getValue("publicsCount")}</div>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as "draft" | "moderation" | "scheduled" | "published" | "error"
      const statusMap = {
        draft: { label: "Черновик", class: "bg-gray-100 text-gray-800" },
        moderation: { label: "На модерации", class: "bg-yellow-100 text-yellow-800" },
        scheduled: { label: "Запланировано", class: "bg-blue-100 text-blue-800" },
        published: { label: "Опубликовано", class: "bg-green-100 text-green-800" },
        error: { label: "Ошибка", class: "bg-red-100 text-red-800" }
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
      const publication = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(publication.id)}
            >
              Copy ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View Details</DropdownMenuItem>
            <DropdownMenuItem>Duplicate</DropdownMenuItem>
            <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

export function AdminPublicationsTable() {
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
      <div className="flex flex-wrap items-center gap-4">
        <Button 
          onClick={() => router.push("/dashboard/start-publication/new")}
          className="bg-blue-600 text-white hover:bg-blue-700"
        >
          <Plus className="mr-2 h-4 w-4" />
          Создать размещение
        </Button>

        <Input
          placeholder="Поиск по названию..."
          value={(table.getColumn("campaignName")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("campaignName")?.setFilterValue(event.target.value)
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
                setDateRange(range ? 
                  { from: range.from, to: range.to ?? undefined } : 
                  { from: undefined, to: undefined }
                )
                if (range?.from && range?.to) {
                  table.getColumn("createdAt")?.setFilterValue([range.from, range.to])
                } else {
                  table.getColumn("createdAt")?.setFilterValue(undefined)
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
                    
                    return (
                      <TableCell 
                        key={cell.id}
                        className="cursor-pointer hover:bg-muted/50"
                        onClick={() => router.push(`/dashboard/start-publication/${row.original.id}`)}
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
          Выбрано {table.getFilteredSelectedRowModel().rows.length} из{" "}
          {table.getFilteredRowModel().rows.length} строк
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