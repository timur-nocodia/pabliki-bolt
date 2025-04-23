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
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const statusOptions = [
  { value: "all", label: "Все статусы" },
  { value: "pending_review", label: "На рассмотрении" },
  { value: "action_required", label: "Требуется действие" },
  { value: "approved", label: "Одобрен" },
  { value: "rejected", label: "Отклонен" }
]

export type PublicOwnerPublic = {
  id: string
  name: string
  handle: string
  subscribers: number
  requestedPostPrice: number
  requestedStoryPrice: number
  approvedPostPrice: number | null
  approvedStoryPrice: number | null
  status: "pending_review" | "action_required" | "approved" | "rejected"
  lastUpdated: Date
}

interface PublicOwnerPublicsTableProps {
  initialData: PublicOwnerPublic[]
}

export const columns: ColumnDef<PublicOwnerPublic>[] = [
  {
    accessorKey: "name",
    header: "Название паблика",
    cell: ({ row }) => (
      <div>
        <div className="font-medium">{row.getValue("name")}</div>
        <div className="text-sm text-muted-foreground">{row.original.handle}</div>
      </div>
    ),
  },
  {
    accessorKey: "subscribers",
    header: "Аудитория",
    cell: ({ row }) => (
      <div className="font-medium">
        {new Intl.NumberFormat("ru-RU").format(row.getValue("subscribers"))}
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
    accessorKey: "approvedPrices",
    header: "Согласованная цена (Пост/Stories)",
    cell: ({ row }) => (
      <div className="font-medium">
        {row.original.approvedPostPrice ? (
          <>
            {new Intl.NumberFormat("ru-RU", {
              style: "currency",
              currency: "KZT",
              maximumFractionDigits: 0
            }).format(row.original.approvedPostPrice)}
            {" / "}
            {new Intl.NumberFormat("ru-RU", {
              style: "currency",
              currency: "KZT",
              maximumFractionDigits: 0
            }).format(row.original.approvedStoryPrice!)}
          </>
        ) : (
          "—"
        )}
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Статус",
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      const statusMap = {
        pending_review: { label: "На рассмотрении", class: "bg-yellow-100 text-yellow-800" },
        action_required: { label: "Требуется действие", class: "bg-blue-100 text-blue-800" },
        approved: { label: "Одобрен", class: "bg-green-100 text-green-800" },
        rejected: { label: "Отклонен", class: "bg-red-100 text-red-800" }
      }
      return (
        <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusMap[status].class}`}>
          {statusMap[status].label}
        </div>
      )
    },
  },
  {
    accessorKey: "lastUpdated",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Последнее обновление
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div>
        {format(row.getValue("lastUpdated"), "dd MMMM yyyy г.", { locale: ru })}
      </div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const public_ = row.original

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
              onClick={() => navigator.clipboard.writeText(public_.id)}
            >
              Копировать ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Просмотр деталей</DropdownMenuItem>
            <DropdownMenuItem>Редактировать</DropdownMenuItem>
            {public_.status === "action_required" && (
              <DropdownMenuItem>Ответить на предложение</DropdownMenuItem>
            )}
            <DropdownMenuItem className="text-red-600">Удалить</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

export function PublicOwnerPublicsTable({ initialData }: PublicOwnerPublicsTableProps) {
  const router = useRouter()
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data: initialData,
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
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
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
                  className={cn(
                    "cursor-pointer hover:bg-muted/50",
                    row.original.status === "action_required" && "bg-blue-50/50"
                  )}
                  onClick={() => router.push(`/dashboard-public/my-publics/${row.original.id}`)}
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