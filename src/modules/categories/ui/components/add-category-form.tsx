import React from 'react'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel
} from '@/components/ui/form'

import { z } from 'zod'
import { ControllerRenderProps, SubmitHandler, useForm } from 'react-hook-form'

import { usePathname } from 'next/navigation'

import { Category } from './columns'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { customResolver } from '@/components/custom-resolver'
import { insertCategorySchema, updateCategorySchema } from '@/lib/validators'
import { createBookCategory, updateBookCategory } from '@/lib/actions/category'
import { categoryDefaultValues } from '@/lib/constants'

import { toast } from 'sonner'

type Props = {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  category?: Category
  category_id?: number
  type: 'Create' | 'Update'
}

function AddCategoryForm({
  setOpen,
  open,
  category,
  category_id,
  type
}: Props) {
  const path = usePathname()

  const form = useForm<z.infer<typeof insertCategorySchema>>({
    resolver:
      type === 'Update'
        ? customResolver(updateCategorySchema)
        : customResolver(insertCategorySchema),
    defaultValues:
      category && type === 'Update' ? category : categoryDefaultValues
  })

  const onSubmit: SubmitHandler<
    z.infer<typeof insertCategorySchema>
  > = async values => {
    // On Create
    if (type === 'Create') {
      const res = await createBookCategory(values, path)

      if (!res.success) {
        toast.error('Book category not created')
      } else {
        toast.success('Book category created')
      }
      form.reset()
    }

    // On Update
    if (type === 'Update') {
      if (!category_id) {
        return
      }

      const res = await updateBookCategory({ ...values, category_id }, path)

      if (!res.success) {
        toast.error('Error - Book category not updated')
      } else {
        toast.success('Book category updated')
      }
      form.reset()
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create category</DialogTitle>
          <DialogDescription></DialogDescription>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-1'>
              <FormField
                control={form.control}
                name='category_name'
                render={({
                  field
                }: {
                  field: ControllerRenderProps<
                    z.infer<typeof insertCategorySchema>,
                    'category_name'
                  >
                }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <Input placeholder='category name' {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <Button
                type='submit'
                size='lg'
                disabled={form.formState.isSubmitting}
                className='button col-span-2 mt-4 w-full'
              >
                {form.formState.isSubmitting
                  ? 'Submitting'
                  : `${type} book category`}
              </Button>
            </form>
          </Form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default AddCategoryForm
