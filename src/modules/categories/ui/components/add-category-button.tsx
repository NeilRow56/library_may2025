'use client'

import AddCategoryDialog from '@/components/dialogs/add-category-dialog'
import { Button } from '@/components/ui/button'
import { PlusIcon } from 'lucide-react'
import { useState } from 'react'

export const AddCategoryButton = () => {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button className='cursor-pointer self-end' onClick={() => setOpen(true)}>
        <PlusIcon />
        Add category
      </Button>
      <AddCategoryDialog open={open} setOpen={setOpen} />
    </>
  )
}
