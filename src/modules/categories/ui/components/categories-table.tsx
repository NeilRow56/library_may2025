'use client'

import { DataTable } from '@/components/data-table-components/data-table'
import { Category, columns } from './columns'
import { ConfirmationDialog } from '@/components/dialogs/confirmation-dialog'
import { toast } from 'sonner'
import { startTransition, useState } from 'react'
import { usePathname } from 'next/navigation'
import { deleteCategory } from '@/actions/actions'

type props = {
  data: {
    category_id: number
    category_name: string
  }[]
  total: number
}
function CategoriesTable({ data }: { data: props }) {
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false)
  const [itemToAction, setItemToAction] = useState<Category>()

  const pathname = usePathname()

  const handleRowDelete = (item: Category) => {
    setOpenConfirmationDialog(true)
    setItemToAction(item)
  }

  const handleRowEdit = (item: Category) => {
    console.log('Edit', item)
  }

  const handleConfirm = async () => {
    setOpenConfirmationDialog(false)

    if (itemToAction) {
      startTransition(async () => {
        await deleteCategory(itemToAction.category_id, pathname)
      })

      toast(`${itemToAction.category_name} deleted`)
    }
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

      <ConfirmationDialog
        open={openConfirmationDialog}
        onClose={() => setOpenConfirmationDialog(false)}
        onConfirm={handleConfirm}
        message='By continuing you are going to delete the category, continue?'
      />
    </>
  )
}

export default CategoriesTable
