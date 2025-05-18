'use client'

// import { SubmitButton } from '@/components/submit-button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Input } from '@/components/ui/input'
import { createCategorySchema } from '@/schemas/category'
import { SubmitHandler, useForm } from 'react-hook-form'
import { addCategory } from '@/actions/actions'
import { usePathname } from 'next/navigation'
import { toast } from 'sonner'
import { book_category_links } from '@prisma/client/edge'
import { useFormStatus } from 'react-dom'
import { Button } from '@/components/ui/button'

type CategoryDialogProps = {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  category?: book_category_links
}

type Inputs = z.infer<typeof createCategorySchema>

export const AddCategoryDialog = ({
  setOpen,
  open,
  category
}: CategoryDialogProps) => {
  const path = usePathname()
  const status = useFormStatus()
  const form = useForm<z.infer<typeof createCategorySchema>>({
    resolver: zodResolver(createCategorySchema),
    defaultValues: {
      name: ''
    }
  })

  // 2. Define a submit handler.
  // const processForm: SubmitHandler<Inputs> = async data => {

  //   const result = await addCategory(data, path)

  //   if (result?.error) {
  //     toast.error(result.error)
  //     return
  //   }

  //   toast.success('Category created successfully!')
  // }
  const processForm: SubmitHandler<Inputs> = async data => {
    try {
      if (category) {
        // await updateCategory(category.category_id, values.name, path)
      } else {
        const result = await addCategory(data, path)
        if (result?.error) {
          toast.error(result.error)
          return
        }
        toast.success('Category created successfully!')
      }

      form.reset()
    } catch (error) {
      console.error('Error:', error)
      throw new Error('Something went wrong .')
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add category</DialogTitle>
          <DialogDescription></DialogDescription>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(processForm)}
              className='space-y-1'
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

              <div className='w-[100px] py-2'>
                <Button type='submit' disabled={status.pending}>
                  {status.pending ? 'Creating...' : 'Create category'}
                </Button>
              </div>
            </form>
          </Form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
