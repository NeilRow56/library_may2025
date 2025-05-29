import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'

import CategoryForm from '@/modules/categories/ui/components/category-form'

interface CategoryTitle2Props {
  // message: string
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  // onClose: () => void
  // onConfirm: () => void
}

export function CategoryTitle2({ open, setOpen }: CategoryTitle2Props) {
  const handleCloseDialog = () => {
    setOpen(false)
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle>Category title</DialogTitle>
          <DialogDescription>Enter a name for the category</DialogDescription>
        </DialogHeader>
        <CategoryForm type='Create' onSave={handleCloseDialog} />
      </DialogContent>
    </Dialog>
  )
}
