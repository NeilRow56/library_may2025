'use client'

import React, { useState } from 'react'

import { PlusIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import AddCategoryDialog from '@/components/dialogs/category-dialog-component'

export const AddCategoryButton = () => {
  const [open, setOpen] = useState(false)
  return (
    <div>
      <Button className='cursor-pointer self-end' onClick={() => setOpen(true)}>
        <PlusIcon />
        Add category
      </Button>
      <AddCategoryDialog open={open} setOpen={setOpen} />
    </div>
  )
}
