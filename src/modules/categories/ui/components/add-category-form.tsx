import { addCategory } from '@/actions/actions'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { createCategorySchema } from '@/schemas/category'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useFormStatus } from 'react-dom'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

type Inputs = z.infer<typeof createCategorySchema>

type AddCategoryFormProps = {
  onSave: () => void
}

export const AddCategoryForm = ({ onSave }: AddCategoryFormProps) => {
  const path = usePathname()
  const { pending } = useFormStatus()
  const form = useForm<z.infer<typeof createCategorySchema>>({
    resolver: zodResolver(createCategorySchema),
    defaultValues: {
      name: ''
    }
  })

  const processForm: SubmitHandler<Inputs> = async data => {
    const result = await addCategory(data, path)

    if (result?.error) {
      toast.error(result.error)
      return
    }
    onSave()
    toast.success('Category created successfully!')
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(processForm)} className='space-y-1'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel></FormLabel>
                <FormControl>
                  <Input placeholder='category name...' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className='w-[150px] py-2'>
            {pending ? (
              <Button disabled className='w-full'>
                <Loader2 className='mr-2 size-4 animate-spin' /> Please wait...
              </Button>
            ) : (
              <Button type='submit' className='w-full'>
                Create category
              </Button>
            )}
          </div>
        </form>
      </Form>
    </>
  )
}
