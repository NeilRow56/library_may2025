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

import { usePathname } from 'next/navigation'

import { customResolver } from '../custom-resolver'
import { Category } from '@/modules/categories/ui/components/columns'
import { toast } from 'sonner'
import { createBookCategory, updateBookCategory } from '@/lib/actions/category'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
type Props = {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  category?: Category
}

const formSchema = z.object({
  id: z.number().default(-1),
  name: z
    .string()
    .min(2, {
      message: 'Category must be entered'
    })
    .max(20)
})

function AddCategoryDialog({ setOpen, open, category }: Props) {
  const path = usePathname()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: customResolver(formSchema),
    defaultValues: { name: '' }
  })

  useEffect(() => {
    if (category) {
      form.setValue('id', category.category_id)
      form.setValue('name', category.category_name)
    }
  }, [category, form])

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (category) {
        await updateBookCategory(category.category_id, values.name, path)
      } else {
        await createBookCategory(values.name, path)
      }

      toast.success(`${values.name} category created/updated`)

      form.reset()
    } catch (error) {
      console.log(error)
      toast.error('Failed to perform action')
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Category</DialogTitle>
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

              {/* <Button type='submit'>Save</Button> */}
              <Button
                type='submit'
                size='lg'
                disabled={form.formState.isSubmitting}
                className='button col-span-2 mt-4 w-full'
              >
                {form.formState.isSubmitting ? 'Submitting' : 'Save'}
              </Button>
            </form>
          </Form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default AddCategoryDialog
