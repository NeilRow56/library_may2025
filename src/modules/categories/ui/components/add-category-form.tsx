import React, { useEffect } from 'react'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel
} from '@/components/ui/form'

import { z } from 'zod'
import { useForm } from 'react-hook-form'

import { addCategory, updateCategory } from '@/actions/actions'
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
        await updateCategory(category.category_id, values.name, path)
      } else {
        await addCategory(values, path)
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

              <Button type='submit'>Save</Button>
            </form>
          </Form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default AddCategoryDialog
