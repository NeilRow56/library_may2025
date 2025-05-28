import React, { useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '../ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form'

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { Input } from '../ui/input'
import { addCategory, updateCategory } from '@/actions/actions'
import { usePathname } from 'next/navigation'

import { Button } from '../ui/button'
import { categorySchema } from '@/schemas/category'
import { Category } from '@/modules/categories/ui/components/columns'
import { customResolver } from '../custom-resolver'

type Props = {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  category?: Category
}

function AddCategoryDialog({ setOpen, open, category }: Props) {
  const path = usePathname()

  const form = useForm<z.infer<typeof categorySchema>>({
    resolver: customResolver(categorySchema),
    defaultValues: { name: '' }
  })

  useEffect(() => {
    if (category) {
      form.setValue('id', category.category_id)
      form.setValue('name', category.category_name)
    }
  }, [category, form])

  const onSubmit = async (values: z.infer<typeof categorySchema>) => {
    try {
      if (category) {
        await updateCategory(category.category_id, values.name, path)
      } else {
        await addCategory(values.name, path)
      }

      form.reset()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add category</DialogTitle>
          <DialogDescription></DialogDescription>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-1'>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <Input placeholder='category name' {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <div className='w-[120px] py-2'>
                <Button type='submit'>Save</Button>
              </div>
            </form>
          </Form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default AddCategoryDialog
