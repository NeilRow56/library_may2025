import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { AddCategoryForm } from '@/modules/categories/ui/components/add-category-form'

import { useRouter } from 'next/navigation'

type CategoryDialogProps = {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export function CategoryDialogComponent({
  open,
  setOpen
}: CategoryDialogProps) {
  const router = useRouter()

  const handleCloseDialog = () => {
    setOpen(false)
    router.refresh()
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Create a new category</DialogTitle>
          <DialogDescription>Add a category name </DialogDescription>
        </DialogHeader>
        <AddCategoryForm onSave={handleCloseDialog} />
      </DialogContent>
    </Dialog>
  )
}
