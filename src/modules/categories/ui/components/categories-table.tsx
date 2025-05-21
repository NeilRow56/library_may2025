'use client'

import { DataTable } from '@/components/data-table-components/data-table'
import { Category, columns } from './columns'
// import DataTable2 from '@/components/data-table-components/data-table2'

type props = {
  data: {
    category_id: number
    category_name: string
  }[]
  total: number
}
function CategoriesTable({ data }: { data: props }) {
  const handleRowDelete = (item: Category) => {
    console.log('<Delete', item)
  }

  const handleRowEdit = (item: Category) => {
    console.log('Edit', item)
  }
  return (
    <>
      <DataTable
        data={data.data}
        columns={columns}
        total={data.total}
        filter_column='category_name'
        onRowDelete={handleRowDelete}
        onRowEdit={handleRowEdit}
      />
    </>
  )
}

export default CategoriesTable
