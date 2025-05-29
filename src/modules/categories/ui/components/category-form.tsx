'use client'

import React, { useEffect } from 'react'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'

import { z } from 'zod'
import { useForm } from 'react-hook-form'

import { usePathname } from 'next/navigation'

import { Category } from './columns'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { customResolver } from '@/components/custom-resolver'
import { formSchema } from '@/lib/validators'
import { createBookCategory, updateBookCategory } from '@/lib/actions/category'

import { toast } from 'sonner'

type Props = {
  category?: Category
  category_id?: number
  type: 'Create' | 'Update'
  onSave: () => void
}

function CategoryForm({ category, type, onSave }: Props) {
  const path = usePathname()

  // const form = useForm<z.infer<typeof insertCategorySchema>>({
  //   resolver:
  //     type === 'Update'
  //       ? customResolver(updateCategorySchema)
  //       : customResolver(insertCategorySchema),
  //   defaultValues:
  //     category && type === 'Update' ? category : categoryDefaultValues
  // })

  // const onSubmit: SubmitHandler<
  //   z.infer<typeof insertCategorySchema>
  // > = async values => {
  //   // On Create
  //   if (type === 'Create') {
  //     const res = await createBookCategory(values, path)

  //     if (!res.success) {
  //       toast.error('Book category not created')
  //     } else {
  //       toast.success(`${res.category?.category_name} catgory created`)
  //     }
  //     onSave()
  //   }

  //   // On Update
  //   if (type === 'Update') {
  //     if (!category_id) {
  //       return
  //     }

  //     const res = await updateBookCategory({ ...values, category_id }, path)

  //     if (!res.success) {
  //       toast.error('Error - Book category not updated')
  //     } else {
  //       toast.success('Book category updated')
  //     }
  //     form.reset()
  //   }
  // }
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

      toast.success('Book category updated')
      form.reset()
      onSave()
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      <Form {...form}>
        <form
          method='POST'
          onSubmit={form.handleSubmit(onSubmit)}
          className='flex w-full flex-col space-y-1'
        >
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Input placeholder='category name' {...field} />
                </FormControl>
                <FormMessage />
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
    </>
  )
}

export default CategoryForm
