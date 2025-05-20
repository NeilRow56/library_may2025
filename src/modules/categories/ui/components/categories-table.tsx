'use client'

import { DataTable } from '@/components/data-table-components/data-table'
import { columns } from './columns'

type props = {
  data: {
    category_id: number
    category_name: string
  }[]
}
function CategoriesTable({ data }: { data: props }) {
  return (
    <>
      <DataTable
        data={data.data}
        columns={columns}
        onRowDelete={() => {}}
        onRowEdit={() => {}}
      />
    </>
  )
}

export default CategoriesTable
