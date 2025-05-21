'use client'

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  RowData,
  SortingState,
  useReactTable,
  VisibilityState
} from '@tanstack/react-table'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'

import React from 'react'

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon
} from '@radix-ui/react-icons'
import DataTableFilterInput from './data-table-input-filter'
import { DataTableViewOptions } from './data-table-view-options'

import { EmptyState } from './empty-state'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../ui/select'
import { Button } from '../ui/button'

declare module '@tanstack/react-table' {
  interface TableMeta<TData extends RowData> {
    onDelete: (item: TData) => void
    onEdit: (item: TData) => void
  }
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  total: number
  filter_column: string
  onRowDelete: (item: TData) => void
  onRowEdit: (item: TData) => void
}

export function DataTable<TData, TValue>({
  columns,
  data,
  total,
  filter_column,
  onRowDelete,
  onRowEdit
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),

    rowCount: total,
    meta: {
      onDelete: item => onRowDelete(item),
      onEdit: item => onRowEdit(item)
    },
    state: {
      sorting,
      columnFilters,
      columnVisibility
    }
  })

  return (
    <div className='container mx-auto max-w-4xl space-y-2'>
      <DataTableFilterInput table={table} column={filter_column} />
      <DataTableViewOptions table={table} />
      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => {
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
              table.getRowModel().rows.map(row => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map(cell => (
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
                  className='h-24 text-center'
                >
                  <EmptyState
                    description='Please add data'
                    title='No details provided '
                  />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className='mt-10 flex items-center justify-between px-2'>
        <div className='text-muted-foreground flex-1 text-sm'>
          {table.getFilteredRowModel().rows.length} file(s) .
        </div>
        <div className='flex items-center space-x-6 lg:space-x-8'>
          <div className='flex items-center space-x-2'>
            <p className='text-sm font-medium'>Rows per page</p>
            <Select
              value={`${table.getState().pagination.pageSize}`}
              onValueChange={value => {
                table.setPageSize(Number(value))
              }}
            >
              <SelectTrigger className='h-8 w-[70px]'>
                <SelectValue
                  placeholder={table.getState().pagination.pageSize}
                />
              </SelectTrigger>
              <SelectContent side='top'>
                {[1, 5, 10, 15, 20, 25, 30].map(pageSize => (
                  <SelectItem key={pageSize} value={`${pageSize}`}>
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className='flex w-[100px] items-center justify-center text-sm font-medium'>
            Page {table.getState().pagination.pageIndex + 1} of{' '}
            {table.getPageCount()}
          </div>
          <div className='flex items-center space-x-2'>
            <Button
              variant='outline'
              className='hidden h-8 w-8 p-0 lg:flex'
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <span className='sr-only'>Go to first page</span>
              <DoubleArrowLeftIcon className='h-4 w-4' />
            </Button>
            <Button
              variant='outline'
              className='h-8 w-8 p-0'
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <span className='sr-only'>Go to previous page</span>
              <ChevronLeftIcon className='h-4 w-4' />
            </Button>
            <Button
              variant='outline'
              className='h-8 w-8 p-0'
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <span className='sr-only'>Go to next page</span>
              <ChevronRightIcon className='h-4 w-4' />
            </Button>
            <Button
              variant='outline'
              className='hidden h-8 w-8 p-0 lg:flex'
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              <span className='sr-only'>Go to last page</span>
              <DoubleArrowRightIcon className='h-4 w-4' />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
