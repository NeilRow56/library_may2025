'use client'

import { CategoryTitle2 } from '@/components/dialogs/category-title2'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

export const AddCategoryButton = () => {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button className='cursor-pointer self-end' onClick={() => setOpen(true)}>
        Add Category title
      </Button>
      <CategoryTitle2 open={open} setOpen={setOpen} />
    </>
  )
}
